var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utility = (function () {
    function Utility() {
    }
    Utility.write = function (key, value) {
        if (value) {
            value = JSON.stringify(value);
        }
        egret.localStorage.setItem(key, value);
    };
    Utility.read = function (key) {
        var value = egret.localStorage.getItem(key);
        if (value && value != "undefined" && value != "null") {
            return JSON.parse(value);
        }
        return null;
    };
    Utility.JsonEncode = function (value) {
        return JSON.stringify(value);
    };
    Utility.JsonDecode = function (json_str) {
        return JSON.parse(json_str);
    };
    Utility.JsonDecode2 = function (json_str) {
        return JSON.parse(json_str);
    };
    Utility.getRandomNum = function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    };
    //-----------------------UI部分工具------------------------
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Utility.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Object.defineProperty(Utility, "NotiBoxGo", {
        get: function () {
            if (Utility._notibox == null) {
                Utility._notibox = new egret.DisplayObjectContainer();
                Utility._notibox.width = 200;
                Utility._notibox.height = 50;
                Utility._notibox.anchorOffsetX = Utility._notibox.width / 2;
                Utility._notibox.anchorOffsetY = Utility._notibox.height / 2;
                Utility._notibox.x = 0;
                Utility._notibox.y = 0;
                Utility._notibox.alpha = 0;
                var bg = Utility.createBitmapByName("notice_png");
                bg.name = "BG";
                bg.fillMode = egret.BitmapFillMode.REPEAT;
                bg.width = Utility._notibox.width;
                bg.height = Utility._notibox.height;
                bg.anchorOffsetX = bg.width / 2;
                bg.anchorOffsetY = bg.height / 2;
                bg.x = 0;
                bg.y = 0;
                Utility._notibox.addChild(bg);
                var txt = new egret.TextField();
                txt.name = "Text";
                txt.text = "text";
                txt.fontFamily = "myFirstFont";
                txt.textColor = 0xFFFFFF;
                txt.textAlign = egret.HorizontalAlign.CENTER;
                txt.verticalAlign = egret.VerticalAlign.MIDDLE;
                txt.width = Utility._notibox.width;
                txt.height = Utility._notibox.height;
                txt.anchorOffsetX = txt.width / 2;
                txt.anchorOffsetY = txt.height / 2;
                txt.x = 0;
                txt.y = 0;
                txt.size = 30;
                Utility._notibox.addChild(txt);
                SceneManager.Instance.rootLayer.addChild(Utility._notibox);
            }
            return Utility._notibox;
        },
        enumerable: true,
        configurable: true
    });
    Utility.showNotiBox = function (str) {
        var noticeBox = Utility.NotiBoxGo;
        if (noticeBox.alpha > 0) {
            return;
        }
        var bg = noticeBox.getChildByName("BG");
        bg.width = 30 * str.length;
        var start_y = 0;
        var end_y = 80;
        var txt = noticeBox.getChildByName("Text");
        txt.width = bg.width;
        txt.text = str;
        noticeBox.alpha = 0;
        noticeBox.x = SceneManager.ScreenWidth / 2;
        noticeBox.y = start_y;
        var tw = egret.Tween.get(noticeBox);
        tw.wait(100);
        tw.to({ "alpha": 1, "y": end_y }, 500);
        tw.wait(1000);
        tw.to({ "alpha": 0, "y": start_y }, 500);
    };
    Utility.ButtonEnable = function (obj) {
        obj.touchEnabled = true;
        var func = function (obj) {
            var tw = egret.Tween.get(obj);
            tw.to({ "scaleX": 0.9, "scaleY": 0.9 }, 200).to({ "scaleX": 1, "scaleY": 1 }, 200);
        };
        func.bind(null, obj);
        Utility.btnScaleFuns.set(obj, func);
        obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, func, obj);
    };
    Utility.ButtonDisable = function (obj) {
        obj.touchEnabled = false;
        var func = Utility.btnScaleFuns.get(obj);
        obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, func, obj);
    };
    Utility._notibox = null;
    Utility.btnScaleFuns = new Dictionary();
    return Utility;
}());
__reflect(Utility.prototype, "Utility");
//# sourceMappingURL=Utility.js.map