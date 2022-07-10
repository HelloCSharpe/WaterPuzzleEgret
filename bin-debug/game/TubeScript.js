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
var PullDir;
(function (PullDir) {
    PullDir[PullDir["Left"] = 0] = "Left";
    PullDir[PullDir["Right"] = 1] = "Right";
})(PullDir || (PullDir = {}));
var TubeScript = (function (_super) {
    __extends(TubeScript, _super);
    function TubeScript() {
        var _this = _super.call(this) || this;
        _this.tubeWidth = 80; //试管宽度
        _this.tubeHeight = 308; //试管高度
        _this.tubeSlash = 318; //试管斜线长度：根号（宽度*宽度+高度*高度）
        _this.waterWidth = 80;
        _this.waterHeight = 66;
        _this.tubeMouthWidth = 80; //试管瓶口宽度
        _this.flowLength = 450; //水流的高度
        _this.onPullInComplete = null;
        _this.pullInObj = null;
        _this._pullDir = PullDir.Left; //倾倒方向
        _this.pullTweener = null;
        _this.PullStartTime = 0.4; //从初始位置到倾倒位置的时间
        _this.PullTimes = [0.72, 1.26, 1.92, 2.52]; //倾倒时间
        _this.PullEndTime = 0.4; //倾倒完成后到初始位置时间
        _this.selectHeight = 69;
        _this.InitParams();
        _this.InitUI();
        _this.RefreshTubeType();
        _this.addListener();
        _this.touchEnabled = true;
        return _this;
    }
    Object.defineProperty(TubeScript.prototype, "MaxWaterNum", {
        get: function () { return 4; },
        enumerable: true,
        configurable: true
    });
    TubeScript.prototype.TestFlow = function (flow) {
        if (this.waterUIScripts == null || this.waterUIScripts.length == 0) {
            return;
        }
        var len = this.waterUIScripts.length;
        for (var i = 0; i < len; i++) {
            if (flow) {
                this.waterUIScripts[i].SetFlow();
            }
            else {
                this.waterUIScripts[i].SetFull();
            }
        }
    };
    Object.defineProperty(TubeScript.prototype, "PullAngles", {
        //每个水对应的倾倒角度
        get: function () {
            return [90, 75, 60, 45, 30];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TubeScript.prototype, "pullDir", {
        get: function () { return this._pullDir; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TubeScript.prototype, "TopWaterData", {
        get: function () {
            if (this.waterUIScripts == null || this.waterUIScripts.length == 0) {
                return null;
            }
            var len = this.waterUIScripts.length;
            return this.waterUIScripts[len - 1].waterData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TubeScript.prototype, "TopWater", {
        get: function () {
            if (this.waterUIScripts == null || this.waterUIScripts.length == 0) {
                return null;
            }
            var len = this.waterUIScripts.length;
            return this.waterUIScripts[len - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TubeScript.prototype, "CurTotalWaterNum", {
        get: function () {
            var num = 0;
            if (this.waterUIScripts == null || this.waterUIScripts.length == 0) {
                return 0;
            }
            for (var i = 0; i < this.waterUIScripts.length; i++) {
                var waterData = this.waterUIScripts[i].waterData;
                num += waterData.num;
            }
            return num;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TubeScript.prototype, "PullTargetPos", {
        get: function () {
            var x = this.x;
            var y = this.y;
            x += this.waterWidth / 2;
            y = y + this.tubeHeight - this.flowLength - 5;
            return new Vector2(x, y);
        },
        enumerable: true,
        configurable: true
    });
    TubeScript.prototype.InitParams = function () {
        this.tubeSlash = Math.sqrt(this.tubeWidth * this.tubeWidth + this.tubeHeight * this.tubeHeight);
        this.waterWidth = this.tubeWidth;
        this.PullStartTime = DataConfig.Instance.SettingData.PullStartTime;
        this.PullTimes[0] = DataConfig.Instance.SettingData.PullTime1;
        this.PullTimes[1] = DataConfig.Instance.SettingData.PullTime2;
        this.PullTimes[2] = DataConfig.Instance.SettingData.PullTime3;
        this.PullTimes[3] = DataConfig.Instance.SettingData.PullTime4;
        this.PullEndTime = DataConfig.Instance.SettingData.PullEndTime;
        this.InitPivotPosition();
    };
    TubeScript.prototype.InitUI = function () {
        this.width = this.tubeWidth;
        this.height = this.tubeHeight;
        var _mask = Utility.createBitmapByName("pz_di_bt_1_2_png");
        _mask.fillMode = egret.BitmapFillMode.SCALE;
        _mask.width = 80;
        _mask.height = 302;
        this.waterMask = _mask;
        this.addChild(_mask);
        var container = new egret.DisplayObjectContainer();
        container.width = 80;
        container.height = 302;
        this.waterContainer = container;
        this.waterContainer.mask = _mask;
        this.addChild(container);
        var fg = Utility.createBitmapByName("pz_di_bt_1_1_png");
        fg.fillMode = egret.BitmapFillMode.SCALE;
        fg.width = 80;
        fg.height = 302;
        this.tubeFG = fg;
        this.addChild(fg);
        var flow = Utility.createBitmapByName("white_jpg");
        flow.fillMode = egret.BitmapFillMode.SCALE;
        flow.width = 5;
        flow.height = this.flowLength;
        flow.alpha = 0;
        this.waterFlow = flow;
        this.addChild(flow);
    };
    TubeScript.prototype.SetPullInComplete = function (callback, thisObj) {
        this.onPullInComplete = callback;
        this.pullInObj = thisObj;
    };
    TubeScript.prototype.DoPullInComplete = function (tube) {
        if (this.onPullInComplete != null) {
            this.onPullInComplete.bind(this.pullInObj)(tube);
        }
    };
    TubeScript.prototype.Init = function (waterDatas) {
        this.waterUIScripts = [];
        for (var i = 0; i < waterDatas.length; i++) {
            var waterData = waterDatas[i];
            if (waterData.orginId == 0) {
                return;
            }
            var water = new WaterScript();
            water.Init(this, waterData);
            if (i == 0) {
                water.SetPos(this.tubeWidth / 2, this.tubeHeight);
            }
            else {
                var prevWater = this.waterUIScripts[i - 1];
                var pos = prevWater.GetPos();
                water.SetPos(pos.x, pos.y - prevWater.RealHeight);
            }
            this.waterUIScripts.push(water);
        }
        this.CloseHideImage();
    };
    TubeScript.prototype.EnqueueWater = function (waterData, isPullIn) {
        if (isPullIn == null) {
            isPullIn = true;
        }
        var water = null;
        if (this.waterUIScripts.length == 0) {
            water = new WaterScript();
            water.Init(this, waterData);
            water.SetPos(this.tubeWidth / 2, this.tubeHeight);
            this.waterUIScripts.push(water);
            if (isPullIn) {
                water.SetSize(this.waterWidth, 0);
            }
        }
        else {
            var len = this.waterUIScripts.length;
            var _tmpWater = this.waterUIScripts[len - 1];
            if (_tmpWater.waterData.colorInt == waterData.colorInt) {
                _tmpWater.waterData.num += waterData.num;
                water = _tmpWater;
            }
            else {
                water = new WaterScript();
                water.Init(this, waterData);
                water.SetPos(this.tubeWidth / 2, _tmpWater.GetPos().y - _tmpWater.RealHeight);
                this.waterUIScripts.push(water);
                if (isPullIn) {
                    water.SetSize(this.waterWidth, 0);
                }
            }
        }
        return water;
    };
    TubeScript.prototype.DequeueWater = function () {
        if (this.waterUIScripts == null || this.waterUIScripts.length == 0) {
            return null;
        }
        var water = this.waterUIScripts.pop();
        return water;
    };
    TubeScript.prototype.isEmpty = function () {
        return this.waterUIScripts == null || this.waterUIScripts.length == 0;
    };
    TubeScript.prototype.isPullIn = function () {
        if (this._isPullIn) {
            return true;
        }
        for (var i = 0; i < this.waterUIScripts.length; i++) {
            if (this.waterUIScripts[i].pullInTweener != null) {
                return true;
            }
        }
        return false;
    };
    TubeScript.prototype.isPullOut = function () {
        if (this._isPullOut) {
            return true;
        }
        if (this.pullTweener != null) {
            return true;
        }
        return false;
    };
    TubeScript.prototype.canSelect = function () {
        if (this.isEmpty()) {
            return false;
        }
        if (this.isPullIn()) {
            return false;
        }
        if (this.isPullOut()) {
            return false;
        }
        return true;
    };
    TubeScript.prototype.Select = function () {
        if (TubeScript.selectTweener != null) {
            return false;
        }
        var len = this.parent.$children.length;
        this.parent.setChildIndex(this, len - 1);
        var v = this.pullDir2Position.get(PullDir.Left);
        var v2 = new Vector2(0, this.selectHeight);
        var pos = new Vector2(v.x + v2.x, v.y - v2.y);
        TubeScript.selectTweener = egret.Tween.get(this);
        TubeScript.selectTweener.to({ "x": pos.x, "y": pos.y }, 100).call(function () {
            TubeScript.selectTweener = null;
        }, this);
        return true;
    };
    TubeScript.prototype.UnSelect = function () {
        if (TubeScript.selectTweener != null) {
            return false;
        }
        var pos = this.pullDir2Position.get(PullDir.Left);
        TubeScript.selectTweener = egret.Tween.get(this);
        TubeScript.selectTweener.to({ "x": pos.x, "y": pos.y }, 100).call(function () {
            TubeScript.selectTweener = null;
        }, this);
        return true;
    };
    TubeScript.prototype.canPull = function (otherTube) {
        if (this.canSelect() == false) {
            return false;
        }
        if (this.pullTweener != null) {
            return false;
        }
        if (otherTube.pullTweener != null) {
            return false;
        }
        //说明已经满了
        if (otherTube.CurTotalWaterNum == otherTube.MaxWaterNum) {
            return false;
        }
        if (otherTube.isEmpty() == false) {
            var sourceWaterData = this.TopWaterData;
            var targetWaterData = otherTube.TopWaterData;
            if (sourceWaterData.colorInt != targetWaterData.colorInt) {
                return false;
            }
        }
        return true;
    };
    TubeScript.prototype.pullTotalTime = function (pullNum) {
        return this.PullStartTime + this.PullTimes[pullNum - 1] + this.PullEndTime;
    };
    TubeScript.prototype.canPullNum = function (otherTube) {
        var canPullNum = otherTube.MaxWaterNum - otherTube.CurTotalWaterNum; //另外试管能容下多少水
        var topWaterNum = this.TopWaterData.num; //当前试管顶部有多少水
        var pullNum = topWaterNum;
        if (topWaterNum > canPullNum) {
            pullNum = canPullNum;
        }
        return pullNum;
    };
    TubeScript.prototype.Pull = function (otherTube) {
        var _this = this;
        if (this.canSelect() == false) {
            return;
        }
        egret.Tween.removeTweens(this); //删除对应的selectTween
        this._isPullOut = true;
        otherTube._isPullIn = true;
        //确定好是向左倒还是向右倒
        var myX = this.x;
        var otherX = otherTube.x;
        if (myX < otherX) {
            this._pullDir = PullDir.Right;
        }
        else {
            this._pullDir = PullDir.Left;
        }
        var targetPullPos = otherTube.PullTargetPos;
        var curPos = new Vector2(this.x, this.y);
        //改变anchorOffsetX,同时需要修改x的值，anchorOffsetX改变多少，x就要改变多少
        var anchorOffsetX = 0;
        if (this._pullDir == PullDir.Right) {
            anchorOffsetX = this.tubeWidth / 2 + this.tubeMouthWidth / 2;
        }
        else {
            anchorOffsetX = this.tubeWidth / 2 - this.tubeMouthWidth / 2;
        }
        var old_anchorOffsetX = this.anchorOffsetX;
        var offsetX = anchorOffsetX - old_anchorOffsetX;
        this.anchorOffsetX += offsetX;
        this.x += offsetX;
        var startPos = new Vector2(this.x, this.y); //anchorOffsetX后的位置
        var startNum = this.CurTotalWaterNum;
        var canPullNum = otherTube.MaxWaterNum - otherTube.CurTotalWaterNum; //另外试管能容下多少水
        var topWaterNum = this.TopWaterData.num; //当前试管顶部有多少水
        var pullNum = topWaterNum;
        if (topWaterNum > canPullNum) {
            pullNum = canPullNum;
        }
        var endNum = startNum - pullNum;
        //向左倒，角度大于0  向右倒，角度小于0
        if (this._pullDir == PullDir.Left) {
            this._startPullAngle = -this.PullAngles[startNum];
            this._endPullAngle = -this.PullAngles[endNum];
        }
        else {
            this._startPullAngle = this.PullAngles[startNum];
            this._endPullAngle = this.PullAngles[endNum];
        }
        //位移到指定位置，指定角度（倒入前）
        var topWaterUnit = this.waterUIScripts[this.waterUIScripts.length - 1];
        topWaterUnit.SetFlow();
        this.SetHideTextActive(false);
        function startPullFunc() {
            var curRotation = this.rotation;
            this.PullRotate(curRotation);
        }
        this.pullTweener = egret.Tween.get(this, { loop: false, onChange: startPullFunc, onChangeObj: this });
        this.pullTweener.to({ "x": targetPullPos.x, "y": targetPullPos.y, "rotation": this._startPullAngle }, this.PullStartTime * 1000);
        this.pullTweener.call(function () {
            _this.SetFlowHeight(otherTube);
            var sourceWater = null;
            var targetWater = null;
            if (pullNum == topWaterNum) {
                sourceWater = _this.DequeueWater();
                targetWater = otherTube.EnqueueWater(sourceWater.waterData);
            }
            else {
                sourceWater = _this.TopWater;
                targetWater = otherTube.TopWater;
                sourceWater.waterData.num -= pullNum;
                targetWater.waterData.num += pullNum;
            }
            var pulltime = _this.PullTimes[pullNum - 1];
            targetWater.DealPullIn(pulltime);
            AudioManager.Instance.PlaySound("pourWater_wav", pulltime * 1000);
            //到达指定位置后，角度开始变大，开始倾倒（倒入阶段）
            if (_this._pullDir == PullDir.Left) {
                _this.waterFlow.x = _this.tubeWidth / 2 - _this.tubeMouthWidth / 2;
                _this.waterFlow.y = 0;
            }
            else {
                _this.waterFlow.x = _this.tubeWidth / 2 + _this.tubeMouthWidth / 2;
                _this.waterFlow.y = 0;
            }
            _this.waterFlow.alpha = 1;
            Utility.setImageColor(_this.waterFlow, sourceWater.waterData.color);
            function PullingFunc() {
                var curRotation = this.rotation;
                this.PullRotate(curRotation, sourceWater);
            }
            _this.pullTweener = egret.Tween.get(_this, { loop: false, onChange: PullingFunc, onChangeObj: _this });
            _this.pullTweener.to({ "rotation": _this._endPullAngle }, pulltime * 1000);
            _this.pullTweener.call(function () {
                //倾倒结束后，回到原有位置（倒入后期）
                if (pullNum == topWaterNum) {
                    sourceWater.Destroy();
                }
                else {
                    sourceWater.SetFull();
                }
                _this.waterFlow.alpha = 0;
                var _endPos = new Vector2(startPos.x, startPos.y + _this.selectHeight);
                function PullEndFunc() {
                    var curRotation = this.rotation;
                    this.PullRotate(curRotation);
                }
                _this.pullTweener = egret.Tween.get(_this, { loop: false, onChange: PullEndFunc, onChangeObj: _this });
                _this.pullTweener.to({ "x": _endPos.x, "y": _endPos.y, "rotation": 0 }, _this.PullEndTime * 1000);
                _this.pullTweener.call(function () {
                    _this._isPullOut = false;
                    otherTube._isPullIn = false;
                    _this.PullRotate(0);
                    _this.CloseHideImage();
                    _this.anchorOffsetX = 0;
                    _this.anchorOffsetY = 0;
                    var pos = _this.pullDir2Position.get(PullDir.Left);
                    _this.x = pos.x;
                    _this.y = pos.y;
                    _this.SetHideTextActive(true);
                    _this.pullTweener = null;
                }, _this);
            }, _this);
        }, this);
    };
    TubeScript.prototype.CloseHideImage = function () {
        var len = this.waterUIScripts.length;
        var colorInt = -1;
        var isMultiCloseHideImage = false;
        var _index = -1;
        for (var i = len - 1; i >= 0; i--) {
            var waterUnit = this.waterUIScripts[i];
            if (waterUnit.waterData.isHide) {
                if (colorInt == -1) {
                    waterUnit.waterData.isHide = false;
                    waterUnit.CloseHideImg();
                    colorInt = waterUnit.waterData.colorInt;
                }
                else {
                    if (waterUnit.waterData.colorInt == colorInt) {
                        waterUnit.waterData.isHide = false;
                        waterUnit.CloseHideImg();
                        isMultiCloseHideImage = true;
                        _index = i;
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                break;
            }
        }
        if (isMultiCloseHideImage) {
            this.RebuildDataAndRefreshUI(_index);
        }
    };
    TubeScript.prototype.RebuildDataAndRefreshUI = function (index) {
        var count = this.waterUIScripts.length;
        var waterUnit = this.waterUIScripts[index];
        for (var i = count - 1; i >= index + 1; i--) {
            var removedUnit = this.waterUIScripts[i];
            waterUnit.waterData.num += removedUnit.waterData.num;
            this.waterUIScripts[i] = null;
            removedUnit.Destroy();
        }
        waterUnit.RefreshUI();
    };
    TubeScript.prototype.SetFlowHeight = function (otherTube) {
        var myY = this.y;
        var otherBottomY = otherTube.y + otherTube.tubeHeight;
        var otherWaterNum = otherTube.CurTotalWaterNum;
        var otherWaterTotalHeight = otherWaterNum * otherTube.waterHeight;
        var otherY = otherBottomY - otherWaterTotalHeight;
        var h = Math.abs(otherY - myY);
        if (otherWaterNum == 0) {
            h -= 10;
        }
        else {
            h += 10;
        }
        this.waterFlow.height = h;
    };
    TubeScript.prototype.PullRotate = function (pullAngle, pullWaterUnit) {
        // this.rt.localEulerAngles = new Vector3(0, 0, pullAngle);
        this.waterFlow.rotation = -pullAngle;
        if (pullAngle == 0) {
            for (var i = 0; i < this.waterUIScripts.length; i++) {
                //float proportion = Mathf.Cos(angle * Mathf.Deg2Rad);//比例
                var waterScript = this.waterUIScripts[i];
                waterScript.DoRotate(0);
                waterScript.SetSize(waterScript.width, waterScript.RealHeight);
                if (i == 0) {
                    waterScript.SetPos(this.tubeWidth / 2, this.tubeHeight);
                }
                else {
                    var prevWaterScript = this.waterUIScripts[i - 1];
                    var pos = prevWaterScript.GetPos();
                    waterScript.SetPos(this.tubeWidth / 2, pos.y - prevWaterScript.RealHeight);
                }
            }
            //if (pullWaterUnit != null)
            //{
            //    pullWaterUnit.DoRotate(0);
            //    pullWaterUnit.SetSize(pullWaterUnit.width, pullWaterUnit.RealHeight);
            //}
        }
        else {
            var bottomLength = 0;
            if (pullAngle < 90) {
                var angle = Math.abs(pullAngle);
                bottomLength = this.tubeWidth / 2 * Math.tan(angle * Utility.Deg2Rad);
            }
            var offsetY = this.tubeHeight + bottomLength;
            var totalHeight = 0;
            for (var i = 0; i < this.waterUIScripts.length; i++) {
                if (this.waterUIScripts[i] == pullWaterUnit) {
                    continue;
                }
                //float proportion = Mathf.Cos(angle * Mathf.Deg2Rad);//比例
                this.waterUIScripts[i].DoRotate(-pullAngle);
                this.waterUIScripts[i].SetWaterAnchoredPosition(offsetY);
                var _height = this.waterUIScripts[i].RefreshWidthAndHeight(-pullAngle);
                offsetY -= _height / Math.cos(pullAngle * Utility.Deg2Rad);
                totalHeight += _height;
            }
            if (pullWaterUnit != null) {
                pullWaterUnit.DoRotate(-pullAngle);
                pullWaterUnit.SetWaterAnchoredPosition(offsetY); //位置计算有点问题
                pullWaterUnit.SetPullWaterSize(-pullAngle, totalHeight); //长度也有点问题
            }
        }
    };
    TubeScript.prototype.SetPosition = function (x, y) {
        this.x = x;
        this.y = y;
        this.InitPivotPosition();
    };
    TubeScript.prototype.SetHideTextActive = function (active) {
        for (var i = 0; i < this.waterUIScripts.length; i++) {
            this.waterUIScripts[i].SetHideTextActive(active);
        }
    };
    TubeScript.prototype.RefreshTubeType = function () {
        var tubeId = PlayerData.Instance.curTubeID;
        var themeId = PlayerData.Instance.curThemeID;
        var tubeData = DataConfig.Instance.GetDataByIndex("tube", tubeId);
        var themeData = DataConfig.Instance.GetDataByIndex("theme", themeId);
        if (tubeData == null || themeData == null) {
            return;
        }
        if (themeData.tubeFgIndex == 0) {
            var texture_1 = RES.getRes(tubeData.fgSprite);
            this.tubeFG.texture = texture_1;
        }
        else {
            var texture_2 = RES.getRes(tubeData.fgSprite2);
            this.tubeFG.texture = texture_2;
        }
        var texture = RES.getRes(tubeData.bgSprite);
        // this.tubeBG.texture=texture;
        this.waterMask.texture = texture;
        this.tubeMouthWidth = tubeData.width;
    };
    TubeScript.prototype.InitPivotPosition = function () {
        if (this.pullDir2Position == null) {
            this.pullDir2Position = new Dictionary();
        }
        else {
            this.pullDir2Position.clear();
        }
        var pos = new Vector2(this.x, this.y);
        this.pullDir2Position.set(PullDir.Left, pos);
        this.pullDir2Position.set(PullDir.Right, new Vector2(pos.x + this.tubeWidth, pos.y));
        if (this.pullDir2MouthPosition == null) {
            this.pullDir2MouthPosition = new Dictionary();
        }
        else {
            this.pullDir2MouthPosition.clear();
        }
        var middlePosition = new Vector2(pos.x + (this.tubeWidth / 2), pos.y);
        this.pullDir2MouthPosition.set(PullDir.Left, new Vector2(middlePosition.x - (this.tubeMouthWidth / 2), middlePosition.y));
        this.pullDir2MouthPosition.set(PullDir.Right, new Vector2(middlePosition.x + (this.tubeMouthWidth / 2), middlePosition.y));
    };
    TubeScript.prototype.CheckOneWaterFull = function () {
        if (this.waterUIScripts.length == 1 && this.waterUIScripts[0].waterData.num == this.MaxWaterNum) {
            return true;
        }
        return false;
    };
    //播放特效
    TubeScript.prototype.PlayOneWaterFullEffect = function () {
        var w = 200;
        var h = 200;
        this.effectGo = new egret.DisplayObjectContainer();
        this.effectGo.width = w;
        this.effectGo.height = h;
        this.effectGo.anchorOffsetX = w / 2;
        this.effectGo.anchorOffsetY = h;
        this.effectGo.x = this.tubeWidth / 2;
        this.effectGo.y = 100;
        this.effectGo.scaleX = 2;
        this.effectGo.scaleY = 2;
        var effect = Utility.createGif("lihua_json", "lihua_png");
        effect.frameRate = 12;
        effect.gotoAndPlay(0, 1);
        effect.width = w;
        effect.height = h;
        this.effectGo.addChild(effect);
        this.addChild(this.effectGo);
        effect.addEventListener(egret.Event.COMPLETE, function (e) {
            this.removeChild(this.effectGo);
            delete this.effectGo;
            this.effectGo = null;
        }, this);
    };
    TubeScript.prototype.CheckIsOneWaterFullOrEmpty = function () {
        if (this.CheckOneWaterFull()) {
            return true;
        }
        if (this.waterUIScripts.length == 0) {
            return true;
        }
        return false;
    };
    TubeScript.prototype.AddWaterByBackOperate = function (colorInt, num) {
        var waterUnit = this.TopWater;
        if (waterUnit == null) {
            var data = new WaterData(colorInt);
            data.isHide = false;
            data.num = num;
            var water = this.EnqueueWater(data, false);
            water.RefreshUI();
            return;
        }
        if (waterUnit.waterData.colorInt == colorInt) {
            waterUnit.waterData.num += num;
            waterUnit.RefreshUI();
        }
        else {
            var data = new WaterData(colorInt);
            data.isHide = false;
            data.num = num;
            var water = this.EnqueueWater(data, false);
            water.RefreshUI();
        }
    };
    TubeScript.prototype.RemoveWaterByBackOperate = function (colorInt, num) {
        var waterUnit = this.TopWater;
        if (waterUnit.waterData.colorInt == colorInt) {
            if (waterUnit.waterData.num > num) {
                waterUnit.waterData.num -= num;
                waterUnit.RefreshUI();
            }
            else {
                var water = this.DequeueWater();
                water.Destroy();
            }
        }
    };
    TubeScript.prototype.Shake = function () {
    };
    TubeScript.prototype.Destroy = function () {
        this.removeListener();
        this.onPullInComplete = null;
        this.pullInObj = null;
        if (this.waterUIScripts != null) {
            var len = this.waterUIScripts.length;
            for (var i = len - 1; i >= 0; i--) {
                if (this.waterUIScripts[i] != null) {
                    this.waterUIScripts[i].Destroy();
                    delete this.waterUIScripts[i];
                }
            }
            this.waterUIScripts = null;
        }
        this.waterContainer.mask = null;
        delete this.waterContainer;
        delete this.waterMask;
        delete this.waterFlow;
        delete this.tubeFG;
        this.waterContainer = null;
        this.waterMask = null;
        this.waterFlow = null;
        this.tubeFG = null;
    };
    TubeScript.prototype.addListener = function () {
        EventCenter.AddListener(EventID.ThemeBtnClicked, this.onThemeBtnClicked, this);
    };
    TubeScript.prototype.removeListener = function () {
        EventCenter.RemoveListener(EventID.ThemeBtnClicked, this.onThemeBtnClicked, this);
    };
    TubeScript.prototype.onThemeBtnClicked = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var isSun = args[0];
        var tubeId = PlayerData.Instance.curTubeID;
        var tubeData = DataConfig.Instance.GetDataByIndex("tube", tubeId);
        if (tubeData == null) {
            return;
        }
        if (isSun) {
            var texture = RES.getRes(tubeData.fgSprite);
            this.tubeFG.texture = texture;
        }
        else {
            var texture = RES.getRes(tubeData.fgSprite2);
            this.tubeFG.texture = texture;
        }
    };
    TubeScript.selectTweener = null;
    return TubeScript;
}(egret.DisplayObjectContainer));
__reflect(TubeScript.prototype, "TubeScript");
//# sourceMappingURL=TubeScript.js.map