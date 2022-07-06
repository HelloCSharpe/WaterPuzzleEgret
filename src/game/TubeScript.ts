enum PullDir{
    Left,
    Right
}

class TubeScript {
    public tubeWidth:number = 80;//试管宽度
    public tubeHeight:number = 308;//试管高度
    public tubeSlash:number = 318;//试管斜线长度：根号（宽度*宽度+高度*高度）
    public waterWidth:number = 80;
    public waterHeight:number = 66;
    public tubeMouthWidth:number = 80;//试管瓶口宽度
    public flowLength:number = 450;//水流的高度

    public get MaxWaterNum():number{return 4;}

    public onPullInComplete:Function=null;

    private initDatas:number[] = [];
    private _pullDir:PullDir=PullDir.Left;

    public get PullAngles():number[]{
        return [90,75,60,45,30];
    }

    public get pullDir():PullDir{return this._pullDir;}

    public constructor(){
        
    }


}