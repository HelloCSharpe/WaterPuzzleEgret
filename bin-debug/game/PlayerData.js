var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
        }
        else if (effectType == 2) {
        }
        else if (effectType == 3) {
        }
        else if (effectType == 4) {
        }
        else if (effectType == 5) {
        }
        else {
            console.error("unkown effectType");
        }
    };
    //购买商品TODO：需要去请求服务器
    PlayerData.prototype.BuyItem = function (purchaseId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var promise;
            return __generator(this, function (_a) {
                promise = new Promise(function (resolve, reject) {
                    var cfg = DataConfig.Instance.GetDataByIndex("purchaser", purchaseId);
                    if (cfg == null) {
                        GameUtil.ShowNotibox("未知的购买配置");
                        reject(false);
                    }
                    var costType = cfg.CostType;
                    var cost = cfg.Cost;
                    var effect = cfg.Effect;
                    var effectNum = cfg.Num;
                    if (cfg.CostType == 1) {
                        resolve(true);
                    }
                    else if (cfg.CostType == 2) {
                        //TODO：现在的处理方法，后面要给到服务器去处理
                        if (_this.diamon >= cost) {
                            _this.diamon -= cost;
                            _this.DealEffect(effect, effectNum);
                            resolve(true);
                        }
                        else {
                            GameUtil.ShowNotibox("钻石不够，无法购买");
                            reject(false);
                        }
                    }
                    else if (cfg.CostType == 3) {
                        if (_this.diamon2 >= cost) {
                            _this.diamon2 -= cost;
                            _this.DealEffect(effect, effectNum);
                            resolve(true);
                        }
                        else {
                            GameUtil.ShowNotibox("钻石不够，无法购买");
                            reject(false);
                        }
                    }
                    else {
                        reject(false);
                    }
                    // http.get(url, res => {
                    //     resolve(res);
                    // });
                });
                return [2 /*return*/, promise];
            });
        });
    };
    PlayerData.prototype.BuyTube = function (tubeId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    PlayerData.prototype.BuyTheme = function (themeId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return PlayerData;
}());
__reflect(PlayerData.prototype, "PlayerData");
//# sourceMappingURL=PlayerData.js.map