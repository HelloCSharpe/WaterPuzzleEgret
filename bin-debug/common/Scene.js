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
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        return _super.call(this) || this;
        // 监听组件创建完毕 也就是场景的外观创建完毕
        // this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this);
    }
    Scene.prototype.Reset = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.onComplete.apply(this, args);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Scene.prototype.createBitmapByName = function (res_name, w, h, isPivotCenter) {
        return Utility.createBitmapByName(res_name, w, h, isPivotCenter);
    };
    Scene.prototype.createButton = function (res_name, w, h, isPivotCenter) {
        if (isPivotCenter == null) {
            isPivotCenter = false;
        }
        return Utility.createButton(res_name, w, h, isPivotCenter);
    };
    Scene.prototype.createTextField = function (width, height, color, fontSize, text, fontFamily, HAlign, VAlign) {
        return Utility.createTextField(width, height, color, fontSize, text, fontFamily, HAlign, VAlign);
    };
    Scene.prototype.createGif = function (jsonRes, pngRes) {
        return Utility.createGif(jsonRes, pngRes);
    };
    Scene.prototype.getRandomNum = function (Min, Max) {
        return Utility.getRandomNum(Min, Max);
    };
    return Scene;
}(eui.Component));
__reflect(Scene.prototype, "Scene");
var SceneManager = (function () {
    function SceneManager() {
        this.sceneDic = new Object();
    }
    Object.defineProperty(SceneManager, "Instance", {
        get: function () {
            if (SceneManager._manager == null) {
                SceneManager._manager = new SceneManager();
            }
            return SceneManager._manager;
        },
        enumerable: true,
        configurable: true
    });
    SceneManager.prototype.RegisterScene = function (name, s) {
        s.name = name;
        this.sceneDic[name] = s;
    };
    SceneManager.prototype.GetCurScene = function () {
        return this.currentScene;
    };
    SceneManager.prototype.GetPopScene = function () {
        return this.pop_scene;
    };
    //切换场景
    SceneManager.prototype.changeScene = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var s = this.sceneDic[name];
        if (this.currentScene) {
            this.rootLayer.removeChild(this.currentScene);
            this.currentScene.removeListener();
        }
        this.rootLayer.addChild(s);
        this.currentScene = s;
        (_a = this.currentScene).Reset.apply(_a, args);
        this.currentScene.addListener();
        var _a;
    };
    //弹出场景层
    SceneManager.prototype.pushScene = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var s = this.sceneDic[name];
        this.popScene();
        if (!this.pop_scene) {
            this.rootLayer.addChild(s);
            this.pop_scene = s;
            (_a = this.pop_scene).Reset.apply(_a, args);
            this.pop_scene.addListener();
        }
        var _a;
    };
    //关闭场景层
    SceneManager.prototype.popScene = function () {
        if (this.pop_scene) {
            this.rootLayer.removeChild(this.pop_scene);
            this.pop_scene.removeListener();
            this.pop_scene = null;
        }
    };
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=Scene.js.map