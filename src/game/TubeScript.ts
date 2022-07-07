enum PullDir{
    Left,
    Right
}

class TubeScript extends egret.DisplayObjectContainer {
    public tubeClickFunc:Function;//tube点击事件

    public tubeWidth:number = 80;//试管宽度
    public tubeHeight:number = 308;//试管高度
    public tubeSlash:number = 318;//试管斜线长度：根号（宽度*宽度+高度*高度）
    public waterWidth:number = 80;
    public waterHeight:number = 66;
    public tubeMouthWidth:number = 80;//试管瓶口宽度
    public flowLength:number = 450;//水流的高度
    private onPullInComplete:Function=null;
    private pullInObj:any=null;

    public get MaxWaterNum():number{return 4;}

    // private tubeBG:egret.Bitmap;//底图
    public waterContainer:egret.DisplayObjectContainer;//水的容器
    public waterMask:egret.Bitmap;//水的遮罩
    private waterFlow:egret.Bitmap;//水流
    private tubeFG:egret.Bitmap;//前景图

    private _pullDir:PullDir=PullDir.Left;//倾倒方向
    private waterUIScripts:WaterScript[];
    private pullDir2Position:Dictionary;
    private pullDir2MouthPosition:Dictionary;
    private _startPullAngle:number;//开始倾倒时的水数量
    private _endPullAngle:number;//结束倾倒时的水数量
    private _isPullIn:boolean;
    private _isPullOut:boolean;

    private pullTweener:egret.Tween=null;
    public PullStartTime:number = 0.4;//从初始位置到倾倒位置的时间
    public PullTimes:number[] = [0.72,1.26,1.92,2.52];//倾倒时间
    public PullEndTime:number = 0.4;//倾倒完成后到初始位置时间

    private static selectTweener:egret.Tween=null;
    private selectHeight:number=69;
    
    //每个水对应的倾倒角度
    public get PullAngles():number[]{
        return [90,75,60,45,30];
    }
    public get pullDir():PullDir{return this._pullDir;}

    public get TopWaterData():WaterData{
        if(this.waterUIScripts==null||this.waterUIScripts.length==0){
            return null;
        } 
        let len = this.waterUIScripts.length;
        return this.waterUIScripts[len-1].waterData;
    }

    public get TopWater():WaterScript{
        if(this.waterUIScripts==null||this.waterUIScripts.length==0){
            return null;
        }
                let len = this.waterUIScripts.length;
        return this.waterUIScripts[len-1];
    }

    private get CurTotalWaterNum():number{
        let num:number=0;
        if(this.waterUIScripts==null||this.waterUIScripts.length==0){
            return 0;
        }
        for (let i = 0; i < this.waterUIScripts.length; i++)
        {
            let waterData = this.waterUIScripts[i].waterData;
            num += waterData.num;
        }
        return num;
    }

    private get PullTargetPos():Vector2{
        let x = this.x;
        let y = this.y;
        x+=this.waterWidth/2;
        y-=(this.flowLength - this.tubeHeight + 5);
        return new Vector2(x,y);
    }
 
    public constructor(){
        super();
        this.InitParams();
        this.InitUI();
        this.RefreshTubeType();
        this.addListener();
        this.touchEnabled=true;
    }

    private InitParams():void{
        this.tubeSlash = Math.sqrt(this.tubeWidth*this.tubeWidth+this.tubeHeight*this.tubeHeight);
        this.waterWidth = this.tubeWidth;
        this.PullStartTime = DataConfig.Instance.SettingData.PullStartTime;
        this.PullTimes[0] = DataConfig.Instance.SettingData.PullTime1;
        this.PullTimes[1] = DataConfig.Instance.SettingData.PullTime2;
        this.PullTimes[2] = DataConfig.Instance.SettingData.PullTime3;
        this.PullTimes[3] = DataConfig.Instance.SettingData.PullTime4;
        this.PullEndTime = DataConfig.Instance.SettingData.PullEndTime;
        this.InitPivotPosition();
    }

