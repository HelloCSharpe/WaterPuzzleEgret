class AudioManager{
    
    private static instance: AudioManager = null;

    public static get Instance(): AudioManager {
        if (AudioManager.instance == null) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    private constructor(){
        let count=10;
        for(let i=0;i<count;i++){
            let p = new egret.Point(0,0);
            this.PushPoint(p);
        }
    }

    private points:egret.Point[]=[];
    private PopPoint():egret.Point{
        let p = this.points.pop();
        if(p==null){
            p=new egret.Point();
        }else{
            p.x=0;
            p.y=0;
        }
        return p;
    }

    private PushPoint(point:egret.Point){
        this.points.push(point);
    }

    //duration是秒
    public PlaySound(soundRes:string,duration:number=0){
        if(PlayerData.Instance.soundOn==false){
            return;
        }
        let sound:egret.Sound=RES.getRes(soundRes);
        if(sound!=null){
            let channel = sound.play(0,1);
            if(duration>0){
                let point=this.PopPoint();//用于处理duration
                egret.Tween.get(point).to({"x":1},duration).call(()=>{
                    console.log("sound time Over");
                    channel.stop();
                    egret.Tween.removeTweens(point);
                    this.PushPoint(point);
                },this);
            }
            channel.addEventListener(egret.Event.SOUND_COMPLETE,function(){
                console.log("sound Complete");
            },this);
        }
    }
    
    private _curBGMChannel:egret.SoundChannel=null;

    public PlayBGM(bgmRes:string){
        this.StopBGM();
        let bgm:egret.Sound=RES.getRes(bgmRes);
        if(bgm!=null){
            this._curBGMChannel=bgm.play();
            this._curBGMChannel
            if(PlayerData.Instance.bgmOn==false){
                this.BMGVolume=0;
            }
        }
    }

    public set BMGVolume(volume:number){
        if(this._curBGMChannel!=null){
            this._curBGMChannel.volume=volume;
        }
    }

    public StopBGM(){
        if(this._curBGMChannel!=null){
            this._curBGMChannel.stop();
            delete this._curBGMChannel;
        }
    }

}