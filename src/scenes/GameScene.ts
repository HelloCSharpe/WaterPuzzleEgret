class GameOperate{
    public src:number;
    public tar:number;
    public clr:number;
    public num:number;
    public constructor(src:number,tar:number,clr:number,num:number){
        this.src=src;
        this.tar=tar;
        this.clr=clr;
        this.num=num;
    }
}

enum GameType{
    Normal=0,//普通，
    Difficult=1,//困难，给好看的试管底图
}

class GameScene extends Scene {

    private bg:egret.Bitmap;
    private diamonLayout:egret.DisplayObjectContainer;
    private levelTxt:egret.TextField;
    private pauseBtn:egret.Bitmap;
    private themeBtn:egret.Bitmap;
    private restartBtn:egret.DisplayObjectContainer;
    private backBtn:egret.DisplayObjectContainer;
    private backTxt:egret.TextField;
    private addBtn:egret.DisplayObjectContainer;
    private addTxt:egret.TextField;
    private tubeContainer:egret.DisplayObjectContainer;
    private isSun:boolean;
    private tubes:TubeScript[]=[];
    private curSelectTube:TubeScript=null;
    private operateStack:GameOperate[]=[];//行动堆栈
    private hasAddNewTube:boolean;
    private maskGo:egret.Bitmap;

    private gameType:GameType=GameType.Normal;
    private levelId:number=1;//当前关卡
    
    protected onComplete(...args:any[]) {
        this.InitParams(...args);
        this.InitBG();
        this.InitDiamons();
        this.InitLevelTxt();
        this.InitPauseBtn();
        this.InitTubeContainer();
        this.InitBottomBtn();
        this.InitMask();
        this.LoadLevel();
    }

    private InitParams(...args:any[]){
        if(args[0]!= null){
            if(args[0]==0){
                this.gameType=GameType.Normal;
            }else if(args[0]==1){
                this.gameType=GameType.Difficult;
            }
        }else{
            this.gameType=GameType.Normal;
        }
        if(args[1]!=null){
            this.levelId=args[1];
        }else{
            this.levelId=PlayerData.Instance.GetCurLevel(this.gameType);
        }
    }

    private InitBG():void{
        let themeId = PlayerData.Instance.curThemeID;
        let themeData = DataConfig.Instance.GetDataByIndex("theme",themeId);
        let resName = themeData==null?"bg_1_png":themeData.bgSprite;
        if(this.bg==null){
            this.bg = this.createBitmapByName(resName);
            this.bg.fillMode = egret.BitmapFillMode.SCALE;
            this.bg.width = SceneManager.ScreenWidth;
            this.bg.height = SceneManager.ScreenHeight;
            this.addChild(this.bg);
        }else{
            let texture: egret.Texture = RES.getRes(resName);
            this.bg.texture=texture;
        }

    }
    private InitDiamons():void{
        let diamonResName="icon1_png";
        if(this.gameType==GameType.Normal){
            diamonResName="icon1_png";
        }else if(this.gameType==GameType.Difficult){
            diamonResName="icon10_png";
        }
        let num = PlayerData.Instance.GetDiamons(this.gameType);
        
        if (this.diamonLayout==null){
            this.diamonLayout=GameUtil.createDiamonLayout(diamonResName,num);
            this.diamonLayout.x=30;
            this.diamonLayout.y=30;
            this.addChild(this.diamonLayout);
        }else{
            GameUtil.changeDiamonIconAndNum(this.diamonLayout,diamonResName,num);
        }
    }

    private InitLevelTxt():void{
        let s = "LEVEL "+String(this.levelId);
        if(this.levelTxt==null){
            this.levelTxt=this.createTextField(300,60,0xFFFFFF,30,s);
            this.levelTxt.textAlign = egret.HorizontalAlign.CENTER;
            this.levelTxt.x=SceneManager.ScreenWidth/2-this.levelTxt.width/2;
            this.levelTxt.y=30;
            this.addChild(this.levelTxt);
        }else{
            this.levelTxt.text=s;
        }
    }

