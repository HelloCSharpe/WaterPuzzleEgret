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
    public static createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
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
            let bg = Utility.createBitmapByName("notice_png");
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



}