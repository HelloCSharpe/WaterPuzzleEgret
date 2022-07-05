// TypeScript file
class StartScene extends Scene {
    public bg: egret.Bitmap;//弹出层按钮
    private textfield: egret.TextField;

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

        this.textfield = new egret.TextField();
        this.textfield.text = "789789";
        this.textfield.fontFamily = "WaterPuzzle";
        this.textfield.textColor = 0xCD2626;
        this.textfield.textAlign = egret.HorizontalAlign.CENTER;  //水平右对齐，相对于 textField 控件自身的 width 与 height
        this.textfield.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.textfield.width = SceneManager.ScreenWidth;
        this.textfield.height = SceneManager.ScreenHeight;
        this.textfield.anchorOffsetX = this.textfield.width / 2;
        this.textfield.anchorOffsetY = this.textfield.height / 2;
        this.textfield.x = SceneManager.ScreenWidth / 2;
        this.textfield.y = SceneManager.ScreenHeight / 2;
        this.textfield.size = 100;
        let change = () => {
            let tw = egret.Tween.get(this.textfield);
            tw.wait(500);
            tw.to({ "alpha": 0 }, 1000);
            tw.wait(500);
            tw.to({ "alpha": 1 }, 1000);
            tw.call(change, this);
        };
        change();
        this.addChild(this.textfield);

        var btn: eui.ToggleSwitch = new eui.ToggleSwitch();
        btn.label = "我是ToggleButton";
        btn.x = SceneManager.ScreenWidth / 2;
        btn.y = SceneManager.ScreenHeight / 2;
        btn.width = 200;
        btn.height = 100;
        btn.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
        this.addChild(btn);
    }

    private initSwitch(): void {

    }
    private changeHandler(evt: eui.UIEvent) {
        egret.log(evt.target.selected);
    }
    public Update() {
        this.textfield.text = "WaterPuzzle";
    }
    private f: boolean = false;
    private OnTouchBegin(): void {
        //切换场景
        SceneManager.Instance.changeScene("GameScene");
    }


    public addListener() {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
    }

    public removeListener() {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
        egret.Tween.removeAllTweens();
    }
}