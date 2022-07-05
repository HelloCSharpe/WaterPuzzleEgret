
class LzyScrollView extends egret.DisplayObjectContainer {

    private myscrollView: egret.ScrollView;
    public isVertical: boolean;
    public width: number;
    public height: number;
    public posX: number;
    public posY: number;
    public anchorOffsetX: number;
    public anchorOffsetY: number;
    private bgRes: string;
    private _content:egret.DisplayObjectContainer;
    public constructor(isVertical: boolean, width: number, height: number, x: number, y: number, anchorOffsetX: number, anchorOffsetY: number, bgRes: string = "") {
        super();
        this.isVertical = isVertical;
        this.width = width;
        this.height = height;
        this.anchorOffsetX = anchorOffsetX;
        this.anchorOffsetY = anchorOffsetY;
        this.posX = x;
        this.posY = y;
        this.bgRes = bgRes;
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
        background.x = this.posX;
        background.y = this.posY;
        background.anchorOffsetX = this.anchorOffsetX;
        background.anchorOffsetY = this.anchorOffsetY;
        this.addChild(background);
    }


    private onAddToStage() {
        this.AddBg();
        //创建ScrollView
        this.myscrollView = new egret.ScrollView();
        this.myscrollView.width = this.width;
        this.myscrollView.height = this.height;
        this.myscrollView.x = this.posX;
        this.myscrollView.y = this.posY;
        this.myscrollView.anchorOffsetX = this.anchorOffsetX;
        this.myscrollView.anchorOffsetY = this.anchorOffsetY;

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
        // console.log("on Complete");
    }
    private onChange(event: egret.Event) {
        // console.log("on Change");
    }

    public SetContent<T>(spacingX: number, spacingY: number, datas: Array<T>, creater: IScrollViewGrid<T>, paddingX: number = 0, paddingY: number = 0) {
        let content: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        if (this.isVertical) {
            content.width = this.width;
            //计算一行能放下几个
            const childW: number = creater.width();
            const childH: number = creater.height();
            let linePerCount: number = (this.width - paddingX) / (childW + spacingX);
            linePerCount = Math.floor(linePerCount);
            if (linePerCount == 0) {
                linePerCount = 1;
            }
            //计算一共需要几行来实例化数据
            const dataCount = datas.length;
            let lineCount = dataCount / linePerCount;
            lineCount = Math.ceil(lineCount);
            const cHeight: number = paddingY + (childH + spacingY) * lineCount;
            content.height = cHeight;
            //实例化数据
            for (var i = 0; i < datas.length; i++) {
                const data = datas[i];
                const index_x = i % linePerCount;//求余，计算当前索引的数据是在一行中的哪个位置(index_x)
                const index_y = Math.floor(i / linePerCount);//计算当前索引的数据是在哪一行
                let grid: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
                grid.x = paddingX + index_x * (childW + spacingX);
                grid.y = paddingY + index_y * (childH + spacingY);
                grid.width = childW;
                grid.height = childH;
                content.addChild(grid);
                creater.InitDataUI(grid, data);
            }
        } else {
            content.height = this.height;
            //计算一列能放下几个
            const childW: number = creater.width();
            const childH: number = creater.height();
            let rowPerCount: number = (this.height - paddingY) / (childH + spacingY);
            rowPerCount = Math.floor(rowPerCount);
            if (rowPerCount == 0) {
                rowPerCount = 1;
            }
            //计算一共需要几列来实例化数据
            const dataCount = datas.length;
            let rowCount = dataCount / rowPerCount;
            rowCount = Math.ceil(rowCount);
            const cWidth: number = paddingX + (childW + spacingX) * rowCount;
            content.width = cWidth;
            //实例化数据
            for (var i = 0; i < datas.length; i++) {
                const data = datas[i];
                const index_y = i % rowPerCount;//求余，计算当前索引的数据是在一行中的哪个位置(index_x)
                const index_x = Math.floor(i / rowPerCount);//计算当前索引的数据是在哪一行
                let grid: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
                grid.x = paddingX + index_x * (childW + spacingX);
                grid.y = paddingY + index_y * (childH + spacingY);
                grid.width = childW;
                grid.height = childH;
                content.addChild(grid);
                creater.InitDataUI(grid, data);
            }
        }
        this.myscrollView.setContent(content);
        if(this._content != null){
            delete this._content;
        }
        this._content = content;
    }

    public UpdateByIndex<T>(index:number,data: T, creater: IScrollViewGrid<T>):void {
        let grid: egret.DisplayObjectContainer = this._content.getChildAt(index) as egret.DisplayObjectContainer;
        creater.InitDataUI(grid, data);
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
}