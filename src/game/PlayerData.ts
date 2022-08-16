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
    public curThemeID:number=18;
    public backNum:number=5;
    public newTubeNum:number=2;
    public tubes:number[]=[1];
    public themes:number[]=[15];
    public diamon:number=2000;
    public diamon2:number=0;//困难货币
    public curLevel:number=1;
    public curLevel2:number=1;//困难
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
        this.diamon2 = gameInfo.diamon2;
        this.curLevel = gameInfo.curLevel;
        this.curLevel2 = gameInfo.curLevel2;
        this.process = gameInfo.process;
    }

    public SetSettingInfo(settingInfo):void{
        this.bgmOn = settingInfo.bgmOn;
        this.soundOn = settingInfo.soundOn;
    }
    //保存
    public Save():void{
        let data = Object();
        data.noAds = this.noAds;
        data.curTubeID = this.curTubeID;
        data.curThemeID = this.curThemeID;
        data.backNum = this.backNum;
        data.newTubeNum = this.newTubeNum;
        data.tubes = this.tubes;
        data.themes = this.themes;
        data.diamon = this.diamon;
        data.diamon2 = this.diamon2;
        data.curLevel = this.curLevel;
        data.curLevel2 = this.curLevel2;
        data.process = this.process;
        WXUtil.Save(data);
    }

    public GetCurLevel(gameType:GameType){
        let level=1;
        if(gameType==GameType.Normal){
            level=this.curLevel;
        }else if(gameType==GameType.Difficult){
            level=this.curLevel2;
        }
        return level;
    }
    public GetDiamons(gameType:GameType):number{
        let diamon=0;
        if(gameType==GameType.Normal){
            diamon=this.diamon;
        }else if(gameType==GameType.Difficult){
            diamon=this.diamon2;
        }
        return diamon;
    }

    public CurLevelAdd(gameType:GameType){
        if(gameType==GameType.Normal){
            this.curLevel = this.curLevel + 1;
        }else if(gameType==GameType.Difficult){
            this.curLevel2 = this.curLevel2 + 1;
        }
        this.Save();
    }

    public isTubeContains(tubeId:number){
        if(this.tubes==null){return false;}
        if(this.tubes.length==0){return false;}
        let len = this.tubes.length;
        for(let i=0;i<len;i++){
            if(this.tubes[i]==tubeId){
                return true;
            }
        }
        return false;
    }

    public isThemeContains(themeId:number){
        if(this.themes==null){return false;}
        if(this.themes.length==0){return false;}
        let len = this.themes.length;
        for(let i=0;i<len;i++){
            if(this.themes[i]==themeId){
                return true;
            }
        }
        return false;
    }

    private DealEffect(effectType:number,num:number){
        if(effectType==1){//无广告
            this.noAds=true;
        }else if(effectType==2){//添加砖石
            this.diamon+=num;
        }else if(effectType==3){//添加道具A
            this.backNum+=num;
        }else if(effectType==4){//添加道具B
            this.newTubeNum+=num;
        }else if(effectType==5){//添加钻石2
            this.diamon2+=num;
        }else{
            console.error("unkown effectType");
        }
    }

    //购买商品TODO：需要去请求服务器
    public BuyItem(purchaseId:number):Promise<boolean>{
        var promise = new Promise<boolean>((resolve,reject) => {
            let cfg = DataConfig.Instance.GetDataByIndex("purchaser",purchaseId);
            if(cfg==null){
                GameUtil.ShowNotibox("未知的购买配置");
                resolve(false);
                return;
            }
            let costType:number=cfg.CostType;
            let cost:number=cfg.Cost;
            let effect:number=cfg.Effect;
            let effectNum:number=cfg.Num;
            if(costType==0){//看广告
                let succb =()=>{
                    this.DealEffect(effect,effectNum);
                    this.Save();
                    resolve(true);
                };
                let failcb =()=>{
                    resolve(false);
                };
                WXAdManager.Instance.ShowRewardAd2(succb,failcb);
            }else if(costType==1){
                //目前暂不支持RMB购买，未接入
                resolve(false);
            }else if(costType==2){//使用普通钻石购买
                if(this.diamon >= cost){
                    this.diamon-=cost;
                    this.DealEffect(effect,effectNum);
                    this.Save();
                    resolve(true);
                }else{
                    GameUtil.ShowNotibox("钻石不够，无法购买");
                    resolve(false);
                }
            }else if(costType==3){//使用困难钻石购买
                if(this.diamon2 >= cost){
                    this.diamon2-=cost;
                    this.DealEffect(effect,effectNum);
                    this.Save();
                    resolve(true);
                }else{
                    GameUtil.ShowNotibox("点券不够，无法购买");
                    resolve(false);
                }
            }else{
                GameUtil.ShowNotibox("未知的购买参数");
                resolve(false);
            }
            // http.get(url, res => {
            //     resolve(res);
            // });

        });
        return promise;
    }

    public BuyTube(tubeId:number,costType:number,costNum:number):boolean{
        if(this.isTubeContains(tubeId)){
            return false;
        }
        let diamonCount:number=0;//type为1是RMB
        if(costType==2){diamonCount=this.diamon;}
        if(costType==3){diamonCount=this.diamon2;}
        if(diamonCount<costNum){
            return false;
        }
        diamonCount-=costNum;
        if(costType==2){this.diamon=diamonCount;}
        if(costType==3){this.diamon2=diamonCount;}
        this.tubes.push(tubeId);
        this.curTubeID=tubeId;
        this.Save();
        return true;
    }

    public BuyTheme(themeId:number,costType:number,costNum:number):boolean{
        if(this.isThemeContains(themeId)){
            return false;
        }
        let diamonCount:number=0;//type为1是RMB
        if(costType==2){diamonCount=this.diamon;}
        if(costType==3){diamonCount=this.diamon2;}
        if(diamonCount<costNum){
            return false;
        }
        diamonCount-=costNum;
        if(costType==2){this.diamon=diamonCount;}
        if(costType==3){this.diamon2=diamonCount;}
        this.themes.push(themeId);
        this.curThemeID=themeId;
        this.Save();
        return true;
    }
    




}