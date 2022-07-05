class DataConfig {

    private static instance: DataConfig = null;

    public static get Instance(): DataConfig {
        if (DataConfig.instance == null) {
            DataConfig.instance = new DataConfig();
        }
        return DataConfig.instance;
    }

    private constructor() {
        this.Init();
    }


    private rolescfg;
    private enemyscfg;
    private missioncfg;
    private bulletcfg;

    private configs:Dictionary;

    private Init(): void {
        this.configs = new Dictionary();
        this.IniConfigs();
    }

    private IniConfigs(){
        this.InitConfig("description","description_json");
        this.InitConfig("roles","roles_json");
        // this.InitConfig("enermy","enermy_json");
        // this.InitConfig("setting","setting_json");
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
}