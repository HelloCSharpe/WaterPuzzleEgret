var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DataConfig = (function () {
    function DataConfig() {
        this.Init();
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
        this.configs = new Dictionary();
        this.IniConfigs();
    };
    DataConfig.prototype.IniConfigs = function () {
        this.InitConfig("description", "description_json");
        this.InitConfig("roles", "roles_json");
        // this.InitConfig("enermy","enermy_json");
        // this.InitConfig("setting","setting_json");
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
            return this.GetDataByIndex("setting", 0);
        },
        enumerable: true,
        configurable: true
    });
    DataConfig.instance = null;
    return DataConfig;
}());
__reflect(DataConfig.prototype, "DataConfig");
//# sourceMappingURL=DataConfig.js.map