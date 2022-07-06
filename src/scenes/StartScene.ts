// TypeScript file
class StartScene extends Scene {
    public bg: egret.Bitmap;//弹出层按钮
    private textfield: egret.TextField;
    private levelTxt: egret.TextField;
    private icon: egret.Bitmap;
    private startBtn: egret.Bitmap;

    private level:number;

    private bottomNames: string[] = ["关卡","排行","商店","分享"];
    private bottomRess : string[] = ["menu_png","rank_png","shop_png","share_png"];
    private bottomTxt:egret.TextField[] = [];
    private bottomBtn:egret.Bitmap[] = [];

    public constructor() {
        super();
        //指定开始场景对应的皮肤文件StartScene.exml
        // this.skinName = "resource/game/StartScene.exml";
    }
    //实现父类的onComplete方法
    protected onComplete() {
        this.bg = this.createBitmapByName("bg_1_png");
        this.bg.fillMode = egret.BitmapFillMode.SCALE;
        this.bg.width = SceneManager.ScreenWidth;
        this.bg.height = SceneManager.ScreenHeight;
        this.addChild(this.bg);

        this.icon = this.createBitmapByName("icon_png");
        this.icon.fillMode = egret.BitmapFillMode.SCALE;
        this.icon.width = 500;
        this.icon.height = 370;
        this.icon.anchorOffsetX = this.icon.width / 2;
        this.icon.anchorOffsetY = this.icon.height / 2;
        this.icon.x = SceneManager.ScreenWidth / 2;
        this.icon.y = SceneManager.ScreenHeight / 2 - SceneManager.ScreenHeight / 4;
        this.addChild(this.icon);

        this.textfield = new egret.TextField();
        this.textfield.text = "WaterPuzzle";
        this.textfield.fontFamily = "myFirstFont";
        this.textfield.textColor = 0x00FFFF;
        this.textfield.textAlign = egret.HorizontalAlign.CENTER;  //水平右对齐，相对于 textField 控件自身的 width 与 height
        this.textfield.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.textfield.width = SceneManager.ScreenWidth;
        this.textfield.height = SceneManager.ScreenHeight;
        this.textfield.anchorOffsetX = this.textfield.width / 2;
        this.textfield.anchorOffsetY = this.textfield.height / 2;
        this.textfield.x = SceneManager.ScreenWidth / 2;
        this.textfield.y = SceneManager.ScreenHeight / 2;
        this.textfield.size = 100;
        // let change = () => {
        //     let tw = egret.Tween.get(this.textfield);
        //     tw.wait(500);
        //     tw.to({ "alpha": 0 }, 1000);
        //     tw.wait(500);
        //     tw.to({ "alpha": 1 }, 1000);
        //     tw.call(change, this);
        // };
        // change();
        this.addChild(this.textfield);

        this.level = 1;
        this.levelTxt = new egret.TextField();
        this.levelTxt.text = "LEVEL "+String(this.level);
        this.levelTxt.fontFamily = "myFirstFont";
        this.levelTxt.textColor = 0xFFFFFF;
        this.levelTxt.textAlign = egret.HorizontalAlign.CENTER;  //水平右对齐，相对于 textField 控件自身的 width 与 height
        this.levelTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.levelTxt.width = SceneManager.ScreenWidth;
        this.levelTxt.height = SceneManager.ScreenHeight;
        this.levelTxt.anchorOffsetX = this.levelTxt.width / 2;
        this.levelTxt.anchorOffsetY = this.levelTxt.height / 2;
        this.levelTxt.x = SceneManager.ScreenWidth / 2;
        this.levelTxt.y = SceneManager.ScreenHeight / 2 + 100;
        this.levelTxt.size = 30;
        this.addChild(this.levelTxt);

        this.startBtn = this.createBitmapByName("start_btn_png");
        this.startBtn.width = 230;
        this.startBtn.height = 120;
        this.startBtn.anchorOffsetX = this.startBtn.width / 2;
        this.startBtn.anchorOffsetY = this.startBtn.height / 2;
        this.startBtn.x = SceneManager.ScreenWidth / 2;
        this.startBtn.y = SceneManager.ScreenHeight / 2 + 230;
        this.startBtn.touchEnabled = true;
        this.addChild(this.startBtn);
        this.InitBottom();
    }

    private InitBottom():void{
        let len = this.bottomNames.length;
        for(let i=0;i<len;i++){
            this.InitBottomButton(i,len);
            this.InitBottomText(i,len);
        }
    }

    private InitBottomButton(index:number,length:number):void{
        const resName = this.bottomRess[index];
        let btn = this.createBitmapByName(resName);
        btn.fillMode = egret.BitmapFillMode.SCALE;
        btn.width = 100;
        btn.height = 100;
        btn.anchorOffsetX = btn.width / 2;
        btn.anchorOffsetY = btn.height / 2;
        btn.x = SceneManager.ScreenWidth / (length + 1) * (index + 1);
        btn.y = SceneManager.ScreenHeight / 2 + 360;
        this.addChild(btn);
        this.bottomBtn[index] = btn;
    }
    private InitBottomText(index:number,length:number):void{
        const txt = this.bottomNames[index];
        let txtField = new egret.TextField();
        txtField.text = txt;
        txtField.fontFamily = "myFirstFont";
        txtField.textColor = 0xFFFFFF;
        txtField.textAlign = egret.HorizontalAlign.CENTER;  //水平右对齐，相对于 textField 控件自身的 width 与 height
        txtField.verticalAlign = egret.VerticalAlign.MIDDLE;
        txtField.width = 200;
        txtField.height = 100;
        txtField.anchorOffsetX = txtField.width / 2;
        txtField.anchorOffsetY = txtField.height / 2;
        txtField.x = SceneManager.ScreenWidth / (length + 1) * (index + 1);
        txtField.y = SceneManager.ScreenHeight / 2 + 400;
        txtField.size = 30;
        this.addChild(txtField);
        this.bottomTxt[index] = txtField;
    }


    public Update() {
        // this.textfield.text = "WaterPuzzle";
    }
    private OnTouch(): void {
        //切换场景
        SceneManager.Instance.changeScene("GameScene");
    }


    public onClickBottom(index,evt:egret.TouchEvent) 
    {
    　　
    }

    private bottomFunc:Function[] = [];

    public addListener() {
        Utility.ButtonEnable(this.startBtn);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTouch, this);
        let len = this.bottomBtn.length;
        for(let i=0;i<len;i++){
            let func = this.onClickBottom.bind(this,i);
            this.bottomFunc[i] = func;
            Utility.ButtonEnable(this.bottomBtn[i],this.bottomTxt[i]);
            this.bottomBtn[i].addEventListener(egret.TouchEvent.TOUCH_TAP,func, this);
        }
    }

    public removeListener() {
        Utility.ButtonDisable(this.startBtn);
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTouch, this);
        let len = this.bottomBtn.length;
        for(let i=0;i<len;i++){
            let func = this.bottomFunc[i];
            Utility.ButtonDisable(this.bottomBtn[i]);
            this.bottomBtn[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,func, this);
        }
        // egret.Tween.removeAllTweens();
    }
}