    private InitPauseBtn():void{
        let themeId = PlayerData.Instance.curThemeID;
        let themeData = DataConfig.Instance.GetDataByIndex("theme",themeId);
        let resName:string="sun_png";
        this.isSun=true;
        if(themeData!=null && themeData.tubeFgIndex==1){//阳光
            resName="moon_png";
            this.isSun=false;
        }
        if(this.pauseBtn==null){
            let topOffset=70;//距离顶部的高度
            this.pauseBtn = this.createBitmapByName("btn3_png");
            this.pauseBtn.fillMode=egret.BitmapFillMode.SCALE;
            this.pauseBtn.width=60;
            this.pauseBtn.height=60;
            this.pauseBtn.x=SceneManager.ScreenWidth-this.pauseBtn.width-30;
            this.pauseBtn.y=topOffset;
            this.addChild(this.pauseBtn);

            this.themeBtn = this.createBitmapByName(resName);
            this.themeBtn.fillMode = egret.BitmapFillMode.SCALE;
            this.themeBtn.width=256/4;
            this.themeBtn.height=360/4;
            this.themeBtn.x=SceneManager.ScreenWidth-this.themeBtn.width;
            this.themeBtn.y=this.pauseBtn.y+this.pauseBtn.height;
            this.addChild(this.themeBtn);
        }else{
            this.themeBtn.texture=RES.getRes(resName);
        }


    }
    private InitBottomBtn():void{
        if(this.restartBtn!=null){
            this.backTxt.text=String(PlayerData.Instance.backNum);
            this.addTxt.text=String(PlayerData.Instance.newTubeNum);
            if(this.gameType==GameType.Normal){
                if(this.getChildByName("addBtn")==null){
                    this.addChild(this.addBtn);
                }
            }else{
                if(this.getChildByName("addBtn")!=null){
                    this.removeChild(this.addBtn);
                }
            }
            return;
        }
        let offsetX = SceneManager.ScreenWidth/4;
        let btnWidth = 120;
        let btnHeight = 80;
        for(let i=0;i<3;i++){
            let resName=i<2?"btn1_png":"btn2_png";
            let bottomBtn=this.createButton(resName,btnWidth,btnHeight);
            bottomBtn.anchorOffsetX=bottomBtn.width/2;
            bottomBtn.anchorOffsetY=bottomBtn.height/2;
            bottomBtn.x=offsetX*(i+1);
            bottomBtn.y=SceneManager.ScreenHeight-240;
            this.addChild(bottomBtn);
            if(i==0){//restartBtn
                let restartIcon=this.createBitmapByName("tag1_png");
                restartIcon.fillMode = egret.BitmapFillMode.SCALE;
                restartIcon.width=84*0.6;
                restartIcon.height=80*0.6;
                restartIcon.anchorOffsetX=restartIcon.width/2;
                restartIcon.anchorOffsetY=restartIcon.height/2;
                restartIcon.x=btnWidth/2;
                restartIcon.y=btnHeight/2;
                bottomBtn.addChild(restartIcon);
                this.restartBtn=bottomBtn;
            }else if(i==1){//backBtn
                let backIcon=this.createBitmapByName("tag2_png");
                backIcon.fillMode = egret.BitmapFillMode.SCALE;
                backIcon.width=84*0.6;
                backIcon.height=80*0.6;
                backIcon.anchorOffsetX=backIcon.width/2;
                backIcon.anchorOffsetY=backIcon.height/2;
                backIcon.x=btnWidth/2-20;
                backIcon.y=btnHeight/2;
                bottomBtn.addChild(backIcon);
                let backNumStr=String(PlayerData.Instance.backNum);
                let backTxt=this.createTextField(btnWidth/2-10,btnHeight,0x3C0C0C,30,backNumStr);
                backTxt.x=btnWidth/2+10;
                bottomBtn.addChild(backTxt);
                this.backBtn=bottomBtn;
                this.backTxt=backTxt;
            }else{//addBtn
                let addIcon=this.createBitmapByName("tag3_png");
                addIcon.fillMode = egret.BitmapFillMode.SCALE;
                addIcon.width=84*0.6;
                addIcon.height=80*0.6;
                addIcon.anchorOffsetX=addIcon.width/2;
                addIcon.anchorOffsetY=addIcon.height/2;
                addIcon.x=btnWidth/2-20;
                addIcon.y=btnHeight/2;
                bottomBtn.addChild(addIcon);
                bottomBtn.name="addBtn";
                let str=String(PlayerData.Instance.newTubeNum);
                let addTxt=this.createTextField(btnWidth/2-10,btnHeight,0xFFFFFF,30,str);
                addTxt.x=btnWidth/2+10;
                bottomBtn.addChild(addTxt);
                this.addBtn=bottomBtn;
                this.addTxt=addTxt;
            }
        }
        if(this.gameType==GameType.Normal){
            if(this.getChildByName("addBtn")==null){
                this.addChild(this.addBtn);
            }
        }else{
            if(this.getChildByName("addBtn")!=null){
                this.removeChild(this.addBtn);
            }
        }

    }

