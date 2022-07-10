class PauseScene extends Scene {
    private bg:egret.Bitmap;
    private panel:egret.DisplayObjectContainer;

    private helpBtn:egret.DisplayObjectContainer;

    private bgmOnBtn:egret.DisplayObjectContainer;
    private bgmOffBtn:egret.DisplayObjectContainer;
    private soundOnBtn:egret.DisplayObjectContainer;
    private soundOffBtn:egret.DisplayObjectContainer;
    private menuBtn:egret.DisplayObjectContainer;
    private homeBtn:egret.DisplayObjectContainer;

    private skinBtn:egret.DisplayObjectContainer;
    private resumeBtn:egret.DisplayObjectContainer;


    
    protected onComplete(...args:any[]){
        this.InitBG();
        this.InitPanel();
        this.InitHelpBtn();
        this.PlayTween();
    }

    private InitBG(){
        if(this.bg==null){
            this.bg = this.createBitmapByName("mask_png");
            this.bg.fillMode = egret.BitmapFillMode.SCALE;
            this.bg.width = SceneManager.ScreenWidth;
            this.bg.height = SceneManager.ScreenHeight;
            this.addChild(this.bg);
        }
    }

    private InitPanel(){
        let bgmIsOn:boolean=PlayerData.Instance.bgmOn;
        let soundIsOn:boolean=PlayerData.Instance.soundOn;
        if(this.panel==null){
            this.panel=new egret.DisplayObjectContainer();
            this.panel.width=SceneManager.ScreenWidth-80;
            this.panel.height=260;
            this.panel.anchorOffsetX=this.panel.width/2;
            this.panel.anchorOffsetY=this.panel.height/2;
            this.panel.x=SceneManager.ScreenWidth/2;
            this.panel.y=SceneManager.ScreenHeight/2;
            this.addChild(this.panel);
            let panelBG=this.createBitmapByName("di2_png");
            panelBG.fillMode=egret.BitmapFillMode.SCALE;
            panelBG.width=this.panel.width;
            panelBG.height=this.panel.height;
            this.panel.addChild(panelBG);
            //顶部4个按钮
            let offset=this.panel.width/4;
            let btnWidth=this.panel.width/6;
            let paddingLeft=offset/2-btnWidth/2;
            let paddingTop=this.panel.height/4-btnWidth/2+10;
            this.bgmOnBtn=this.createButton("bgm_on_png",btnWidth,btnWidth);
            this.bgmOnBtn.name="bgmOnBtn";
            this.bgmOnBtn.x=paddingLeft;
            this.bgmOnBtn.y=paddingTop;
            this.bgmOffBtn=this.createButton("bgm_off_png",btnWidth,btnWidth);
            this.bgmOffBtn.name="bgmOffBtn";
            this.bgmOffBtn.x=paddingLeft;
            this.bgmOffBtn.y=paddingTop;
            this.soundOnBtn=this.createButton("sound_on_png",btnWidth,btnWidth);
            this.soundOnBtn.name="soundOnBtn";
            this.soundOnBtn.x=paddingLeft+offset;
            this.soundOnBtn.y=paddingTop;
            this.soundOffBtn=this.createButton("sound_off_png",btnWidth,btnWidth);
            this.soundOffBtn.name="soundOffBtn";
            this.soundOffBtn.x=paddingLeft+offset;
            this.soundOffBtn.y=paddingTop;
            this.menuBtn=this.createButton("menu2_png",btnWidth,btnWidth);
            this.menuBtn.x=paddingLeft+offset*2;
            this.menuBtn.y=paddingTop;
            this.panel.addChild(this.menuBtn);
            this.homeBtn=this.createButton("home_png",btnWidth,btnWidth);
            this.homeBtn.x=paddingLeft+offset*3;
            this.homeBtn.y=paddingTop;
            this.panel.addChild(this.homeBtn);
            if(bgmIsOn){
                this.panel.addChild(this.bgmOnBtn);
            }else{
                this.panel.addChild(this.bgmOffBtn);
            }
            if(soundIsOn){
                this.panel.addChild(this.soundOnBtn);
            }else{
                this.panel.addChild(this.soundOffBtn);
            }
            //底部2个按钮
            paddingLeft=20;
            paddingTop=20;
            offset=this.panel.width/2;
            btnWidth=offset-paddingLeft*2;
            let btnHeight=this.panel.height/2-paddingTop*2;
            this.skinBtn=this.createButton("zt_anniu_png",btnWidth,btnHeight);
            this.skinBtn.x=paddingLeft;
            this.skinBtn.y=this.panel.height/2+paddingTop;
            let iconSize=78*0.7;
            let skinIcon = this.createBitmapByName("pause_icon2_png");
            skinIcon.fillMode = egret.BitmapFillMode.SCALE;
            skinIcon.width=iconSize;
            skinIcon.height=iconSize;
            skinIcon.anchorOffsetX=skinIcon.width/2;
            skinIcon.anchorOffsetY=skinIcon.height/2;
            skinIcon.x=this.skinBtn.width/2;
            skinIcon.y=this.skinBtn.height/2;
            this.skinBtn.addChild(skinIcon);
            this.panel.addChild(this.skinBtn);
            this.resumeBtn=this.createButton("zt_anniu_png",btnWidth,btnHeight);
            this.resumeBtn.x=paddingLeft+offset;
            this.resumeBtn.y=this.panel.height/2+paddingTop;
            let resumeIcon = this.createBitmapByName("pause_icon1_png");
            resumeIcon.fillMode = egret.BitmapFillMode.SCALE;
            resumeIcon.width=iconSize;
            resumeIcon.height=iconSize;
            resumeIcon.anchorOffsetX=resumeIcon.width/2;
            resumeIcon.anchorOffsetY=resumeIcon.height/2;
            resumeIcon.x=this.resumeBtn.width/2;
            resumeIcon.y=this.resumeBtn.height/2;
            this.resumeBtn.addChild(resumeIcon);
            this.panel.addChild(this.resumeBtn);
        }else{
            if(bgmIsOn){
                if(this.getChildByName("bgmOffBtn")!=null){
                    this.panel.removeChild(this.bgmOffBtn);
                }
                if(this.getChildByName("bgmOnBtn")==null){
                    this.panel.addChild(this.bgmOnBtn);
                }
            }else{
                if(this.getChildByName("bgmOnBtn")!=null){
                    this.panel.removeChild(this.bgmOnBtn);
                }
                if(this.getChildByName("bgmOffBtn")==null){
                    this.panel.addChild(this.bgmOffBtn);
                }
            }
            if(soundIsOn){
                if(this.getChildByName("soundOffBtn")!=null){
                    this.panel.removeChild(this.soundOffBtn);
                }
                if(this.getChildByName("soundOnBtn")==null){
                    this.panel.addChild(this.soundOnBtn);
                }
            }else{
                if(this.getChildByName("soundOnBtn")!=null){
                    this.panel.removeChild(this.soundOnBtn);
                }
                if(this.getChildByName("soundOffBtn")==null){
                    this.panel.addChild(this.soundOffBtn);
                }
            }
        }
    }

    private InitHelpBtn(){
        if(this.helpBtn==null){
            let btnWidth=300;
            let btnHeight=134;
            this.helpBtn=this.createButton("help_png",btnWidth,btnHeight);
            this.helpBtn.x=SceneManager.ScreenWidth/2;
            this.helpBtn.y=SceneManager.ScreenHeight/2-this.panel.height/2-btnHeight;
            let helpTxt=this.createTextField(btnWidth,btnHeight*1.3,0xFFFFFF,30,"关卡打不过了？邀请好友帮你通关吧");
            helpTxt.x=0;
            helpTxt.y=-helpTxt.height;
            this.helpBtn.addChild(helpTxt);
            this.addChild(this.helpBtn);
        }
    }

    private PlayTween(){
        let targetX=SceneManager.ScreenWidth/2;
        let startX=-this.panel.width/2-40;
        this.panel.x=startX;
        this.helpBtn.x=startX;
        let panelTw=egret.Tween.get(this.panel);
        let helpTw=egret.Tween.get(this.helpBtn);
        panelTw.wait(400).to({"x":targetX},500,egret.Ease.backOut);
        helpTw.wait(500).to({"x":targetX},500,egret.Ease.backOut);
    }

    public Update(){

    }

    public addListener(){
        this.bg.touchEnabled=true;
        this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgClick, this);

        Utility.ButtonActive(this.helpBtn,true);
        this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.helpBtnClick, this);
        Utility.ButtonActive(this.bgmOnBtn,true);
        this.bgmOnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgmOnBtnClick, this);
        Utility.ButtonActive(this.bgmOffBtn,true);
        this.bgmOffBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgmOffBtnClick, this);
        Utility.ButtonActive(this.soundOnBtn,true);
        this.soundOnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.soundOnBtnClick, this);
        Utility.ButtonActive(this.soundOffBtn,true);
        this.soundOffBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.soundOffBtnClick, this);
        Utility.ButtonActive(this.menuBtn,true);
        this.menuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuBtnClick, this);
        Utility.ButtonActive(this.homeBtn,true);
        this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.homeBtnClick, this);
        Utility.ButtonActive(this.skinBtn,true);
        this.skinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.skinBtnClick, this);
        Utility.ButtonActive(this.resumeBtn,true);
        this.resumeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.resumeBtnClick, this);

    }
    public removeListener(){
        this.bg.touchEnabled=false;
        this.bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bgClick, this);

        Utility.ButtonActive(this.helpBtn,false);
        this.helpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.helpBtnClick, this);
        Utility.ButtonActive(this.bgmOnBtn,false);
        this.bgmOnBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bgmOnBtnClick, this);
        Utility.ButtonActive(this.bgmOffBtn,false);
        this.bgmOffBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bgmOffBtnClick, this);
        Utility.ButtonActive(this.soundOnBtn,false);
        this.soundOnBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.soundOnBtnClick, this);
        Utility.ButtonActive(this.soundOffBtn,false);
        this.soundOffBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.soundOffBtnClick, this);
        Utility.ButtonActive(this.menuBtn,false);
        this.menuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.menuBtnClick, this);
        Utility.ButtonActive(this.homeBtn,false);
        this.homeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.homeBtnClick, this);
        Utility.ButtonActive(this.skinBtn,false);
        this.skinBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.skinBtnClick, this);
        Utility.ButtonActive(this.resumeBtn,false);
        this.resumeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.resumeBtnClick, this);
    }

    private bgClick(){
        SceneManager.Instance.popScene();
    }

    private helpBtnClick(){
        //TODO:
    }
    private bgmOnBtnClick(){
        let bgmIsOn=false;
        PlayerData.Instance.bgmOn=bgmIsOn;
        AudioManager.Instance.BMGVolume=0;
        if(bgmIsOn){
            if(this.getChildByName("bgmOffBtn")!=null){
                this.panel.removeChild(this.bgmOffBtn);
            }
            if(this.getChildByName("bgmOnBtn")==null){
                this.panel.addChild(this.bgmOnBtn);
            }
        }else{
            if(this.getChildByName("bgmOnBtn")!=null){
                this.panel.removeChild(this.bgmOnBtn);
            }
            if(this.getChildByName("bgmOffBtn")==null){
                this.panel.addChild(this.bgmOffBtn);
            }
        }

    }
    private bgmOffBtnClick(){
        let bgmIsOn=true; 
        PlayerData.Instance.bgmOn=bgmIsOn;
        AudioManager.Instance.BMGVolume=1;
        if(bgmIsOn){
            if(this.getChildByName("bgmOffBtn")!=null){
                this.panel.removeChild(this.bgmOffBtn);
            }
            if(this.getChildByName("bgmOnBtn")==null){
                this.panel.addChild(this.bgmOnBtn);
            }
        }else{
            if(this.getChildByName("bgmOnBtn")!=null){
                this.panel.removeChild(this.bgmOnBtn);
            }
            if(this.getChildByName("bgmOffBtn")==null){
                this.panel.addChild(this.bgmOffBtn);
            }
        }
    }
    private soundOnBtnClick(){
        let soundIsOn=false;
        PlayerData.Instance.soundOn=soundIsOn;
        if(soundIsOn){
            if(this.getChildByName("soundOffBtn")!=null){
                this.panel.removeChild(this.soundOffBtn);
            }
            if(this.getChildByName("soundOnBtn")==null){
                this.panel.addChild(this.soundOnBtn);
            }
        }else{
            if(this.getChildByName("soundOnBtn")!=null){
                this.panel.removeChild(this.soundOnBtn);
            }
            if(this.getChildByName("soundOffBtn")==null){
                this.panel.addChild(this.soundOffBtn);
            }
        }
    }
    private soundOffBtnClick(){
        let soundIsOn=true;
        PlayerData.Instance.soundOn=soundIsOn;
        if(soundIsOn){
            if(this.getChildByName("soundOffBtn")!=null){
                this.panel.removeChild(this.soundOffBtn);
            }
            if(this.getChildByName("soundOnBtn")==null){
                this.panel.addChild(this.soundOnBtn);
            }
        }else{
            if(this.getChildByName("soundOnBtn")!=null){
                this.panel.removeChild(this.soundOnBtn);
            }
            if(this.getChildByName("soundOffBtn")==null){
                this.panel.addChild(this.soundOffBtn);
            }
        }
    }
    private menuBtnClick(){
        SceneManager.Instance.pushScene("SelectLevelScene");
    }
    private homeBtnClick(){
        SceneManager.Instance.popScene();
        SceneManager.Instance.changeScene("StartScene");
    }
    private skinBtnClick(){
        SceneManager.Instance.pushScene("ShopScene");
    }
    private resumeBtnClick(){
        SceneManager.Instance.popScene();
    }



}