    private InitUI():void{
        this.width=this.tubeWidth;
        this.height=this.tubeHeight;

        let _mask = Utility.createBitmapByName("pz_di_bt_1_2_png");
        _mask.fillMode = egret.BitmapFillMode.SCALE;
        _mask.width = 80;
        _mask.height = 302;
        this.waterMask=_mask;
        this.addChild(_mask);

        let container = new egret.DisplayObjectContainer();
        container.width = 80;
        container.height = 302;
        this.waterContainer=container;
        this.waterContainer.mask=_mask;
        this.addChild(container);

        let fg = Utility.createBitmapByName("pz_di_bt_1_1_png");
        fg.fillMode = egret.BitmapFillMode.SCALE;
        fg.width = 80;
        fg.height = 302;
        this.tubeFG=fg;
        this.addChild(fg);

        let flow = Utility.createBitmapByName("white_jpg");
        flow.fillMode = egret.BitmapFillMode.SCALE;
        flow.width = 2;
        flow.height = this.flowLength;
        flow.alpha=0;
        this.waterFlow=flow;
        this.addChild(flow);
        
    }

    public SetPullInComplete(callback:Function,thisObj:any):void{
        this.onPullInComplete=callback;
        this.pullInObj=thisObj;
    }

    public DoPullInComplete(tube:TubeScript):void{
        if(this.onPullInComplete!=null){
            this.onPullInComplete.bind(this.pullInObj)(tube);
        }
    }

    public Init(waterDatas:WaterData[]):void{
        this.waterUIScripts = [];
        for (let i = 0; i < waterDatas.length; i++)
        {
            let waterData:WaterData = waterDatas[i];
            if(waterData.orginId==0){return;}
            let water:WaterScript = new WaterScript();
            water.Init(this,waterData);
            if (i == 0)
            {
                water.SetPos(this.tubeWidth/2, this.tubeHeight);
            }
            else
            {
                let prevWater = this.waterUIScripts[i - 1];
                let pos:Vector2 = prevWater.GetPos();
                water.SetPos(pos.x, pos.y - prevWater.RealHeight);
            }
            this.waterUIScripts.push(water);
        }
        this.CloseHideImage();
    }

    public EnqueueWater(waterData:WaterData,isPullIn?:boolean):WaterScript{
        if(isPullIn==null){isPullIn=true;}
        let water:WaterScript = null;
        if(this.waterUIScripts.length==0){
            water = new WaterScript();
            water.Init(this,waterData);
            water.SetPos(0, 0);
            this.waterUIScripts.push(water);
            if(isPullIn){
                water.SetSize(this.waterWidth,0);
            }
        }else{
            let len = this.waterUIScripts.length;
            let _tmpWater = this.waterUIScripts[len-1];
            if(_tmpWater.waterData.colorInt==waterData.colorInt){
                _tmpWater.waterData.num +=waterData.num;
                water = _tmpWater;
            }else{
                water = new WaterScript();
                water.Init(this,waterData);
                water.SetPos(0, _tmpWater.GetPos().y + _tmpWater.RealHeight);
                this.waterUIScripts.push(water);
                if(isPullIn){
                    water.SetSize(this.waterWidth,0);
                }
            }
        }
        return water;
    }

    public DequeueWater():WaterScript{
        if(this.waterUIScripts==null||this.waterUIScripts.length==0){
            return null;
        }
        let water:WaterScript = this.waterUIScripts.pop();
        return water;
    }

    public isEmpty():boolean{
        return this.waterUIScripts==null||this.waterUIScripts.length==0;
    }

    public isPullIn():boolean{
        if(this._isPullIn){return true;}
        for (let i = 0; i < this.waterUIScripts.length; i++)
        {
            if (this.waterUIScripts[i].pullInTweener != null)
            {
                return true;
            }
        }
        return false;
    }

    public isPullOut():boolean{
        if (this._isPullOut){return true;}
        if (this.pullTweener!=null){return true;}
        return false;
    }

    public canSelect():boolean{
        if(this.isEmpty()){return false;}
        if(this.isPullIn()){return false;}
        if(this.isPullOut()){return false;}
        return true;
    }

    public Select():boolean{
        if(TubeScript.selectTweener!=null){return false;}
        let len = this.parent.$children.length;
        this.parent.setChildIndex(this,len-1);
        let v:Vector2 = this.pullDir2Position.get(PullDir.Left);
        let v2:Vector2 = new Vector2(0,this.selectHeight);
        let pos:Vector2 = new Vector2(v.x+v2.x,v.y-v2.y);
        TubeScript.selectTweener = egret.Tween.get(this);
        TubeScript.selectTweener.to({"x":pos.x,"y":pos.y},100).call(()=>{
            TubeScript.selectTweener=null;
        },this);
        return true;
    }

