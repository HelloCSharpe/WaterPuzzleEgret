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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levels = [];
        _this.spacing = 20;
        _this.lineCount = 5;
        return _this;
    }
    SelectLevelScene.prototype.onComplete = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length > 0) {
            this.gameType = args[0];
        }
        else {
            this.gameType = GameType.Normal;
        }
        this.InitBG();
        this.InitTitleTXT();
        this.InitCloseBtn();
        this.InitLevelScrollView();
        this.InitLevelDatas();
        this.InitBottom();
        this.RefreshLevelDatas();
    };
    SelectLevelScene.prototype.InitBG = function () {
        if (this.bg == null) {
            this.bg = this.createBitmapByName("bg_1_png");
            this.bg.fillMode = egret.BitmapFillMode.SCALE;
            this.bg.width = SceneManager.ScreenWidth;
            this.bg.height = SceneManager.ScreenHeight;
            this.addChild(this.bg);
        }
    };
    SelectLevelScene.prototype.InitTitleTXT = function () {
        if (this.titleTXT == null) {
            var s = "选择关卡";
            this.titleTXT = this.createTextField(300, 60, 0xFFFFFF, 42, s);
            this.titleTXT.textAlign = egret.HorizontalAlign.CENTER;
            this.titleTXT.x = SceneManager.ScreenWidth / 2 - this.titleTXT.width / 2;
            this.titleTXT.y = 30;
            this.addChild(this.titleTXT);
        }
    };
    SelectLevelScene.prototype.InitCloseBtn = function () {
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
    SelectLevelScene.prototype.InitLevelScrollView = function () {
        if (this.scrollView == null) {
            var paddingTop = 140;
            var paddingBottom = 270;
            var w = SceneManager.ScreenWidth - 120;
            var h = SceneManager.ScreenHeight - paddingTop - paddingBottom;
            var x = 60;
            var y = paddingTop;
            this.scrollView = new LzyScrollView(true, w, h, x, y, 0, 0, "empty_png");
            this.scrollView.name = "levelSV";
            this.addChild(this.scrollView);
        }
        if (this.levelGrid == null) {
            var w = (this.scrollView.width + this.spacing) / this.lineCount - this.spacing;
            this.levelGrid = new LevelGrid(this, w, w);
        }
    };
    SelectLevelScene.prototype.InitLevelDatas = function () {
        var curLevel = PlayerData.Instance.GetCurLevel(this.gameType);
        this.levelMax = curLevel;
        var pageCount = Math.ceil(curLevel / 100);
        if (pageCount < 1) {
            pageCount = 1;
        }
        this.pageMax = pageCount;
        this.pageIndex = 1; //[1,pageMax]
    };
    SelectLevelScene.prototype.RefreshLevelDatas = function () {
        var startLevel = 1 + 100 * (this.pageIndex - 1);
        var endLevel = startLevel + 100;
        this.levels = [];
        for (var i = startLevel; i < endLevel; i++) {
            if (i <= this.levelMax) {
                this.levels.push(i);
            }
        }
        this.RefreshScrollView();
        this.pageTxt.text = String(this.pageIndex);
        if (this.pageIndex == 1) {
            if (this.getChildByName("leftBtn") != null) {
                this.removeChild(this.bottomLeftBtn);
            }
        }
        else {
            if (this.getChildByName("leftBtn") == null) {
                this.addChild(this.bottomLeftBtn);
            }
        }
        if (this.pageIndex == this.pageMax) {
            if (this.getChildByName("rightBtn") != null) {
                this.removeChild(this.bottomRightBtn);
            }
        }
        else {
            if (this.getChildByName("rightBtn") == null) {
                this.addChild(this.bottomRightBtn);
            }
        }
    };
    SelectLevelScene.prototype.RefreshScrollView = function () {
        this.scrollView.SetContent(this.spacing, this.spacing, this.levels, this.levelGrid);
    };
    SelectLevelScene.prototype.addBtnEventListener = function (btn) {
        Utility.ButtonActive(btn, true);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLevelBtnClick.bind(this, btn), this);
    };
    SelectLevelScene.prototype.onLevelBtnClick = function (btn) {
        var levelTxt = btn.getChildByName("levelTxt");
        console.log(levelTxt.text);
        var selectLevel = Number(levelTxt.text);
        console.log(SceneManager.Instance.GetCurScene().name);
        if (SceneManager.Instance.GetCurScene().name == "StartScene") {
            SceneManager.Instance.popScene();
            SceneManager.Instance.changeScene("GameScene", this.gameType, selectLevel);
        }
        else {
            SceneManager.Instance.popScene();
            EventCenter.Notify(EventID.RefreshLevel, this.gameType, selectLevel);
        }
    };
    SelectLevelScene.prototype.InitBottom = function () {
        if (this.bottomLeftBtn == null) {
            this.bottomLeftBtn = this.createBitmapByName("left_png", 50, 50, true);
            this.bottomLeftBtn.name = "leftBtn";
            this.bottomLeftBtn.fillMode = egret.BitmapFillMode.SCALE;
            this.bottomLeftBtn.x = SceneManager.ScreenWidth / 2 - 100;
            this.bottomLeftBtn.y = SceneManager.ScreenHeight - 220;
            this.addChild(this.bottomLeftBtn);
        }
        if (this.bottomRightBtn == null) {
            this.bottomRightBtn = this.createBitmapByName("right_png", 50, 50, true);
            this.bottomRightBtn.name = "rightBtn";
            this.bottomRightBtn.fillMode = egret.BitmapFillMode.SCALE;
            this.bottomRightBtn.x = SceneManager.ScreenWidth / 2 + 100;
            this.bottomRightBtn.y = SceneManager.ScreenHeight - 220;
            this.addChild(this.bottomRightBtn);
        }
        var pageStr = String(this.pageIndex);
        if (this.pageTxt == null) {
            this.pageTxt = this.createTextField(300, 100, 0xFFFFFF, 30, pageStr);
            this.pageTxt.textAlign = egret.HorizontalAlign.CENTER;
            this.pageTxt.anchorOffsetX = this.pageTxt.width / 2;
            this.pageTxt.anchorOffsetY = this.pageTxt.height / 2;
            this.pageTxt.x = SceneManager.ScreenWidth / 2;
            this.pageTxt.y = SceneManager.ScreenHeight - 220;
            this.addChild(this.pageTxt);
        }
        else {
            this.pageTxt.text = pageStr;
        }
    };
    SelectLevelScene.prototype.Update = function () {
    };
    SelectLevelScene.prototype.addListener = function () {
        Utility.ButtonActive2(this.closeBtn, true);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
        Utility.ButtonActive2(this.bottomLeftBtn, true);
        this.bottomLeftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bottomLeftBtnClick, this);
        Utility.ButtonActive2(this.bottomRightBtn, true);
        this.bottomRightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bottomRightBtnClick, this);
    };
    SelectLevelScene.prototype.removeListener = function () {
        Utility.ButtonActive2(this.closeBtn, false);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
        Utility.ButtonActive2(this.bottomLeftBtn, false);
        this.bottomLeftBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bottomLeftBtnClick, this);
        Utility.ButtonActive2(this.bottomRightBtn, false);
        this.bottomRightBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bottomRightBtnClick, this);
    };
    SelectLevelScene.prototype.closeBtnClick = function () {
        AudioManager.Instance.PlaySound("btnback_wav");
        SceneManager.Instance.popScene();
    };
    SelectLevelScene.prototype.bottomLeftBtnClick = function () {
        if (this.pageIndex == 1) {
            return;
        }
        this.pageIndex -= 1;
        this.RefreshLevelDatas();
    };
    SelectLevelScene.prototype.bottomRightBtnClick = function () {
        if (this.pageIndex == this.pageMax) {
            return;
        }
        this.pageIndex += 1;
        this.RefreshLevelDatas();
    };
    return SelectLevelScene;
}(Scene));
__reflect(SelectLevelScene.prototype, "SelectLevelScene");
var LevelGrid = (function () {
    function LevelGrid(scene, w, h) {
        this.scene = scene;
        this._width = w;
        this._height = h;
    }
    LevelGrid.prototype.width = function () {
        return this._width;
    };
    LevelGrid.prototype.height = function () {
        return this._height;
    };
    LevelGrid.prototype.InitDataUI = function (container, data) {
        var levelNum = String(data);
        if (container.getChildByName("btn") == null) {
            var btn = Utility.createButton("btn4_png", this._width, this._height, true);
            btn.name = "btn";
            btn.x = this._width / 2;
            btn.y = this._height / 2;
            var txt = Utility.createTextField(this._width, this._height, 0xFFFFFF, 40, levelNum);
            txt.name = "levelTxt";
            txt.textAlign = egret.HorizontalAlign.CENTER;
            btn.addChild(txt);
            container.addChild(btn);
            this.scene.addBtnEventListener(btn);
        }
        else {
            var btn = container.getChildByName("btn");
            var txt = btn.getChildByName("levelTxt");
            txt.text = levelNum;
        }
        // let btn = container.getChildByName("btn")as egret.DisplayObjectContainer;
        // let txt=btn.getChildByName("levelTxt")as egret.TextField;
        // txt.text=String(container.hashCode);
    };
    LevelGrid.prototype.Destroy = function (container) {
    };
    return LevelGrid;
}());
__reflect(LevelGrid.prototype, "LevelGrid", ["IScrollViewGrid"]);
//# sourceMappingURL=SelectLevelScene.js.map