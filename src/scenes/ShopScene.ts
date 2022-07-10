class ShopScene extends Scene {
    private bg:egret.Bitmap;
    private diamonLayout1:egret.DisplayObjectContainer;
    private diamonLayout2:egret.DisplayObjectContainer;
    private diamonTxt:egret.TextField;
    private closeBtn:egret.Bitmap;
    private titleTXT:egret.TextField;
    private topTogs:egret.DisplayObjectContainer[];

    private scrollView:LzyScrollView;
    private scrollView2:LzyScrollView;
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
    private togFuncs:Function[]=[];

    protected onComplete(...args:any[]){
        this.togIndex=-1;
        let _index=0;
        if(args[0]!=null){
            _index=args[0];
        }
        this.InitBG();
        this.InitDiamons();
        this.InitTitleTXT();
        this.InitCloseBtn();
        this.InitTopTogs();
        this.InitScrollView();
        this.InitGrid();
        this.InitDatas();
        this.OnTogClick(_index);
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
        let res1="icon1_png";
        let num1 = PlayerData.Instance.GetDiamons(GameType.Normal);
        let res2="icon10_png";
        let num2 = PlayerData.Instance.GetDiamons(GameType.Difficult);
        if (this.diamonLayout1==null){

            this.diamonLayout1=GameUtil.createDiamonLayout(res1,num1);
            this.diamonLayout1.x=30;
            this.diamonLayout1.y=30;
            this.addChild(this.diamonLayout1);
        }else{
            GameUtil.changeDiamonIconAndNum(this.diamonLayout1,res1,num1);
        }

        if (this.diamonLayout2==null){

            this.diamonLayout2=GameUtil.createDiamonLayout(res2,num2);
            this.diamonLayout2.x=30;
            this.diamonLayout2.y=100;
            this.addChild(this.diamonLayout2);
        }else{
            GameUtil.changeDiamonIconAndNum(this.diamonLayout2,res2,num2);
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
            let w=SceneManager.ScreenWidth-120;
            let h=SceneManager.ScreenHeight/2;
            let aX=w/2;
            let aY=h/2;
            let x=SceneManager.ScreenWidth/2;
            let y=SceneManager.ScreenHeight/2+30;
            this.scrollView=new LzyScrollView(true,w,h,x,y,aX,aY,"empty_png");
            this.scrollView.name="diamonSV";
            this.addChild(this.scrollView);
        }
        if(this.scrollView2==null){
            let w=SceneManager.ScreenWidth-120;
            let h=SceneManager.ScreenHeight/2;
            let aX=w/2;
            let aY=h/2;
            let x=SceneManager.ScreenWidth/2;
            let y=SceneManager.ScreenHeight/2+30;
            this.scrollView2=new LzyScrollView(true,w,h,x,y,aX,aY,"empty_png");
            this.scrollView2.name="skinSV";
            this.addChild(this.scrollView2);
        }
    }

    private SetScrollView(togIndex:number){
        if(togIndex==0){//付费
            if(this.getChildByName("diamonSV")==null){
                this.addChild(this.scrollView);
            }
            if(this.getChildByName("skinSV")!=null){
                this.removeChild(this.scrollView2);
            }
        }else{
            if(this.getChildByName("diamonSV")!=null){
                this.removeChild(this.scrollView);
            }
            if(this.getChildByName("skinSV")==null){
                this.addChild(this.scrollView2);
            }
        }
    }

    private TubeThemeSpacing:number=30;

    private InitGrid(){
        if(this.diamonGrid==null){
            let w=this.scrollView.width;
            let h=120;
            this.diamonGrid=new DiamonGrid(this,w,h);
            let spacingX=this.TubeThemeSpacing;
            let paddingX=0;
            let w2=((w-paddingX)+spacingX)/2-spacingX;
            let h2=w2;
            this.tubeGrid=new TubeThemeGrid(this,w2,h2);
        }
    }

    private InitDatas(){
        if(this.datas1.length==0){
            let purcharseCfg=DataConfig.Instance.GetConfig("purchaser");
            let len = purcharseCfg.length;
            for(let i=0;i<len;i++){
                let cfg=purcharseCfg[i];
                let data=new DiamonData();
                data.configId=cfg.ID;
                data.config=cfg;
                data.isGot=false;
                if(cfg.Type==1){
                    data.isGot=PlayerData.Instance.noAds;
                }
                this.datas1.push(data);
            }
        }else{
            let len1 = this.datas1.length;
            for(let i=0;i<len1;i++){
                let data=this.datas1[i];
                let id=data.configId;
                data.isGot=false;
                if(data.config.Type==1){
                    data.isGot=PlayerData.Instance.noAds;
                }
            }
        }
        if(this.datas2.length==0){
            let tubeConfig=DataConfig.Instance.GetConfig("tube");
            let len2 = tubeConfig.length;
            for(let i=0;i<len2;i++){
                let cfg=tubeConfig[i];
                let data=new TubeThemeData();
                let id=cfg.ID;
                data.configId=id;
                data.config=cfg;
                data.isTube=true;
                data.isUsed=(PlayerData.Instance.curTubeID==id);
                data.isOwn=PlayerData.Instance.isTubeContains(id);
                this.datas2.push(data);
            }
        }else{
            let len2 = this.datas2.length;
            for(let i=0;i<len2;i++){
                let data=this.datas2[i];
                let id=data.configId;
                data.isUsed=(PlayerData.Instance.curTubeID==id);
                data.isOwn=PlayerData.Instance.isTubeContains(id);
            }
        }

        if(this.datas3.length==0){
            let themeConfig=DataConfig.Instance.GetConfig("theme");
            let len3 = themeConfig.length;
            for(let i=0;i<len3;i++){
                let cfg=themeConfig[i];
                let data=new TubeThemeData();
                let id=cfg.ID;
                data.configId=id;
                data.config=cfg;
                data.isTube=false;
                data.isUsed=(PlayerData.Instance.curThemeID==id);
                data.isOwn=PlayerData.Instance.isThemeContains(id);
                this.datas3.push(data);
            }
        }else{
            let len3 = this.datas3.length;
            for(let i=0;i<len3;i++){
                let data=this.datas3[i];
                let id=data.configId;
                data.isUsed=(PlayerData.Instance.curThemeID==id);
                data.isOwn=PlayerData.Instance.isThemeContains(id);
            }
        }

    }

    private OnTogClick(index:number){
        if(this.topTogs[index]==null){
            return;
        }
        if(this.togIndex==index){
            return;
        }
        
        let tog:egret.DisplayObjectContainer=this.topTogs[index];
        let btnBg:egret.Bitmap=tog.getChildByName("btnBg") as egret.Bitmap;
        Utility.setImageColor(btnBg,Utility.ColorHTMLToInt(this.togBgColors[1]));
        let icon:egret.Bitmap=tog.getChildByName("icon") as egret.Bitmap;
        Utility.setImageColor(icon,Utility.ColorHTMLToInt(this.togIconColors[1]));

        if(this.togIndex>=0){
            let prevTog:egret.DisplayObjectContainer=this.topTogs[this.togIndex];
            let btnBg2:egret.Bitmap=prevTog.getChildByName("btnBg") as egret.Bitmap;
            Utility.setImageColor(btnBg2,Utility.ColorHTMLToInt(this.togBgColors[0]));
            let icon2:egret.Bitmap=prevTog.getChildByName("icon") as egret.Bitmap;
            Utility.setImageColor(icon2,Utility.ColorHTMLToInt(this.togIconColors[0]));
        }
        this.togIndex=index;

        let sp=this.TubeThemeSpacing;
        //刷新数据
        if(index==0){
            this.scrollView.SetContent<DiamonData>(0,10,this.datas1,this.diamonGrid,0,0);
        }else if(index==1){
            this.scrollView2.SetContent<TubeThemeData>(sp,sp,this.datas2,this.tubeGrid);
        }else if(index==2){
            this.scrollView2.SetContent<TubeThemeData>(sp,sp,this.datas3,this.tubeGrid);
        }
        this.SetScrollView(index);

    }

    public addDiamonEventListener(btn:egret.DisplayObjectContainer){
        Utility.ButtonActive(btn,true);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.DiamonClick.bind(this,btn), this);
    }

    public addTubeClickListener(btn:egret.DisplayObjectContainer){
        btn.touchEnabled=true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TubeThemeClick.bind(this,btn), this);
    }

    public Update(){

    }

    public addListener(){
        Utility.ButtonActive2(this.closeBtn,true);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
        let len=this.togLen;
        for(let i=0;i<len;i++){
            this.togFuncs[i] = this.togClick.bind(this,i);
            this.topTogs[i].touchEnabled=true;
            this.topTogs[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.togFuncs[i], this);
        }
    }
    public removeListener(){
        Utility.ButtonActive2(this.closeBtn,false);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnClick, this);
        let len=this.togLen;
        for(let i=0;i<len;i++){
            this.topTogs[i].touchEnabled=false;
            this.topTogs[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.togFuncs[i], this);
        }
    }

    private closeBtnClick(){
        AudioManager.Instance.PlaySound("btnback_wav");
        SceneManager.Instance.popScene();
    }

    private togClick(index:number){
        console.log("index",index);
        this.OnTogClick(index);
    }

    private DiamonClick(btn: egret.DisplayObjectContainer){
        console.log(btn.parent.name);
        let index:number=Number(btn.name);
        let data=this.datas1[index];
        let type=data.config.Type;//根据具体类型处理
        if(type==0){//看广告
            //TODO:需要去调用微信API
        }else if(type==1){//去广告购买
            //云开发购买

        }else if(type==2){//购买
        }

    }

    private TubeThemeClick(btn: egret.DisplayObjectContainer){
        console.log(btn.name);
        if(this.togIndex==1){//tube
            let index:number=Number(btn.name);

        }else{//theme

        }
    }

}

