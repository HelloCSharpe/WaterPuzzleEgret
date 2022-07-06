var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AudioManager = (function () {
    function AudioManager() {
    }
    Object.defineProperty(AudioManager, "Instance", {
        get: function () {
            if (AudioManager.instance == null) {
                AudioManager.instance = new AudioManager();
            }
            return AudioManager.instance;
        },
        enumerable: true,
        configurable: true
    });
    //duration是秒
    AudioManager.prototype.PlaySound = function (soundName, duration) {
    };
    AudioManager.prototype.PlayBGM = function (bgm) {
    };
    AudioManager.instance = null;
    return AudioManager;
}());
__reflect(AudioManager.prototype, "AudioManager");
//# sourceMappingURL=AudioManager.js.map