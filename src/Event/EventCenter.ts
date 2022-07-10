
class EventEntity{
    public func:Function;
    public thisObj:any;
    public eventName:string;
    public constructor(func:Function,thisObj:any,eventName:string){
        this.func=func;
        this.thisObj=thisObj;
        this.eventName=eventName;
    }
}

class EventCenter{

    private static entityList:EventEntity[]=[];

    public static AddListener(eventName:string,callback:Function,thisObj:any):void{
        let entity:EventEntity = new EventEntity(callback,thisObj,eventName);
        EventCenter.entityList.push(entity);
    }

    public static RemoveListener(eventName:string,callback:Function,thisObj:any):void{
        let len = EventCenter.entityList.length;
        for(let i=len-1;i>=0;i--){
            let entity:EventEntity=EventCenter.entityList[i];
            if(entity.func==callback&&entity.eventName==eventName&&entity.thisObj==thisObj){
                EventCenter.entityList.splice(i,1);
            }
        }
    }

    public static RemoveAllListeners(thisObj:any):void{
        let len = EventCenter.entityList.length;
        for(let i=len-1;i>=0;i--){
            let entity:EventEntity=EventCenter.entityList[i];
            if(entity.thisObj==thisObj){
                EventCenter.entityList.splice(i,1);
            }
        }
    }

    public static Notify(eventName:string,...args:any[]){
        let len = EventCenter.entityList.length;
        for(let i=len-1;i>=0;i--){
            let entity:EventEntity=EventCenter.entityList[i];
                if(entity!=null){
                    if(entity.eventName==eventName){
                        let func:Function=entity.func;
                        func.bind(entity.thisObj)(...args);
                    }
                }
        }
    }
}