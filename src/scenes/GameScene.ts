class GameScene extends Scene {


    protected onComplete() {
        this.InitTubes();
    }

    private InitBG():void{

    }
    private InitDiamons():void{

    }
    private InitPauseBtn():void{

    }
    private InitBottomBtn():void{

    }
    private flow:egret.Bitmap;
    private waterGif:egret.MovieClip;
    private InitTubes():void{
        // let aa = this.createBitmapByName("white_jpg");
        // aa.width = 80;
        // aa.height = 308;
        // aa.anchorOffsetX = aa.width/2;
        // aa.anchorOffsetY = aa.height/2;
        // aa.x = SceneManager.ScreenWidth/2;
        // aa.y = SceneManager.ScreenHeight/2;
        // this.addChild(aa);

        let tube:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        tube.width = 80;
        tube.height = 308;
        tube.x = SceneManager.ScreenWidth/2;
        tube.y = SceneManager.ScreenHeight/2;
        this.addChild(tube);
        let tubeBG = this.createBitmapByName("pz_di_bt_1_2_png");
        tubeBG.width = 80;
        tubeBG.height = 308;
        tubeBG.anchorOffsetX = tubeBG.width/2;
        tubeBG.anchorOffsetY = tubeBG.height;
        tubeBG.x = tubeBG.width/2;
        tubeBG.y = tubeBG.height;
        tube.addChild(tubeBG);
        let water1 = this.createBitmapByName("white_jpg");
        water1.width = 80;
        water1.height = 66;
        water1.x = 0;
        water1.y = 0;
        Utility.setImageColor(water1,Utility.getRandomColor());
        water1.mask = tubeBG;
        tube.addChild(water1);
    }

    private Test():void{

        let flow = this.createBitmapByName("white_jpg");
        flow.width = 80;
        flow.height = 80;
        flow.anchorOffsetX = flow.width/2;
        flow.anchorOffsetY = flow.height;
        flow.x = SceneManager.ScreenWidth/2;
        flow.y = SceneManager.ScreenHeight/2;
        this.flow = flow;
        // let change = () => {
        //     let tw = egret.Tween.get(this.flow);
        //     tw.wait(500);
        //     tw.to({ "height": 480 }, 20000);
        //     tw.wait(500);
        //     tw.to({ "height": 240 }, 1000);

        //     // tw.to({ "rotation": 360 }, 1000).to({ "rotation": 0 }, 1000);
        //     tw.call(change, this);
        // };
        // change();
        this.addChild(this.flow);

        let btn = this.createBitmapByName("shop_png");
        btn.fillMode = egret.BitmapFillMode.SCALE;
        btn.width = 100;
        btn.height = 100;
        btn.anchorOffsetX = btn.width / 2;
        btn.anchorOffsetY = btn.height / 2;
        btn.x = 100;
        btn.y = 100;
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            // this.flow.scaleY +=0.1;
            Utility.setImageColor(this.flow,16777215)
        }, this);
        this.addChild(btn);


        //GIF
        let waterGif:egret.MovieClip = this.createGif("water_flow_json","water_flow_png");
        waterGif.width = 80;
        waterGif.height = 80;
        waterGif.anchorOffsetX = waterGif.width/2;
        waterGif.anchorOffsetY = waterGif.height;
        // waterGif.x = SceneManager.ScreenWidth/2+260;
        // waterGif.y = SceneManager.ScreenHeight/2;
        waterGif.gotoAndPlay(0,-1);
        this.addChild(waterGif);
        this.waterGif = waterGif;

        let btn2 = this.createBitmapByName("rank_png");
        btn2.fillMode = egret.BitmapFillMode.SCALE;
        btn2.width = 100;
        btn2.height = 100;
        btn2.anchorOffsetX = btn.width / 2;
        btn2.anchorOffsetY = btn.height / 2;
        btn2.x = 300;
        btn2.y = 100;
        btn2.touchEnabled = true;
        btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            this.waterGif.scaleX +=0.1;
            Utility.setGifColor(this.waterGif,Utility.getRandomColor());
        }, this);
        this.addChild(btn2);
    }

    public Update() {

    }

    public addListener() {

    }
    public removeListener() {

    }

}
// class RoleGrid implements IScrollViewGrid<RoleData>{
//     _width: number;
//     _height: number;
//     _s: GameScene;
//     _data: RoleData;
//     public constructor(w: number, h: number, s: GameScene) {
//         this._width = w;
//         this._height = h;
//         this._s = s;
//     }

//     width(): number {
//         return this._width;
//     }
//     height(): number {
//         return this._height;
//     }
//     InitDataUI(container: egret.DisplayObjectContainer, data: RoleData): void {
//         const bgName = data.isSelect ? "grid2_png" : "grid1_png";
//         let bg = Utility.createBitmapByName(bgName);
//         bg.width = this._width;
//         bg.height = this._height;
//         bg.touchEnabled = true;
//         bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt: egret.TouchEvent): void {
//             this.OnGridClick(data.ID);
//         }, this._s);
//         container.addChild(bg);
//         let roleImg = Utility.createBitmapByName(data.roleCfg.idle);
//         roleImg.width = data.roleCfg.width;
//         roleImg.height = data.roleCfg.height;
//         roleImg.anchorOffsetX = roleImg.width / 2;
//         roleImg.anchorOffsetY = roleImg.height / 2;
//         roleImg.x = bg.width / 2;
//         roleImg.y = bg.height / 2;
//         container.addChild(roleImg);
//     }
// }

// class RoleData {
//     public roleCfg;
//     public locked: boolean;
//     public isSelect: boolean;
//     public get ID(): number {
//         return this.roleCfg.id;
//     }
//     public constructor(cfg, lock: boolean, select: boolean) {
//         this.roleCfg = cfg;
//         this.locked = lock;
//         this.isSelect = select;
//     }
// }