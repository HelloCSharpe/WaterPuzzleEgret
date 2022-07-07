var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerData = (function () {
    function PlayerData() {
        this.noAds = false;
        this.curTubeID = 1;
        this.curThemeID = 6;
        this.backNum = 5;
        this.newTubeNum = 2;
        this.tubes = [1];
        this.themes = [1];
        this.diamon = 2000;
        this.curLevel = 4;
    }
    Object.defineProperty(PlayerData, "Instance", {
        get: function () {
            if (PlayerData._manager == null) {
                PlayerData._manager = new PlayerData();
            }
            return PlayerData._manager;
        },
        enumerable: true,
        configurable: true
    });
    //设置用户数据
    PlayerData.prototype.SetUserInfo = function (userInfo) {
        this.userInfo = userInfo;
    };
    //设置游戏数据
    PlayerData.prototype.SetGameInfo = function (gameInfo) {
        this.noAds = gameInfo.noAds;
        this.curTubeID = gameInfo.curTubeID;
        this.curThemeID = gameInfo.curThemeID;
        this.backNum = gameInfo.backNum;
        this.newTubeNum = gameInfo.newTubeNum;
        this.tubes = gameInfo.tubes;
        this.themes = gameInfo.themes;
        this.diamon = gameInfo.diamon;
        this.curLevel = gameInfo.curLevel;
    };
    //保存进度
    PlayerData.prototype.Save = function () {
    };
    return PlayerData;
}());
__reflect(PlayerData.prototype, "PlayerData");
//# sourceMappingURL=PlayerData.js.map