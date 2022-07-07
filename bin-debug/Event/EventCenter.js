var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EventEntity = (function () {
    function EventEntity(func, thisObj, eventName) {
        this.func = func;
        this.thisObj = thisObj;
        this.eventName = eventName;
    }
    return EventEntity;
}());
__reflect(EventEntity.prototype, "EventEntity");
var EventCenter = (function () {
    function EventCenter() {
    }
    EventCenter.AddListener = function (eventName, callback, thisObj) {
        var entity = new EventEntity(callback, thisObj, eventName);
        EventCenter.entityList.push(entity);
    };
    EventCenter.RemoveListener = function (eventName, callback, thisObj) {
        var len = EventCenter.entityList.length;
        for (var i = len - 1; i >= 0; i--) {
            var entity = EventCenter.entityList[i];
            if (entity.func == callback && entity.eventName == eventName && entity.thisObj == thisObj) {
                EventCenter.entityList.splice(i, 1);
            }
        }
    };
    EventCenter.RemoveAllListeners = function (thisObj) {
        var len = EventCenter.entityList.length;
        for (var i = len - 1; i >= 0; i--) {
            var entity = EventCenter.entityList[i];
            if (entity.thisObj == thisObj) {
                EventCenter.entityList.splice(i, 1);
            }
        }
    };
    EventCenter.Notify = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var len = EventCenter.entityList.length;
        for (var i = len - 1; i >= 0; i--) {
            var entity = EventCenter.entityList[i];
            if (entity.eventName == eventName) {
                var func = entity.func;
                func.bind(entity.thisObj).apply(void 0, args);
            }
        }
    };
    EventCenter.entityList = [];
    return EventCenter;
}());
__reflect(EventCenter.prototype, "EventCenter");
//# sourceMappingURL=EventCenter.js.map