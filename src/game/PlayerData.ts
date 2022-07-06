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
    public curThemeID:number=1;
    public backNum:number=5;
    public newTubeNum:number=2;
    public tubes:number[]=[1];
    public themes:number[]=[1];
    public diamon:number=2000;

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
    }
    //保存进度
    public Save():void{

    }


}