class DiamonData{
    public configId:number;//配置表Id
    public config:any;//配置
    public isGot:boolean;//NoAds参数需要
}

class DiamonGrid implements IScrollViewGrid<DiamonData> {
    private _width:number;
    private _height:number;
    private scene:ShopScene;
    private parser:egret.HtmlTextParser;
    public constructor(s:ShopScene,w:number,h:number){
        this.scene=s;
        this._width=w;
        this._height=h;
        this.parser = new egret.HtmlTextParser();
    }
    public width(): number{
        return this._width;
    }
    public height(): number{
        return this._height;
    }
    //每个btn都会对应一个data，需要在Scene里面进行绑定
    public InitDataUI(container: egret.DisplayObjectContainer, data: DiamonData): void{
        //#AEAEAE

        if(container.getChildByName("itemBg")==null){
            let itemBg=Utility.createBitmapByName("di3_png",this._width,this._height);
            itemBg.name="itemBg";
            container.addChild(itemBg);
        }
        let iconRes=data.config.Icon;
        if(container.getChildByName("purchaserIcon")==null){
            let w=this._height*0.75;
            let h=this._height*0.75;
            let icon=Utility.createBitmapByName(iconRes,w,h,true);
            icon.x=this._height/2;
            icon.y=this._height/2;
            icon.name="purchaserIcon";
            container.addChild(icon);
        }else{
            let icon:egret.Bitmap=container.getChildByName("purchaserIcon")as egret.Bitmap;
            icon.texture=RES.getRes(iconRes);
        }
        let btnWidth=140;
        let paddingRight=40;
        let desc:egret.ITextElement[]=this.parser.parse(data.config.Desc);
        if(container.getChildByName("descTxt")==null){
            let w=this._width-this._height-paddingRight-btnWidth;
            let descTxt=Utility.createTextField(w,this._height,0xFFFFFF,26,"","myFirstFont");
            descTxt.textFlow=desc;
            descTxt.x=this._height;
            descTxt.name="descTxt";
            container.addChild(descTxt);
        }else{
            let descTxt:egret.TextField=container.getChildByName("descTxt")as egret.TextField;
            descTxt.textFlow=desc;
        }
        let priceIconRes:string=data.config.PriceIcon;
        let priceStr:string=data.config.Price;
        let priceBtnColor:string=data.config.BtnColor;
        if(container.getChildByName("btn")==null){
            let w=btnWidth;
            let h=50;
            let priceBtn=Utility.createButton("di4_png",w,h,true);
            let btnBg:egret.Bitmap=priceBtn.getChildByName("btnBg")as egret.Bitmap;
            if(data.isGot==false){
                Utility.setImageColor(btnBg,Utility.ColorHTMLToInt(priceBtnColor));
            }else{
                Utility.setImageColor(btnBg,Utility.ColorHTMLToInt("#AEAEAE"));
            }
            priceBtn.name="btn";
            priceBtn.x=this._width-priceBtn.width/2-paddingRight;
            priceBtn.y=this._height/2;
            container.addChild(priceBtn);
            this.scene.addDiamonEventListener(priceBtn);
            let priceIcon=Utility.createBitmapByName(priceIconRes,32,32,true);
            priceIcon.name="priceIcon";
            priceIcon.x=8+priceIcon.width/2;
            priceIcon.y=h/2;
            priceBtn.addChild(priceIcon);
            let txt_width=w-8-priceIcon.width-8;
            let priceTxt=Utility.createTextField(txt_width,h,0xFFFFFF,26,priceStr,"myFirstFont");
            priceTxt.textAlign=egret.HorizontalAlign.LEFT;
            priceTxt.name="priceTxt";
            priceTxt.x=8+priceIcon.width+8;
            priceTxt.y=0;
            priceBtn.addChild(priceTxt);

        }else{
            let priceBtn:egret.DisplayObjectContainer=container.getChildByName("btn")as egret.DisplayObjectContainer;
            let btnBg:egret.Bitmap=priceBtn.getChildByName("btnBg")as egret.Bitmap;
            if(data.isGot==false){
                Utility.setImageColor(btnBg,Utility.ColorHTMLToInt(priceBtnColor));
            }else{
                Utility.setImageColor(btnBg,Utility.ColorHTMLToInt("#AEAEAE"));
            }
            let priceIcon:egret.Bitmap=priceBtn.getChildByName("priceIcon")as egret.Bitmap;
            priceIcon.texture=RES.getRes(priceIconRes);
            let priceTxt:egret.TextField=priceBtn.getChildByName("priceTxt")as egret.TextField;
            priceTxt.text=priceStr;
        }

    }
    public Destroy(container: egret.DisplayObjectContainer):void{

    }
}

