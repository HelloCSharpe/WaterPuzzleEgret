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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.datas1 = [];
        _this.datas2 = [];
        _this.datas3 = [];
        _this.togLen = 3;
        _this.togIndex = 0;
        //默认态，选中态
        _this.togBgColors = ["#513007", "#D3A74F"];
        _this.togIconColors = ["#B48B5D", "#FFFFFF"];
        return _this;
    }
    ShopScene.prototype.onComplete = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args[0] != null) {
            this.togIndex = args[0];
        }
        else {
            this.togIndex = 0;
        }
        this.InitBG();
        this.InitDiamons();
        this.InitTitleTXT();
        this.InitCloseBtn();
        this.InitTopTogs();
        this.InitScrollView();
        this.InitGridAndDatas();
        this.OnTogClick(this.togIndex);
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
    ShopScene.prototype.InitDiamons = function () {
        var diamonResName = "icon1_png";
        // if(this.gameType==GameType.Normal){
        //     diamonResName="icon1_png";
        // }else if(this.gameType==GameType.Difficult){
        //     diamonResName="icon1_png";
        // }else if(this.gameType==GameType.Purgatory){
        //     diamonResName="icon1_png";
        // }
        if (this.diamonLayout == null) {
            this.diamonLayout = new egret.DisplayObjectContainer();
            this.diamonLayout.width = 210;
            this.diamonLayout.height = 60;
            this.diamonLayout.x = 30;
            this.diamonLayout.y = 30;
            this.addChild(this.diamonLayout);
            var diamonBG = this.createBitmapByName("di_png");
            diamonBG.fillMode = egret.BitmapFillMode.SCALE;
            diamonBG.width = this.diamonLayout.width;
            diamonBG.height = this.diamonLayout.height;
            this.diamonLayout.addChild(diamonBG);
            var diamonIcon = this.createBitmapByName(diamonResName);
            diamonIcon.name = "diamonIcon";
            diamonIcon.width = 90;
            diamonIcon.height = 90;
            diamonIcon.anchorOffsetX = diamonIcon.width / 2;
            diamonIcon.anchorOffsetY = diamonIcon.height / 2;
            diamonIcon.x = diamonIcon.width / 2;
            diamonIcon.y = this.diamonLayout.height / 2;
            this.diamonLayout.addChild(diamonIcon);
            var diamonTxt = new egret.TextField();
            diamonTxt.text = String(PlayerData.Instance.diamon);
            diamonTxt.fontFamily = "myFirstFont";
            diamonTxt.textColor = 0xFFFFFF;
            diamonTxt.textAlign = egret.HorizontalAlign.LEFT; //水平右对齐，相对于 textField 控件自身的 width 与 height
            diamonTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
            diamonTxt.width = this.diamonLayout.width - diamonIcon.width;
            diamonTxt.height = this.diamonLayout.height;
            diamonTxt.x = diamonIcon.width;
            diamonTxt.y = 0;
            diamonTxt.size = 36;
            this.diamonTxt = diamonTxt;
            this.diamonLayout.addChild(diamonTxt);
        }
        else {
            this.diamonTxt.text = String(PlayerData.Instance.diamon);
            var diamonIcon = this.diamonLayout.getChildByName("diamonIcon");
            diamonIcon.texture = RES.getRes(diamonResName);
        }
    };
    ShopScene.prototype.InitTitleTXT = function () {
        if (this.titleTXT == null) {
            var s = "商店";
            this.titleTXT = this.createTextField(300, 60, 0xFFFFFF, 42, s);
            this.titleTXT.textAlign = egret.HorizontalAlign.CENTER;
            this.titleTXT.x = SceneManager.ScreenWidth / 2 - this.titleTXT.width / 2;
            this.titleTXT.y = 30;
            this.addChild(this.titleTXT);
        }
    };
    ShopScene.prototype.InitCloseBtn = function () {
        if (this.closeBtn == null) {
            var topOffset = 70; //距离顶部的高度
            this.closeBtn = this.createBitmapByName("close2_png");
            this.closeBtn.fillMode = egret.BitmapFillMode.SCALE;
            this.closeBtn.width = 60;
            this.closeBtn.height = 60;
            this.closeBtn.x = SceneManager.ScreenWidth - this.closeBtn.width - 30;
            this.closeBtn.y = topOffset;
            this.addChild(this.closeBtn);
        }
    };
    ShopScene.prototype.InitTopTogs = function () {
        if (this.topTogs == null) {
            this.topTogs = [];
            var len = this.togLen;
            var paddingLeft = 50;
            var offset = 5;
            var w = (SceneManager.ScreenWidth - paddingLeft * 2 - (len - 1) * offset) / 3;
            var h = 60;
            var paddingTop = SceneManager.ScreenHeight * 0.25 - 70;
            for (var i = 0; i < len; i++) {
                var togRes = "tog1_png";
                if (i == 0) {
                    togRes = "tog1_png";
                }
                else if (i == len - 1) {
                    togRes = "tog3_png";
                }
                else {
                    togRes = "tog2_png";
                }
                var tog = this.createButton(togRes, w, h);
                tog.x = paddingLeft + (w + offset) * i;
                tog.y = paddingTop;
                var btnBg = tog.getChildByName("btnBg");
                Utility.setImageColor(btnBg, Utility.ColorHTMLToInt(this.togBgColors[0]));
                var icon = this.createBitmapByName("tog_icon" + (i + 1) + "_png", 54, 54, true);
                Utility.setImageColor(icon, Utility.ColorHTMLToInt(this.togIconColors[0]));
                icon.name = "icon";
                icon.x = w / 2;
                icon.y = h / 2;
                tog.addChild(icon);
                this.addChild(tog);
                this.topTogs.push(tog);
            }
        }
    };
    ShopScene.prototype.InitScrollView = function () {
        if (this.scrollView == null) {
            var w = SceneManager.ScreenWidth - 160;
            var h = SceneManager.ScreenHeight / 2;
            var aX = w / 2;
            var aY = h / 2;
            var x = SceneManager.ScreenWidth / 2;
            var y = SceneManager.ScreenHeight / 2 + 30;
            this.scrollView = new LzyScrollView(true, w, h, x, y, aX, aY, "white_jpg");
            this.addChild(this.scrollView);
        }
    };
    ShopScene.prototype.InitGridAndDatas = function () {
        if (this.diamonGrid == null) {
            var w = this.scrollView.width;
            var h = 100;
            this.diamonGrid = new DiamonGrid(this, w, h);
            var offset = 56;
            var w2 = (w - offset) / 2;
            var h2 = w2;
            this.tubeGrid = new TubeThemeGrid(this, w2, h2);
            var purcharseCfg = DataConfig.Instance.GetConfig("purchaser");
            var len = purcharseCfg.length;
            for (var i = 0; i < len; i++) {
                purcharseCfg[i];
            }
        }
    };
    ShopScene.prototype.OnTogClick = function (index) {
        if (this.topTogs[index] == null) {
            return;
        }
        var tog = this.topTogs[index];
        var btnBg = tog.getChildByName("btnBg");
        Utility.setImageColor(btnBg, Utility.ColorHTMLToInt(this.togBgColors[1]));
        var icon = tog.getChildByName("icon");
        Utility.setImageColor(icon, Utility.ColorHTMLToInt(this.togIconColors[1]));
        //刷新数据
        if (index == 0) {
        }
        else if (index == 1) {
        }
        else if (index == 2) {
        }
    };
    ShopScene.prototype.Update = function () {
    };
    ShopScene.prototype.addListener = function () {
        Utility.ButtonActive2(this.closeBtn, true);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
        var len = this.togLen;
        for (var i = 0; i < len; i++) {
        }
    };
    ShopScene.prototype.removeListener = function () {
    };
    ShopScene.prototype.closeBtnClick = function () {
    };
    ShopScene.prototype.togClick = function (index) {
    };
    return ShopScene;
}(Scene));
__reflect(ShopScene.prototype, "ShopScene");
var DiamonData = (function () {
    function DiamonData() {
    }
    return DiamonData;
}());
__reflect(DiamonData.prototype, "DiamonData");
var DiamonGrid = (function () {
    function DiamonGrid(s, w, h) {
        this.scene = s;
        this._width = w;
        this._height = h;
    }
    DiamonGrid.prototype.width = function () {
        return this._width;
    };
    DiamonGrid.prototype.height = function () {
        return this._height;
    };
    DiamonGrid.prototype.InitDataUI = function (container, data) {
    };
    DiamonGrid.prototype.Destroy = function (container) {
    };
    return DiamonGrid;
}());
__reflect(DiamonGrid.prototype, "DiamonGrid", ["IScrollViewGrid"]);
var TubeThemeData = (function () {
    function TubeThemeData() {
    }
    return TubeThemeData;
}());
__reflect(TubeThemeData.prototype, "TubeThemeData");
var TubeThemeGrid = (function () {
    function TubeThemeGrid(s, w, h) {
        this.scene = s;
        this._width = w;
        this._height = h;
    }
    TubeThemeGrid.prototype.width = function () {
        return this._width;
    };
    TubeThemeGrid.prototype.height = function () {
        return this._height;
    };
    TubeThemeGrid.prototype.InitDataUI = function (container, data) {
    };
    TubeThemeGrid.prototype.Destroy = function (container) {
    };
    return TubeThemeGrid;
}());
__reflect(TubeThemeGrid.prototype, "TubeThemeGrid", ["IScrollViewGrid"]);
//# sourceMappingURL=ShopScene.js.map