    public UnSelect():boolean
    {
        if (TubeScript.selectTweener != null)
        {
            return false;
        }
        let pos:Vector2 = this.pullDir2Position.get(PullDir.Left);
        TubeScript.selectTweener = egret.Tween.get(this);
        TubeScript.selectTweener.to({"x":pos.x,"y":pos.y},100).call(()=>{
            TubeScript.selectTweener=null;
        },this);
        return true;
    }

    public canPull(otherTube:TubeScript){
        if (this.canSelect() == false) { return false; }
        if (this.pullTweener!= null) { return false; }
        if (otherTube.pullTweener!=null) { return false; }
        //说明已经满了
        if (otherTube.CurTotalWaterNum == otherTube.MaxWaterNum) { return false; }
        if (otherTube.isEmpty() == false)
        {
            let sourceWaterData = this.TopWaterData;
            let targetWaterData = otherTube.TopWaterData;
            if (sourceWaterData.colorInt != targetWaterData.colorInt)
            {
                return false;
            }
        }
        return true;
    }

    public pullTotalTime(pullNum:number):number
    {
        return this.PullStartTime + this.PullTimes[pullNum - 1] + this.PullEndTime;
    }

    public canPullNum(otherTube:TubeScript):number{
        let canPullNum = otherTube.MaxWaterNum - otherTube.CurTotalWaterNum;//另外试管能容下多少水
        let topWaterNum = this.TopWaterData.num;//当前试管顶部有多少水
        let pullNum = topWaterNum;
        if (topWaterNum > canPullNum)//如果顶部的水大于另外试管能容下的水时，只倒一半
        {
            pullNum = canPullNum;
        }
        return pullNum;
    }

