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
var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vector2;
}());
__reflect(Vector2.prototype, "Vector2");
var WaterData = (function () {
    function WaterData(waterID) {
        this.orginId = waterID;
        var realId = waterID;
        if (waterID > 1000) {
            realId = waterID - 1000;
        }
        var waterCfg = DataConfig.Instance.GetDataByIndex("water", realId);
        this.isHide = waterID > 1000;
        this.color = Utility.ColorHTMLToInt(waterCfg.ColorStr);
        this.colorInt = realId;
        this.num = 1;
    }
    return WaterData;
}());
__reflect(WaterData.prototype, "WaterData");
//每一级对应的角度和高度
var AngleInfo = (function () {
    function AngleInfo(a, h) {
        this.angle = a;
        this.height = h;
    }
    return AngleInfo;
}());
__reflect(AngleInfo.prototype, "AngleInfo");
var WaterScript = (function (_super) {
    __extends(WaterScript, _super);
    function WaterScript() {
        var _this = _super.call(this) || this;
        _this.angleInfos = [];
        _this._waterWidth = 80; //默认就是80宽度
        _this._waterHeight = 66; //默认就是66高度
        _this.tweener = null;
        _this.InitUI();
        return _this;
    }
    Object.defineProperty(WaterScript.prototype, "Deg2Rad", {
        get: function () {
            return Utility.Deg2Rad;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WaterScript.prototype, "waterData", {
        get: function () { return this.data; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WaterScript.prototype, "tubeScript", {
        get: function () { return this.tube; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WaterScript.prototype, "isFlow", {
        get: function () { return this._isFlow; },
        set: function (b) {
            this._isFlow = b;
            this.water.alpha = b ? 0 : 1;
            this.waterFlow.alpha = b ? 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WaterScript.prototype, "waterWidth", {
        get: function () { return this._waterWidth; },
        set: function (w) {
            this._waterWidth = w;
            this.width = w;
            this.water.width = w;
            this.waterFlow.width = w;
            this.hide.width = w;
            this.hideTxt.width = w;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WaterScript.prototype, "waterHeight", {
        get: function () { return this._waterHeight; },
        set: function (h) {
            this._waterHeight = h;
            this.height = h;
            this.water.height = h;
            this.waterFlow.height = h;
            this.hide.height = h;
            this.hideTxt.height = h;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WaterScript.prototype, "RealHeight", {
        get: function () { return this.waterHeight * this.data.num; },
        enumerable: true,
        configurable: true
    });
    WaterScript.prototype.Init = function (_tube, _data) {
        this.tube = _tube;
        this.InitAngleInfos();
        this.data = _data;
        Utility.setImageColor(this.water, _data.color);
        Utility.setGifColor(this.waterFlow, _data.color);
        this.waterWidth = _tube.waterWidth;
        this.waterHeight = _tube.waterHeight;
        this.SetSize(this.waterWidth, this.RealHeight);
        this.isFlow = false;
        _tube.waterContainer.addChild(this);
        var a = _data.isHide ? 1 : 0;
        this.hide.alpha = a;
        this.hideTxt.alpha = a;
    };
    WaterScript.prototype.InitUI = function () {
        this.width = this.waterWidth;
        this.height = this.waterHeight;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height;
        this.x = 0;
        this.y = 0;
        //water
        var water = Utility.createBitmapByName("white_jpg");
        water.width = this.width;
        water.height = this.height;
        water.x = 0;
        water.y = 0;
        this.addChild(water);
        this.water = water;
        //waterFlow
        var waterFlow = Utility.createGif("water_flow_json", "water_flow_png");
        waterFlow.width = this.width;
        waterFlow.height = this.height;
        waterFlow.x = 0;
        waterFlow.y = 0;
        waterFlow.gotoAndPlay(0, -1);
        this.addChild(waterFlow);
        this.waterFlow = waterFlow;
        //hide
        var hide = Utility.createBitmapByName("white_jpg");
        Utility.setImageColor(hide, Utility.ColorHTMLToInt("#3F3F3F"));
        hide.width = this.width;
        hide.height = this.height;
        hide.x = 0;
        hide.y = 0;
        this.addChild(hide);
        this.hide = hide;
        //hideTxt
        var txtField = new egret.TextField();
        txtField.text = "?";
        txtField.fontFamily = "myFirstFont";
        txtField.textColor = 0xFFFFFF;
        txtField.textAlign = egret.HorizontalAlign.CENTER; //水平右对齐，相对于 textField 控件自身的 width 与 height
        txtField.verticalAlign = egret.VerticalAlign.MIDDLE;
        txtField.width = this.width;
        txtField.height = this.height;
        txtField.x = 0;
        txtField.y = 0;
        txtField.size = 30;
        this.hideTxt = txtField;
        this.addChild(txtField);
    };
    WaterScript.prototype.InitAngleInfos = function () {
        if (this.angleInfos.length > 0) {
            return;
        }
        var PullAngles = this.tube.PullAngles;
        for (var i = 0; i < PullAngles.length; i++) {
            var index = PullAngles.length - 1 - i;
            var angle = PullAngles[index];
            var cosValue = Math.cos(angle * this.Deg2Rad);
            var waterNum = this.tube.MaxWaterNum - i;
            var offsetX = (this.tube.tubeWidth - this.tube.tubeMouthWidth) / 2; //瓶口距离边缘的距离
            var _height = offsetX * Math.sin(angle * this.Deg2Rad); //瓶口距离边缘的垂直高度
            var _tubeHeight = this.tube.tubeHeight * cosValue + _height;
            var waterHeight = waterNum == 0 ? 0 : Math.ceil(_tubeHeight / waterNum);
            this.angleInfos.push(new AngleInfo(angle, waterHeight));
        }
    };
    WaterScript.prototype.SetSize = function (w, h) {
        this.scaleX = w / this._waterWidth;
        this.scaleY = h / this._waterHeight;
    };
    Object.defineProperty(WaterScript.prototype, "sizeX", {
        set: function (w) {
            this.scaleX = w / this._waterWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WaterScript.prototype, "sizeY", {
        set: function (h) {
            this.scaleY = h / this._waterHeight;
        },
        enumerable: true,
        configurable: true
    });
    //获取对应的宽度
    WaterScript.prototype.GetWidth = function (w) {
        var _w = Math.abs(w);
        if (_w > this.tube.tubeSlash) {
            _w = this.tube.tubeSlash;
        }
        return _w;
    };
    WaterScript.prototype.GetPos = function () {
        return new Vector2(this.x, this.y);
    };
    WaterScript.prototype.SetPos = function (x, y) {
        this.x = x;
        this.y = y;
        // this.water.x = x;
        // this.water.y = y;
        // this.waterFlow.x = x;
        // this.waterFlow.y = y;
        // this.hide.x = x;
        // this.hide.y = y;
    };
    WaterScript.prototype.CloseHideImg = function () {
        var _this = this;
        var tw = egret.Tween.get(this.hide);
        this.removeChild(this.hideTxt);
        tw.to({ "alpha": 0 }, 500).call(function () {
            _this.removeChild(_this.hide);
            delete _this.hide;
            delete _this.hideTxt;
            _this.hide = null;
            _this.hideTxt = null;
        }, this);
    };
    WaterScript.prototype.DoRotate = function (angle) {
        this.rotation = angle;
    };
    WaterScript.prototype.SetWaterAnchoredPosition = function (offsetY) {
        if (this.tube.pullDir == PullDir.Left) {
            this.SetPos(-this.width / 2, offsetY);
        }
        else {
            this.SetPos(this.width / 2, offsetY);
        }
    };
    WaterScript.prototype.SetPullWaterSize = function (angle, curHeight) {
        var offsetX = (this.tube.tubeWidth - this.tube.tubeMouthWidth) / 2; //瓶口距离边缘的距离
        var _height = offsetX * Math.sin(angle * this.Deg2Rad); //瓶口距离边缘的垂直高度
        var curMaxHeight = this.tube.tubeHeight * Math.cos(angle * this.Deg2Rad) + _height;
        var H = curMaxHeight > curHeight ? curMaxHeight - curHeight : 0;
        var W = H == 0 ? 0 : this.CalWidth(angle, H);
        this.SetSize(W, H);
    };
    WaterScript.prototype.RefreshWidthAndHeight = function (angle) {
        var H = this.CalHeight(angle) * this.waterData.num;
        var W = this.CalWidth(angle, H);
        this.SetSize(W, H);
        return H;
    };
    WaterScript.prototype.CalWidth = function (angle, curHeight) {
        var w = 0;
        angle = Math.abs(angle);
        if (angle < 0.01) {
            return this.width * 2;
        }
        if (angle >= 89.99) {
            return this.tube.tubeHeight * 2;
        }
        for (var i = 0; i < this.angleInfos.length; i++) {
            var angleInfo = this.angleInfos[i];
            if (angle < angleInfo.angle) {
                var _width1 = angle == 90 ? this.tube.tubeHeight : curHeight * Math.tan(angle * this.Deg2Rad);
                var cosValue = Math.cos(angle * this.Deg2Rad);
                var _width2 = cosValue == 0 ? this.tube.tubeHeight : this.tube.tubeWidth / cosValue;
                var _width3 = this.tube.tubeWidth * cosValue;
                _width1 = this.GetWidth(_width1);
                _width2 = this.GetWidth(_width2);
                _width3 = this.GetWidth(_width3);
                w = Math.max(Math.max(_width1, _width2), _width3) * 2;
                break;
            }
        }
        return w;
    };
    WaterScript.prototype.Lerp = function (a, b, v) {
        return Utility.Lerp(a, b, v);
    };
    WaterScript.prototype.CalHeight = function (angle) {
        var h = 0;
        angle = Math.abs(angle);
        if (angle < 0.01) {
            return this.height;
        }
        if (angle >= 89.99) {
            return 0;
        }
        for (var i = 0; i < this.angleInfos.length; i++) {
            var angleInfo = this.angleInfos[i];
            if (angle < angleInfo.angle) {
                if (i == 0) {
                    var value = angle / angleInfo.angle;
                    var startH = this.height;
                    var endH = angleInfo.height;
                    h = this.Lerp(startH, endH, value);
                }
                else {
                    var prevInfo = this.angleInfos[i - 1];
                    var value = (angle - prevInfo.angle) / (angleInfo.angle - prevInfo.angle);
                    var startH = prevInfo.height;
                    var endH = angleInfo.height;
                    h = this.Lerp(startH, endH, value);
                }
                break;
            }
        }
        var aa = egret.Tween.get(this);
        return h;
    };
    WaterScript.prototype.SetFlow = function () {
        this.isFlow = true;
    };
    WaterScript.prototype.SetFull = function () {
        this.isFlow = false;
    };
    Object.defineProperty(WaterScript.prototype, "pullInTweener", {
        get: function () { return this.tweener; },
        enumerable: true,
        configurable: true
    });
    WaterScript.prototype.DealPullIn = function (duration) {
        var _this = this;
        this.SetFlow();
        var realHeight = this.RealHeight;
        if (this.tweener == null) {
            this.tweener = egret.Tween.get(this);
            this.tweener.to({ "sizeY": realHeight }, duration * 1000).call(function () {
                _this.SetFull();
                _this.OnPullInDone();
                _this.tweener = null;
            }, this);
        }
        else {
            egret.Tween.removeTweens(this);
            this.tweener = null;
            this.tweener = egret.Tween.get(this);
            this.tweener.to({ "sizeY": realHeight }, duration * 1000).call(function () {
                _this.SetFull();
                _this.OnPullInDone();
                _this.tweener = null;
            }, this);
        }
    };
    WaterScript.prototype.OnPullInDone = function () {
        this.tube.DoPullInComplete(this.tube);
    };
    WaterScript.prototype.SetHideTextActive = function (active) {
        if (active) {
            this.hideTxt.alpha = 1;
        }
        else {
            this.hideTxt.alpha = 0;
        }
    };
    WaterScript.prototype.RefreshUI = function () {
        this.SetSize(this.waterWidth, this.RealHeight);
    };
    WaterScript.prototype.Destroy = function () {
        this.parent.removeChild(this);
        this.removeChild(this.water);
        this.removeChild(this.waterFlow);
        if (this.hide != null) {
            this.removeChild(this.hide);
            delete this.hide;
            this.hide = null;
        }
        if (this.hideTxt != null) {
            this.removeChild(this.hideTxt);
            delete this.hideTxt;
            this.hideTxt = null;
        }
        delete this.water;
        delete this.waterFlow;
        this.water = null;
        this.waterFlow = null;
    };
    return WaterScript;
}(egret.DisplayObjectContainer));
__reflect(WaterScript.prototype, "WaterScript");
//# sourceMappingURL=WaterScript.js.map