var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameUtil = (function () {
    function GameUtil() {
    }
    GameUtil.ParseLevelCfg = function (cfg) {
        var datas = []; //0,0,0,1;0,1,1,1
        var tubeCfgs = cfg.split(";"); //0,0,0,1 和 0,0,0,1
        var len = tubeCfgs.length;
        for (var i = 0; i < len; i++) {
            datas[i] = [];
            var tubeCfg = tubeCfgs[i];
            var waters = tubeCfg.split(","); //0 0 0 1
            var preInt = -1;
            for (var j = 3; j >= 0; j--) {
                var waterStr = waters[j];
                if (waterStr == null) {
                    waterStr = "0";
                }
                var waterInt = Number(waterStr);
                if (waterInt != preInt) {
                    var waterData = new WaterData(waterInt);
                    datas[i].push(waterData);
                }
                else {
                    var idx = datas[i].length - 1;
                    datas[i][idx].num += 1;
                }
                preInt = waterInt;
            }
        }
        return datas;
    };
    return GameUtil;
}());
__reflect(GameUtil.prototype, "GameUtil");
//# sourceMappingURL=GameUtil.js.map