    public Pull(otherTube:TubeScript):void{
        if (this.canSelect() == false) { return; }
        egret.Tween.removeTweens(this);//删除对应的selectTween
        this._isPullOut=true;
        otherTube._isPullIn=true;
        //确定好是向左倒还是向右倒
        let myX = this.x;
        let otherX = otherTube.x;
        if(myX < otherX){
            this._pullDir=PullDir.Right;
        }else{
            this._pullDir=PullDir.Left;
        }
        let targetPullPos:Vector2=otherTube.PullTargetPos;
        let curPos:Vector2=new Vector2(this.x,this.y);
        //改变anchorOffsetX,同时需要修改x的值，anchorOffsetX改变多少，x就要改变多少
        let anchorOffsetX:number=0;
        if (this._pullDir == PullDir.Right)
        {
            anchorOffsetX=this.tubeWidth/2+this.tubeMouthWidth/2;
        }
        else
        {
            anchorOffsetX=this.tubeWidth/2-this.tubeMouthWidth/2;
        }
        let old_anchorOffsetX = this.anchorOffsetX;
        let offsetX = anchorOffsetX-old_anchorOffsetX;
        this.anchorOffsetX+=offsetX;
        this.x+=offsetX;

        let startPos:Vector2=new Vector2(this.x,this.y);
        let startNum=this.CurTotalWaterNum;
        let canPullNum = otherTube.MaxWaterNum - otherTube.CurTotalWaterNum;//另外试管能容下多少水
        let topWaterNum = this.TopWaterData.num;//当前试管顶部有多少水
        let pullNum = topWaterNum;
        if (topWaterNum > canPullNum)//如果顶部的水大于另外试管能容下的水时，只倒一半
        {
            pullNum = canPullNum;
        }
        let endNum = startNum - pullNum;
        //向左倒，角度大于0  向右倒，角度小于0
        if (this._pullDir == PullDir.Left)
        {
            this._startPullAngle = this.PullAngles[startNum];
            this._endPullAngle = this.PullAngles[endNum];
        }
        else
        {
            this._startPullAngle = -this.PullAngles[startNum];
            this._endPullAngle = -this.PullAngles[endNum];
        }
        //位移到指定位置，指定角度（倒入前）
        let topWaterUnit:WaterScript = this.waterUIScripts[this.waterUIScripts.length - 1];
        topWaterUnit.SetFlow();
        this.SetHideTextActive(false);
        function startPullFunc(){
            let curRotation = this.rotation;
            this.PullRotate(curRotation);
        }
        this.pullTweener = egret.Tween.get(this,{loop:false,onChange:startPullFunc,onChangeObj:this});
        this.pullTweener.to({"x":targetPullPos.x,"y":targetPullPos.y,"rotation":this._startPullAngle},this.PullStartTime*1000);
        this.pullTweener.call(()=>{
            this.SetFlowHeight(otherTube);
            let sourceWater:WaterScript = null;
            let targetWater:WaterScript = null;
            if (pullNum == topWaterNum)//说明水是完全倒过去了
            {
                sourceWater = this.DequeueWater();
                targetWater = otherTube.EnqueueWater(sourceWater.waterData);
            }
            else
            {
                sourceWater = this.TopWater;
                targetWater = otherTube.TopWater;
                sourceWater.waterData.num -= pullNum;
                targetWater.waterData.num += pullNum;
            }
            let pulltime:number = this.PullTimes[pullNum - 1];
            targetWater.DealPullIn(pulltime);
            // AudioManager.Instance.PlaySound("pourWater", pulltime);
            //到达指定位置后，角度开始变大，开始倾倒（倒入阶段）
            if (this._pullDir == PullDir.Left)
            {
                this.waterFlow.x=-this.tubeMouthWidth/2;
                this.waterFlow.y=0;
            }
            else
            {
                this.waterFlow.x=this.tubeMouthWidth/2;
                this.waterFlow.y=0;
            }
            this.waterFlow.alpha=1;
            Utility.setImageColor(this.waterFlow,sourceWater.waterData.color);
            function PullingFunc(){
                let curRotation = this.rotation;
                this.PullRotate(curRotation);
            }
            this.pullTweener = egret.Tween.get(this,{loop:false,onChange:PullingFunc,onChangeObj:this});
            this.pullTweener.to({"rotation":this._endPullAngle},pulltime*1000);
            this.pullTweener.call(()=>{
                //倾倒结束后，回到原有位置（倒入后期）
                if (pullNum == topWaterNum)
                {
                    sourceWater.Destroy();
                }
                else
                {
                    sourceWater.SetFull();
                }
                this.waterFlow.alpha=0;
                let _startPos = targetPullPos;
                let _endPos = new Vector2(startPos.x, startPos.y-this.selectHeight);
                function PullEndFunc(){
                    let curRotation = this.rotation;
                    this.PullRotate(curRotation);
                }
                this.pullTweener = egret.Tween.get(this,{loop:false,onChange:PullEndFunc,onChangeObj:this});
                this.pullTweener.to({"x":_endPos.x,"y":_endPos.y,"rotation":0},this.PullEndTime*1000);
                this.pullTweener.call(()=>{
                    this._isPullOut = false;
                    otherTube._isPullIn = false;
                    this.PullRotate(0);
                    this.CloseHideImage();
                    this.anchorOffsetX=0;
                    this.anchorOffsetY=0;
                    let pos:Vector2 = this.pullDir2Position.get(PullDir.Left);
                    this.x=pos.x;
                    this.y=pos.y;
                    this.SetHideTextActive(true);
                    this.pullTweener = null;
                },this);
            },this);
        },this);
    }

    
    private CloseHideImage():void{
        let len = this.waterUIScripts.length;
        let colorInt = -1;
        let isMultiCloseHideImage:boolean = false;
        let _index = -1;
        for (let i = len - 1; i >= 0; i--)
        {
            var waterUnit = this.waterUIScripts[i];
            if (waterUnit.waterData.isHide)
            {
                if (colorInt == -1)
                {
                    waterUnit.waterData.isHide = false;
                    waterUnit.CloseHideImg();
                    colorInt = waterUnit.waterData.colorInt;
                }
                else
                {
                    if (waterUnit.waterData.colorInt == colorInt)
                    {
                        waterUnit.waterData.isHide = false;
                        waterUnit.CloseHideImg();
                        isMultiCloseHideImage = true;
                        _index = i;
                    }
                    else
                    {
                        break;
                    }
                }

            }
            else
            {
                break;
            }
        }
        if (isMultiCloseHideImage)
        {
            this.RebuildDataAndRefreshUI(_index);
        }
    }

    private RebuildDataAndRefreshUI(index:number):void
    {
        let count = this.waterUIScripts.length;
        let waterUnit = this.waterUIScripts[index];
        for (let i = count - 1; i >= index + 1; i--)
        {
            let removedUnit = this.waterUIScripts[i];
            waterUnit.waterData.num += removedUnit.waterData.num;
            this.waterUIScripts[i] = null;
            removedUnit.Destroy();
        }
        waterUnit.RefreshUI();
    }


