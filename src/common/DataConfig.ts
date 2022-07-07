class DataConfig {

    private static instance: DataConfig = null;

    public static get Instance(): DataConfig {
        if (DataConfig.instance == null) {
            DataConfig.instance = new DataConfig();
        }
        return DataConfig.instance;
    }

    private constructor() {
        this.configs = new Dictionary();
    }

    private configs:Dictionary;

    public async Init(): Promise<any> {
        await RES.loadGroup("cfg");
        this.IniConfigs();
    }

    private IniConfigs(){
        this.InitConfig("description","description_json");
        this.InitConfig("level","level_json");
        this.InitConfig("purchaser","purchaser_json");
        this.InitConfig("settings","settings_json");
        this.InitConfig("theme","theme_json");
        this.InitConfig("tube","tube_json");
        this.InitConfig("water","water_json");
    }

    private InitConfig(name:string,cfgResName:string){
        let cfg = RES.getRes(cfgResName);
        this.configs.set(name,cfg);
    }

    public GetConfig(name: string) {
        return this.configs.get(name);
    }

    public GetDataByIndex(name: string,index:number){
        let cfg = this.configs.get(name);
        if(cfg==null){return null;}
        return cfg[index];
    }

    public get SettingData():any{
        return this.GetDataByIndex("settings",0);
    }
}