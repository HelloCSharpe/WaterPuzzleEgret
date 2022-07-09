class ResultScene extends Scene {
    private bg:egret.Bitmap;
    private processTxt:egret.TextField;
    private processTr:egret.Bitmap;
    private processContainer:egret.DisplayObjectContainer;
    private levelTxt:egret.TextField;
    private zhuanpanContainer:egret.DisplayObjectContainer;
    private zhizhen:egret.Bitmap;
    private adsBtn:egret.DisplayObjectContainer;
    private nextBtn:egret.DisplayObjectContainer;
    private adsTxt:egret.TextField;
    
    private gameType:GameType;
    private completeLevel:number;
    private isNewComplete:boolean=false;
    private oldProcess:number;
    private newProcess:number;
    private diamonNum:number;

    private angles:number[]=[6,15.2,24];
    private curAngle:number=0;
    private speedV:number=3.3;//速度阈值
    private dir:number=1;//方向
    private minSpeed:number=18;//50V 38V 31V 25V 19V 12V 0V
    private isClickAds:boolean=false;
    private isPlayAnim:boolean=false;

    protected onComplete(...args:any[]){
        this.gameType=args[0];
        this.completeLevel=args[1];
        this.Cal();
        this.InitBG();
        this.InitProcess();
        this.InitLevelTxt();
        this.InitNextBtn();
        this.InitZhuanPan();
        this.PlayTween();
    }

    private InitBG(){
        if(this.bg==null){
            this.bg = this.createBitmapByName("bg_1_png");
            this.bg.fillMode = egret.BitmapFillMode.SCALE;
            this.bg.width = SceneManager.ScreenWidth;
            this.bg.height = SceneManager.ScreenHeight;
            this.addChild(this.bg);
        }
    }

    private Cal(){
        let oldLevel = PlayerData.Instance.GetCurLevel(this.gameType);
        let curLevel = this.completeLevel;
        if(curLevel>=oldLevel){
            this.isNewComplete=true;
            this.oldProcess=PlayerData.Instance.process;
            this.newProcess=this.oldProcess+10;
            PlayerData.Instance.process=this.newProcess;
            PlayerData.Instance.CurLevelAdd(this.gameType);
        }else{
            this.isNewComplete=false;
            this.oldProcess=PlayerData.Instance.process;
            this.newProcess=this.oldProcess;
        }
    }

    private InitProcess(){
        if (this.processContainer==null){
            let sldWidth=SceneManager.ScreenWidth/2;
            let sldHeight=36;
            this.processContainer=this.createButton("process2_png",sldWidth,sldHeight);
            this.processContainer.anchorOffsetX=this.processContainer.width/2;
            this.processContainer.anchorOffsetY=this.processContainer.height/2;
            this.processContainer.x=SceneManager.ScreenWidth/2;
            this.processContainer.y=240;
            this.addChild(this.processContainer);
            this.processTr=this.createBitmapByName("process1_png");
            this.processTr.fillMode=egret.BitmapFillMode.SCALE;
            this.processTr.width=72;
            this.processTr.height=36;
            this.processContainer.addChild(this.processTr);
            let chestIcon = this.createBitmapByName("chest_png");
            chestIcon.fillMode=egret.BitmapFillMode.SCALE;
            chestIcon.width=100;
            chestIcon.height=100;
            chestIcon.x=sldWidth-chestIcon.width/2;
            chestIcon.y=-chestIcon.height/2+10;
            this.processContainer.addChild(chestIcon);
            this.processTxt=this.createTextField(sldWidth,sldHeight,0xFFFFFF,24,`${this.oldProcess}%`);
            this.processTxt.textAlign =egret.HorizontalAlign.CENTER;
            this.processContainer.addChild(this.processTxt);
        }
        this.ProcessChanged(this.oldProcess);
    }

    private ProcessChanged(value:number){
        value=Math.ceil(value);
        value=Math.min(100,value);
        this.processTxt.text=`${value}%`;
        this.processTr.width=Math.max(60,this.processContainer.width/100*value);
    }

    private DoProcess(){
        if(this.isNewComplete){
            Utility.Float(this.oldProcess,this.newProcess,500,this.ProcessChanged,this);
        }
    }

    private InitLevelTxt(){
        if(this.levelTxt==null){
            let w=SceneManager.ScreenWidth/2;
            let h=80;
            this.levelTxt=this.createTextField(w,h,0xFFFFFF,46);
            this.levelTxt.textAlign=egret.HorizontalAlign.CENTER;
            this.levelTxt.anchorOffsetX=w/2;
            this.levelTxt.anchorOffsetY=h/2;
            this.levelTxt.x=SceneManager.ScreenWidth/2;
            this.levelTxt.y=360;
            this.addChild(this.levelTxt);
        }
        this.levelTxt.text=`关卡${this.completeLevel}完成!`;
    }

    private InitNextBtn(){
        if(this.nextBtn==null){
            let w=200;
            let h=100;
            this.nextBtn=this.createButton("empty_png",w,h,true);
            this.nextBtn.x=SceneManager.ScreenWidth/2;
            this.nextBtn.y=SceneManager.ScreenHeight-240;
            let nextTxt=this.createTextField(w,h,0xFFFFFF,32,"点击继续");
            nextTxt.textAlign=egret.HorizontalAlign.CENTER;
            nextTxt.y=-5;
            this.nextBtn.addChild(nextTxt);
            this.addChild(this.nextBtn);
        }
    }

    private InitZhuanPan(){
        if(this.zhuanpanContainer==null){
            let paddingTop=this.levelTxt.y+this.levelTxt.height/2;
            let paddingBottom=240+this.nextBtn.height/2;
            this.zhuanpanContainer=new egret.DisplayObjectContainer();
            this.zhuanpanContainer.name="zhuanpanContainer";
            this.zhuanpanContainer.width=SceneManager.ScreenWidth;
            this.zhuanpanContainer.height=SceneManager.ScreenHeight-paddingTop-paddingBottom;
            this.zhuanpanContainer.anchorOffsetX=SceneManager.ScreenWidth/2;
            this.zhuanpanContainer.anchorOffsetY=this.zhuanpanContainer.height/2;
            this.zhuanpanContainer.x=SceneManager.ScreenWidth/2;
            this.zhuanpanContainer.y=paddingTop+this.zhuanpanContainer.height/2;
            let zhuanpan=this.createBitmapByName("zhuanpan_png");
            zhuanpan.width=558;
            zhuanpan.height=162;
            zhuanpan.anchorOffsetX=zhuanpan.width/2;
            zhuanpan.anchorOffsetY=zhuanpan.height/2;
            zhuanpan.x=SceneManager.ScreenWidth/2;
            zhuanpan.y=140;
            this.zhuanpanContainer.addChild(zhuanpan);
            this.zhizhen=this.createBitmapByName("zhizhen_png");
            this.zhizhen.width=138*0.4;
            this.zhizhen.height=200*0.4;
            this.zhizhen.anchorOffsetX=this.zhizhen.width/2;
            this.zhizhen.anchorOffsetY=600;
            this.zhizhen.x=SceneManager.ScreenWidth/2;
            this.zhizhen.y=740;
            this.zhuanpanContainer.addChild(this.zhizhen);
            this.adsBtn=this.createButton("btn2_png",400,130,true);
            this.adsBtn.x=SceneManager.ScreenWidth/2;
            this.adsBtn.y=this.zhuanpanContainer.height-100;
            this.zhuanpanContainer.addChild(this.adsBtn);
            
            let offsetX=75;
            let offsetY=5;
            this.adsTxt=this.createTextField(this.adsBtn.width,this.adsBtn.height,0xFFFFFF,50,"200");
            this.adsTxt.textAlign=egret.HorizontalAlign.CENTER;
            this.adsTxt.anchorOffsetX=this.adsTxt.width/2;
            this.adsTxt.anchorOffsetY=this.adsTxt.height/2;
            this.adsTxt.x=this.adsTxt.width/2;
            this.adsTxt.y=this.adsTxt.height/2-offsetY;
            this.adsBtn.addChild(this.adsTxt);
            let adsIcon=this.createBitmapByName("js_ad_png",60,66,true);
            adsIcon.x=offsetX;
            adsIcon.y=this.adsBtn.height/2-offsetY;
            this.adsBtn.addChild(adsIcon);

            let diamonIcon=this.createBitmapByName("icon1_png",90,90,true);
            diamonIcon.x=this.adsBtn.width-offsetX;
            diamonIcon.y=this.adsBtn.height/2-offsetY;
            this.adsBtn.addChild(diamonIcon);
        }
        if(this.isNewComplete){
            if(this.getChildByName("zhuanpanContainer")==null){
                this.addChild(this.zhuanpanContainer);
            }
        }else{
            if(this.getChildByName("zhuanpanContainer")!=null){
                this.removeChild(this.zhuanpanContainer);
            }
        }
    }

    private DoZhuanPanRotate():void{
        if(this.isClickAds){
            return;
        }
        if(this.isNewComplete){
            //动态算速度
            let speed = Math.abs(this.angles[2]*this.dir-this.curAngle)*this.speedV;
            //速度：最大angles[2]*2*speedV,中间angles[2]*speedV

            if(speed<this.minSpeed*this.speedV){
                speed=this.minSpeed*this.speedV;
            }
            this.curAngle+=this.dir*speed*0.02;
            this.zhizhen.rotation=this.curAngle;
            let angle=Math.abs(this.curAngle);
            if(angle<=this.angles[0]){
                this.SetMultiple(5);
            }else if(angle<=this.angles[1]){
                this.SetMultiple(3);
            }else if (angle<=this.angles[2]){
                this.SetMultiple(2);
            }else{
                this.dir*=-1;
            }
        }
    }

    private SetMultiple(mul:number){
        this.diamonNum=40*mul;
        this.adsTxt.text=`${this.diamonNum}`;
        // this.levelTxt.text=`${this.curAngle}`;
    }

    private SetScale(obj:egret.DisplayObject,waitTime:number,duration:number):egret.Tween{
        obj.scaleX=0;
        obj.scaleY=0;
        return egret.Tween.get(obj).wait(waitTime).to({"scaleX":1,"scaleY":1},duration,egret.Ease.backOut);
    }

    private PlayTween(){
        this.isClickAds=false;
        this.isPlayAnim=true;
        // this.DoProcess();
        let _wait=0;
        let offset=200;
        let time=400;
        this.SetScale(this.processContainer,_wait+=offset,time);
        this.SetScale(this.levelTxt,_wait+=offset,time).call(()=>{
            this.DoProcess();
        },this);
        if(this.isNewComplete){
            this.SetScale(this.zhuanpanContainer,_wait+=offset,time);
        }
        this.SetScale(this.nextBtn,_wait+=offset,time).call(()=>{
            this.isPlayAnim=false;
        },this);

    }
    

    public Update(){
        this.DoZhuanPanRotate();
    }
    public addListener(){
        this.bg.touchEnabled=true;
        this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgClick, this);
        Utility.ButtonActive(this.nextBtn,true);
        Utility.ButtonActive(this.adsBtn,true);
        this.adsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.adsBtnClick, this);
        Utility.ButtonActive(this.nextBtn,true);
        this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextBtnClick, this);
    }
    public removeListener(){
        this.bg.touchEnabled=false;
        this.bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bgClick, this);
        Utility.ButtonActive(this.adsBtn,false);
        this.adsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.adsBtnClick, this);
        Utility.ButtonActive(this.nextBtn,false);
        this.nextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.nextBtnClick, this);
    }

    private bgClick(){
        this.nextBtnClick();
    }

    private adsBtnClick(){
        if(this.isPlayAnim){
            return;
        }
        //TODO:播放广告
        this.isClickAds=true;
        // this.isNewComplete=!this.isNewComplete;
    }
    private nextBtnClick(){
        if(this.isPlayAnim){
            return;
        }
        
        if(this.newProcess>=100){
            let level = PlayerData.Instance.GetCurLevel(this.gameType);
            SceneManager.Instance.pushScene("DrawScene",this.gameType,level);
        }else{
            SceneManager.Instance.popScene();
            let level = PlayerData.Instance.GetCurLevel(this.gameType);
            EventCenter.Notify(EventID.RefreshLevel,this.gameType,level);
        }
    }
}