class Vector2{
    public x:number;
    public y:number;
    public constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }
}
class WaterData{
    public orginId:number;
    public colorInt:number;
    public color:number;//对应egret的color值
    public isHide:boolean;
    public num:number;//连接的是几个水

    public constructor(waterID:number){
        this.orginId = waterID;
        let realId:number = waterID;
        if(waterID>1000){realId=waterID-1000;}
        let waterCfg = DataConfig.Instance.GetDataByIndex("water",realId);
        this.isHide = waterID > 1000;
        this.color = Utility.ColorHTMLToInt(waterCfg.ColorStr);
        this.colorInt = realId;
        this.num = 1;
    }
}
//每一级对应的角度和高度
class AngleInfo{
    public angle:number;
    public height:number;

    public constructor(a:number,h:number){
        this.angle = a;
        this.height = h;
    }
}

class WaterScript extends eui.Component {
    private tube:TubeScript;
    private data:WaterData;
    private angleInfos:AngleInfo[]=[];

    private water:egret.Bitmap;
    private waterFlow:egret.MovieClip;
    private hide:egret.Bitmap;
    private hideTxt:egret.TextField;
    private _isFlow:boolean;

    private _waterWidth:number=80;//默认就是80宽度
    private _waterHeight:number=66;//默认就是66高度
    
    private get Deg2Rad():number{
        return Utility.Deg2Rad;
    }

    public get waterData():WaterData{return this.data;}
    public get tubeScript():TubeScript{return this.tube;}

    private get isFlow():boolean{return this._isFlow;}
    private set isFlow(b:boolean){
        this._isFlow = b;
        this.water.alpha=b?0:1;
        this.waterFlow.alpha=b?1:0;
    }

    public get waterWidth():number{return this._waterWidth;}
    public get waterHeight():number{return this._waterHeight;}
    public set waterWidth(w:number){
        this._waterWidth=w;
        this.width=w;
        this.water.width=w;
        this.waterFlow.width=w;
        this.hide.width=w;
        this.hideTxt.width=w;
    }
    public set waterHeight(h:number){
        this._waterHeight=h;
        this.height=h;
        this.water.height=h;
        this.waterFlow.height=h;
        this.hide.height=h;
        this.hideTxt.height=h;
    }

    public get RealHeight():number{return this.waterHeight * this.data.num;}

    public constructor(){
        super();
        this.InitUI();
        this.InitAngleInfos();
    }

    public Init(_tube:TubeScript,_data:WaterData){
        this.tube = _tube;
        this.data = _data;
        Utility.setImageColor(this.water,_data.color);
        Utility.setGifColor(this.waterFlow,_data.color);
        this.waterWidth = _tube.waterWidth;
        this.waterHeight = _tube.waterHeight;
        this.SetSize(this.waterWidth, this.RealHeight);
        this.isFlow = false;

        _tube.waterContainer.addChild(this);
        this.water.mask = _tube.waterMask;
        this.waterFlow.mask = _tube.waterMask;

        if(_data.isHide){
            this.hide.mask = _tube.waterMask;
            this.hideTxt.mask = _tube.waterMask;
        }else{
            this.removeChild(this.hide);
            this.removeChild(this.hideTxt);
            delete this.hide;
            delete this.hideTxt;
            this.hide = null;
            this.hideTxt = null;
        }
        
    }

