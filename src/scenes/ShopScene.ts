class ShopScene extends Scene {
    private bg:egret.Bitmap;
    private diamonLayout:egret.DisplayObjectContainer;
    private diamonTxt:egret.TextField;
    private closeBtn:egret.Bitmap;
    private titleTXT:egret.TextField;
    private topTogs:egret.DisplayObjectContainer[];

    private scrollView:LzyScrollView;
    private diamonGrid:DiamonGrid;
    private tubeGrid:TubeThemeGrid;
    private datas1:DiamonData[]=[];
    private datas2:TubeThemeData[]=[];
    private datas3:TubeThemeData[]=[];

    private togLen:number=3;
    private togIndex:number=0;
    //默认态，选中态
    private togBgColors:string[]=["#513007","#D3A74F"];
    private togIconColors:string[]=["#B48B5D","#FFFFFF"];

    protected onComplete(...args:any[]){
        if(args[0]!=null){
            this.togIndex=args[0];
        }else{
            this.togIndex=0;
        }
        this.InitBG();
        this.InitDiamons();
        this.InitTitleTXT();
        this.InitCloseBtn();
        this.InitTopTogs();
        this.InitScrollView();
        this.InitGridAndDatas();
        this.OnTogClick(this.togIndex);
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

    private InitDiamons():void{
        let diamonResName="icon1_png";
        // if(this.gameType==GameType.Normal){
        //     diamonResName="icon1_png";
        // }else if(this.gameType==GameType.Difficult){
        //     diamonResName="icon1_png";
        // }else if(this.gameType==GameType.Purgatory){
        //     diamonResName="icon1_png";
        // }
        if (this.diamonLayout==null){
            this.diamonLayout = new egret.DisplayObjectContainer();
            this.diamonLayout.width=210;
            this.diamonLayout.height=60;
            this.diamonLayout.x=30;
            this.diamonLayout.y=30;
            this.addChild(this.diamonLayout);

            let diamonBG = this.createBitmapByName("di_png");
            diamonBG.fillMode = egret.BitmapFillMode.SCALE;
            diamonBG.width=this.diamonLayout.width;
            diamonBG.height=this.diamonLayout.height;
            this.diamonLayout.addChild(diamonBG);

            let diamonIcon = this.createBitmapByName(diamonResName);
            diamonIcon.name="diamonIcon";
            diamonIcon.width = 90;
            diamonIcon.height = 90;
            diamonIcon.anchorOffsetX = diamonIcon.width/2;
            diamonIcon.anchorOffsetY = diamonIcon.height/2;
            diamonIcon.x=diamonIcon.width/2;
            diamonIcon.y=this.diamonLayout.height/2;
            this.diamonLayout.addChild(diamonIcon);

            let diamonTxt= new egret.TextField();
            diamonTxt.text = String(PlayerData.Instance.diamon);
            diamonTxt.fontFamily = "myFirstFont";
            diamonTxt.textColor = 0xFFFFFF;
            diamonTxt.textAlign = egret.HorizontalAlign.LEFT;  //水平右对齐，相对于 textField 控件自身的 width 与 height
            diamonTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
            diamonTxt.width = this.diamonLayout.width-diamonIcon.width;
            diamonTxt.height = this.diamonLayout.height;
            diamonTxt.x=diamonIcon.width;
            diamonTxt.y=0;
            diamonTxt.size = 36;
            this.diamonTxt = diamonTxt;
            this.diamonLayout.addChild(diamonTxt);
        }else{
            this.diamonTxt.text=String(PlayerData.Instance.diamon);
            let diamonIcon:egret.Bitmap = this.diamonLayout.getChildByName("diamonIcon") as egret.Bitmap;
            diamonIcon.texture = RES.getRes(diamonResName);
        }
    }

    private InitTitleTXT(){
        if(this.titleTXT==null){
            let s = "商店";
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

    

    private InitTopTogs(){
        if(this.topTogs==null){
            this.topTogs=[];
            let len=this.togLen;
            let paddingLeft=50;
            let offset=5;
            let w=(SceneManager.ScreenWidth-paddingLeft*2-(len-1)*offset)/3;
            let h=60;
            let paddingTop=SceneManager.ScreenHeight*0.25-70;
            for(let i=0;i<len;i++){
                let togRes:string="tog1_png";
                if(i==0){
                    togRes="tog1_png";
                }else if(i==len-1){
                    togRes="tog3_png";
                }else{
                    togRes="tog2_png";
                }
                let tog=this.createButton(togRes,w,h);
                tog.x=paddingLeft+(w+offset)*i;
                tog.y=paddingTop;
                let btnBg:egret.Bitmap=tog.getChildByName("btnBg") as egret.Bitmap;
                Utility.setImageColor(btnBg,Utility.ColorHTMLToInt(this.togBgColors[0]));
                let icon=this.createBitmapByName(`tog_icon${i+1}_png`,54,54,true);
                Utility.setImageColor(icon,Utility.ColorHTMLToInt(this.togIconColors[0]));
                icon.name="icon";
                icon.x=w/2;
                icon.y=h/2;
                tog.addChild(icon);
                this.addChild(tog);
                this.topTogs.push(tog);
            }
        }
    }

    private InitScrollView(){
        if(this.scrollView==null){
            let w=SceneManager.ScreenWidth-160;
            let h=SceneManager.ScreenHeight/2;
            let aX=w/2;
            let aY=h/2;
            let x=SceneManager.ScreenWidth/2;
            let y=SceneManager.ScreenHeight/2+30;
            this.scrollView=new LzyScrollView(true,w,h,x,y,aX,aY,"white_jpg");
            this.addChild(this.scrollView);
        }
    }

    private InitGridAndDatas(){
        if(this.diamonGrid==null){
            let w=this.scrollView.width;
            let h=100;
            this.diamonGrid=new DiamonGrid(this,w,h);
            let offset=56;
            let w2=(w-offset)/2;
            let h2=w2;
            this.tubeGrid=new TubeThemeGrid(this,w2,h2);
            
            let purcharseCfg=DataConfig.Instance.GetConfig("purchaser");
            let len = purcharseCfg.length;
            for(let i=0;i<len;i++){
                purcharseCfg[i]
            }

        }
    }

    private OnTogClick(index:number){
        if(this.topTogs[index]==null){
            return;
        }
        let tog:egret.DisplayObjectContainer=this.topTogs[index];
        let btnBg:egret.Bitmap=tog.getChildByName("btnBg") as egret.Bitmap;
        Utility.setImageColor(btnBg,Utility.ColorHTMLToInt(this.togBgColors[1]));
        let icon:egret.Bitmap=tog.getChildByName("icon") as egret.Bitmap;
        Utility.setImageColor(icon,Utility.ColorHTMLToInt(this.togIconColors[1]));

        //刷新数据
        if(index==0){
            
        }else if(index==1){

        }else if(index==2){

        }

    }

    public Update(){

    }
    public addListener(){
        Utility.ButtonActive2(this.closeBtn,true);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
        let len=this.togLen;
        for(let i=0;i<len;i++){

        }
    }
    public removeListener(){

    }

    private closeBtnClick(){

    }

    private togClick(index:number){

    }

}

class DiamonData{
    public configId:number;//配置表Id
    public texRes:string;//贴图的资源key
    public desc:string;//描述
    public costType:number;//消耗类型
    public costIcon:string;//icon资源key
    public costStr:number;//消耗文本
    public isHot:boolean;//是否是热卖
}

class DiamonGrid implements IScrollViewGrid<DiamonData> {
    private _width:number;
    private _height:number;
    private scene:Scene;
    public constructor(s:Scene,w:number,h:number){
        this.scene=s;
        this._width=w;
        this._height=h;
    }
    public width(): number{
        return this._width;
    }
    public height(): number{
        return this._height;
    }
    public InitDataUI(container: egret.DisplayObjectContainer, data: DiamonData): void{

    }
    public Destroy(container: egret.DisplayObjectContainer):void{
        
    }
}

class TubeThemeData{
    public configId:number;//配置表Id
    public isTube:boolean;//是否是tube，不是tube就是theme
    public isUsed:boolean;//是否正在使用
    public texRes:string;//贴图的资源key
    public isOwn:boolean;//是否已经拥有(未拥有就是锁住态)
    public costType:number;//消耗类型
    public cost:number;//解锁所需消耗
    
}

class TubeThemeGrid implements IScrollViewGrid<TubeThemeData> {
    private _width:number;
    private _height:number;
    private scene:Scene;
    public constructor(s:Scene,w:number,h:number){
        this.scene=s;
        this._width=w;
        this._height=h;
    }
    public width(): number{
        return this._width;
    }
    public height(): number{
        return this._height;
    }
    public InitDataUI(container: egret.DisplayObjectContainer, data: TubeThemeData): void{

    }
    public Destroy(container: egret.DisplayObjectContainer):void{
        
    }
}
