class AudioManager{
    
    private static instance: AudioManager = null;

    public static get Instance(): AudioManager {
        if (AudioManager.instance == null) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }
    //duration是秒
    public PlaySound(soundName:string,duration:number){

    }

    public PlayBGM(bgm:string){

    }

}