    private InitUI():void{
        this.width = this.waterWidth;
        this.height = this.waterHeight;
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height;
        this.x = 0;
        this.y = 0;
        //water
        let water = Utility.createBitmapByName("white_jpg");
        water.width = this.width;
        water.height = this.height;
        water.anchorOffsetX = water.width/2;
        water.anchorOffsetY = water.height;
        water.x = 0;
        water.y = 0;
        this.addChild(water);
        this.water = water;
        //waterFlow
        let waterFlow = Utility.createGif("water_flow_json","water_flow_png");
        waterFlow.width = this.width;
        waterFlow.height = this.width;
        waterFlow.anchorOffsetX = waterFlow.width/2;
        waterFlow.anchorOffsetY = waterFlow.height;
        waterFlow.x = 0;
        waterFlow.y = 0;
        waterFlow.gotoAndPlay(0,-1);
        this.addChild(waterFlow);
        this.waterFlow = waterFlow;
        //hide
        let hide = Utility.createBitmapByName("hide1_jpg");
        hide.width = this.width;
        hide.height = this.height;
        hide.anchorOffsetX = hide.width/2;
        hide.anchorOffsetY = hide.height;
        hide.x = 0;
        hide.y = 0;
        this.addChild(hide);
        this.hide = hide;
        //hideTxt
        let txtField = new egret.TextField();
        txtField.text = "?";
        txtField.fontFamily = "myFirstFont";
        txtField.textColor = 0xFFFFFF;
        txtField.textAlign = egret.HorizontalAlign.CENTER;  //水平右对齐，相对于 textField 控件自身的 width 与 height
        txtField.verticalAlign = egret.VerticalAlign.MIDDLE;
        txtField.width = hide.width;
        txtField.height = hide.height;
        hide.anchorOffsetX = hide.width/2;
        hide.anchorOffsetY = hide.height;
        hide.x = 0;
        hide.y = 0;
        txtField.size = 30;
        this.hideTxt=txtField;
        this.addChild(txtField);
    }

    private InitAngleInfos():void{
        if(this.angleInfos.length > 0){return;}
        let PullAngles = this.tube.PullAngles;
        for(let i=0;i<PullAngles.length;i++){
            let index = PullAngles.length - 1 - i;
            let angle = PullAngles[index];
            let cosValue = Math.cos(angle * this.Deg2Rad);
            let waterNum = this.tube.MaxWaterNum - i;
            let offsetX = (this.tube.tubeWidth - this.tube.tubeMouthWidth) / 2;//瓶口距离边缘的距离
            let _height = offsetX * Math.sin(angle * this.Deg2Rad);//瓶口距离边缘的垂直高度
            let _tubeHeight = this.tube.tubeHeight * cosValue + _height;
            let waterHeight = waterNum == 0 ? 0 : Math.ceil(_tubeHeight / waterNum);
            this.angleInfos.push(new AngleInfo(angle,waterHeight));
        }
    }

    public SetSize(w:number,h:number){
        this.scaleX = w/this._waterWidth;
        this.scaleY = h/this._waterHeight;
    }

    public set sizeX(w:number){
        this.scaleX = w/this._waterWidth;
    }

    public set sizeY(h:number){
        this.scaleY = h/this._waterHeight;
    }
    //获取对应的宽度
    private GetWidth(w:number):number{
        let _w = Math.abs(w);
        if(_w>this.tube.tubeSlash){_w=this.tube.tubeSlash;}
        return _w;
    }

    public GetPos():Vector2{
        return new Vector2(this.x,this.y);
    }

    public SetPos(x:number,y:number){
        this.x = x;
        this.y = y;
        this.water.x = x;
        this.water.y = y;
        this.waterFlow.x = x;
        this.waterFlow.y = y;
        this.hide.x = x;
        this.hide.y = y;
    }

    public CloseHideImg():void{
        let tw = egret.Tween.get(this.hide);
        this.removeChild(this.hideTxt);
        tw.to({ "alpha": 0 }, 500).call(()=>{
            this.removeChild(this.hide);
            this.hideTxt=null;
            this.hide=null;
        },this);
    }

    public DoRotate(angle:number):void{
        this.rotation = angle;
    }

    public SetWaterAnchoredPosition(offsetY:number){
        if(this.tube.pullDir==PullDir.Left){
            this.SetPos(-this.width/2,offsetY);
        }else{
            this.SetPos(this.width/2,offsetY);
        }
    }

    public SetPullWaterSize(angle:number,curHeight:number):void{
        let offsetX = (this.tube.tubeWidth - this.tube.tubeMouthWidth) / 2;//瓶口距离边缘的距离
        let _height = offsetX * Math.sin(angle * this.Deg2Rad);//瓶口距离边缘的垂直高度
        let curMaxHeight = this.tube.tubeHeight * Math.cos(angle * this.Deg2Rad) + _height;
        let H = curMaxHeight > curHeight ? curMaxHeight - curHeight : 0;
        let W = H == 0 ? 0 : this.CalWidth(angle, H);
        this.SetSize(W, H);
    }

