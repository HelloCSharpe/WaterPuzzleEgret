class Utility {

    public static write(key: string, value: any): void {
        if (value) {
            value = JSON.stringify(value);
        }
        egret.localStorage.setItem(key, value);
    }

    public static read<T>(key: string): T {
        let value: string = egret.localStorage.getItem(key);
        if (value && value != "undefined" && value != "null") {
            return <T>JSON.parse(value);
        }
        return null;
    }

    public static JsonEncode(value: any): string {
        return JSON.stringify(value);
    }

    public static JsonDecode<T>(json_str: string): T {
        return <T>JSON.parse(json_str);
    }
    public static JsonDecode2(json_str: string): any {
        return JSON.parse(json_str);
    }

    public static getRandomNum(Min, Max): number {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
    //-----------------------UI部分工具------------------------

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public static createBitmapByName(name: string,w?:number,h?:number,isPivotCenter?:boolean): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        if(w!=null){
            result.width=w;
        }
        if(h!=null){
            result.height=h;
        }
        if(isPivotCenter!=null){
            if(isPivotCenter){
                result.anchorOffsetX=result.width/2;
                result.anchorOffsetY=result.height/2;
            }
        }
        return result;
    }

    public static createButton(resName: string,width:number,height:number,isPivotCenter:boolean):egret.DisplayObjectContainer{
        let btn = new egret.DisplayObjectContainer();
        btn.width=width;
        btn.height=height;
        if(isPivotCenter){
            btn.anchorOffsetX=btn.width/2;
            btn.anchorOffsetY=btn.height/2;
        }
        let btnBg=Utility.createBitmapByName(resName);
        btnBg.fillMode = egret.BitmapFillMode.SCALE;
        btnBg.name="btnBg";
        btnBg.width=width;
        btnBg.height=height;
        btn.addChild(btnBg);
        return btn;
    }

    public static createTextField(width:number,height:number,color:number,fontSize?:number,text?:string,fontFamily?:string,HAlign?:string,VAlign?:string):egret.TextField{
        let textField=new egret.TextField();
        textField.width=width;
        textField.height=height;
        textField.textColor=color;
        textField.size = (fontSize==null)?30:fontSize;
        textField.fontFamily=(fontFamily==null)?"myFirstFont":fontFamily;
        textField.text=(text==null)?"":text;
        textField.textAlign=(HAlign==null)?egret.HorizontalAlign.LEFT:HAlign;
        textField.verticalAlign=(VAlign==null)?egret.VerticalAlign.MIDDLE:VAlign;
        return textField;
    }

    static _notibox: egret.DisplayObjectContainer = null;
    static get NotiBoxGo(): egret.DisplayObjectContainer {
        if (Utility._notibox == null) {
            Utility._notibox = new egret.DisplayObjectContainer();
            Utility._notibox.width = 200;
            Utility._notibox.height = 50;
            Utility._notibox.anchorOffsetX = Utility._notibox.width / 2;
            Utility._notibox.anchorOffsetY = Utility._notibox.height / 2;
            Utility._notibox.x = 0;
            Utility._notibox.y = 0;
            Utility._notibox.alpha = 0;
            let bg = Utility.createBitmapByName("tog3_png");
            Utility.setImageColor(bg,0x000000);
            bg.name = "BG";
            bg.fillMode = egret.BitmapFillMode.REPEAT;
            bg.width = Utility._notibox.width;
            bg.height = Utility._notibox.height;
            bg.anchorOffsetX = bg.width / 2;
            bg.anchorOffsetY = bg.height / 2;
            bg.x = 0;
            bg.y = 0;
            Utility._notibox.addChild(bg);
            let txt = new egret.TextField();
            txt.name = "Text";
            txt.text = "text";
            txt.fontFamily = "myFirstFont";
            txt.textColor = 0xFFFFFF;
            txt.textAlign = egret.HorizontalAlign.CENTER;
            txt.verticalAlign = egret.VerticalAlign.MIDDLE;
            txt.width = Utility._notibox.width;
            txt.height = Utility._notibox.height;
            txt.anchorOffsetX = txt.width / 2;
            txt.anchorOffsetY = txt.height / 2;
            txt.x = 0;
            txt.y = 0;
            txt.size = 30;
            Utility._notibox.addChild(txt);
            SceneManager.Instance.rootLayer.addChild(Utility._notibox);

        }
        return Utility._notibox;
    }
    public static showNotiBox(str: string): void {
        let noticeBox = Utility.NotiBoxGo;
        if (noticeBox.alpha > 0) {
            return;
        }
        var bg: egret.Bitmap = <egret.Bitmap>noticeBox.getChildByName("BG");
        bg.width = 30 * str.length;
        const start_y = 0;
        const end_y = 80;
        var txt: egret.TextField = <egret.TextField>noticeBox.getChildByName("Text");
        txt.width = bg.width;
        txt.text = str;
        noticeBox.alpha = 0;
        noticeBox.x = SceneManager.ScreenWidth / 2;
        noticeBox.y = start_y;
        let tw = egret.Tween.get(noticeBox);
        tw.wait(100);
        tw.to({ "alpha": 1, "y": end_y }, 500);
        tw.wait(1000);
        tw.to({ "alpha": 0, "y": start_y }, 500);
    }
    static _empty: egret.DisplayObjectContainer = null;
    static get EmptyGo(): egret.DisplayObjectContainer {
        if (Utility._empty == null) {
            Utility._empty = new egret.DisplayObjectContainer();
            Utility._empty.width = 50;
            Utility._empty.height = 50;
            Utility._empty.x = 0;
            Utility._empty.y = 0;
        }
        return Utility._empty;
    }

    public static Float(startNum:number,endNum:number,duration:number,func:Function,thisObj:any):void{
        let emptyGo = Utility.EmptyGo;
        emptyGo.x=startNum;
        let onChanged = ()=>{
            let curX=emptyGo.x;
            func.bind(thisObj)(curX);
        };
        let tw = egret.Tween.get(emptyGo,{loop:false,onChange:onChanged,onChangeObj:thisObj});
        tw.to({"x":endNum},duration);
    }

    private static btnScaleFuns:Dictionary = new Dictionary();

    public static ButtonActive(obj:egret.DisplayObjectContainer,active:boolean):void{
        obj.touchEnabled=active;
        if(active){
            let func = ()=>{
                let tw = egret.Tween.get(obj);
                tw.to({ "scaleX": 0.9, "scaleY": 0.9 }, 50).to({ "scaleX": 1, "scaleY": 1 }, 50);
            };
            func.bind(obj);
            Utility.btnScaleFuns.set(obj,func);
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,func, obj);
        }else{
            let func = Utility.btnScaleFuns.get(obj);
            obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,func,obj);
        }
    }
    
    public static ButtonActive2(obj:egret.Bitmap,active:boolean):void{
        obj.touchEnabled=active;
        if(active){
            let func = ()=>{
                let tw = egret.Tween.get(obj);
                tw.to({ "scaleX": 0.9, "scaleY": 0.9 }, 50).to({ "scaleX": 1, "scaleY": 1 }, 50);
            };
            func.bind(obj);
            Utility.btnScaleFuns.set(obj,func);
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,func, obj);
        }else{
            let func = Utility.btnScaleFuns.get(obj);
            obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,func,obj);
        }
    }

    private static Str2Int(char:string):number{
        if(char=="0"){return 0;}
        if(char=="1"){return 1;}
        if(char=="2"){return 2;}
        if(char=="3"){return 3;}
        if(char=="4"){return 4;}
        if(char=="5"){return 5;}
        if(char=="6"){return 6;}
        if(char=="7"){return 7;}
        if(char=="8"){return 8;}
        if(char=="9"){return 9;}
        if(char=="A"){return 10;}
        if(char=="B"){return 11;}
        if(char=="C"){return 12;}
        if(char=="D"){return 13;}
        if(char=="E"){return 14;}
        if(char=="F"){return 15;}
        return 0;
    }
    //将HTML的"#FEAD48"字符串转换成egret能够识别的number
    public static ColorHTMLToInt(colorHTML:string):number{
        let a,b,c,d,e,f;
        let str = new String(colorHTML);
        if(str.charAt(0)=="#"){
            a=Utility.Str2Int(str.charAt(1));
            b=Utility.Str2Int(str.charAt(2));
            c=Utility.Str2Int(str.charAt(3));
            d=Utility.Str2Int(str.charAt(4));
            e=Utility.Str2Int(str.charAt(5));
            f=Utility.Str2Int(str.charAt(6));
        }else{
            a=Utility.Str2Int(str.charAt(0));
            b=Utility.Str2Int(str.charAt(1));
            c=Utility.Str2Int(str.charAt(2));
            d=Utility.Str2Int(str.charAt(3));
            e=Utility.Str2Int(str.charAt(4));
            f=Utility.Str2Int(str.charAt(5));
        }
        let _a = a*16+b;
        let _b = c*16+d;
        let _c = e*16+f;
        return _a*256*256+_b*256+_c;
    }

    public static setImageColor(image: egret.Bitmap, color: number) {
        // 将16进制颜色分割成rgb值
        let spliceColor = (color) => {
            let result = {r: -1, g: -1, b: -1};
            result.b = color % 256;
            result.g = Math.floor((color / 256)) % 256;
            result.r = Math.floor((color / 256) / 256);
            return result;
        }
        let result = spliceColor(color);
        let colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        colorMatrix[0] = result.r / 255;
        colorMatrix[6] = result.g / 255;
        colorMatrix[12] = result.b / 255;
        let colorFilter = new egret.ColorMatrixFilter(colorMatrix);

        image.filters = [colorFilter];
    }

    public static createGif(jsonRes:string,pngRes:string):egret.MovieClip{
        var json = RES.getRes(jsonRes);
        var png = RES.getRes(pngRes);
        var mcFactory = new egret.MovieClipDataFactory(json,png);
        var gif = new egret.MovieClip(mcFactory.generateMovieClipData());
        return gif;
    }

    public static setGifColor(gif: egret.MovieClip, color: number) {
        // 将16进制颜色分割成rgb值
        let spliceColor = (color) => {
            let result = {r: -1, g: -1, b: -1};
            result.b = color % 256;
            result.g = Math.floor((color / 256)) % 256;
            result.r = Math.floor((color / 256) / 256);
            return result;
        }
        let result = spliceColor(color);
        let colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        colorMatrix[0] = result.r / 255;
        colorMatrix[6] = result.g / 255;
        colorMatrix[12] = result.b / 255;
        let colorFilter = new egret.ColorMatrixFilter(colorMatrix);
        gif.filters = [colorFilter];
    }

    public static getRandomColor():number{
        return ( Math.floor( Math.random() * 0xff ) << 16 )
            + ( Math.floor( Math.random() * 0xff ) << 8 )
            + Math.floor( Math.random() * 0xff ) ;
    }

    public static Lerp(a:number,b:number,v:number):number{
        let ret = a+(b-a)*v;
        return ret;
    }

    public static get Deg2Rad():number{
        return Math.PI/180;
    }

}