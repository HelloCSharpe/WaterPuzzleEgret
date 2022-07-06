var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PullDir;
(function (PullDir) {
    PullDir[PullDir["Left"] = 0] = "Left";
    PullDir[PullDir["Right"] = 1] = "Right";
})(PullDir || (PullDir = {}));
var TubeScript = (function () {
    function TubeScript() {
        this.tubeWidth = 80; //试管宽度
        this.tubeHeight = 308; //试管高度
        this.tubeSlash = 318; //试管斜线长度：根号（宽度*宽度+高度*高度）
        this.waterWidth = 80;
        this.waterHeight = 66;
        this.tubeMouthWidth = 80; //试管瓶口宽度
        this.flowLength = 450; //水流的高度
        this.onPullInComplete = null;
        this.initDatas = [];
        this._pullDir = PullDir.Left;
    }
    Object.defineProperty(TubeScript.prototype, "MaxWaterNum", {
        get: function () { return 4; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TubeScript.prototype, "PullAngles", {
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
    return TubeScript;
}());
__reflect(TubeScript.prototype, "TubeScript");
//# sourceMappingURL=TubeScript.js.map