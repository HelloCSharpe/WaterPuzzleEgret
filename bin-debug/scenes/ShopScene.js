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
var ShopScene = (function (_super) {
    __extends(ShopScene, _super);
    function ShopScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShopScene.prototype.onComplete = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.InitBG();
    };
    ShopScene.prototype.InitBG = function () {
        if (this.bg == null) {
            this.bg = this.createBitmapByName("bg_1_png");
            this.bg.fillMode = egret.BitmapFillMode.SCALE;
            this.bg.width = SceneManager.ScreenWidth;
            this.bg.height = SceneManager.ScreenHeight;
            this.addChild(this.bg);
        }
    };
    ShopScene.prototype.Update = function () {
    };
    ShopScene.prototype.addListener = function () {
    };
    ShopScene.prototype.removeListener = function () {
    };
    return ShopScene;
}(Scene));
__reflect(ShopScene.prototype, "ShopScene");
//# sourceMappingURL=ShopScene.js.map