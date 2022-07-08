var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EventID = (function () {
    function EventID() {
    }
    EventID.TubeChanged = "TubeChanged";
    EventID.ThemeChanged = "ThemeChanged";
    EventID.ThemeBtnClicked = "ThemeBtnClicked";
    EventID.RefreshLevel = "RefreshLevel"; //通知GameScene刷新关卡
    return EventID;
}());
__reflect(EventID.prototype, "EventID");
//# sourceMappingURL=EventID.js.map