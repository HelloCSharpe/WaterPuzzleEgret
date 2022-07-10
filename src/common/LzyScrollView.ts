//设置成无线循环列表
class LzyScrollView extends egret.DisplayObjectContainer {

    private myscrollView: egret.ScrollView;
    public isVertical: boolean;
    public posX: number;
    public posY: number;
    public anchorOffsetX: number;
    public anchorOffsetY: number;
    private bgRes: string;
    private _content:egret.DisplayObjectContainer;
    private usedItems:egret.DisplayObjectContainer[];//使用中的item
    private items:egret.DisplayObjectContainer[];//无限循环所用的item（pool）

    private creater:IScrollViewGrid<any>;//创造器(一般用于绑定Scene)
    private datas:Array<any>;
    private linePerCount:number;//一行能放下几个
    private prevIndex:number=-1;//当前所有显示item的前一个index是多少
    private prevValue:number=0;//前一个item所需值（x或者y坐标）
    private nextIndex:number=-1;//当前所有显示item的下一个index是多少
    private nextValue:number=0;//下一个item所需值（x或者y坐标）

    private paddingX:number;
    private paddingY:number;
    private spacingX:number;
    private spacingY:number;

    public constructor(isVertical: boolean, width: number, height: number, x: number, y: number, anchorOffsetX?: number, anchorOffsetY?: number,bgRes: string = "") {
        super();
        this.isVertical = isVertical;
        this.width = width;
        this.height = height;
        this.anchorOffsetX = anchorOffsetX;
        this.anchorOffsetY = anchorOffsetY;
        this.posX = x;
        this.posY = y;
        this.x=x;
        this.y=y;
        this.bgRes = bgRes;
        this.items=[];
        this.usedItems=[];
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

    }
    private AddBg() {
        if (this.bgRes == "") {
            return;
        }
        var background = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(this.bgRes);
        background.texture = texture;
        background.width = this.width;
        background.height = this.height;
        background.touchEnabled=true;
        // background.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouch, this);
        // background.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndTouch, this);

        this.addChild(background);
    }


	// private _touchStatus: boolean = false;              //当前触摸状态，按下时，值为true
	// private _distance: egret.Point = new egret.Point() // 定义一个空的定位

    // private onBeginTouch(evt: egret.TouchEvent){
	// 	this._touchStatus = true;
	// 	this._distance.x = evt.stageX;
	// 	this._distance.y = evt.stageY;
	// 	this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.Draging, this);
    // }

    // private onEndTouch(evt: egret.TouchEvent){
	// 	this._touchStatus = false;
	// 	this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.Draging, this);
    // }

    // private Draging(evt: egret.TouchEvent){
	// 	if (this._touchStatus) {
	// 		let x = evt.stageX - this._distance.x;
	// 		let y = evt.stageY - this._distance.y;
    //         if(this.isVertical){
    //             this.myscrollView.scrollTop-=y;
    //         }else{
    //             this.myscrollView.scrollLeft-=x;
    //         }
    //         this._distance.x = evt.stageX;
    //         this._distance.y = evt.stageY;
	// 	}
    // }


    private onAddToStage() {
        this.AddBg();
        //创建ScrollView
        this.myscrollView = new egret.ScrollView();
        this.myscrollView.width = this.width;
        this.myscrollView.height = this.height;

        if (this.isVertical) {
            this.myscrollView.verticalScrollPolicy = "on";
            this.myscrollView.horizontalScrollPolicy = "off";
        } else {
            this.myscrollView.verticalScrollPolicy = "off";
            this.myscrollView.horizontalScrollPolicy = "on";
        }
        this.addChild(this.myscrollView);
        this.myscrollView.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        this.myscrollView.addEventListener(egret.Event.CHANGE, this.onChange, this);

    }

