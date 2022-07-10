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
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isUserTouch = false;
        _this.isResLoaded = false;
        return _this;
        // private textfield: egret.TextField;
        /**
         * 创建场景界面
         * Create scene interface
         */
        // protected createGameScene(): void {
        //     let sky = this.createBitmapByName("bg_jpg");
        //     this.addChild(sky);
        //     let stageW = this.stage.stageWidth;
        //     let stageH = this.stage.stageHeight;
        //     sky.width = stageW;
        //     sky.height = stageH;
        //     let topMask = new egret.Shape();
        //     topMask.graphics.beginFill(0x000000, 0.5);
        //     topMask.graphics.drawRect(0, 0, stageW, 172);
        //     topMask.graphics.endFill();
        //     topMask.y = 33;
        //     this.addChild(topMask);
        //     let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
        //     this.addChild(icon);
        //     icon.x = 26;
        //     icon.y = 33;
        //     let line = new egret.Shape();
        //     line.graphics.lineStyle(2, 0xffffff);
        //     line.graphics.moveTo(0, 0);
        //     line.graphics.lineTo(0, 117);
        //     line.graphics.endFill();
        //     line.x = 172;
        //     line.y = 61;
        //     this.addChild(line);
        //     let colorLabel = new egret.TextField();
        //     colorLabel.textColor = 0xffffff;
        //     colorLabel.width = stageW - 172;
        //     colorLabel.textAlign = "center";
        //     colorLabel.text = "Hello Egret";
        //     colorLabel.size = 24;
        //     colorLabel.x = 172;
        //     colorLabel.y = 80;
        //     this.addChild(colorLabel);
        //     let textfield = new egret.TextField();
        //     this.addChild(textfield);
        //     textfield.alpha = 0;
        //     textfield.width = stageW - 172;
        //     textfield.textAlign = egret.HorizontalAlign.CENTER;
        //     textfield.size = 24;
        //     textfield.textColor = 0xffffff;
        //     textfield.x = 172;
        //     textfield.y = 135;
        //     this.textfield = textfield;
        //     let button = new eui.Button();
        //     button.label = "Click!";
        //     button.horizontalCenter = 0;
        //     button.verticalCenter = 0;
        //     this.addChild(button);
        //     button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        // }
        /**
         * 描述文件加载成功，开始播放动画
         * Description file loading is successful, start to play the animation
         */
        // private startAnimation(result: Array<any>): void {
        //     let parser = new egret.HtmlTextParser();
        //     let textflowArr = result.map(text => parser.parse(text));
        //     let textfield = this.textfield;
        //     let count = -1;
        //     let change = () => {
        //         count++;
        //         if (count >= textflowArr.length) {
        //             count = 0;
        //         }
        //         let textFlow = textflowArr[count];
        //         // 切换描述内容
        //         // Switch to described content
        //         textfield.textFlow = textFlow;
        //         let tw = egret.Tween.get(textfield);
        //         tw.to({ "alpha": 1 }, 200);
        //         tw.wait(2000);
        //         tw.to({ "alpha": 0 }, 200);
        //         tw.call(change, this);
        //     };
        //     change();
        // }
        /**
         * 点击按钮
         * Click the button
         */
        // private onButtonClick(e: egret.TouchEvent) {
        //     let panel = new eui.Panel();
        //     panel.title = "Title";
        //     panel.horizontalCenter = 0;
        //     panel.verticalCenter = 0;
        //     this.addChild(panel);
        // }
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        SceneManager.ScreenWidth = this.stage.stageWidth;
                        SceneManager.ScreenHeight = this.stage.stageHeight;
                        this.checkUserClick();
                        return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, DataConfig.Instance.Init()];
                    case 2:
                        _a.sent();
                        this.CheckMusicCanPlay();
                        // this.createGameScene();
                        this.Init();
                        // const result = await RES.getResAsync("description_json")
                        // this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        // const result = await RES.getResAsync("description_json")
                        // this.startAnimation(result);
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.checkUserClick = function () {
        var _this = this;
        var touchFunc = function () {
            _this.isUserTouch = true;
            _this.CheckMusicCanPlay();
            _this.removeEventListener(egret.TouchEvent.TOUCH_TAP, touchFunc, _this);
        };
        touchFunc = touchFunc.bind(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, touchFunc, this);
    };
    Main.prototype.CheckMusicCanPlay = function () {
        if (this.isUserTouch && this.isResLoaded) {
            AudioManager.Instance.PlayBGM("BGM_wav");
        }
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        this.isResLoaded = false;
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("loading", 1)];
                    case 2:
                        _a.sent();
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        // console.log("load preload")
                        // await RES.loadGroup("preload", 0, loadingView);
                        return [4 /*yield*/, RES.loadGroup("theme", 0, loadingView)];
                    case 3:
                        // console.log("load preload")
                        // await RES.loadGroup("preload", 0, loadingView);
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("tube", 0, loadingView)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("ui", 0, loadingView)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("gif", 0, loadingView)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("music", 0, loadingView)];
                    case 7:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        this.isResLoaded = true;
                        return [3 /*break*/, 9];
                    case 8:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.Init = function () {
        SceneManager.Instance.rootLayer = this;
        this.addEventListener(egret.Event.ENTER_FRAME, this.Update, this);
        SceneManager.Instance.RegisterScene("StartScene", new StartScene());
        SceneManager.Instance.RegisterScene("GameScene", new GameScene());
        SceneManager.Instance.RegisterScene("PauseScene", new PauseScene());
        SceneManager.Instance.RegisterScene("ResultScene", new ResultScene());
        SceneManager.Instance.RegisterScene("ShopScene", new ShopScene());
        SceneManager.Instance.RegisterScene("SelectLevelScene", new SelectLevelScene());
        SceneManager.Instance.RegisterScene("RankScene", new RankScene());
        SceneManager.Instance.changeScene("StartScene");
        this.Test();
    };
    Main.prototype.Test = function () {
        // let str = new String("#FEAD48");
        // let a = str.charAt(0);
        // let aa = Utility.ColorHTMLToInt("#FEAD48");//16690504
        // console.log(a,a=="#",aa);
        // const aa = SHA1.getInstance().hex_sha1("test");
        // const bb = SHA1.getInstance().hex_sha1(1);
        //  const cc = SHA1.getInstance().hex_sha1("1");
        // console.log(aa);
        // console.log(bb);
        // console.log(cc);
    };
    Main.prototype.onPostComplete = function (event) {
        var request = event.currentTarget;
        console.log("post data : ", request.response);
        var responseLabel = new egret.TextField();
        responseLabel.size = 18;
        responseLabel.text = "POST response:\n" + request.response.substring(0, 50) + "...";
        this.addChild(responseLabel);
        responseLabel.x = 300;
        responseLabel.y = 70;
    };
    Main.prototype.onPostIOError = function (event) {
        console.log("post error : " + event);
    };
    Main.prototype.onPostProgress = function (event) {
        console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    //ArrayBuffer转字符串
    Main.prototype.ab2str = function (u, f) {
        var b = new Blob([u]);
        var r = new FileReader();
        r.readAsText(b, 'utf-8');
        r.onload = function () { if (f)
            f.call(null, r.result); };
    };
    //字符串转字符串ArrayBuffer
    Main.prototype.str2ab = function (s, f) {
        var b = new Blob([s], { type: 'text/plain' });
        var r = new FileReader();
        r.readAsArrayBuffer(b);
        r.onload = function () { if (f)
            f.call(null, r.result); };
    };
    Main.prototype.Update = function () {
        if (SceneManager.Instance.GetCurScene() != null) {
            SceneManager.Instance.GetCurScene().Update();
        }
        if (SceneManager.Instance.GetPopScene() != null) {
            SceneManager.Instance.GetPopScene().Update();
        }
    };
    Main.prototype.onRotation = function (angle) {
        if (angle == 0) {
            SceneManager.ScreenWidth = this.stage.stageWidth;
            SceneManager.ScreenHeight = this.stage.stageHeight;
        }
        else {
            SceneManager.ScreenWidth = this.stage.stageWidth;
            SceneManager.ScreenHeight = this.stage.stageHeight;
        }
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map