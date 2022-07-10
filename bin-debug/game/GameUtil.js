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
    GameUtil.createDiamonLayout = function (iconRes, iconNum) {
        var diamonLayout = new egret.DisplayObjectContainer();
        diamonLayout.width = 180;
        diamonLayout.height = 40;
        // diamonLayout.x=30;
        // diamonLayout.y=30;
        var diamonBG = Utility.createBitmapByName("di_png");
        diamonBG.fillMode = egret.BitmapFillMode.SCALE;
        diamonBG.width = diamonLayout.width;
        diamonBG.height = diamonLayout.height;
        diamonLayout.addChild(diamonBG);
        var offsetX = 20; //图标距离左边多长
        var diamonIcon = Utility.createBitmapByName(iconRes);
        diamonIcon.name = "diamonIcon";
        diamonIcon.width = 64;
        diamonIcon.height = 64;
        diamonIcon.anchorOffsetX = diamonIcon.width / 2;
        diamonIcon.anchorOffsetY = diamonIcon.height / 2;
        diamonIcon.x = offsetX;
        diamonIcon.y = diamonLayout.height / 2;
        diamonLayout.addChild(diamonIcon);
        var diamonTxt = new egret.TextField();
        diamonTxt.name = "diamonTxt";
        diamonTxt.text = String(iconNum);
        diamonTxt.fontFamily = "myFirstFont";
        diamonTxt.textColor = 0xFFFFFF;
        diamonTxt.textAlign = egret.HorizontalAlign.LEFT; //水平右对齐，相对于 textField 控件自身的 width 与 height
        diamonTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        diamonTxt.width = diamonLayout.width - diamonIcon.width;
        diamonTxt.height = diamonLayout.height;
        diamonTxt.x = diamonIcon.width / 2 + offsetX;
        diamonTxt.y = 0;
        diamonTxt.size = 36;
        diamonTxt = diamonTxt;
        var textWidth = diamonTxt.textWidth;
        diamonTxt.width = textWidth;
        diamonLayout.width = diamonIcon.width / 2 + offsetX + diamonTxt.width;
        diamonLayout.addChild(diamonTxt); //文本长度
        return diamonLayout;
    };
    GameUtil.changeDiamonIconAndNum = function (diamonLayout, iconRes, iconNum) {
        var diamonIcon = diamonLayout.getChildByName("diamonIcon");
        if (diamonIcon != null) {
            diamonIcon.texture = RES.getRes(iconRes);
        }
        var diamonTxt = diamonLayout.getChildByName("diamonTxt");
        if (diamonTxt != null) {
            diamonTxt.text = String(iconNum);
            var textWidth = diamonTxt.textWidth;
            diamonTxt.width = textWidth;
            var offsetX = 20; //图标距离左边多长
            diamonLayout.width = diamonIcon.width / 2 + offsetX + diamonTxt.width;
        }
    };
    GameUtil.diamonFly = function (iconRes, x, y) {
    };
    GameUtil.ShowNotibox = function (str) {
        Utility.showNotiBox(str); //TODO:之后改成微信接口
    };
    return GameUtil;
}());
__reflect(GameUtil.prototype, "GameUtil");
//# sourceMappingURL=GameUtil.js.map