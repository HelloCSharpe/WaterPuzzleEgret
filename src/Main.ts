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
class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        // this.createGameScene();
        this.Init();
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        // await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);


    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }



    private Init(): void {
        SceneManager.ScreenWidth = this.stage.stageWidth;
        SceneManager.ScreenHeight = this.stage.stageHeight;
        SceneManager.Instance.rootLayer = this;
        this.Test();
        this.addEventListener(egret.Event.ENTER_FRAME, this.Update, this);
        SceneManager.Instance.RegisterScene("TestScene", new TestScene());
        SceneManager.Instance.RegisterScene("TestScene2", new TestScene2());
        SceneManager.Instance.changeScene("TestScene");
    }

    private Test(): void {
        const aa = SHA1.getInstance().hex_sha1("test");
        const bb = SHA1.getInstance().hex_sha1(1);
         const cc = SHA1.getInstance().hex_sha1("1");
        console.log(aa);
        console.log(bb);
        console.log(cc);
    }

    public onPostComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("post data : ", request.response);
        var responseLabel = new egret.TextField();
        responseLabel.size = 18;
        responseLabel.text = "POST response:\n" + request.response.substring(0, 50) + "...";
        this.addChild(responseLabel);
        responseLabel.x = 300;
        responseLabel.y = 70;
    }

    public onPostIOError(event: egret.IOErrorEvent): void {
        console.log("post error : " + event);
    }

    public onPostProgress(event: egret.ProgressEvent): void {
        console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }

    //ArrayBuffer转字符串
    private ab2str(u, f) {
        var b = new Blob([u]);
        var r = new FileReader();
        r.readAsText(b, 'utf-8');
        r.onload = function () { if (f) f.call(null, r.result) }
    }
    //字符串转字符串ArrayBuffer
    
    private str2ab(s, f) {
        var b = new Blob([s], { type: 'text/plain' });
        var r = new FileReader();
        r.readAsArrayBuffer(b);
        r.onload = function () { if (f) f.call(null, r.result) }
    }

    private Update(): void {
        if (SceneManager.Instance.GetCurScene() != null) {
            SceneManager.Instance.GetCurScene().Update();
        }
    }

    public onRotation(angle: number): void {
        if (angle == 0) {
            SceneManager.ScreenWidth = this.stage.stageWidth;
            SceneManager.ScreenHeight = this.stage.stageHeight;
        } else {
            SceneManager.ScreenWidth = this.stage.stageWidth;
            SceneManager.ScreenHeight = this.stage.stageHeight;
        }
    }
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
