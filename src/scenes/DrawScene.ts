class DrawScene extends Scene {
    private bg:egret.Bitmap;
    

    private gameType:GameType;
    private completeLevel:number;
    protected onComplete(...args:any[]){

        this.InitBG();
    }

    private InitBG(){
        if(this.bg==null){
            this.bg = this.createBitmapByName("mask_png");
            this.bg.fillMode = egret.BitmapFillMode.SCALE;
            this.bg.width = SceneManager.ScreenWidth;
            this.bg.height = SceneManager.ScreenHeight;
            this.addChild(this.bg);
        }
    }
    

    public Update(){

    }
    public addListener(){

    }
    public removeListener(){

    }
}