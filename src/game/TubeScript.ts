enum PullDir{
    Left,
    Right
}

class TubeScript extends eui.Component {
    public tubeWidth:number = 80;//试管宽度
    public tubeHeight:number = 308;//试管高度
    public tubeSlash:number = 318;//试管斜线长度：根号（宽度*宽度+高度*高度）
    public waterWidth:number = 80;
    public waterHeight:number = 66;
    public tubeMouthWidth:number = 80;//试管瓶口宽度
    public flowLength:number = 450;//水流的高度
    public onPullInComplete:Function=null;

    public get MaxWaterNum():number{return 4;}

    private tubeBG:egret.Bitmap;//底图
    private waterContainer:egret.DisplayObjectContainer;//水的容器
    private waterMask:egret.Bitmap;//水的遮罩
    private waterFlow:egret.Bitmap;//水流
    private tubeFG:egret.Bitmap;//前景图

    private initDatas:number[];
    private _pullDir:PullDir=PullDir.Left;//倾倒方向
    private waterUIScripts:WaterScript[];
    private pullDir2Position:Dictionary;
    private pullDir2MouthPosition:Dictionary;
    private _startPullAngle:number;//开始倾倒时的水数量
    private _endPullAngle:number;//结束倾倒时的水数量
    private _isPullIn:boolean;
    private _isPullOut:boolean;
    
    //每个水对应的倾倒角度
    public get PullAngles():number[]{
        return [90,75,60,45,30];
    }
    public get pullDir():PullDir{return this._pullDir;}

    public get TopWaterData():WaterData{
        if(this.waterUIScripts==null||this.waterUIScripts.length==0){
            return null;
        }
        let len = this.waterUIScripts.length;
        return this.waterUIScripts[len-1].waterData;
    }

    public get TopWater():WaterScript{
        if(this.waterUIScripts==null||this.waterUIScripts.length==0){
            return null;
        }
                let len = this.waterUIScripts.length;
        return this.waterUIScripts[len-1];
    }

    private get CurTotalWaterNum():number{
        let num:number=0;
        if(this.waterUIScripts==null||this.waterUIScripts.length==0){
            return 0;
        }
        for (let i = 0; i < this.waterUIScripts.length; i++)
        {
            let waterData = this.waterUIScripts[i].waterData;
            num += waterData.num;
        }
        return num;
    }

    private PullTargetPos():Vector2{
        let x = this.x;
        let y = this.y;
        x+=this.waterWidth/2;
        y-=(this.flowLength - this.tubeHeight + 5);
        return new Vector2(x,y);
    }
 
    public constructor(){
        super();
        this.InitParams();
        this.InitUI();
    }

    private InitParams():void{
        this.tubeSlash = Math.sqrt(this.tubeWidth*this.tubeWidth+this.tubeHeight*this.tubeHeight);
        this.waterWidth = this.tubeHeight;
    }

    private InitUI():void{
        
    }

    public Init(waterDatas:WaterData[]):void{

    }

    private RefreshTubeType():void{
        let tubeId = PlayerData.Instance.curTubeID;
        let themeId = PlayerData.Instance.curThemeID;
        // DataConfig.Instance.GetDataByIndex("tube",)
    }


}