    private InitTubeContainer():void{
        if(this.tubeContainer!=null){
            return;
        }
        let topOffset=220;
        let bottomOffset=280;
        let tubeContainer=new egret.DisplayObjectContainer();
        tubeContainer.width=SceneManager.ScreenWidth;
        tubeContainer.height=SceneManager.ScreenHeight-topOffset-bottomOffset;
        tubeContainer.x=0;
        tubeContainer.y=topOffset;
        this.tubeContainer=tubeContainer;
        this.addChild(tubeContainer);
    }

    private isSetChild:boolean=false;
    private InitMask(){
        let maskGo=this.createBitmapByName("white_jpg");
        Utility.setImageColor(maskGo,0x000000);
        maskGo.alpha=0.4;
        maskGo.width=SceneManager.ScreenWidth;
        maskGo.height=SceneManager.ScreenHeight;
        maskGo.touchEnabled=true;
        this.maskGo=maskGo;
        this.isSetChild=false;
    }

    private SetMask(active:boolean){
        if(active){
            if(this.isSetChild){return;}
            this.addChild(this.maskGo);
            this.isSetChild=true;
        }else{
            if(!this.isSetChild){return;}
            this.removeChild(this.maskGo);
            this.isSetChild=false;
        }
    }

    private LoadLevel():void{
        this.SetMask(false);
        if(this.operateStack.length>0){
            let len = this.operateStack.length;
            for(let i=len-1;i>=0;i--){
                delete this.operateStack[i];
            }
            this.operateStack=[];
        }
        this.curSelectTube=null;
        this.hasAddNewTube=false;

        let levelId = this.levelId;
        let type = this.gameType;//根据type去加载对应的关卡信息
        let levelCfg = DataConfig.Instance.GetDataByIndex("level",levelId);
        while(levelCfg==null){
            levelId-=1;
            levelCfg = DataConfig.Instance.GetDataByIndex("level",levelId);
        }
        this.ClearTubes();
        let levelDatas:WaterData[][]=GameUtil.ParseLevelCfg(levelCfg.Config);
        this.InitTubes(levelDatas);
        this.SetTubesPostion();
        let s = "LEVEL "+String(this.levelId);
        this.levelTxt.text=s;
    }

    private ClearTubes():void{
        this.tubeContainer.removeChildren();
        let len = this.tubes.length;
        for(let i=len-1;i>=0;i--){
            this.tubes[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tubes[i].tubeClickFunc, this)
            this.tubes[i].Destroy();
            delete this.tubes[i];
        }
        this.tubes=[];
    }

    private InitTube(waterDatas:WaterData[],i:number){
        let tube:TubeScript = new TubeScript();
        tube.name=String(i);
        tube.Init(waterDatas);//位置等到全部实例化完成后再统一设置位置
        let clickFunc = this.OnTubeClick.bind(this,i);
        tube.addEventListener(egret.TouchEvent.TOUCH_TAP, clickFunc, this);
        tube.tubeClickFunc = clickFunc;
        tube.SetPullInComplete(this.OnTubePullInComplete,this);
        this.tubeContainer.addChild(tube);
        this.tubes.push(tube);
    }

