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
var DrawScene = (function (_super) {
    __extends(DrawScene, _super);
    function DrawScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrawScene.prototype.onComplete = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.InitBG();
    };
    DrawScene.prototype.InitBG = function () {
        if (this.bg == null) {
            this.bg = this.createBitmapByName("mask_png");
            this.bg.fillMode = egret.BitmapFillMode.SCALE;
            this.bg.width = SceneManager.ScreenWidth;
            this.bg.height = SceneManager.ScreenHeight;
            this.addChild(this.bg);
        }
    };
    DrawScene.prototype.Update = function () {
    };
    DrawScene.prototype.addListener = function () {
    };
    DrawScene.prototype.removeListener = function () {
    };
    return DrawScene;
}(Scene));
__reflect(DrawScene.prototype, "DrawScene");
//# sourceMappingURL=DrawScene.js.map