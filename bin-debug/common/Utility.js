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
    Utility.createBitmapByName = function (name, w, h, isPivotCenter) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        if (w != null) {
            result.width = w;
        }
        if (h != null) {
            result.height = h;
        }
        if (isPivotCenter != null) {
            if (isPivotCenter) {
                result.anchorOffsetX = result.width / 2;
                result.anchorOffsetY = result.height / 2;
            }
        }
        return result;
    };
    Utility.createButton = function (resName, width, height, isPivotCenter) {
        var btn = new egret.DisplayObjectContainer();
        btn.width = width;
        btn.height = height;
        if (isPivotCenter) {
            btn.anchorOffsetX = btn.width / 2;
            btn.anchorOffsetY = btn.height / 2;
        }
        var btnBg = Utility.createBitmapByName(resName);
        btnBg.fillMode = egret.BitmapFillMode.SCALE;
        btnBg.name = "btnBg";
        btnBg.width = width;
        btnBg.height = height;
        btn.addChild(btnBg);
        return btn;
    };
    Utility.createTextField = function (width, height, color, fontSize, text, fontFamily, HAlign, VAlign) {
        var textField = new egret.TextField();
        textField.width = width;
        textField.height = height;
        textField.textColor = color;
        textField.size = (fontSize == null) ? 30 : fontSize;
        textField.fontFamily = (fontFamily == null) ? "myFirstFont" : fontFamily;
        textField.text = (text == null) ? "" : text;
        textField.textAlign = (HAlign == null) ? egret.HorizontalAlign.LEFT : HAlign;
        textField.verticalAlign = (VAlign == null) ? egret.VerticalAlign.MIDDLE : VAlign;
        return textField;
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
                var bg = Utility.createBitmapByName("tog3_png");
                Utility.setImageColor(bg, 0x000000);
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
    Object.defineProperty(Utility, "EmptyGo", {
        get: function () {
            if (Utility._empty == null) {
                Utility._empty = new egret.DisplayObjectContainer();
                Utility._empty.width = 50;
                Utility._empty.height = 50;
                Utility._empty.x = 0;
                Utility._empty.y = 0;
            }
            return Utility._empty;
        },
        enumerable: true,
        configurable: true
    });
    Utility.Float = function (startNum, endNum, duration, func, thisObj) {
        var emptyGo = Utility.EmptyGo;
        emptyGo.x = startNum;
        var onChanged = function () {
            var curX = emptyGo.x;
            func.bind(thisObj)(curX);
        };
        var tw = egret.Tween.get(emptyGo, { loop: false, onChange: onChanged, onChangeObj: thisObj });
        tw.to({ "x": endNum }, duration);
    };
    Utility.ButtonActive = function (obj, active) {
        obj.touchEnabled = active;
        if (active) {
            var func = function () {
                var tw = egret.Tween.get(obj);
                tw.to({ "scaleX": 0.9, "scaleY": 0.9 }, 50).to({ "scaleX": 1, "scaleY": 1 }, 50);
            };
            func.bind(obj);
            Utility.btnScaleFuns.set(obj, func);
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, func, obj);
        }
        else {
            var func = Utility.btnScaleFuns.get(obj);
            obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, func, obj);
        }
    };
    Utility.ButtonActive2 = function (obj, active) {
        obj.touchEnabled = active;
        if (active) {
            var func = function () {
                var tw = egret.Tween.get(obj);
                tw.to({ "scaleX": 0.9, "scaleY": 0.9 }, 50).to({ "scaleX": 1, "scaleY": 1 }, 50);
            };
            func.bind(obj);
            Utility.btnScaleFuns.set(obj, func);
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, func, obj);
        }
        else {
            var func = Utility.btnScaleFuns.get(obj);
            obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, func, obj);
        }
    };
    Utility.Str2Int = function (char) {
        if (char == "0") {
            return 0;
        }
        if (char == "1") {
            return 1;
        }
        if (char == "2") {
            return 2;
        }
        if (char == "3") {
            return 3;
        }
        if (char == "4") {
            return 4;
        }
        if (char == "5") {
            return 5;
        }
        if (char == "6") {
            return 6;
        }
        if (char == "7") {
            return 7;
        }
        if (char == "8") {
            return 8;
        }
        if (char == "9") {
            return 9;
        }
        if (char == "A") {
            return 10;
        }
        if (char == "B") {
            return 11;
        }
        if (char == "C") {
            return 12;
        }
        if (char == "D") {
            return 13;
        }
        if (char == "E") {
            return 14;
        }
        if (char == "F") {
            return 15;
        }
        return 0;
    };
    //将HTML的"#FEAD48"字符串转换成egret能够识别的number
    Utility.ColorHTMLToInt = function (colorHTML) {
        var a, b, c, d, e, f;
        var str = new String(colorHTML);
        if (str.charAt(0) == "#") {
            a = Utility.Str2Int(str.charAt(1));
            b = Utility.Str2Int(str.charAt(2));
            c = Utility.Str2Int(str.charAt(3));
            d = Utility.Str2Int(str.charAt(4));
            e = Utility.Str2Int(str.charAt(5));
            f = Utility.Str2Int(str.charAt(6));
        }
        else {
            a = Utility.Str2Int(str.charAt(0));
            b = Utility.Str2Int(str.charAt(1));
            c = Utility.Str2Int(str.charAt(2));
            d = Utility.Str2Int(str.charAt(3));
            e = Utility.Str2Int(str.charAt(4));
            f = Utility.Str2Int(str.charAt(5));
        }
        var _a = a * 16 + b;
        var _b = c * 16 + d;
        var _c = e * 16 + f;
        return _a * 256 * 256 + _b * 256 + _c;
    };
    Utility.setImageColor = function (image, color) {
        // 将16进制颜色分割成rgb值
        var spliceColor = function (color) {
            var result = { r: -1, g: -1, b: -1 };
            result.b = color % 256;
            result.g = Math.floor((color / 256)) % 256;
            result.r = Math.floor((color / 256) / 256);
            return result;
        };
        var result = spliceColor(color);
        var colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        colorMatrix[0] = result.r / 255;
        colorMatrix[6] = result.g / 255;
        colorMatrix[12] = result.b / 255;
        var colorFilter = new egret.ColorMatrixFilter(colorMatrix);
        image.filters = [colorFilter];
    };
    Utility.createGif = function (jsonRes, pngRes) {
        var json = RES.getRes(jsonRes);
        var png = RES.getRes(pngRes);
        var mcFactory = new egret.MovieClipDataFactory(json, png);
        var gif = new egret.MovieClip(mcFactory.generateMovieClipData());
        return gif;
    };
    Utility.setGifColor = function (gif, color) {
        // 将16进制颜色分割成rgb值
        var spliceColor = function (color) {
            var result = { r: -1, g: -1, b: -1 };
            result.b = color % 256;
            result.g = Math.floor((color / 256)) % 256;
            result.r = Math.floor((color / 256) / 256);
            return result;
        };
        var result = spliceColor(color);
        var colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        colorMatrix[0] = result.r / 255;
        colorMatrix[6] = result.g / 255;
        colorMatrix[12] = result.b / 255;
        var colorFilter = new egret.ColorMatrixFilter(colorMatrix);
        gif.filters = [colorFilter];
    };
    Utility.getRandomColor = function () {
        return (Math.floor(Math.random() * 0xff) << 16)
            + (Math.floor(Math.random() * 0xff) << 8)
            + Math.floor(Math.random() * 0xff);
    };
    Utility.Lerp = function (a, b, v) {
        var ret = a + (b - a) * v;
        return ret;
    };
    Object.defineProperty(Utility, "Deg2Rad", {
        get: function () {
            return Math.PI / 180;
        },
        enumerable: true,
        configurable: true
    });
    Utility._notibox = null;
    Utility._empty = null;
    Utility.btnScaleFuns = new Dictionary();
    return Utility;
}());
__reflect(Utility.prototype, "Utility");
//# sourceMappingURL=Utility.js.map