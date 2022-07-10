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
var GameOperate = (function () {
    function GameOperate(src, tar, clr, num) {
        this.src = src;
        this.tar = tar;
        this.clr = clr;
        this.num = num;
    }
    return GameOperate;
}());
__reflect(GameOperate.prototype, "GameOperate");
var GameType;
(function (GameType) {
    GameType[GameType["Normal"] = 0] = "Normal";
    GameType[GameType["Difficult"] = 1] = "Difficult";
})(GameType || (GameType = {}));
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tubes = [];
        _this.curSelectTube = null;
        _this.operateStack = []; //行动堆栈
        _this.gameType = GameType.Normal;
        _this.levelId = 1; //当前关卡
        _this.isSetChild = false;
        return _this;
    }
    GameScene.prototype.onComplete = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.InitParams.apply(this, args);
        this.InitBG();
        this.InitDiamons();
        this.InitLevelTxt();
        this.InitPauseBtn();
        this.InitTubeContainer();
        this.InitBottomBtn();
        this.InitMask();
        this.LoadLevel();
    };
    GameScene.prototype.InitParams = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args[0] != null) {
            if (args[0] == 0) {
                this.gameType = GameType.Normal;
            }
            else if (args[0] == 1) {
                this.gameType = GameType.Difficult;
            }
        }
        else {
            this.gameType = GameType.Normal;
        }
        if (args[1] != null) {
            this.levelId = args[1];
        }
        else {
            this.levelId = PlayerData.Instance.GetCurLevel(this.gameType);
        }
    };
    GameScene.prototype.InitBG = function () {
        var themeId = PlayerData.Instance.curThemeID;
        var themeData = DataConfig.Instance.GetDataByIndex("theme", themeId);
        var resName = themeData == null ? "bg_1_png" : themeData.bgSprite;
        if (this.bg == null) {
            this.bg = this.createBitmapByName(resName);
            this.bg.fillMode = egret.BitmapFillMode.SCALE;
            this.bg.width = SceneManager.ScreenWidth;
            this.bg.height = SceneManager.ScreenHeight;
            this.addChild(this.bg);
        }
        else {
            var texture = RES.getRes(resName);
            this.bg.texture = texture;
        }
    };
    GameScene.prototype.InitDiamons = function () {
        var diamonResName = "icon1_png";
        if (this.gameType == GameType.Normal) {
            diamonResName = "icon1_png";
        }
        else if (this.gameType == GameType.Difficult) {
            diamonResName = "icon10_png";
        }
        var num = PlayerData.Instance.GetDiamons(this.gameType);
        if (this.diamonLayout == null) {
            this.diamonLayout = GameUtil.createDiamonLayout(diamonResName, num);
            this.diamonLayout.x = 30;
            this.diamonLayout.y = 30;
            this.addChild(this.diamonLayout);
        }
        else {
            GameUtil.changeDiamonIconAndNum(this.diamonLayout, diamonResName, num);
        }
    };
    GameScene.prototype.InitLevelTxt = function () {
        var s = "LEVEL " + String(this.levelId);
        if (this.levelTxt == null) {
            this.levelTxt = this.createTextField(300, 60, 0xFFFFFF, 30, s);
            this.levelTxt.textAlign = egret.HorizontalAlign.CENTER;
            this.levelTxt.x = SceneManager.ScreenWidth / 2 - this.levelTxt.width / 2;
            this.levelTxt.y = 30;
            this.addChild(this.levelTxt);
        }
        else {
            this.levelTxt.text = s;
        }
    };
    GameScene.prototype.InitPauseBtn = function () {
        var themeId = PlayerData.Instance.curThemeID;
        var themeData = DataConfig.Instance.GetDataByIndex("theme", themeId);
        var resName = "sun_png";
        this.isSun = true;
        if (themeData != null && themeData.tubeFgIndex == 1) {
            resName = "moon_png";
            this.isSun = false;
        }
        if (this.pauseBtn == null) {
            var topOffset = 70; //距离顶部的高度
            this.pauseBtn = this.createBitmapByName("btn3_png");
            this.pauseBtn.fillMode = egret.BitmapFillMode.SCALE;
            this.pauseBtn.width = 60;
            this.pauseBtn.height = 60;
            this.pauseBtn.x = SceneManager.ScreenWidth - this.pauseBtn.width - 30;
            this.pauseBtn.y = topOffset;
            this.addChild(this.pauseBtn);
            this.themeBtn = this.createBitmapByName(resName);
            this.themeBtn.fillMode = egret.BitmapFillMode.SCALE;
            this.themeBtn.width = 256 / 4;
            this.themeBtn.height = 360 / 4;
            this.themeBtn.x = SceneManager.ScreenWidth - this.themeBtn.width;
            this.themeBtn.y = this.pauseBtn.y + this.pauseBtn.height;
            this.addChild(this.themeBtn);
        }
        else {
            this.themeBtn.texture = RES.getRes(resName);
        }
    };
    GameScene.prototype.InitBottomBtn = function () {
        if (this.restartBtn != null) {
            this.backTxt.text = String(PlayerData.Instance.backNum);
            this.addTxt.text = String(PlayerData.Instance.newTubeNum);
            if (this.gameType == GameType.Normal) {
                if (this.getChildByName("addBtn") == null) {
                    this.addChild(this.addBtn);
                }
            }
            else {
                if (this.getChildByName("addBtn") != null) {
                    this.removeChild(this.addBtn);
                }
            }
            return;
        }
        var offsetX = SceneManager.ScreenWidth / 4;
        var btnWidth = 120;
        var btnHeight = 80;
        for (var i = 0; i < 3; i++) {
            var resName = i < 2 ? "btn1_png" : "btn2_png";
            var bottomBtn = this.createButton(resName, btnWidth, btnHeight);
            bottomBtn.anchorOffsetX = bottomBtn.width / 2;
            bottomBtn.anchorOffsetY = bottomBtn.height / 2;
            bottomBtn.x = offsetX * (i + 1);
            bottomBtn.y = SceneManager.ScreenHeight - 240;
            this.addChild(bottomBtn);
            if (i == 0) {
                var restartIcon = this.createBitmapByName("tag1_png");
                restartIcon.fillMode = egret.BitmapFillMode.SCALE;
                restartIcon.width = 84 * 0.6;
                restartIcon.height = 80 * 0.6;
                restartIcon.anchorOffsetX = restartIcon.width / 2;
                restartIcon.anchorOffsetY = restartIcon.height / 2;
                restartIcon.x = btnWidth / 2;
                restartIcon.y = btnHeight / 2;
                bottomBtn.addChild(restartIcon);
                this.restartBtn = bottomBtn;
            }
            else if (i == 1) {
                var backIcon = this.createBitmapByName("tag2_png");
                backIcon.fillMode = egret.BitmapFillMode.SCALE;
                backIcon.width = 84 * 0.6;
                backIcon.height = 80 * 0.6;
                backIcon.anchorOffsetX = backIcon.width / 2;
                backIcon.anchorOffsetY = backIcon.height / 2;
                backIcon.x = btnWidth / 2 - 20;
                backIcon.y = btnHeight / 2;
                bottomBtn.addChild(backIcon);
                var backNumStr = String(PlayerData.Instance.backNum);
                var backTxt = this.createTextField(btnWidth / 2 - 10, btnHeight, 0x3C0C0C, 30, backNumStr);
                backTxt.x = btnWidth / 2 + 10;
                bottomBtn.addChild(backTxt);
                this.backBtn = bottomBtn;
                this.backTxt = backTxt;
            }
            else {
                var addIcon = this.createBitmapByName("tag3_png");
                addIcon.fillMode = egret.BitmapFillMode.SCALE;
                addIcon.width = 84 * 0.6;
                addIcon.height = 80 * 0.6;
                addIcon.anchorOffsetX = addIcon.width / 2;
                addIcon.anchorOffsetY = addIcon.height / 2;
                addIcon.x = btnWidth / 2 - 20;
                addIcon.y = btnHeight / 2;
                bottomBtn.addChild(addIcon);
                bottomBtn.name = "addBtn";
                var str = String(PlayerData.Instance.newTubeNum);
                var addTxt = this.createTextField(btnWidth / 2 - 10, btnHeight, 0xFFFFFF, 30, str);
                addTxt.x = btnWidth / 2 + 10;
                bottomBtn.addChild(addTxt);
                this.addBtn = bottomBtn;
                this.addTxt = addTxt;
            }
        }
        if (this.gameType == GameType.Normal) {
            if (this.getChildByName("addBtn") == null) {
                this.addChild(this.addBtn);
            }
        }
        else {
            if (this.getChildByName("addBtn") != null) {
                this.removeChild(this.addBtn);
            }
        }
    };
    GameScene.prototype.InitTubeContainer = function () {
        if (this.tubeContainer != null) {
            return;
        }
        var topOffset = 220;
        var bottomOffset = 280;
        var tubeContainer = new egret.DisplayObjectContainer();
        tubeContainer.width = SceneManager.ScreenWidth;
        tubeContainer.height = SceneManager.ScreenHeight - topOffset - bottomOffset;
        tubeContainer.x = 0;
        tubeContainer.y = topOffset;
        this.tubeContainer = tubeContainer;
        this.addChild(tubeContainer);
    };
    GameScene.prototype.InitMask = function () {
        var maskGo = this.createBitmapByName("white_jpg");
        Utility.setImageColor(maskGo, 0x000000);
        maskGo.alpha = 0.4;
        maskGo.width = SceneManager.ScreenWidth;
        maskGo.height = SceneManager.ScreenHeight;
        maskGo.touchEnabled = true;
        this.maskGo = maskGo;
        this.isSetChild = false;
    };
    GameScene.prototype.SetMask = function (active) {
        if (active) {
            if (this.isSetChild) {
                return;
            }
            this.addChild(this.maskGo);
            this.isSetChild = true;
        }
        else {
            if (!this.isSetChild) {
                return;
            }
            this.removeChild(this.maskGo);
            this.isSetChild = false;
        }
    };
    GameScene.prototype.LoadLevel = function () {
        this.SetMask(false);
        if (this.operateStack.length > 0) {
            var len = this.operateStack.length;
            for (var i = len - 1; i >= 0; i--) {
                delete this.operateStack[i];
            }
            this.operateStack = [];
        }
        this.curSelectTube = null;
        this.hasAddNewTube = false;
        var levelId = this.levelId;
        var type = this.gameType; //根据type去加载对应的关卡信息
        var levelCfg = DataConfig.Instance.GetDataByIndex("level", levelId);
        while (levelCfg == null) {
            levelId -= 1;
            levelCfg = DataConfig.Instance.GetDataByIndex("level", levelId);
        }
        this.ClearTubes();
        var levelDatas = GameUtil.ParseLevelCfg(levelCfg.Config);
        this.InitTubes(levelDatas);
        this.SetTubesPostion();
        var s = "LEVEL " + String(this.levelId);
        this.levelTxt.text = s;
    };
    GameScene.prototype.ClearTubes = function () {
        this.tubeContainer.removeChildren();
        var len = this.tubes.length;
        for (var i = len - 1; i >= 0; i--) {
            this.tubes[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tubes[i].tubeClickFunc, this);
            this.tubes[i].Destroy();
            delete this.tubes[i];
        }
        this.tubes = [];
    };
    GameScene.prototype.InitTube = function (waterDatas, i) {
        var tube = new TubeScript();
        tube.name = String(i);
        tube.Init(waterDatas); //位置等到全部实例化完成后再统一设置位置
        var clickFunc = this.OnTubeClick.bind(this, i);
        tube.addEventListener(egret.TouchEvent.TOUCH_TAP, clickFunc, this);
        tube.tubeClickFunc = clickFunc;
        tube.SetPullInComplete(this.OnTubePullInComplete, this);
        this.tubeContainer.addChild(tube);
        this.tubes.push(tube);
    };
    GameScene.prototype.InitTubes = function (levelDatas) {
        var len = levelDatas.length;
        for (var i = 0; i < len; i++) {
            var waterDatas = levelDatas[i];
            this.InitTube(waterDatas, i);
        }
    };
    GameScene.prototype.SetTubesPostion = function () {
        var len = this.tubes.length;
        if (len < 5) {
            //单行
            var unitWidth = this.tubeContainer.width / len;
            var unitHeight = this.tubeContainer.height;
            for (var i = 0; i < len; i++) {
                var tube = this.tubes[i];
                var x = unitWidth * i + unitWidth / 2 - tube.tubeWidth / 2;
                var y = unitHeight / 2 - tube.tubeHeight / 2;
                tube.SetPosition(x, y);
                tube.y = y;
            }
        }
        else {
            //多行
            var topNum = Math.ceil(len / 2);
            var bottomNum = len - topNum;
            for (var i = 0; i < len; i++) {
                var tube = this.tubes[i];
                if (i < topNum) {
                    var unitWidth = this.tubeContainer.width / topNum;
                    var unitHeight = this.tubeContainer.height / 2;
                    var x = unitWidth * i + unitWidth / 2 - tube.tubeWidth / 2;
                    var y = unitHeight / 2 - tube.tubeHeight / 2;
                    tube.SetPosition(x, y);
                }
                else {
                    var unitWidth = this.tubeContainer.width / bottomNum;
                    var unitHeight = this.tubeContainer.height / 2;
                    var x = unitWidth * (i - topNum) + unitWidth / 2 - tube.tubeWidth / 2;
                    var y = this.tubeContainer.height / 2 + unitHeight / 2 - tube.tubeHeight / 2;
                    tube.SetPosition(x, y);
                }
            }
        }
    };
    GameScene.prototype.OnTubePullInComplete = function (tube) {
        if (tube.CheckOneWaterFull()) {
            // tube.Shack(0.7f, 4);
            tube.PlayOneWaterFullEffect(); //礼花特效
            AudioManager.Instance.PlaySound("complete_mp3");
        }
        if (this.CheckLevelComplete()) {
            this.LevelComplete();
        }
    };
    GameScene.prototype.CheckLevelComplete = function () {
        for (var i = 0; i < this.tubes.length; i++) {
            var tube = this.tubes[i];
            if (tube.CheckIsOneWaterFullOrEmpty() == false) {
                return false;
            }
        }
        return true;
    };
    GameScene.prototype.LevelComplete = function () {
        var _this = this;
        this.SetMask(true);
        this.intervalInt = egret.setInterval(function () {
            SceneManager.Instance.pushScene("ResultScene", _this.gameType, _this.levelId);
            egret.clearInterval(_this.intervalInt);
        }, this, 1000);
    };
    GameScene.prototype.OnTubeClick = function (index) {
        console.log("index", index);
        var tube = this.tubes[index];
        if (this.curSelectTube == null) {
            if (tube.canSelect()) {
                if (tube.Select()) {
                    this.curSelectTube = tube;
                }
            }
        }
        else {
            if (this.curSelectTube == tube) {
                if (this.curSelectTube.UnSelect()) {
                    this.curSelectTube = null;
                }
            }
            else {
                if (this.curSelectTube.canPull(tube)) {
                    this.RecordPullOperate(this.curSelectTube, tube);
                    this.curSelectTube.Pull(tube);
                    this.curSelectTube = null;
                }
                else {
                    // if (Settings.Shack)
                    // {
                    //     this.curSelectTube.Shack(0.2);
                    // }
                    if (this.curSelectTube.UnSelect()) {
                        this.curSelectTube = null;
                    }
                }
            }
        }
    };
    GameScene.prototype.RecordPullOperate = function (source, target) {
        var waterData = source.TopWaterData;
        var pullNum = source.canPullNum(target);
        var sourceIndex = Number(source.name);
        var targetIndex = Number(target.name);
        var operate = new GameOperate(sourceIndex, targetIndex, waterData.colorInt, pullNum);
        this.operateStack.push(operate);
    };
    GameScene.prototype.Update = function () {
    };
    GameScene.prototype.addListener = function () {
        this.diamonLayout.touchEnabled = true;
        this.diamonLayout.addEventListener(egret.TouchEvent.TOUCH_TAP, this.diamonClick, this);
        Utility.ButtonActive2(this.pauseBtn, true);
        this.pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pauseClick, this);
        this.themeBtn.touchEnabled = true;
        this.themeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.themeClick, this);
        Utility.ButtonActive(this.restartBtn, true);
        this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartClick, this);
        Utility.ButtonActive(this.backBtn, true);
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backClick, this);
        Utility.ButtonActive(this.addBtn, true);
        this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addTubeClick, this);
        EventCenter.AddListener(EventID.RefreshLevel, this.OnRefreshLevel, this);
    };
    GameScene.prototype.removeListener = function () {
        this.diamonLayout.touchEnabled = false;
        this.diamonLayout.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.diamonClick, this);
        Utility.ButtonActive2(this.pauseBtn, false);
        this.pauseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pauseClick, this);
        this.themeBtn.touchEnabled = false;
        this.themeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.themeClick, this);
        Utility.ButtonActive(this.restartBtn, false);
        this.restartBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.restartClick, this);
        Utility.ButtonActive(this.backBtn, false);
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backClick, this);
        Utility.ButtonActive(this.addBtn, false);
        this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addTubeClick, this);
        EventCenter.RemoveListener(EventID.RefreshLevel, this.OnRefreshLevel, this);
    };
    GameScene.prototype.diamonClick = function () {
        SceneManager.Instance.pushScene("ShopScene");
    };
    GameScene.prototype.pauseClick = function () {
        SceneManager.Instance.pushScene("PauseScene");
    };
    GameScene.prototype.themeClick = function () {
        if (this.isSun) {
            this.themeBtn.texture = RES.getRes("moon_png");
            this.isSun = false;
        }
        else {
            this.themeBtn.texture = RES.getRes("sun_png");
            this.isSun = true;
        }
        EventCenter.Notify(EventID.ThemeBtnClicked, this.isSun);
    };
    GameScene.prototype.restartClick = function () {
        this.LoadLevel();
    };
    GameScene.prototype.backClick = function () {
        var backNum = PlayerData.Instance.backNum;
        if (backNum <= 0) {
            //TODO:看广告+5个
            Utility.showNotiBox("看广告给5个回退道具");
            return;
        }
        if (this.operateStack.length == 0) {
            return;
        }
        backNum -= 1;
        PlayerData.Instance.backNum = backNum;
        this.backTxt.text = String(backNum);
        //执行具体内容
        var operate = this.operateStack.pop();
        var sourceIndex = operate.src;
        var targetIndex = operate.tar;
        this.tubes[sourceIndex].AddWaterByBackOperate(operate.clr, operate.num);
        this.tubes[targetIndex].RemoveWaterByBackOperate(operate.clr, operate.num);
    };
    GameScene.prototype.addTubeClick = function () {
        var newTubeNum = PlayerData.Instance.newTubeNum;
        if (newTubeNum <= 0) {
            //TODO:看广告+1个
            Utility.showNotiBox("看广告给1个试管道具");
            return;
        }
        if (this.hasAddNewTube) {
            return;
        }
        this.hasAddNewTube = true;
        newTubeNum -= 1;
        PlayerData.Instance.newTubeNum = newTubeNum;
        this.addTxt.text = String(newTubeNum);
        //执行具体内容
        var newTube = new TubeScript();
        var waterDatas = [];
        var i = this.tubes.length;
        this.InitTube(waterDatas, i);
        this.SetTubesPostion();
    };
    GameScene.prototype.OnRefreshLevel = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.gameType = args[0];
        this.levelId = args[1];
        this.InitDiamons();
        this.LoadLevel();
    };
    return GameScene;
}(Scene));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map