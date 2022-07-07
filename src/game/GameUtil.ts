class GameUtil{
    
    public static ParseLevelCfg(cfg:string):WaterData[][]{
        let datas:WaterData[][]=[];//0,0,0,1;0,1,1,1
        let tubeCfgs:string[]=cfg.split(";");//0,0,0,1 和 0,0,0,1
        let len = tubeCfgs.length;
        for(let i=0;i<len;i++){
            datas[i]=[];
            let tubeCfg=tubeCfgs[i];
            let waters:string[]=tubeCfg.split(",");//0 0 0 1
            for(let j=3;j>=0;j--){
                let waterStr:string=waters[j];
                if(waterStr==null){
                    waterStr="0";
                }
                let waterInt:number=Number(waterStr);
                let waterData:WaterData=new WaterData(waterInt);
                datas[i].push(waterData);
            }
        }
        return datas;
    }
}