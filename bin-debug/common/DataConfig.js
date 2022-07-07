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
var DataConfig = (function () {
    function DataConfig() {
        this.configs = new Dictionary();
    }
    Object.defineProperty(DataConfig, "Instance", {
        get: function () {
            if (DataConfig.instance == null) {
                DataConfig.instance = new DataConfig();
            }
            return DataConfig.instance;
        },
        enumerable: true,
        configurable: true
    });
    DataConfig.prototype.Init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RES.loadGroup("cfg")];
                    case 1:
                        _a.sent();
                        this.IniConfigs();
                        return [2 /*return*/];
                }
            });
        });
    };
    DataConfig.prototype.IniConfigs = function () {
        this.InitConfig("description", "description_json");
        this.InitConfig("level", "level_json");
        this.InitConfig("purchaser", "purchaser_json");
        this.InitConfig("settings", "settings_json");
        this.InitConfig("theme", "theme_json");
        this.InitConfig("tube", "tube_json");
        this.InitConfig("water", "water_json");
    };
    DataConfig.prototype.InitConfig = function (name, cfgResName) {
        var cfg = RES.getRes(cfgResName);
        this.configs.set(name, cfg);
    };
    DataConfig.prototype.GetConfig = function (name) {
        return this.configs.get(name);
    };
    DataConfig.prototype.GetDataByIndex = function (name, index) {
        var cfg = this.configs.get(name);
        if (cfg == null) {
            return null;
        }
        return cfg[index];
    };
    Object.defineProperty(DataConfig.prototype, "SettingData", {
        get: function () {
            return this.GetDataByIndex("settings", 0);
        },
        enumerable: true,
        configurable: true
    });
    DataConfig.instance = null;
    return DataConfig;
}());
__reflect(DataConfig.prototype, "DataConfig");
//# sourceMappingURL=DataConfig.js.map