    private SetFlowHeight(otherTube:TubeScript):void
    {
        let h = this.waterFlow.height;
        let waterNum = otherTube.CurTotalWaterNum;
        let totalWaterHeight = waterNum * otherTube.waterHeight;
        let _h = otherTube.flowLength - totalWaterHeight;
        h = _h;
        if (waterNum > 0)
        {
            h += 5;
        }
        this.waterFlow.height = h;
    }

    public PullRotate(pullAngle:number,pullWaterUnit?:WaterScript):void
    {
        // this.rt.localEulerAngles = new Vector3(0, 0, pullAngle);
        this.waterFlow.rotation = -pullAngle;
        if (pullAngle == 0)
        {
            for (let i = 0; i < this.waterUIScripts.length; i++)
            {
                //float proportion = Mathf.Cos(angle * Mathf.Deg2Rad);//比例
                let waterScript = this.waterUIScripts[i];
                waterScript.DoRotate(0);
                waterScript.SetSize(waterScript.width, waterScript.RealHeight);
                if (i == 0)
                {
                    waterScript.SetPos(0, 0);
                }
                else
                {
                    let prevWaterScript = this.waterUIScripts[i - 1];
                    let pos = prevWaterScript.GetPos();
                    waterScript.SetPos(0, pos.y + prevWaterScript.RealHeight);
                }
            }
            //if (pullWaterUnit != null)
            //{
            //    pullWaterUnit.DoRotate(0);
            //    pullWaterUnit.SetSize(pullWaterUnit.width, pullWaterUnit.RealHeight);.
            //}
        }
        else
        {
            let offsetY = 0;
            let totalHeight = 0;
            for (let i = 0; i < this.waterUIScripts.length; i++)
            {
                if (this.waterUIScripts[i] == pullWaterUnit)
                {
                    continue;
                }
                //float proportion = Mathf.Cos(angle * Mathf.Deg2Rad);//比例
                this.waterUIScripts[i].DoRotate(-pullAngle);
                this.waterUIScripts[i].SetWaterAnchoredPosition(offsetY);
                let _height=this.waterUIScripts[i].RefreshWidthAndHeight(-pullAngle);
                offsetY += _height / Math.cos(pullAngle * Utility.Deg2Rad);
                totalHeight += _height;
            }
            if (pullWaterUnit != null)
            {
                pullWaterUnit.DoRotate(-pullAngle);
                pullWaterUnit.SetWaterAnchoredPosition(offsetY);
                pullWaterUnit.SetPullWaterSize(-pullAngle, totalHeight);
            }
        }

    }

    public SetPosition(x:number,y:number):void
    {
        this.x=x;
        this.y=y;
        this.InitPivotPosition();
    }


    public SetHideTextActive(active:boolean):void
    {
        for (let i = 0; i < this.waterUIScripts.length; i++)
        {
            this.waterUIScripts[i].SetHideTextActive(active);
        }
    }

    private RefreshTubeType():void{
        let tubeId = PlayerData.Instance.curTubeID;
        let themeId = PlayerData.Instance.curThemeID;
        let tubeData = DataConfig.Instance.GetDataByIndex("tube",tubeId);
        let themeData = DataConfig.Instance.GetDataByIndex("theme",themeId);
        if(tubeData==null||themeData==null){return;}
        if(themeData.tubeFgIndex==0){
            let texture: egret.Texture = RES.getRes(tubeData.fgSprite);
            this.tubeFG.texture=texture;
        }else{
            let texture: egret.Texture = RES.getRes(tubeData.fgSprite2);
            this.tubeFG.texture=texture;
        }
        let texture: egret.Texture = RES.getRes(tubeData.bgSprite);
        // this.tubeBG.texture=texture;
        this.waterMask.texture=texture;
        this.tubeMouthWidth = tubeData.width;
    }