    private onComplete(event: egret.Event) {
        // console.log("on Complete",event.currentTarget.scrollTop,event.currentTarget.scrollLeft);
    }
    private onChange(event: egret.Event) {
        if(this.datas==null){
            return;
        }
        let dataLen=this.datas.length;
        if(dataLen==0){
            return;
        }
        // console.log("on Change",event.currentTarget.scrollTop,event.currentTarget.scrollLeft);
        let scrollValue=this.isVertical?event.currentTarget.scrollTop:event.currentTarget.scrollLeft;
        let curRangeMin=0+scrollValue;
        let curRangeMax=this.height+scrollValue;

        //先做加载
        if(this.prevIndex>0){
            if(this.prevValue>=curRangeMin){
                let _prevIndex=this.prevIndex-this.linePerCount;//加载完的前一个Index
                let childW=this.creater.width();
                let childH=this.creater.height();
                for(let i=this.prevIndex;i>_prevIndex;i--){
                    let data=this.datas[i];
                    let pos=this.CalTargetXY(i);
                    this.ShowGrid(pos.x,pos.y,i,data);
                }
                let gridOffset=this.isVertical?childH+this.spacingY:childW+this.spacingX;
                this.prevValue-=gridOffset;
                this.prevIndex=_prevIndex;
            }
        }

        if(this.nextIndex>0&&this.nextIndex<dataLen){
            if(this.nextValue<=curRangeMax){
                let _nextIndex=this.nextIndex+this.linePerCount;//加载完的前一个Index
                let childW=this.creater.width();
                let childH=this.creater.height();
                for(let i=this.nextIndex;i<_nextIndex;i++){
                    if(i>=dataLen){
                        continue;
                    }
                    let data=this.datas[i];
                    if(data==null){
                        continue;
                    }
                    let pos=this.CalTargetXY(i);
                    this.ShowGrid(pos.x,pos.y,i,data);
                }
                let gridOffset=this.isVertical?childH+this.spacingY:childW+this.spacingX;
                this.nextValue+=gridOffset;
                this.nextIndex=_nextIndex;
            }
        }
        //后做移除
        let curMinIndex=this.prevIndex+1;//当前显示的最小值Index
        let curMaxIndex=this.nextIndex-1;//当前显示的最大值Index
        if(curMinIndex<0){
            curMinIndex=0;
        }
        if(curMaxIndex>dataLen-1){
            curMaxIndex=dataLen-1;
        }
        let pos=this.CalTargetXY(curMinIndex);
        let pos2=this.CalTargetXY(curMaxIndex);
        let curMinValue=this.isVertical?pos.y+this.creater.height():pos.x+this.creater.width();
        let curMaxValue=this.isVertical?pos2.y:pos2.x;

        if(curMinValue<curRangeMin){
            let _minIndex=curMinIndex+this.linePerCount;
            for(let i=curMinIndex;i<_minIndex;i++){
                this.HideGrid(i);
            }
            this.prevIndex=_minIndex-1;
            this.prevValue=curMinValue;
        }
        if(curMaxValue>curRangeMax){
            let _maxIndex=curMaxIndex-this.linePerCount;
            for(let i=curMaxIndex;i>_maxIndex;i--){
                this.HideGrid(i);
            }
            this.nextIndex=_maxIndex+1;
            this.nextValue=curMaxValue;
        }

    }

    public SetContent<T>(spacingX: number, spacingY: number, datas: Array<T>, creater: IScrollViewGrid<T>, paddingX: number = 0, paddingY: number = 0) {
        if(creater==null){
            console.error("creater is null");
            return;
        }
        if(this.creater!=null&&creater!=this.creater){
            console.error("creater is not equals");
            return;
        }
        this.creater=creater;
        this.datas=datas;
        this.spacingX=spacingX;
        this.spacingY=spacingY;
        this.paddingX=paddingX;
        this.paddingY=paddingY;
        if(this._content==null){
            this._content = new egret.DisplayObjectContainer();
            let contentBG=Utility.createBitmapByName("empty_png",0,0);
            contentBG.name="contentBG";
            this._content.addChild(contentBG);
            this.myscrollView.setContent(this._content);
        }
        //回收所有显示的item
        let len=this.usedItems.length;
        for(let i=len-1;i>=0;i--){
            let grid=this.usedItems.pop();
            if(grid!=null){
                this.ReleaseGridToPool(grid);
                this._content.removeChild(grid);
            }
            // this.usedItems[i]=null;
        }
        if (this.isVertical) {
            this.myscrollView.scrollTop=0;
            
            this._content.width = this.width;
            //计算一行能放下几个
            const childW: number = creater.width();
            const childH: number = creater.height();
            let linePerCount: number = (this.width - paddingX+spacingX) / (childW + spacingX);
            linePerCount = Math.floor(linePerCount);
            if (linePerCount == 0) {
                linePerCount = 1;
            }
            this.linePerCount=linePerCount;
            //计算一共需要几行来实例化数据
            const dataCount = datas.length;
            let lineCount = dataCount / linePerCount;
            lineCount = Math.ceil(lineCount);
            const cHeight: number = paddingY + (childH + spacingY) * lineCount;
            this._content.height = cHeight;
            //实例化数据
            this.prevIndex=-1;
            this.nextIndex=-1;
            for (var i = 0; i < datas.length; i++) {
                const data = datas[i];
                let pos=this.CalTargetXY(i);
                let targetX=pos.x;
                let targetY=pos.y;
                if(targetY>this.height){
                    this.nextIndex=i;
                    this.nextValue=targetY;
                    break;
                }
                this.ShowGrid(targetX,targetY,i,data);
            }
        } else {
            this._content.height = this.height;
            this.myscrollView.scrollLeft=0;
            //计算一列能放下几个
            const childW: number = creater.width();
            const childH: number = creater.height();
            let rowPerCount: number = (this.height - paddingY + spacingY) / (childH + spacingY);
            rowPerCount = Math.floor(rowPerCount);
            if (rowPerCount == 0) {
                rowPerCount = 1;
            }
            this.linePerCount=rowPerCount;
            //计算一共需要几列来实例化数据
            const dataCount = datas.length;
            let rowCount = dataCount / rowPerCount;
            rowCount = Math.ceil(rowCount);
            const cWidth: number = paddingX + (childW + spacingX) * rowCount;
            this._content.width = cWidth;
            //实例化数据
            this.prevIndex=-1;
            this.nextIndex=-1;
            for (var i = 0; i < datas.length; i++) {
                const data = datas[i];
                let pos=this.CalTargetXY(i);
                let targetX=pos.x;
                let targetY=pos.y;
                if(targetX>this.width){
                    this.nextIndex=i;
                    this.nextValue=targetX;
                    break;
                }
                this.ShowGrid(targetX,targetY,i,data);
            }
        }
        let contentBG = this._content.getChildByName("contentBG");
        contentBG.width=this._content.width;
        contentBG.height=this._content.height;

    }

