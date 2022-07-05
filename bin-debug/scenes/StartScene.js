var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// TypeScript file
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        var _this = _super.call(this) || this;
        _this.f = false;
        return _this;
        //指定开始场景对应的皮肤文件StartScene.exml
        // this.skinName = "resource/game/StartScene.exml";
    }
    //实现父类的onComplete方法
    StartScene.prototype.onComplete = function () {
        var _this = this;
        this.bg = this.createBitmapByName("bg_1_png");
        this.bg.fillMode = egret.BitmapFillMode.SCALE;
        this.bg.width = SceneManager.ScreenWidth;
        this.bg.height = SceneManager.ScreenHeight;
        this.addChild(this.bg);
        this.textfield = new egret.TextField();
        this.textfield.text = "789789";
        this.textfield.fontFamily = "WaterPuzzle";
        this.textfield.textColor = 0xCD2626;
        this.textfield.textAlign = egret.HorizontalAlign.CENTER; //水平右对齐，相对于 textField 控件自身的 width 与 height
        this.textfield.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.textfield.width = SceneManager.ScreenWidth;
        this.textfield.height = SceneManager.ScreenHeight;
        this.textfield.anchorOffsetX = this.textfield.width / 2;
        this.textfield.anchorOffsetY = this.textfield.height / 2;
        this.textfield.x = SceneManager.ScreenWidth / 2;
        this.textfield.y = SceneManager.ScreenHeight / 2;
        this.textfield.size = 100;
        var change = function () {
            var tw = egret.Tween.get(_this.textfield);
            tw.wait(500);
            tw.to({ "alpha": 0 }, 1000);
            tw.wait(500);
            tw.to({ "alpha": 1 }, 1000);
            tw.call(change, _this);
        };
        change();
        this.addChild(this.textfield);
        var btn = new eui.ToggleSwitch();
        btn.label = "我是ToggleButton";
        btn.x = SceneManager.ScreenWidth / 2;
        btn.y = SceneManager.ScreenHeight / 2;
        btn.width = 200;
        btn.height = 100;
        btn.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
        this.addChild(btn);
    };
    StartScene.prototype.initSwitch = function () {
    };
    StartScene.prototype.changeHandler = function (evt) {
        egret.log(evt.target.selected);
    };
    StartScene.prototype.Update = function () {
        this.textfield.text = "WaterPuzzle";
    };
    StartScene.prototype.OnTouchBegin = function () {
        //切换场景
        SceneManager.Instance.changeScene("GameScene");
    };
    StartScene.prototype.addListener = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
    };
    StartScene.prototype.removeListener = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
        egret.Tween.removeAllTweens();
    };
    return StartScene;
}(Scene));
__reflect(StartScene.prototype, "StartScene");
//# sourceMappingURL=StartScene.js.map