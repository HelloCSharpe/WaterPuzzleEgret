class GameUtil{
    
    public static ParseLevelCfg(cfg:string):WaterData[][]{
        let datas:WaterData[][]=[];//0,0,0,1;0,1,1,1
        let tubeCfgs:string[]=cfg.split(";");//0,0,0,1 和 0,0,0,1
        let len = tubeCfgs.length;
        for(let i=0;i<len;i++){
            datas[i]=[];
            let tubeCfg=tubeCfgs[i];
            let waters:string[]=tubeCfg.split(",");//0 0 0 1
            let preInt:number=-1;
            for(let j=3;j>=0;j--){
                let waterStr:string=waters[j];
                if(waterStr==null){
                    waterStr="0";
                }
                let waterInt:number=Number(waterStr);
                if(waterInt!=preInt){
                    let waterData:WaterData=new WaterData(waterInt);
                    datas[i].push(waterData);
                }else{
                    let idx=datas[i].length-1;
                    datas[i][idx].num+=1;
                }
                preInt=waterInt;
            }
        }
        return datas;
    }

    public static createDiamonLayout(iconRes:string,iconNum:number):egret.DisplayObjectContainer{
            let diamonLayout = new egret.DisplayObjectContainer();
            diamonLayout.width=180;
            diamonLayout.height=40;
            // diamonLayout.x=30;
            // diamonLayout.y=30;

            let diamonBG = Utility.createBitmapByName("di_png");
            diamonBG.fillMode = egret.BitmapFillMode.SCALE;
            diamonBG.width=diamonLayout.width;
            diamonBG.height=diamonLayout.height;
            diamonLayout.addChild(diamonBG);

            let offsetX=20;//图标距离左边多长
            let diamonIcon = Utility.createBitmapByName(iconRes);
            diamonIcon.name="diamonIcon";
            diamonIcon.width = 64;
            diamonIcon.height = 64;
            diamonIcon.anchorOffsetX = diamonIcon.width/2;
            diamonIcon.anchorOffsetY = diamonIcon.height/2;
            diamonIcon.x=offsetX;
            diamonIcon.y=diamonLayout.height/2;
            diamonLayout.addChild(diamonIcon);

            let diamonTxt= new egret.TextField();
            diamonTxt.name="diamonTxt";
            diamonTxt.text = String(iconNum);
            diamonTxt.fontFamily = "myFirstFont";
            diamonTxt.textColor = 0xFFFFFF;
            diamonTxt.textAlign = egret.HorizontalAlign.LEFT;  //水平右对齐，相对于 textField 控件自身的 width 与 height
            diamonTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
            diamonTxt.width = diamonLayout.width-diamonIcon.width;
            diamonTxt.height = diamonLayout.height;
            diamonTxt.x=diamonIcon.width/2+offsetX;
            diamonTxt.y=0;
            diamonTxt.size = 36;
            diamonTxt = diamonTxt;
            let textWidth = diamonTxt.textWidth;
            diamonTxt.width=textWidth;
            diamonLayout.width=diamonIcon.width/2+offsetX+diamonTxt.width;
            diamonLayout.addChild(diamonTxt);//文本长度
            
            return diamonLayout;
    }

    public static changeDiamonIconAndNum(diamonLayout:egret.DisplayObjectContainer,iconRes:string,iconNum:number):void{
        let diamonIcon:egret.Bitmap = diamonLayout.getChildByName("diamonIcon") as egret.Bitmap;
        if(diamonIcon!=null){
            diamonIcon.texture = RES.getRes(iconRes);
        }
        let diamonTxt:egret.TextField=diamonLayout.getChildByName("diamonTxt") as egret.TextField;
        if(diamonTxt!=null){
            diamonTxt.text=String(iconNum);
            let textWidth = diamonTxt.textWidth;
            diamonTxt.width=textWidth;
            let offsetX=20;//图标距离左边多长
            diamonLayout.width=diamonIcon.width/2+offsetX+diamonTxt.width;
        }
    }

    public static diamonFly(iconRes:string,x:number,y:number):void{

    }

    public static ShowNotibox(str:string):void{
        Utility.showNotiBox(str);//TODO:之后改成微信接口
    }
}