    private CalTargetXY(i:number):Vector2{
        const _index_x = i % this.linePerCount;//求余，计算当前索引的数据是在一行中的哪个位置(index_x)
        const _index_y = Math.floor(i / this.linePerCount);//计算当前索引的数据是在哪一行
        const index_x = this.isVertical?_index_x:_index_y;
        const index_y = this.isVertical?_index_y:_index_x;
        let targetX=this.paddingX + index_x * (this.creater.width() + this.spacingX);
        let targetY=this.paddingY + index_y * (this.creater.height() + this.spacingY);
        return new Vector2(targetX,targetY);
    }

    private HideGrid(index:number){
        console.log("HideGrid",index);
        let grid:egret.DisplayObjectContainer = this._content.getChildByName(String(index)) as egret.DisplayObjectContainer;
        if(grid!=null){
            let idx=this.usedItems.indexOf(grid);
            if(idx>=0){
                this.usedItems.splice(idx, 1);
            }
            this.ReleaseGridToPool(grid);
            this._content.removeChild(grid);
        }
    }

    private ShowGrid(x:number,y:number,index:number,data:any){
        console.log("ShowGrid",index);
        let grid = this.GetGridInPool();
        grid.name=String(index);
        grid.x = x;
        grid.y = y;
        grid.width = this.creater.width();
        grid.height = this.creater.height();
        this._content.addChild(grid);
        this.creater.InitDataUI(grid, data);
        this.usedItems.push(grid);
    }

    public UpdateByIndex<T>(index:number,data: T, creater: IScrollViewGrid<T>):void {
        let grid: egret.DisplayObjectContainer = this._content.getChildAt(index) as egret.DisplayObjectContainer;
        creater.InitDataUI(grid, data);
    }

    public GetGridInPool():egret.DisplayObjectContainer{
        let grid=this.items.pop();
        if(grid==null){
            grid=new egret.DisplayObjectContainer();
        }
        return grid;
    }

    public ReleaseGridToPool(grid:egret.DisplayObjectContainer){
        this.items.push(grid);
    }


    //创建格子函数，根据输入的宽和高来创建一个 row * line的格子图。并返回Shape对象。
    // private createGird(w:number,h:number,row:number,line:number):egret.Shape {

    //     var shape:egret.Shape = new egret.Shape();
    //     for(var i = 0;i < row;i++ ) {
    //         for(var j = 0; j < line;j++) {
    //             if ((j + row * i) % 2 === 0) {
    //                 shape.graphics.beginFill(0xF9C20B);
    //                 shape.graphics.drawRect(j * w, i * h, w, h);
    //                 shape.graphics.endFill();
    //             }
    //             else {
    //                 shape.graphics.beginFill(0x2A9FFF);
    //                 shape.graphics.drawRect(j * w, i * h, w, h);
    //                 shape.graphics.endFill();
    //            }
    //         }
    //     }
    //     return shape;
    // }
}

interface IScrollViewGrid<T> {
    width(): number;
    height(): number;
    InitDataUI(container: egret.DisplayObjectContainer, data: T): void;
    Destroy(container: egret.DisplayObjectContainer):void;
}