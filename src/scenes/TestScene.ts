// TypeScript file
class TestScene extends Scene {
    public bg: egret.Bitmap;//弹出层按钮
    private textfield: egret.TextField;

    public constructor() {
        super();
        //指定开始场景对应的皮肤文件StartScene.exml
        // this.skinName = "resource/game/StartScene.exml";
    }
    //实现父类的onComplete方法
    protected onComplete() {
        this.bg = this.createBitmapByName("start_bg_png")
        this.bg.fillMode = egret.BitmapFillMode.SCALE;
        this.bg.width = SceneManager.ScreenWidth;
        this.bg.height = SceneManager.ScreenHeight;
        this.addChild(this.bg);

        this.textfield = new egret.TextField();
        this.textfield.text = "789789";
        this.textfield.fontFamily = "myFirstFont";
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
        this.textfield.text = "Running Game";
    }
    private f: boolean = false;
    private OnTouchBegin(): void {
        //切换场景
        SceneManager.Instance.changeScene("TestScene2");
    }


    public addListener() {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
    }

    public removeListener() {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
        egret.Tween.removeAllTweens();
    }
}

class TestGrid implements IScrollViewGrid<TestData> {
    private _width: number;
    private _height: number;
    public constructor(w: number, h: number) {
        this._width = w;
        this._height = h;
    }
    public width(): number {
        return this._width;
    }
    public height(): number {
        return this._height;
    }
    public InitDataUI(container: egret.DisplayObjectContainer, data: TestData): void {
        let result = new egret.Bitmap();
        let rarityBg: string = "";
        switch (data.value) {
            case 0:
                rarityBg = "n_png";
                break;
            case 1:
                rarityBg = "r_png";
                break;
            case 2:
                rarityBg = "sr_png";
                break;
            case 3:
                rarityBg = "ssr_png";
                break;
        }
        let texture: egret.Texture = RES.getRes(rarityBg);
        result.texture = texture;
        result.width = this.width();
        result.height = this.height();
        container.addChild(result);
        let textfield = new egret.TextField();
        textfield.fontFamily = "Arial";
        textfield.size = 36;
        textfield.text = data.str;
        textfield.textAlign = egret.HorizontalAlign.RIGHT;  //水平右对齐，相对于 textField 控件自身的 width 与 height
        textfield.verticalAlign = egret.VerticalAlign.MIDDLE;
        textfield.width = result.width;
        textfield.height = result.height / 4;
        textfield.x = 0;
        textfield.y = result.height - textfield.height;
        container.addChild(textfield);

    }
}
class TestData {
    public str: string;
    public value: number;
    public constructor(a: string, b: number) {
        this.str = a;
        this.value = b;
    }
}