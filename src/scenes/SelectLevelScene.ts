class SelectLevelScene extends Scene {
    private bg:egret.Bitmap;
    private titleTXT:egret.TextField;
    private closeBtn:egret.Bitmap;
    private scrollView:LzyScrollView;
    private levels:number[]=[];
    private pageIndex:number;
    private pageMax:number;
    private levelMax:number;
    private levelGrid:LevelGrid;

    private bottomLeftBtn:egret.Bitmap;
    private bottomRightBtn:egret.Bitmap;
    private pageTxt:egret.TextField;
    
    private gameType:GameType;
    protected onComplete(...args:any[]){
        if(args.length>0){
            this.gameType=args[0];
        }else{
            this.gameType=GameType.Normal;
        }
        this.InitBG();
        this.InitTitleTXT();
        this.InitCloseBtn();
        this.InitLevelScrollView();
        this.InitLevelDatas();
        this.InitBottom();
        this.RefreshLevelDatas();
    }

    private InitBG(){
        if(this.bg==null){
            this.bg = this.createBitmapByName("bg_1_png");
            this.bg.fillMode = egret.BitmapFillMode.SCALE;
            this.bg.width = SceneManager.ScreenWidth;
            this.bg.height = SceneManager.ScreenHeight;
            this.addChild(this.bg);
        }
    }

    private InitTitleTXT(){
        if(this.titleTXT==null){
            let s = "选择关卡";
            this.titleTXT=this.createTextField(300,60,0xFFFFFF,42,s);
            this.titleTXT.textAlign = egret.HorizontalAlign.CENTER;
            this.titleTXT.x=SceneManager.ScreenWidth/2-this.titleTXT.width/2;
            this.titleTXT.y=30;
            this.addChild(this.titleTXT);
        }
    }

    private InitCloseBtn(){
        if(this.closeBtn==null){
            let topOffset=70;//距离顶部的高度
            this.closeBtn = this.createBitmapByName("close2_png");
            this.closeBtn.fillMode=egret.BitmapFillMode.SCALE;
            this.closeBtn.width=60;
            this.closeBtn.height=60;
            this.closeBtn.x=SceneManager.ScreenWidth-this.closeBtn.width-30;
            this.closeBtn.y=topOffset;
            this.addChild(this.closeBtn);
        }
    }

    private spacing = 20;
    private lineCount = 5;
    private InitLevelScrollView(){
        if(this.scrollView==null){
            let paddingTop=140;
            let paddingBottom=270;
            let w=SceneManager.ScreenWidth-120;
            let h=SceneManager.ScreenHeight-paddingTop-paddingBottom;
            let x=60;
            let y=paddingTop;
            this.scrollView=new LzyScrollView(true,w,h,x,y,0,0,"empty_png");
            this.scrollView.name="levelSV";
            this.addChild(this.scrollView);
        }

        if(this.levelGrid==null){
            let w = (this.scrollView.width+this.spacing)/this.lineCount-this.spacing;
            this.levelGrid=new LevelGrid(this,w,w);
        }
    }

    private InitLevelDatas(){
        let curLevel=PlayerData.Instance.GetCurLevel(this.gameType);
        this.levelMax = curLevel;
        let pageCount=Math.ceil(curLevel/100);
        if(pageCount<1){pageCount=1;}
        this.pageMax=pageCount;
        this.pageIndex=1;//[1,pageMax]
    }
    private RefreshLevelDatas(){
        let startLevel=1+100*(this.pageIndex-1);
        let endLevel=startLevel+100;
        this.levels=[];
        for(let i=startLevel;i<endLevel;i++){
            if(i<=this.levelMax){
                this.levels.push(i);
            }
        }
        this.RefreshScrollView();
        this.pageTxt.text=String(this.pageIndex);
        if(this.pageIndex==1){
            if(this.getChildByName("leftBtn")!=null){
                this.removeChild(this.bottomLeftBtn);
            }
        }else{
            if(this.getChildByName("leftBtn")==null){
                this.addChild(this.bottomLeftBtn);
            }
        }
        if(this.pageIndex==this.pageMax){
            if(this.getChildByName("rightBtn")!=null){
                this.removeChild(this.bottomRightBtn);
            }
        }else{
            if(this.getChildByName("rightBtn")==null){
                this.addChild(this.bottomRightBtn);
            }
        }
    }

    private RefreshScrollView(){
        this.scrollView.SetContent(this.spacing,this.spacing,this.levels,this.levelGrid);
    }

    public addBtnEventListener(btn:egret.DisplayObjectContainer){
        Utility.ButtonActive(btn,true);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLevelBtnClick.bind(this,btn), this);
    }

    private onLevelBtnClick(btn:egret.DisplayObjectContainer){
        let levelTxt:egret.TextField = btn.getChildByName("levelTxt")as egret.TextField;
        console.log(levelTxt.text);
        let selectLevel=Number(levelTxt.text);
        console.log(SceneManager.Instance.GetCurScene().name)
        if(SceneManager.Instance.GetCurScene().name=="StartScene"){
            SceneManager.Instance.popScene();
            SceneManager.Instance.changeScene("GameScene",this.gameType,selectLevel);
        }else{
            SceneManager.Instance.popScene();
            EventCenter.Notify(EventID.RefreshLevel,this.gameType,selectLevel);
        }
    }

    private InitBottom(){
        if(this.bottomLeftBtn==null){
            this.bottomLeftBtn=this.createBitmapByName("left_png",50,50,true);
            this.bottomLeftBtn.name="leftBtn";
            this.bottomLeftBtn.fillMode=egret.BitmapFillMode.SCALE;
            this.bottomLeftBtn.x=SceneManager.ScreenWidth/2-100;
            this.bottomLeftBtn.y=SceneManager.ScreenHeight-220;
            this.addChild(this.bottomLeftBtn);
        }
        if(this.bottomRightBtn==null){
            this.bottomRightBtn=this.createBitmapByName("right_png",50,50,true);
            this.bottomRightBtn.name="rightBtn";
            this.bottomRightBtn.fillMode=egret.BitmapFillMode.SCALE;
            this.bottomRightBtn.x=SceneManager.ScreenWidth/2+100;
            this.bottomRightBtn.y=SceneManager.ScreenHeight-220;
            this.addChild(this.bottomRightBtn);
        }
        let pageStr=String(this.pageIndex);
        if(this.pageTxt==null){
            this.pageTxt=this.createTextField(300,100,0xFFFFFF,30,pageStr);
            this.pageTxt.textAlign=egret.HorizontalAlign.CENTER;
            this.pageTxt.anchorOffsetX=this.pageTxt.width/2;
            this.pageTxt.anchorOffsetY=this.pageTxt.height/2;
            this.pageTxt.x=SceneManager.ScreenWidth/2;
            this.pageTxt.y=SceneManager.ScreenHeight-220;
            this.addChild(this.pageTxt);
        }else{
            this.pageTxt.text=pageStr;
        }

    }

    public Update(){

    }
    public addListener(){
        Utility.ButtonActive2(this.closeBtn,true);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
        Utility.ButtonActive2(this.bottomLeftBtn,true);
        this.bottomLeftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bottomLeftBtnClick, this);
        Utility.ButtonActive2(this.bottomRightBtn,true);
        this.bottomRightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bottomRightBtnClick, this);
    }
    public removeListener(){
        Utility.ButtonActive2(this.closeBtn,false);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
        Utility.ButtonActive2(this.bottomLeftBtn,false);
        this.bottomLeftBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bottomLeftBtnClick, this);
        Utility.ButtonActive2(this.bottomRightBtn,false);
        this.bottomRightBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bottomRightBtnClick, this);
    }

    private closeBtnClick(){
        AudioManager.Instance.PlaySound("btnback_wav");
        SceneManager.Instance.popScene();
    }
    private bottomLeftBtnClick(){
        if(this.pageIndex==1){
            return;
        }
        this.pageIndex-=1;
        this.RefreshLevelDatas();
    }
    private bottomRightBtnClick(){
        if(this.pageIndex==this.pageMax){
            return;
        }
        this.pageIndex+=1;
        this.RefreshLevelDatas();
    }
}


