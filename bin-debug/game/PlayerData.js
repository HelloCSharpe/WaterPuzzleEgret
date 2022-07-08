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
        this.diamon2 = 0; //困难货币
        this.diamon3 = 0; //炼狱货币
        this.curLevel = 501;
        this.curLevel2 = 1; //困难
        this.curLevel3 = 1; //炼狱
        this.process = 10; //宝箱进度(0-100)
        //配置信息
        this.bgmOn = true;
        this.soundOn = true;
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
    PlayerData.prototype.SetSettingInfo = function (setInfo) {
    };
    //保存进度
    PlayerData.prototype.Save = function () {
    };
    PlayerData.prototype.GetCurLevel = function (gameType) {
        var level = 1;
        if (gameType == GameType.Normal) {
            level = this.curLevel;
        }
        else if (gameType == GameType.Difficult) {
            level = this.curLevel2;
        }
        else if (gameType == GameType.Purgatory) {
            level = this.curLevel3;
        }
        return level;
    };
    PlayerData.prototype.CurLevelAdd = function (gameType) {
        if (gameType == GameType.Normal) {
            this.curLevel = this.curLevel + 1;
        }
        else if (gameType == GameType.Difficult) {
            this.curLevel2 = this.curLevel2 + 1;
        }
        else if (gameType == GameType.Purgatory) {
            this.curLevel3 = this.curLevel3 + 1;
        }
        this.Save();
    };
    return PlayerData;
}());
__reflect(PlayerData.prototype, "PlayerData");
//# sourceMappingURL=PlayerData.js.map