    private InitTubes(levelDatas:WaterData[][]):void{
        let len = levelDatas.length;
        for(let i=0;i<len;i++){
            let waterDatas:WaterData[]=levelDatas[i];
            this.InitTube(waterDatas,i);
        }
    }

    private SetTubesPostion(){
        let len = this.tubes.length;
        if(len<5){
            //单行
            let unitWidth=this.tubeContainer.width/len;
            let unitHeight=this.tubeContainer.height;
            for(let i=0;i<len;i++){
                let tube:TubeScript=this.tubes[i];
                let x=unitWidth*i+unitWidth/2-tube.tubeWidth/2;
                let y=unitHeight/2-tube.tubeHeight/2;
                tube.SetPosition(x,y);
                tube.y=y;
            }
        }else{
            //多行
            let topNum:number=Math.ceil(len/2);
            let bottomNum:number=len-topNum;
            for(let i=0;i<len;i++){
                let tube:TubeScript=this.tubes[i];
                if(i<topNum){
                    let unitWidth=this.tubeContainer.width/topNum;
                    let unitHeight=this.tubeContainer.height/2;
                    let x=unitWidth*i+unitWidth/2-tube.tubeWidth/2;
                    let y=unitHeight/2-tube.tubeHeight/2;
                    tube.SetPosition(x,y);
                }else{
                    let unitWidth=this.tubeContainer.width/bottomNum;
                    let unitHeight=this.tubeContainer.height/2;
                    let x=unitWidth*(i-topNum)+unitWidth/2-tube.tubeWidth/2;
                    let y=this.tubeContainer.height/2+unitHeight/2-tube.tubeHeight/2;
                    tube.SetPosition(x,y);
                }
            }
        }
    }

    private OnTubePullInComplete(tube:TubeScript){
        if (tube.CheckOneWaterFull())   
        {
            // tube.Shack(0.7f, 4);
            tube.PlayOneWaterFullEffect();//礼花特效
            AudioManager.Instance.PlaySound("complete_mp3");
        }

        if (this.CheckLevelComplete())
        {
            this.LevelComplete();
        }
    }

    private CheckLevelComplete():boolean{
        for (let i = 0; i < this.tubes.length; i++)
        {
            let tube = this.tubes[i];
            if (tube.CheckIsOneWaterFullOrEmpty() == false)
            {
                return false;
            }
        }
        return true;
    }
    private intervalInt:number;
    private LevelComplete():void{
        this.SetMask(true);
        
        this.intervalInt = egret.setInterval(() => {
            SceneManager.Instance.pushScene("ResultScene",this.gameType,this.levelId);
            egret.clearInterval(this.intervalInt);
        },this,1000);
    }

    private OnTubeClick(index:number):void{
        let tube:TubeScript=this.tubes[index];
        if(this.curSelectTube==null){
            if(tube.canSelect()){
                if (tube.Select())
                {
                    this.curSelectTube = tube;
                }
            }
        }else{
            if (this.curSelectTube == tube)
            {
                if (this.curSelectTube.UnSelect())
                {
                    this.curSelectTube = null;
                }
            }
            else
            {
                if (this.curSelectTube.canPull(tube))
                {
                    this.RecordPullOperate(this.curSelectTube, tube);
                    this.curSelectTube.Pull(tube);
                    this.curSelectTube = null;
                }
                else
                {
                    // if (Settings.Shack)
                    // {
                    //     this.curSelectTube.Shack(0.2);
                    // }
                    if (this.curSelectTube.UnSelect())
                    {
                        this.curSelectTube = null;
                    }
                }
            }
        }
    }

    private RecordPullOperate(source:TubeScript,target:TubeScript):void
    {
        let waterData:WaterData = source.TopWaterData;
        let pullNum:number=source.canPullNum(target);
        let sourceIndex:number = Number(source.name);
        let targetIndex:number = Number(target.name);
        let operate:GameOperate = new GameOperate(sourceIndex,targetIndex,waterData.colorInt,pullNum);
        this.operateStack.push(operate);
    }

    public Update() {

    }

