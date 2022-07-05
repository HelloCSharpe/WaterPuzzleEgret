// TypeScript file
abstract class Scene extends eui.Component {
    public constructor() {
        super();
        // 监听组件创建完毕 也就是场景的外观创建完毕
        // this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this);
    }
    protected abstract onComplete();
    public abstract Update();
    public abstract addListener();
    public abstract removeListener();
    public Reset():void {
        this.removeChildren();
        this.onComplete();
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public createBitmapByName(res_name: string): egret.Bitmap {
        return Utility.createBitmapByName(res_name);
    }

    public getRandomNum(Min, Max): number {
        return Utility.getRandomNum(Min, Max);
    }
}

class SceneManager {
    private static _manager: SceneManager;
    public static get Instance() {
        if (SceneManager._manager == null) {
            SceneManager._manager = new SceneManager();
        }
        return SceneManager._manager;
    }
    public constructor() {
        this.sceneDic = new Object();
    }

    private sceneDic;
    public RegisterScene(name: string, s: Scene) {
        this.sceneDic[name] = s;
    }

    public static ScreenWidth: number;
    public static ScreenHeight: number;

    public rootLayer: eui.UILayer;//起始场景
    private currentScene: Scene;//需要显示的场景
    private pop_scene: Scene;//弹出场景层

    public GetCurScene(): Scene {
        return this.currentScene;
    }
    //切换场景
    public changeScene(name: string) {
        let s: Scene = this.sceneDic[name];
        if (this.currentScene) {
            this.rootLayer.removeChild(this.currentScene);
            this.currentScene.removeListener();
            this.currentScene.removeChildren();
        }
        this.rootLayer.addChild(s);
        this.currentScene = s;
        this.currentScene.Reset();
        this.currentScene.addListener();
    }

    //弹出场景层
    public pushScene(name: string) {
        let s: Scene = this.sceneDic[name];
        this.popScene();
        if (!this.pop_scene) {
            this.rootLayer.addChild(s);
            this.pop_scene = s;
            this.pop_scene.Reset();
            this.pop_scene.addListener();
        }
    }
    //关闭场景层
    public popScene() {
        if (this.pop_scene) {
            this.rootLayer.removeChild(this.pop_scene);
            this.pop_scene.removeListener();
            this.pop_scene.removeChildren();
            this.pop_scene = null;            
        }
    }
}