class TubeThemeData{
    public isTube:boolean;//是否是tube，不是tube就是theme
    public configId:number;//配置表Id
    public config:any;//配置表数据
    public isUsed:boolean;//是否正在使用
    public isOwn:boolean;//是否已经拥有(未拥有就是锁住态)
}

class TubeThemeGrid implements IScrollViewGrid<TubeThemeData> {
    private _width:number;
    private _height:number;
    private scene:ShopScene;
    public constructor(s:ShopScene,w:number,h:number){
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
        if(container.getChildByName("itemBg")==null){
            let itemBg=Utility.createBitmapByName("di3_png",this._width,this._height);
            itemBg.name="itemBg";
            container.addChild(itemBg);
            this.scene.addTubeClickListener(container);
        }
        let isTube=data.isTube;
        let iconRes:string=data.isTube?data.config.eftSprite:data.config.ShowSprite;
        if(container.getChildByName("icon")==null){
            let w=this._width*0.6;
            let h=w;
            let icon=Utility.createBitmapByName(iconRes,w,h,true);
            icon.name="icon";
            icon.x=this._width/2;
            icon.y=this._height/2-30;
            container.addChild(icon);
        }else{
            let icon:egret.Bitmap=container.getChildByName("icon")as egret.Bitmap;
            icon.texture=RES.getRes(iconRes);
        }
        let isOwn=data.isOwn;
        let isUsed=data.isUsed;
        if(container.getChildByName("lock")==null){
            let w=42;//80
            let h=w;
            let lock=Utility.createBitmapByName("lock_png",w,h);
            lock.x=15;
            lock.y=15;
            lock.name="lock";
            lock.alpha=isOwn?0:1;
            container.addChild(lock);
        }else{
            let lock:egret.Bitmap=container.getChildByName("lock")as egret.Bitmap;
            lock.alpha=isOwn?0:1;
        }
        //打勾
        if(container.getChildByName("check")==null){
            let w=100;
            let h=w;
            let check=Utility.createBitmapByName("check_png",w,h,true);
            check.name="check";
            check.x=this._width/2;
            check.y=this._height-40;
            check.alpha=isUsed?1:0;
            container.addChild(check);
        }else{
            let check:egret.Bitmap=container.getChildByName("check")as egret.Bitmap;
            check.alpha=isUsed?1:0;
        }
        //可以使用
        if(container.getChildByName("txt")==null){
            let w=this._width;
            let h=50;
            let txt=Utility.createTextField(w,h,0xFFFFFF,26,"可以使用","myFirstFont");
            txt.textAlign=egret.HorizontalAlign.CENTER;
            txt.name="txt";
            txt.x=0;
            txt.y=this._height-h;
            txt.alpha=isUsed?0:(isOwn?1:0);
            container.addChild(txt);
        }else{
            let txt:egret.TextField=container.getChildByName("txt")as egret.TextField;
            txt.alpha=isUsed?0:(isOwn?1:0);
        }
        //消耗
        let CostType:number=data.config.CostType;
        let iconResName:string=CostType==1?"icon1_png":"icon10_png";
        let costStr=String(data.config.Cost);
        if(container.getChildByName("cost")==null){
            let w=this._width*0.5;
            let h=40;
            let cost=Utility.createButton("di_png",w,h,true);
            cost.name="cost";
            cost.x=this._width/2;
            cost.y=this._height-40;
            let costIcon=Utility.createBitmapByName(iconResName,50,50,true);
            costIcon.name="costIcon";
            costIcon.x=10;
            costIcon.y=cost.height/2;
            cost.addChild(costIcon);
            let costTxt=Utility.createTextField(w,h,0xFFFFFF,24,costStr,"myFirstFont");
            costTxt.textAlign=egret.HorizontalAlign.CENTER;
            costTxt.name="costTxt";
            cost.addChild(costTxt);
            container.addChild(cost);
            cost.scaleX=isOwn?0:1;
            cost.scaleY=isOwn?0:1;
        }else{
            let cost:egret.DisplayObjectContainer=container.getChildByName("cost")as egret.DisplayObjectContainer;
            let costIcon=cost.getChildByName("costIcon")as egret.Bitmap;
            costIcon.texture=RES.getRes(iconResName);
            let costTxt=cost.getChildByName("costTxt")as egret.TextField;
            costTxt.text=costStr;
            cost.scaleX=isOwn?0:1;
            cost.scaleY=isOwn?0:1;
        }
    }
    public Destroy(container: egret.DisplayObjectContainer):void{
        
    }
}
