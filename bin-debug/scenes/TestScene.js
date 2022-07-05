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
var TestScene = (function (_super) {
    __extends(TestScene, _super);
    function TestScene() {
        var _this = _super.call(this) || this;
        _this.f = false;
        return _this;
        //指定开始场景对应的皮肤文件StartScene.exml
        // this.skinName = "resource/game/StartScene.exml";
    }
    //实现父类的onComplete方法
    TestScene.prototype.onComplete = function () {
        var _this = this;
        this.bg = this.createBitmapByName("start_bg_png");
        this.bg.fillMode = egret.BitmapFillMode.SCALE;
        this.bg.width = SceneManager.ScreenWidth;
        this.bg.height = SceneManager.ScreenHeight;
        this.addChild(this.bg);
        this.textfield = new egret.TextField();
        this.textfield.text = "789789";
        this.textfield.fontFamily = "myFirstFont";
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
    TestScene.prototype.initSwitch = function () {
    };
    TestScene.prototype.changeHandler = function (evt) {
        egret.log(evt.target.selected);
    };
    TestScene.prototype.Update = function () {
        this.textfield.text = "myFirstFont";
    };
    TestScene.prototype.OnTouchBegin = function () {
        //切换场景
        SceneManager.Instance.changeScene("TestScene2");
    };
    TestScene.prototype.addListener = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
    };
    TestScene.prototype.removeListener = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
        egret.Tween.removeAllTweens();
    };
    return TestScene;
}(Scene));
__reflect(TestScene.prototype, "TestScene");
var TestGrid = (function () {
    function TestGrid(w, h) {
        this._width = w;
        this._height = h;
    }
    TestGrid.prototype.width = function () {
        return this._width;
    };
    TestGrid.prototype.height = function () {
        return this._height;
    };
    TestGrid.prototype.InitDataUI = function (container, data) {
        var result = new egret.Bitmap();
        var rarityBg = "";
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
        var texture = RES.getRes(rarityBg);
        result.texture = texture;
        result.width = this.width();
        result.height = this.height();
        container.addChild(result);
        var textfield = new egret.TextField();
        textfield.fontFamily = "Arial";
        textfield.size = 36;
        textfield.text = data.str;
        textfield.textAlign = egret.HorizontalAlign.RIGHT; //水平右对齐，相对于 textField 控件自身的 width 与 height
        textfield.verticalAlign = egret.VerticalAlign.MIDDLE;
        textfield.width = result.width;
        textfield.height = result.height / 4;
        textfield.x = 0;
        textfield.y = result.height - textfield.height;
        container.addChild(textfield);
    };
    return TestGrid;
}());
__reflect(TestGrid.prototype, "TestGrid", ["IScrollViewGrid"]);
var TestData = (function () {
    function TestData(a, b) {
        this.str = a;
        this.value = b;
    }
    return TestData;
}());
__reflect(TestData.prototype, "TestData");
//# sourceMappingURL=TestScene.js.map