    private InitPivotPosition():void{
        if (this.pullDir2Position == null)
        {
            this.pullDir2Position = new Dictionary();
        }
        else
        {
            this.pullDir2Position.clear();
        }
        let pos = new Vector2(this.x,this.y);
        this.pullDir2Position.set(PullDir.Left, pos);
        this.pullDir2Position.set(PullDir.Right, new Vector2(pos.x+this.tubeWidth, pos.y));
        if (this.pullDir2MouthPosition == null)
        {
            this.pullDir2MouthPosition = new Dictionary();
        }
        else
        {
            this.pullDir2MouthPosition.clear();
        }
        let middlePosition = new Vector2(pos.x+(this.tubeWidth/2), pos.y);
        this.pullDir2MouthPosition.set(PullDir.Left, new Vector2(middlePosition.x-(this.tubeMouthWidth/2), middlePosition.y));
        this.pullDir2MouthPosition.set(PullDir.Right, new Vector2(middlePosition.x+(this.tubeMouthWidth/2), middlePosition.y));
    }

    
    public CheckOneWaterFull():boolean
    {
        if (this.waterUIScripts.length == 1 && this.waterUIScripts[0].waterData.num == this.MaxWaterNum)
        {
            return true;
        }
        return false;
    }
    private effect:egret.MovieClip;
    //播放特效
    public PlayOneWaterFullEffect():void
    {
        this.effect = Utility.createGif("json","png");
        this.effect.gotoAndPlay(0,1);
        this.effect.addEventListener(egret.Event.COMPLETE, function (e:egret.Event):void {
            this.removeChild(this.effect);
            delete this.effect;
            this.effect = null;
        }, this);
        this.addChild(this.effect);

    }

    public CheckIsOneWaterFullOrEmpty():boolean
    {
        if (this.CheckOneWaterFull())
        {
            return true;
        }
        if (this.waterUIScripts.length == 0)
        {
            return true;
        }
        return false;
    }

    public AddWaterByBackOperate(colorInt:number,num:number):void
    {
        let waterUnit:WaterScript = this.TopWater;
        if (waterUnit == null)
        {
            let data:WaterData=new WaterData(colorInt);
            data.isHide=false;
            data.num=num;
            this.EnqueueWater(data, false);
            return;
        }
        if (waterUnit.waterData.colorInt == colorInt)
        {
            waterUnit.waterData.num += num;
            waterUnit.RefreshUI();
        }
        else
        {
            let data:WaterData=new WaterData(colorInt);
            data.isHide=false;
            data.num=num;
            this.EnqueueWater(data, false);
        }
    }

    public RemoveWaterByBackOperate(colorInt:number, num:number):void
    {
        let waterUnit:WaterScript = this.TopWater;
        if (waterUnit.waterData.colorInt == colorInt)
        {
            if (waterUnit.waterData.num > num)
            {
                waterUnit.waterData.num -= num;
                waterUnit.RefreshUI();
            }
            else
            {
                let water:WaterScript = this.DequeueWater();
                water.Destroy();
            }
        }
    }

    public Shake():void{
        
    }

    public Destroy():void{
        this.removeListener();
        this.onPullInComplete=null;
        this.pullInObj=null;
        if(this.waterUIScripts!=null){
            let len = this.waterUIScripts.length;
            for(let i=len-1;i>=0;i--){
                if(this.waterUIScripts[i]!=null){
                    this.waterUIScripts[i].Destroy();
                    delete this.waterUIScripts[i];
                }
            }
            this.waterUIScripts=null;
        }
        this.waterContainer.mask=null;
        delete this.waterContainer;
        delete this.waterMask;
        delete this.waterFlow;
        delete this.tubeFG;
        this.waterContainer=null;
        this.waterMask=null;
        this.waterFlow=null;
        this.tubeFG=null;

    }

    private addListener():void{
        EventCenter.AddListener(EventID.ThemeBtnClicked,this.onThemeBtnClicked,this);
    }

    private removeListener():void{
        EventCenter.RemoveListener(EventID.ThemeBtnClicked,this.onThemeBtnClicked,this);
    }

    private onThemeBtnClicked(...args:any[]):void{
        let isSun=args[0];
        let tubeId = PlayerData.Instance.curTubeID;
        let tubeData = DataConfig.Instance.GetDataByIndex("tube",tubeId);
        if(tubeData==null){return;}
        if(isSun){
            let texture: egret.Texture = RES.getRes(tubeData.fgSprite);
            this.tubeFG.texture=texture;
        }else{
            let texture: egret.Texture = RES.getRes(tubeData.fgSprite2);
            this.tubeFG.texture=texture;
        }
    }


}