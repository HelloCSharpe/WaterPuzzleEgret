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
var SelectLevelScene = (function (_super) {
    __extends(SelectLevelScene, _super);
    function SelectLevelScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectLevelScene.prototype.onComplete = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.InitBG();
    };
    SelectLevelScene.prototype.InitBG = function () {
        if (this.bg == null) {
            this.bg = this.createBitmapByName("mask_png");
            this.bg.fillMode = egret.BitmapFillMode.SCALE;
            this.bg.width = SceneManager.ScreenWidth;
            this.bg.height = SceneManager.ScreenHeight;
            this.addChild(this.bg);
        }
    };
    SelectLevelScene.prototype.Update = function () {
    };
    SelectLevelScene.prototype.addListener = function () {
    };
    SelectLevelScene.prototype.removeListener = function () {
    };
    return SelectLevelScene;
}(Scene));
__reflect(SelectLevelScene.prototype, "SelectLevelScene");
//# sourceMappingURL=SelectLevelScene.js.map