class LevelGrid implements IScrollViewGrid<number> {
    private scene:SelectLevelScene;
    private _width:number;
    private _height:number;
    public constructor(scene:SelectLevelScene,w:number,h:number){
        this.scene=scene;
        this._width=w;
        this._height=h;
    }
    public width(): number{
        return this._width;
    }
    public height(): number{
        return this._height;
    }
    public InitDataUI(container: egret.DisplayObjectContainer, data: number): void{
        let levelNum=String(data);
        if(container.getChildByName("btn")==null){
            let btn = Utility.createButton("btn4_png",this._width,this._height,true);
            btn.name="btn";
            btn.x=this._width/2;
            btn.y=this._height/2;
            let txt=Utility.createTextField(this._width,this._height,0xFFFFFF,40,levelNum);
            txt.name="levelTxt";
            txt.textAlign=egret.HorizontalAlign.CENTER;
            btn.addChild(txt);
            container.addChild(btn);
            this.scene.addBtnEventListener(btn);
        }else{
            let btn = container.getChildByName("btn")as egret.DisplayObjectContainer;
            let txt=btn.getChildByName("levelTxt")as egret.TextField;
            txt.text=levelNum;
        }
            // let btn = container.getChildByName("btn")as egret.DisplayObjectContainer;
            // let txt=btn.getChildByName("levelTxt")as egret.TextField;
            // txt.text=String(container.hashCode);
    }
    public Destroy(container: egret.DisplayObjectContainer):void{

    }
}