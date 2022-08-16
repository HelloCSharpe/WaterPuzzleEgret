var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerData = (function () {
    function PlayerData() {
        this.noAds = false;
        this.curTubeID = 1;
        this.curThemeID = 18;
        this.backNum = 5;
        this.newTubeNum = 2;
        this.tubes = [1];
        this.themes = [15];
        this.diamon = 2000;
        this.diamon2 = 0; //困难货币
        this.curLevel = 1;
        this.curLevel2 = 1; //困难
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
        this.diamon2 = gameInfo.diamon2;
        this.curLevel = gameInfo.curLevel;
        this.curLevel2 = gameInfo.curLevel2;
        this.process = gameInfo.process;
    };
    PlayerData.prototype.SetSettingInfo = function (settingInfo) {
        this.bgmOn = settingInfo.bgmOn;
        this.soundOn = settingInfo.soundOn;
    };
    //保存
    PlayerData.prototype.Save = function () {
        var data = Object();
        data.noAds = this.noAds;
        data.curTubeID = this.curTubeID;
        data.curThemeID = this.curThemeID;
        data.backNum = this.backNum;
        data.newTubeNum = this.newTubeNum;
        data.tubes = this.tubes;
        data.themes = this.themes;
        data.diamon = this.diamon;
        data.diamon2 = this.diamon2;
        data.curLevel = this.curLevel;
        data.curLevel2 = this.curLevel2;
        data.process = this.process;
        WXUtil.Save(data);
    };
    PlayerData.prototype.GetCurLevel = function (gameType) {
        var level = 1;
        if (gameType == GameType.Normal) {
            level = this.curLevel;
        }
        else if (gameType == GameType.Difficult) {
            level = this.curLevel2;
        }
        return level;
    };
    PlayerData.prototype.GetDiamons = function (gameType) {
        var diamon = 0;
        if (gameType == GameType.Normal) {
            diamon = this.diamon;
        }
        else if (gameType == GameType.Difficult) {
            diamon = this.diamon2;
        }
        return diamon;
    };
    PlayerData.prototype.CurLevelAdd = function (gameType) {
        if (gameType == GameType.Normal) {
            this.curLevel = this.curLevel + 1;
        }
        else if (gameType == GameType.Difficult) {
            this.curLevel2 = this.curLevel2 + 1;
        }
        this.Save();
    };
    PlayerData.prototype.isTubeContains = function (tubeId) {
        if (this.tubes == null) {
            return false;
        }
        if (this.tubes.length == 0) {
            return false;
        }
        var len = this.tubes.length;
        for (var i = 0; i < len; i++) {
            if (this.tubes[i] == tubeId) {
                return true;
            }
        }
        return false;
    };
    PlayerData.prototype.isThemeContains = function (themeId) {
        if (this.themes == null) {
            return false;
        }
        if (this.themes.length == 0) {
            return false;
        }
        var len = this.themes.length;
        for (var i = 0; i < len; i++) {
            if (this.themes[i] == themeId) {
                return true;
            }
        }
        return false;
    };
    PlayerData.prototype.DealEffect = function (effectType, num) {
        if (effectType == 1) {
            this.noAds = true;
        }
        else if (effectType == 2) {
            this.diamon += num;
        }
        else if (effectType == 3) {
            this.backNum += num;
        }
        else if (effectType == 4) {
            this.newTubeNum += num;
        }
        else if (effectType == 5) {
            this.diamon2 += num;
        }
        else {
            console.error("unkown effectType");
        }
    };
    //购买商品TODO：需要去请求服务器
    PlayerData.prototype.BuyItem = function (purchaseId) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var cfg = DataConfig.Instance.GetDataByIndex("purchaser", purchaseId);
            if (cfg == null) {
                GameUtil.ShowNotibox("未知的购买配置");
                resolve(false);
                return;
            }
            var costType = cfg.CostType;
            var cost = cfg.Cost;
            var effect = cfg.Effect;
            var effectNum = cfg.Num;
            if (costType == 0) {
                var succb = function () {
                    _this.DealEffect(effect, effectNum);
                    _this.Save();
                    resolve(true);
                };
                var failcb = function () {
                    resolve(false);
                };
                WXAdManager.Instance.ShowRewardAd2(succb, failcb);
            }
            else if (costType == 1) {
                //目前暂不支持RMB购买，未接入
                resolve(false);
            }
            else if (costType == 2) {
                if (_this.diamon >= cost) {
                    _this.diamon -= cost;
                    _this.DealEffect(effect, effectNum);
                    _this.Save();
                    resolve(true);
                }
                else {
                    GameUtil.ShowNotibox("钻石不够，无法购买");
                    resolve(false);
                }
            }
            else if (costType == 3) {
                if (_this.diamon2 >= cost) {
                    _this.diamon2 -= cost;
                    _this.DealEffect(effect, effectNum);
                    _this.Save();
                    resolve(true);
                }
                else {
                    GameUtil.ShowNotibox("点券不够，无法购买");
                    resolve(false);
                }
            }
            else {
                GameUtil.ShowNotibox("未知的购买参数");
                resolve(false);
            }
            // http.get(url, res => {
            //     resolve(res);
            // });
        });
        return promise;
    };
    PlayerData.prototype.BuyTube = function (tubeId, costType, costNum) {
        if (this.isTubeContains(tubeId)) {
            return false;
        }
        var diamonCount = 0; //type为1是RMB
        if (costType == 2) {
            diamonCount = this.diamon;
        }
        if (costType == 3) {
            diamonCount = this.diamon2;
        }
        if (diamonCount < costNum) {
            return false;
        }
        diamonCount -= costNum;
        if (costType == 2) {
            this.diamon = diamonCount;
        }
        if (costType == 3) {
            this.diamon2 = diamonCount;
        }
        this.tubes.push(tubeId);
        this.curTubeID = tubeId;
        this.Save();
        return true;
    };
    PlayerData.prototype.BuyTheme = function (themeId, costType, costNum) {
        if (this.isThemeContains(themeId)) {
            return false;
        }
        var diamonCount = 0; //type为1是RMB
        if (costType == 2) {
            diamonCount = this.diamon;
        }
        if (costType == 3) {
            diamonCount = this.diamon2;
        }
        if (diamonCount < costNum) {
            return false;
        }
        diamonCount -= costNum;
        if (costType == 2) {
            this.diamon = diamonCount;
        }
        if (costType == 3) {
            this.diamon2 = diamonCount;
        }
        this.themes.push(themeId);
        this.curThemeID = themeId;
        this.Save();
        return true;
    };
    return PlayerData;
}());
__reflect(PlayerData.prototype, "PlayerData");
//# sourceMappingURL=PlayerData.js.map