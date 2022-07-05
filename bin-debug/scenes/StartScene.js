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
        _this.bottomNames = ["关卡", "排行", "商店", "分享"];
        _this.bottomRess = ["menu_png", "rank_png", "shop_png", "share_png"];
        _this.bottomTxt = [];
        _this.bottomBtn = [];
        _this.bottomFunc = [];
        return _this;
        //指定开始场景对应的皮肤文件StartScene.exml
        // this.skinName = "resource/game/StartScene.exml";
    }
    //实现父类的onComplete方法
    StartScene.prototype.onComplete = function () {
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
        this.textfield.textAlign = egret.HorizontalAlign.CENTER; //水平右对齐，相对于 textField 控件自身的 width 与 height
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
        this.levelTxt.text = "LEVEL " + String(this.level);
        this.levelTxt.fontFamily = "myFirstFont";
        this.levelTxt.textColor = 0xFFFFFF;
        this.levelTxt.textAlign = egret.HorizontalAlign.CENTER; //水平右对齐，相对于 textField 控件自身的 width 与 height
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
    };
    StartScene.prototype.InitBottom = function () {
        var len = this.bottomNames.length;
        for (var i = 0; i < len; i++) {
            this.InitBottomButton(i, len);
            this.InitBottomText(i, len);
        }
    };
    StartScene.prototype.InitBottomButton = function (index, length) {
        var resName = this.bottomRess[index];
        var btn = this.createBitmapByName(resName);
        btn.fillMode = egret.BitmapFillMode.SCALE;
        btn.width = 200;
        btn.height = 200;
        btn.anchorOffsetX = btn.width / 2;
        btn.anchorOffsetY = btn.height / 2;
        btn.x = SceneManager.ScreenWidth / (length + 1) * (index + 1);
        btn.y = SceneManager.ScreenHeight - 400;
        this.addChild(btn);
        this.bottomBtn[index] = btn;
    };
    StartScene.prototype.InitBottomText = function (index, length) {
        var txt = this.bottomNames[index];
        var txtField = new egret.TextField();
        txtField.text = txt;
        txtField.fontFamily = "myFirstFont";
        txtField.textColor = 0xFFFFFF;
        txtField.textAlign = egret.HorizontalAlign.CENTER; //水平右对齐，相对于 textField 控件自身的 width 与 height
        txtField.verticalAlign = egret.VerticalAlign.MIDDLE;
        txtField.width = 200;
        txtField.height = 100;
        txtField.anchorOffsetX = txtField.width / 2;
        txtField.anchorOffsetY = txtField.height / 2;
        txtField.x = SceneManager.ScreenWidth / (length + 1) * (index + 1);
        txtField.y = SceneManager.ScreenHeight - 350;
        txtField.size = 30;
        this.addChild(txtField);
        this.bottomTxt[index] = txtField;
    };
    StartScene.prototype.Update = function () {
        // this.textfield.text = "WaterPuzzle";
    };
    StartScene.prototype.OnTouch = function () {
        //切换场景
        SceneManager.Instance.changeScene("GameScene");
    };
    StartScene.prototype.onClickBottom = function (index, evt) {
    };
    StartScene.prototype.addListener = function () {
        Utility.ButtonEnable(this.startBtn);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTouch, this);
        var len = this.bottomBtn.length;
        for (var i = 0; i < len; i++) {
            var func = this.onClickBottom.bind(this, i);
            this.bottomFunc[i] = func;
            Utility.ButtonEnable(this.bottomBtn[i]);
            this.bottomBtn[i].addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
        }
    };
    StartScene.prototype.removeListener = function () {
        Utility.ButtonDisable(this.startBtn);
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTouch, this);
        var len = this.bottomBtn.length;
        for (var i = 0; i < len; i++) {
            var func = this.bottomFunc[i];
            Utility.ButtonDisable(this.bottomBtn[i]);
            this.bottomBtn[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
        }
        // egret.Tween.removeAllTweens();
    };
    return StartScene;
}(Scene));
__reflect(StartScene.prototype, "StartScene");
//# sourceMappingURL=StartScene.js.map