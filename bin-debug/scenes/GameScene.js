var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameScene.prototype.onComplete = function () {
        this.InitTubes();
        this.Test();
    };
    GameScene.prototype.InitBG = function () {
    };
    GameScene.prototype.InitDiamons = function () {
    };
    GameScene.prototype.InitPauseBtn = function () {
    };
    GameScene.prototype.InitBottomBtn = function () {
    };
    GameScene.prototype.InitTubes = function () {
        // let aa = this.createBitmapByName("white_jpg");
        // aa.width = 80;
        // aa.height = 308;
        // aa.anchorOffsetX = aa.width/2;
        // aa.anchorOffsetY = aa.height/2;
        // aa.x = SceneManager.ScreenWidth/2;
        // aa.y = SceneManager.ScreenHeight/2;
        // this.addChild(aa);
        // let tube:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        // tube.width = 80;
        // tube.height = 308;
        // tube.x = SceneManager.ScreenWidth/2;
        // tube.y = SceneManager.ScreenHeight/2;
        // this.addChild(tube);
        // let tubeBG = this.createBitmapByName("pz_di_bt_1_2_png");
        // tubeBG.width = 80;
        // tubeBG.height = 308;
        // tubeBG.anchorOffsetX = tubeBG.width/2;
        // tubeBG.anchorOffsetY = tubeBG.height;
        // tubeBG.x = tubeBG.width/2;
        // tubeBG.y = tubeBG.height;
        // tube.addChild(tubeBG);
        // let water1 = this.createBitmapByName("white_jpg");
        // water1.width = 80;
        // water1.height = 66;
        // water1.x = 0;
        // water1.y = 0;
        // Utility.setImageColor(water1,Utility.getRandomColor());
        // water1.mask = tubeBG;
        // tube.addChild(water1);
    };
    GameScene.prototype.Test = function () {
        var tube = new egret.DisplayObjectContainer();
        tube.width = 80;
        tube.height = 302;
        tube.x = SceneManager.ScreenWidth / 2;
        tube.y = SceneManager.ScreenHeight / 2;
        this.addChild(tube);
        var _mask = this.createBitmapByName("pz_di_bt_1_2_png");
        _mask.fillMode = egret.BitmapFillMode.SCALE;
        _mask.width = 80;
        _mask.height = 302;
        tube.addChild(_mask);
        var container = new egret.DisplayObjectContainer();
        container.width = 80;
        container.height = 302;
        tube.addChild(container);
        var water1 = this.createBitmapByName("white_jpg");
        Utility.setImageColor(water1, Utility.ColorHTMLToInt("#FF0000"));
        water1.width = 80;
        water1.height = 66;
        water1.x = 0;
        water1.y = 302 - 66;
        container.addChild(water1);
        var water2 = this.createBitmapByName("white_jpg");
        Utility.setImageColor(water2, Utility.ColorHTMLToInt("#00FF00"));
        water2.width = 80;
        water2.height = 66;
        water2.x = 0;
        water2.y = 302 - 66 - 66;
        container.addChild(water2);
        var waterGif = this.createGif("water_flow_json", "water_flow_png");
        waterGif.width = 80;
        waterGif.height = 66;
        waterGif.x = 0;
        waterGif.y = 302 - 66 - 66 - 66;
        Utility.setGifColor(waterGif, Utility.ColorHTMLToInt("#FFFF00"));
        container.addChild(waterGif);
        waterGif.gotoAndPlay(0, -1);
        container.mask = _mask;
        var fg = this.createBitmapByName("pz_di_bt_1_1_png");
        fg.fillMode = egret.BitmapFillMode.SCALE;
        fg.width = 80;
        fg.height = 302;
        tube.addChild(fg);
        var btn = this.createBitmapByName("shop_png");
        btn.fillMode = egret.BitmapFillMode.SCALE;
        btn.width = 100;
        btn.height = 100;
        btn.anchorOffsetX = btn.width / 2;
        btn.anchorOffsetY = btn.height / 2;
        btn.x = 100;
        btn.y = 100;
        btn.touchEnabled = true;
        var aaa = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (aaa) {
                fg.texture = RES.getRes("pz_di_bt_1_3_png");
                aaa = false;
            }
            else {
                fg.texture = RES.getRes("pz_di_bt_1_1_png");
                aaa = true;
            }
            // this.flow.anchorOffsetX +=10;
            // this.flow.x+=10;
            // function foo(...args:any[]){
            //     console.log("args",this.flow.x,this.flow.y,this.flow.rotation);
            // }
            // let tw = egret.Tween.get(this.flow,{loop:false,onChange:foo,onChangeObj:this});
            // tw.to({"x":100,"y":300,"rotation":75},0.2*1000).call(()=>{
            //     Utility.setImageColor(this.flow,Utility.getRandomColor())
            // },this).call(()=>{
            //     function foo2(...args:any[]){
            //         console.log("args22",this.flow.x,this.flow.y,this.flow.rotation);
            //     }
            //     let tw2 = egret.Tween.get(this.flow,{loop:false,onChange:foo2,onChangeObj:this});
            //     tw2.to({"x":300,"y":600,"rotation":0},0.2*1000).call(()=>{
            //         Utility.setImageColor(this.flow,Utility.getRandomColor())
            //     },this);
            // },this);
        }, this);
        this.addChild(btn);
        var btn2 = this.createBitmapByName("rank_png");
        btn2.fillMode = egret.BitmapFillMode.SCALE;
        btn2.width = 100;
        btn2.height = 100;
        btn2.anchorOffsetX = btn.width / 2;
        btn2.anchorOffsetY = btn.height / 2;
        btn2.x = 300;
        btn2.y = 100;
        btn2.touchEnabled = true;
        btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            tube.rotation += 5;
            water1.rotation -= 5;
            water2.rotation -= 5;
            waterGif.rotation -= 5;
            // container.rotation+=5;
            // this.removeChild(this.flow);
            // delete this.flow;
        }, this);
        this.addChild(btn2);
    };
    GameScene.prototype.Update = function () {
    };
    GameScene.prototype.addListener = function () {
    };
    GameScene.prototype.removeListener = function () {
    };
    return GameScene;
}(Scene));
__reflect(GameScene.prototype, "GameScene");
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
//# sourceMappingURL=GameScene.js.map