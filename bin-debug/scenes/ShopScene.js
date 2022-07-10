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
        _this.togFuncs = [];
        _this.TubeThemeSpacing = 30;
        return _this;
    }
    ShopScene.prototype.onComplete = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.togIndex = -1;
        var _index = 0;
        if (args[0] != null) {
            _index = args[0];
        }
        this.InitBG();
        this.InitDiamons();
        this.InitTitleTXT();
        this.InitCloseBtn();
        this.InitTopTogs();
        this.InitScrollView();
        this.InitGrid();
        this.InitDatas();
        this.OnTogClick(_index);
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
        var res1 = "icon1_png";
        var num1 = PlayerData.Instance.GetDiamons(GameType.Normal);
        var res2 = "icon10_png";
        var num2 = PlayerData.Instance.GetDiamons(GameType.Difficult);
        if (this.diamonLayout1 == null) {
            this.diamonLayout1 = GameUtil.createDiamonLayout(res1, num1);
            this.diamonLayout1.x = 30;
            this.diamonLayout1.y = 30;
            this.addChild(this.diamonLayout1);
        }
        else {
            GameUtil.changeDiamonIconAndNum(this.diamonLayout1, res1, num1);
        }
        if (this.diamonLayout2 == null) {
            this.diamonLayout2 = GameUtil.createDiamonLayout(res2, num2);
            this.diamonLayout2.x = 30;
            this.diamonLayout2.y = 100;
            this.addChild(this.diamonLayout2);
        }
        else {
            GameUtil.changeDiamonIconAndNum(this.diamonLayout2, res2, num2);
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
            var w = SceneManager.ScreenWidth - 120;
            var h = SceneManager.ScreenHeight / 2;
            var aX = w / 2;
            var aY = h / 2;
            var x = SceneManager.ScreenWidth / 2;
            var y = SceneManager.ScreenHeight / 2 + 30;
            this.scrollView = new LzyScrollView(true, w, h, x, y, aX, aY, "empty_png");
            this.scrollView.name = "diamonSV";
            this.addChild(this.scrollView);
        }
        if (this.scrollView2 == null) {
            var w = SceneManager.ScreenWidth - 120;
            var h = SceneManager.ScreenHeight / 2;
            var aX = w / 2;
            var aY = h / 2;
            var x = SceneManager.ScreenWidth / 2;
            var y = SceneManager.ScreenHeight / 2 + 30;
            this.scrollView2 = new LzyScrollView(true, w, h, x, y, aX, aY, "empty_png");
            this.scrollView2.name = "skinSV";
            this.addChild(this.scrollView2);
        }
    };
    ShopScene.prototype.SetScrollView = function (togIndex) {
        if (togIndex == 0) {
            if (this.getChildByName("diamonSV") == null) {
                this.addChild(this.scrollView);
            }
            if (this.getChildByName("skinSV") != null) {
                this.removeChild(this.scrollView2);
            }
        }
        else {
            if (this.getChildByName("diamonSV") != null) {
                this.removeChild(this.scrollView);
            }
            if (this.getChildByName("skinSV") == null) {
                this.addChild(this.scrollView2);
            }
        }
    };
    ShopScene.prototype.InitGrid = function () {
        if (this.diamonGrid == null) {
            var w = this.scrollView.width;
            var h = 120;
            this.diamonGrid = new DiamonGrid(this, w, h);
            var spacingX = this.TubeThemeSpacing;
            var paddingX = 0;
            var w2 = ((w - paddingX) + spacingX) / 2 - spacingX;
            var h2 = w2;
            this.tubeGrid = new TubeThemeGrid(this, w2, h2);
        }
    };
    ShopScene.prototype.InitDatas = function () {
        if (this.datas1.length == 0) {
            var purcharseCfg = DataConfig.Instance.GetConfig("purchaser");
            var len = purcharseCfg.length;
            for (var i = 0; i < len; i++) {
                var cfg = purcharseCfg[i];
                var data = new DiamonData();
                data.configId = cfg.ID;
                data.config = cfg;
                data.isGot = false;
                if (cfg.Type == 1) {
                    data.isGot = PlayerData.Instance.noAds;
                }
                this.datas1.push(data);
            }
        }
        else {
            var len1 = this.datas1.length;
            for (var i = 0; i < len1; i++) {
                var data = this.datas1[i];
                var id = data.configId;
                data.isGot = false;
                if (data.config.Type == 1) {
                    data.isGot = PlayerData.Instance.noAds;
                }
            }
        }
        if (this.datas2.length == 0) {
            var tubeConfig = DataConfig.Instance.GetConfig("tube");
            var len2 = tubeConfig.length;
            for (var i = 0; i < len2; i++) {
                var cfg = tubeConfig[i];
                var data = new TubeThemeData();
                var id = cfg.ID;
                data.configId = id;
                data.config = cfg;
                data.isTube = true;
                data.isUsed = (PlayerData.Instance.curTubeID == id);
                data.isOwn = PlayerData.Instance.isTubeContains(id);
                this.datas2.push(data);
            }
        }
        else {
            var len2 = this.datas2.length;
            for (var i = 0; i < len2; i++) {
                var data = this.datas2[i];
                var id = data.configId;
                data.isUsed = (PlayerData.Instance.curTubeID == id);
                data.isOwn = PlayerData.Instance.isTubeContains(id);
            }
        }
        if (this.datas3.length == 0) {
            var themeConfig = DataConfig.Instance.GetConfig("theme");
            var len3 = themeConfig.length;
            for (var i = 0; i < len3; i++) {
                var cfg = themeConfig[i];
                var data = new TubeThemeData();
                var id = cfg.ID;
                data.configId = id;
                data.config = cfg;
                data.isTube = false;
                data.isUsed = (PlayerData.Instance.curThemeID == id);
                data.isOwn = PlayerData.Instance.isThemeContains(id);
                this.datas3.push(data);
            }
        }
        else {
            var len3 = this.datas3.length;
            for (var i = 0; i < len3; i++) {
                var data = this.datas3[i];
                var id = data.configId;
                data.isUsed = (PlayerData.Instance.curThemeID == id);
                data.isOwn = PlayerData.Instance.isThemeContains(id);
            }
        }
    };
    ShopScene.prototype.OnTogClick = function (index) {
        if (this.topTogs[index] == null) {
            return;
        }
        if (this.togIndex == index) {
            return;
        }
        var tog = this.topTogs[index];
        var btnBg = tog.getChildByName("btnBg");
        Utility.setImageColor(btnBg, Utility.ColorHTMLToInt(this.togBgColors[1]));
        var icon = tog.getChildByName("icon");
        Utility.setImageColor(icon, Utility.ColorHTMLToInt(this.togIconColors[1]));
        if (this.togIndex >= 0) {
            var prevTog = this.topTogs[this.togIndex];
            var btnBg2 = prevTog.getChildByName("btnBg");
            Utility.setImageColor(btnBg2, Utility.ColorHTMLToInt(this.togBgColors[0]));
            var icon2 = prevTog.getChildByName("icon");
            Utility.setImageColor(icon2, Utility.ColorHTMLToInt(this.togIconColors[0]));
        }
        this.togIndex = index;
        var sp = this.TubeThemeSpacing;
        //刷新数据
        if (index == 0) {
            this.scrollView.SetContent(0, 10, this.datas1, this.diamonGrid, 0, 0);
        }
        else if (index == 1) {
            this.scrollView2.SetContent(sp, sp, this.datas2, this.tubeGrid);
        }
        else if (index == 2) {
            this.scrollView2.SetContent(sp, sp, this.datas3, this.tubeGrid);
        }
        this.SetScrollView(index);
    };
    ShopScene.prototype.addDiamonEventListener = function (btn) {
        Utility.ButtonActive(btn, true);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.DiamonClick.bind(this, btn), this);
    };
    ShopScene.prototype.addTubeClickListener = function (btn) {
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TubeThemeClick.bind(this, btn), this);
    };
    ShopScene.prototype.Update = function () {
    };
    ShopScene.prototype.addListener = function () {
        Utility.ButtonActive2(this.closeBtn, true);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
        var len = this.togLen;
        for (var i = 0; i < len; i++) {
            this.togFuncs[i] = this.togClick.bind(this, i);
            this.topTogs[i].touchEnabled = true;
            this.topTogs[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.togFuncs[i], this);
        }
    };
    ShopScene.prototype.removeListener = function () {
        Utility.ButtonActive2(this.closeBtn, false);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
        var len = this.togLen;
        for (var i = 0; i < len; i++) {
            this.topTogs[i].touchEnabled = false;
            this.topTogs[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.togFuncs[i], this);
        }
    };
    ShopScene.prototype.closeBtnClick = function () {
        AudioManager.Instance.PlaySound("btnback_wav");
        SceneManager.Instance.popScene();
    };
    ShopScene.prototype.togClick = function (index) {
        console.log("index", index);
        this.OnTogClick(index);
    };
    ShopScene.prototype.DiamonClick = function (btn) {
        console.log(btn.parent.name);
        var index = Number(btn.name);
        var data = this.datas1[index];
        var type = data.config.Type; //根据具体类型处理
        if (type == 0) {
            //TODO:需要去调用微信API
        }
        else if (type == 1) {
            //云开发购买
        }
        else if (type == 2) {
        }
    };
    ShopScene.prototype.TubeThemeClick = function (btn) {
        console.log(btn.name);
        if (this.togIndex == 1) {
            var index = Number(btn.name);
        }
        else {
        }
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
        this.parser = new egret.HtmlTextParser();
    }
    DiamonGrid.prototype.width = function () {
        return this._width;
    };
    DiamonGrid.prototype.height = function () {
        return this._height;
    };
    //每个btn都会对应一个data，需要在Scene里面进行绑定
    DiamonGrid.prototype.InitDataUI = function (container, data) {
        //#AEAEAE
        if (container.getChildByName("itemBg") == null) {
            var itemBg = Utility.createBitmapByName("di3_png", this._width, this._height);
            itemBg.name = "itemBg";
            container.addChild(itemBg);
        }
        var iconRes = data.config.Icon;
        if (container.getChildByName("purchaserIcon") == null) {
            var w = this._height * 0.75;
            var h = this._height * 0.75;
            var icon = Utility.createBitmapByName(iconRes, w, h, true);
            icon.x = this._height / 2;
            icon.y = this._height / 2;
            icon.name = "purchaserIcon";
            container.addChild(icon);
        }
        else {
            var icon = container.getChildByName("purchaserIcon");
            icon.texture = RES.getRes(iconRes);
        }
        var btnWidth = 140;
        var paddingRight = 40;
        var desc = this.parser.parse(data.config.Desc);
        if (container.getChildByName("descTxt") == null) {
            var w = this._width - this._height - paddingRight - btnWidth;
            var descTxt = Utility.createTextField(w, this._height, 0xFFFFFF, 26, "", "myFirstFont");
            descTxt.textFlow = desc;
            descTxt.x = this._height;
            descTxt.name = "descTxt";
            container.addChild(descTxt);
        }
        else {
            var descTxt = container.getChildByName("descTxt");
            descTxt.textFlow = desc;
        }
        var priceIconRes = data.config.PriceIcon;
        var priceStr = data.config.Price;
        var priceBtnColor = data.config.BtnColor;
        if (container.getChildByName("btn") == null) {
            var w = btnWidth;
            var h = 50;
            var priceBtn = Utility.createButton("di4_png", w, h, true);
            var btnBg = priceBtn.getChildByName("btnBg");
            if (data.isGot == false) {
                Utility.setImageColor(btnBg, Utility.ColorHTMLToInt(priceBtnColor));
            }
            else {
                Utility.setImageColor(btnBg, Utility.ColorHTMLToInt("#AEAEAE"));
            }
            priceBtn.name = "btn";
            priceBtn.x = this._width - priceBtn.width / 2 - paddingRight;
            priceBtn.y = this._height / 2;
            container.addChild(priceBtn);
            this.scene.addDiamonEventListener(priceBtn);
            var priceIcon = Utility.createBitmapByName(priceIconRes, 32, 32, true);
            priceIcon.name = "priceIcon";
            priceIcon.x = 8 + priceIcon.width / 2;
            priceIcon.y = h / 2;
            priceBtn.addChild(priceIcon);
            var txt_width = w - 8 - priceIcon.width - 8;
            var priceTxt = Utility.createTextField(txt_width, h, 0xFFFFFF, 26, priceStr, "myFirstFont");
            priceTxt.textAlign = egret.HorizontalAlign.LEFT;
            priceTxt.name = "priceTxt";
            priceTxt.x = 8 + priceIcon.width + 8;
            priceTxt.y = 0;
            priceBtn.addChild(priceTxt);
        }
        else {
            var priceBtn = container.getChildByName("btn");
            var btnBg = priceBtn.getChildByName("btnBg");
            if (data.isGot == false) {
                Utility.setImageColor(btnBg, Utility.ColorHTMLToInt(priceBtnColor));
            }
            else {
                Utility.setImageColor(btnBg, Utility.ColorHTMLToInt("#AEAEAE"));
            }
            var priceIcon = priceBtn.getChildByName("priceIcon");
            priceIcon.texture = RES.getRes(priceIconRes);
            var priceTxt = priceBtn.getChildByName("priceTxt");
            priceTxt.text = priceStr;
        }
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
        if (container.getChildByName("itemBg") == null) {
            var itemBg = Utility.createBitmapByName("di3_png", this._width, this._height);
            itemBg.name = "itemBg";
            container.addChild(itemBg);
            this.scene.addTubeClickListener(container);
        }
        var isTube = data.isTube;
        var iconRes = data.isTube ? data.config.eftSprite : data.config.ShowSprite;
        if (container.getChildByName("icon") == null) {
            var w = this._width * 0.6;
            var h = w;
            var icon = Utility.createBitmapByName(iconRes, w, h, true);
            icon.name = "icon";
            icon.x = this._width / 2;
            icon.y = this._height / 2 - 30;
            container.addChild(icon);
        }
        else {
            var icon = container.getChildByName("icon");
            icon.texture = RES.getRes(iconRes);
        }
        var isOwn = data.isOwn;
        var isUsed = data.isUsed;
        if (container.getChildByName("lock") == null) {
            var w = 42; //80
            var h = w;
            var lock = Utility.createBitmapByName("lock_png", w, h);
            lock.x = 15;
            lock.y = 15;
            lock.name = "lock";
            lock.alpha = isOwn ? 0 : 1;
            container.addChild(lock);
        }
        else {
            var lock = container.getChildByName("lock");
            lock.alpha = isOwn ? 0 : 1;
        }
        //打勾
        if (container.getChildByName("check") == null) {
            var w = 100;
            var h = w;
            var check = Utility.createBitmapByName("check_png", w, h, true);
            check.name = "check";
            check.x = this._width / 2;
            check.y = this._height - 40;
            check.alpha = isUsed ? 1 : 0;
            container.addChild(check);
        }
        else {
            var check = container.getChildByName("check");
            check.alpha = isUsed ? 1 : 0;
        }
        //可以使用
        if (container.getChildByName("txt") == null) {
            var w = this._width;
            var h = 50;
            var txt = Utility.createTextField(w, h, 0xFFFFFF, 26, "可以使用", "myFirstFont");
            txt.textAlign = egret.HorizontalAlign.CENTER;
            txt.name = "txt";
            txt.x = 0;
            txt.y = this._height - h;
            txt.alpha = isUsed ? 0 : (isOwn ? 1 : 0);
            container.addChild(txt);
        }
        else {
            var txt = container.getChildByName("txt");
            txt.alpha = isUsed ? 0 : (isOwn ? 1 : 0);
        }
        //消耗
        var CostType = data.config.CostType;
        var iconResName = CostType == 1 ? "icon1_png" : "icon10_png";
        var costStr = String(data.config.Cost);
        if (container.getChildByName("cost") == null) {
            var w = this._width * 0.5;
            var h = 40;
            var cost = Utility.createButton("di_png", w, h, true);
            cost.name = "cost";
            cost.x = this._width / 2;
            cost.y = this._height - 40;
            var costIcon = Utility.createBitmapByName(iconResName, 50, 50, true);
            costIcon.name = "costIcon";
            costIcon.x = 10;
            costIcon.y = cost.height / 2;
            cost.addChild(costIcon);
            var costTxt = Utility.createTextField(w, h, 0xFFFFFF, 24, costStr, "myFirstFont");
            costTxt.textAlign = egret.HorizontalAlign.CENTER;
            costTxt.name = "costTxt";
            cost.addChild(costTxt);
            container.addChild(cost);
            cost.scaleX = isOwn ? 0 : 1;
            cost.scaleY = isOwn ? 0 : 1;
        }
        else {
            var cost = container.getChildByName("cost");
            var costIcon = cost.getChildByName("costIcon");
            costIcon.texture = RES.getRes(iconResName);
            var costTxt = cost.getChildByName("costTxt");
            costTxt.text = costStr;
            cost.scaleX = isOwn ? 0 : 1;
            cost.scaleY = isOwn ? 0 : 1;
        }
    };
    TubeThemeGrid.prototype.Destroy = function (container) {
    };
    return TubeThemeGrid;
}());
__reflect(TubeThemeGrid.prototype, "TubeThemeGrid", ["IScrollViewGrid"]);
//# sourceMappingURL=ShopScene.js.map