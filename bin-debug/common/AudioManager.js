var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AudioManager = (function () {
    function AudioManager() {
        this.points = [];
        this._curBGMChannel = null;
        var count = 10;
        for (var i = 0; i < count; i++) {
            var p = new egret.Point(0, 0);
            this.PushPoint(p);
        }
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
    AudioManager.prototype.PopPoint = function () {
        var p = this.points.pop();
        if (p == null) {
            p = new egret.Point();
        }
        else {
            p.x = 0;
            p.y = 0;
        }
        return p;
    };
    AudioManager.prototype.PushPoint = function (point) {
        this.points.push(point);
    };
    //duration是秒
    AudioManager.prototype.PlaySound = function (soundRes, duration) {
        var _this = this;
        if (duration === void 0) { duration = 0; }
        if (PlayerData.Instance.soundOn == false) {
            return;
        }
        var sound = RES.getRes(soundRes);
        if (sound != null) {
            var channel_1 = sound.play(0, 1);
            if (duration > 0) {
                var point_1 = this.PopPoint(); //用于处理duration
                egret.Tween.get(point_1).to({ "x": 1 }, duration).call(function () {
                    channel_1.stop();
                    egret.Tween.removeTweens(point_1);
                    _this.PushPoint(point_1);
                }, this);
            }
            channel_1.addEventListener(egret.Event.SOUND_COMPLETE, function () {
            }, this);
        }
    };
    AudioManager.prototype.PlayBGM = function (bgmRes) {
        this.StopBGM();
        var bgm = RES.getRes(bgmRes);
        if (bgm != null) {
            this._curBGMChannel = bgm.play();
            this._curBGMChannel;
            if (PlayerData.Instance.bgmOn == false) {
                this.BMGVolume = 0;
            }
        }
    };
    Object.defineProperty(AudioManager.prototype, "BMGVolume", {
        set: function (volume) {
            if (this._curBGMChannel != null) {
                this._curBGMChannel.volume = volume;
            }
        },
        enumerable: true,
        configurable: true
    });
    AudioManager.prototype.StopBGM = function () {
        if (this._curBGMChannel != null) {
            this._curBGMChannel.stop();
            delete this._curBGMChannel;
        }
    };
    AudioManager.instance = null;
    return AudioManager;
}());
__reflect(AudioManager.prototype, "AudioManager");
//# sourceMappingURL=AudioManager.js.map