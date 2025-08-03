"use strict";
cc._RF.push(module, '25184GQZEZA5Ko1i1kEBCHL', 'AudioMng');
// script/framework/manager/AudioMng.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioMng = exports.audioCnf = exports.AudioCnf = void 0;
var ViewModel_1 = require("../component/ViewModel");
var ISerialize_1 = require("../model/ISerialize");
var Log_1 = require("../../utils/Log");
var AudioCnf = /** @class */ (function (_super) {
    __extends(AudioCnf, _super);
    function AudioCnf() {
        var _this = _super.call(this, "audiocnf") || this;
        //点击的音效
        _this.click = true;
        //背景音乐
        _this.bgm = true;
        _this.click = _this.Query("click", true);
        _this.bgm = _this.Query("bgm", true);
        _this.Set("click", _this.click);
        _this.Set("bgm", _this.bgm);
        _this.Save();
        return _this;
    }
    return AudioCnf;
}(ISerialize_1.default));
exports.AudioCnf = AudioCnf;
exports.audioCnf = new AudioCnf();
ViewModel_1.VM.add(exports.audioCnf, 'audiocnf');
var AudioMng = /** @class */ (function () {
    function AudioMng() {
        this.musicid = '';
        this.effectRatio = 1;
        this.bgmRatio = 1;
        ViewModel_1.VM.bindPath("audiocnf.click", this.onValueChangedClick, this);
        ViewModel_1.VM.bindPath("audiocnf.bgm", this.onValueChangedBGM, this);
        var sound = localStorage.getItem('sound') || '1';
        var effect = localStorage.getItem('effect') || '1';
        this.effectRatio = effect == '1' ? 1 : 0;
        this.bgmRatio = sound == '1' ? 1 : 0;
    }
    //获取这个单例
    AudioMng.getInstance = function () {
        if (!this.instance) {
            this.instance = new AudioMng();
        }
        return this.instance;
    };
    AudioMng.prototype.onValueChangedClick = function (n, o, pathArr) {
        var b = ViewModel_1.VM.getValue("audiocnf.click");
        exports.audioCnf.Set("click", n);
        exports.audioCnf.Save();
    };
    AudioMng.prototype.onValueChangedBGM = function (n, o, pathArr) {
        exports.audioCnf.Set("bgm", n);
        if (n) {
            this.playBGM();
        }
        else {
            this.stopBGM();
        }
        exports.audioCnf.Save();
    };
    AudioMng.prototype.playSFX = function (audioclip, ct) {
        if (ct === void 0) { ct = 0; }
        var self = this;
        if (exports.audioCnf.click == false) {
            return;
        }
        cc.loader.loadRes("sounds/" + audioclip, cc.Asset, function (err, ret) {
            if (err) {
                Log_1.Log.log(err);
                return;
            }
            var tem = cc.loader.getRes("sounds/" + audioclip, cc.Asset);
            var a = cc.audioEngine.play(tem, false, 1 * self.effectRatio);
            if (ct) {
                cc.audioEngine.setCurrentTime(a, ct);
            }
        }.bind(this));
    };
    AudioMng.prototype.initBgm = function () {
        var b = ViewModel_1.VM.getValue("audiocnf.bgm");
        if (b) {
            this.playBGM();
        }
    };
    AudioMng.prototype.playBGM = function (audioclip) {
        if (audioclip === void 0) { audioclip = null; }
        var self = this;
        cc.loader.loadRes("sounds/bgm", cc.Asset, function (err, ret) {
            if (err) {
                Log_1.Log.log(err);
                return;
            }
            var tem = cc.loader.getRes("sounds/bgm", cc.Asset);
            audioclip = audioclip || tem;
            self.stopBGM();
            self.musicid = cc.audioEngine.play(audioclip, true, 1 * self.bgmRatio);
        }.bind(this));
    };
    //播放网络BGM
    AudioMng.prototype.playOnlineBGM = function (url) {
        if (exports.audioCnf.bgm == false) {
            return;
        }
        var self = this;
        cc.loader.load(url, function (err, tex) {
            self.stopBGM();
            self.musicid = cc.audioEngine.play(tex, true, 1 * self.bgmRatio);
        });
    };
    //播放网络SFX
    AudioMng.prototype.playOnlineSFX = function (url) {
        var self = this;
        if (exports.audioCnf.click == false) {
            return;
        }
        cc.loader.load(url, function (err, tex) {
            cc.audioEngine.play(tex, false, 1 * self.effectRatio);
        });
    };
    AudioMng.prototype.stopBGM = function () {
        var self = this;
        cc.audioEngine.stop(self.musicid);
    };
    AudioMng.prototype.pauseAll = function () {
        cc.audioEngine.pauseAll();
    };
    AudioMng.prototype.resumeAll = function () {
        cc.audioEngine.resumeAll();
    };
    return AudioMng;
}());
exports.AudioMng = AudioMng;

cc._RF.pop();