    public addListener() {
        this.diamonLayout.touchEnabled=true;
        this.diamonLayout.addEventListener(egret.TouchEvent.TOUCH_TAP, this.diamonClick, this);
        Utility.ButtonActive2(this.pauseBtn,true);
        this.pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pauseClick, this);
        this.themeBtn.touchEnabled=true;
        this.themeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.themeClick, this);
        Utility.ButtonActive(this.restartBtn,true);
        this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartClick, this);
        Utility.ButtonActive(this.backBtn,true);
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backClick, this);
        Utility.ButtonActive(this.addBtn,true);
        this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addTubeClick, this);

        EventCenter.AddListener(EventID.RefreshLevel,this.OnRefreshLevel,this);
        EventCenter.AddListener(EventID.ThemeChanged,this.OnThemeChanged,this);
    }
    public removeListener() {
        this.diamonLayout.touchEnabled=false;
        this.diamonLayout.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.diamonClick, this);
        Utility.ButtonActive2(this.pauseBtn,false);
        this.pauseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pauseClick, this);
        this.themeBtn.touchEnabled=false;
        this.themeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.themeClick, this);
        Utility.ButtonActive(this.restartBtn,false);
        this.restartBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.restartClick, this);
        Utility.ButtonActive(this.backBtn,false);
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backClick, this);
        Utility.ButtonActive(this.addBtn,false);
        this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addTubeClick, this);

        EventCenter.RemoveListener(EventID.RefreshLevel,this.OnRefreshLevel,this);
        EventCenter.RemoveListener(EventID.ThemeChanged,this.OnThemeChanged,this);
    }

    private diamonClick():void{
        SceneManager.Instance.pushScene("ShopScene");
    }
    private pauseClick():void{
        SceneManager.Instance.pushScene("PauseScene");
    }
    private themeClick():void{
        if(this.isSun){
            this.themeBtn.texture=RES.getRes("moon_png");
            this.isSun=false;
        }else{
            this.themeBtn.texture=RES.getRes("sun_png");
            this.isSun=true;
        }
        EventCenter.Notify(EventID.ThemeBtnClicked,this.isSun);
    }
    private restartClick():void{
        this.LoadLevel();
    }
    private async backClick():Promise<void>{
        let backNum=PlayerData.Instance.backNum;
        if(backNum<=0){
            let result = await WXAdManager.Instance.ShowRewardAd();
            if (result==true){
                PlayerData.Instance.backNum=5;
                PlayerData.Instance.Save();
            }else{
                Utility.showNotiBox("看广告可增加5个回退道具");
            }
            return;
        }
        if(this.operateStack.length==0){
            return;
        }
        backNum-=1;
        PlayerData.Instance.backNum=backNum;
        PlayerData.Instance.Save();
        this.backTxt.text=String(backNum);
        //执行具体内容
        let operate = this.operateStack.pop();
        let sourceIndex = operate.src;
        let targetIndex = operate.tar;
        this.tubes[sourceIndex].AddWaterByBackOperate(operate.clr, operate.num);
        this.tubes[targetIndex].RemoveWaterByBackOperate(operate.clr, operate.num);
        
    }
    private async addTubeClick():Promise<void>{
        let newTubeNum=PlayerData.Instance.newTubeNum;
        if(newTubeNum<=0){
            let result = await WXAdManager.Instance.ShowRewardAd();
            if (result==true){
                PlayerData.Instance.newTubeNum=1;
                PlayerData.Instance.Save();
            }else{
                Utility.showNotiBox("看广告可增加1个试管道具");
            }
            return;
        }
        if(this.hasAddNewTube){
            return;
        }
        this.hasAddNewTube=true;
        newTubeNum-=1;
        PlayerData.Instance.newTubeNum=newTubeNum;
        PlayerData.Instance.Save();
        this.addTxt.text=String(newTubeNum);
        //执行具体内容
        let waterDatas:WaterData[]=[];
        let i=this.tubes.length;
        this.InitTube(waterDatas,i);
        this.SetTubesPostion();
    }

    private OnRefreshLevel(...args:any[]){
        this.gameType=args[0];
        this.levelId=args[1];
        this.InitDiamons();
        this.LoadLevel();
    }
    private OnThemeChanged(...args:any[]){
        this.InitBG();
    }
}