    public RefreshWidthAndHeight(angle:number):number{
        let H = this.CalHeight(angle) * this.waterData.num;
        let W = this.CalWidth(angle, H);
        this.SetSize(W, H);
        return H;
    }

    private CalWidth(angle:number,curHeight:number):number{
        let w = 0;
        angle = Math.abs(angle);
        if (angle < 0.01)
        {
            return this.width * 2;
        }
        if (angle >= 89.99)
        {
            return this.tube.tubeHeight * 2;
        }
        for (let i = 0; i < this.angleInfos.length; i++)
        {
            let angleInfo = this.angleInfos[i];
            if (angle < angleInfo.angle)
            {
                let _width1 = angle == 90 ? this.tube.tubeHeight : curHeight * Math.tan(angle * this.Deg2Rad);
                let cosValue = Math.cos(angle * this.Deg2Rad);
                let _width2 = cosValue == 0 ? this.tube.tubeHeight : this.tube.tubeWidth / cosValue;
                let _width3 = this.tube.tubeWidth * cosValue;
                _width1 = this.GetWidth(_width1);
                _width2 = this.GetWidth(_width2);
                _width3 = this.GetWidth(_width3);
                w = Math.max(Math.max(_width1, _width2), _width3) * 2;
                break;
            }
        }
        return w;
    }

    private Lerp(a:number,b:number,v:number):number{
        return Utility.Lerp(a,b,v);
    }

    private CalHeight(angle:number):number{
        let h = 0;
        angle = Math.abs(angle);
        if (angle < 0.01)
        {
            return this.height;
        }
        if (angle >= 89.99)
        {
            return 0;
        }
        for (let i = 0; i < this.angleInfos.length; i++)
        {
            let angleInfo = this.angleInfos[i];
            if (angle < angleInfo.angle)
            {
                if (i == 0)
                {
                    let value = angle / angleInfo.angle;
                    let startH = this.height;
                    let endH = angleInfo.height;
                    h = this.Lerp(startH, endH, value);
                }
                else
                {
                    var prevInfo = this.angleInfos[i - 1];
                    let value = (angle - prevInfo.angle) / (angleInfo.angle - prevInfo.angle);
                    let startH = prevInfo.height;
                    let endH = angleInfo.height;
                    h = this.Lerp(startH, endH, value);
                }
                break;
            }
        }
        let aa = egret.Tween.get(this);

        return h;
    }

    public SetFlow():void{
        this.isFlow = true;
    }
    public SetFull():void{
        this.isFlow = false;
    }

    private tweener:egret.Tween=null;
    public get pullInTweener():egret.Tween{return this.tweener;}

    public DealPullIn(duration:number){
        this.SetFlow();
        let realHeight = this.RealHeight;
        if (this.tweener == null)
        {
            this.tweener = egret.Tween.get(this);
            this.tweener.to({ "sizeY": realHeight }, duration*1000).call(()=>{
                 this.SetFull();
                 this.OnPullInDone();
                 this.tweener = null;
            },this);
        }
        else
        {
            egret.Tween.removeTweens(this);
            this.tweener = null;
            this.tweener = egret.Tween.get(this);
            this.tweener.to({ "sizeY": realHeight }, duration*1000).call(()=>{
                 this.SetFull();
                 this.OnPullInDone();
                 this.tweener = null;
            },this);
        }
    }

    private OnPullInDone():void{
        if(this.tube.onPullInComplete!=null){
            this.tube.onPullInComplete(this.tube);
        }
    }

    public SetHideTextActive(active:boolean):void{
        if(active){
            this.hideTxt.alpha=1;
        }else{
            this.hideTxt.alpha=0;
        }
    }

    public RefreshUI():void{
        this.SetSize(this.width,this.RealHeight);
    }

    public Destroy():void{
        this.water.mask = null;
        this.waterFlow.mask = null;
        this.hide.mask = null;
        this.parent.removeChild(this);
        this.removeChild(this.water);
        this.removeChild(this.waterFlow);
        if(this.hide!=null){
            this.removeChild(this.hide);
            delete this.hide;
            this.hide=null;
        }
        if(this.hideTxt!=null){
            this.removeChild(this.hideTxt);
            delete this.hideTxt;
            this.hideTxt=null;
        }
        delete this.water;
        delete this.waterFlow;
        this.water=null;
        this.waterFlow=null;
    }

}