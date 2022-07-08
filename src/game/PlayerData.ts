class PlayerData{
    private static _manager: PlayerData;
    public static get Instance() {
        if (PlayerData._manager == null) {
            PlayerData._manager = new PlayerData();
        }
        return PlayerData._manager;
    }

    private constructor() {
    }

    public userInfo;
    public noAds:boolean=false;
    public curTubeID:number=1;
    public curThemeID:number=6;
    public backNum:number=5;
    public newTubeNum:number=2;
    public tubes:number[]=[1];
    public themes:number[]=[1];
    public diamon:number=2000;
    public diamon2:number=0;//困难货币
    public diamon3:number=0;//炼狱货币
    public curLevel:number=501;
    public curLevel2:number=1;//困难
    public curLevel3:number=1;//炼狱
    public process:number=10;//宝箱进度(0-100)
    //配置信息
    public bgmOn:boolean=true;
    public soundOn:boolean=true;

    //设置用户数据
    public SetUserInfo(userInfo):void{
        this.userInfo = userInfo;
    }
    //设置游戏数据
    public SetGameInfo(gameInfo):void{
        this.noAds = gameInfo.noAds;
        this.curTubeID = gameInfo.curTubeID;
        this.curThemeID = gameInfo.curThemeID;
        this.backNum = gameInfo.backNum;
        this.newTubeNum = gameInfo.newTubeNum;
        this.tubes = gameInfo.tubes;
        this.themes = gameInfo.themes;
        this.diamon = gameInfo.diamon;
        this.curLevel = gameInfo.curLevel;
    }

    public SetSettingInfo(setInfo):void{
        
    }
    //保存进度
    public Save():void{

    }

    public GetCurLevel(gameType:GameType){
        let level=1;
        if(gameType==GameType.Normal){
            level=this.curLevel;
        }else if(gameType==GameType.Difficult){
            level=this.curLevel2;
        }else if(gameType==GameType.Purgatory){
            level=this.curLevel3;
        }
        return level;
    }

    public CurLevelAdd(gameType:GameType){
        if(gameType==GameType.Normal){
            this.curLevel = this.curLevel + 1;
        }else if(gameType==GameType.Difficult){
            this.curLevel2 = this.curLevel2 + 1;
        }else if(gameType==GameType.Purgatory){
            this.curLevel3 = this.curLevel3 + 1;
        }
        this.Save();
    }


}