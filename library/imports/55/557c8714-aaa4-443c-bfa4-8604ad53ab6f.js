"use strict";
cc._RF.push(module, '557c8cUqqREPL+khgStU6tv', 'NodeSetting');
// script/logic/ui/NodeSetting.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var i18nMgr_1 = require("../../framework/i18n/i18nMgr");
var AudioMng_1 = require("../../framework/manager/AudioMng");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NodeSetting = /** @class */ (function (_super) {
    __extends(NodeSetting, _super);
    function NodeSetting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labEn = null;
        _this.labZh = null;
        _this.toggleEffect = null;
        _this.toggleSound = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NodeSetting.prototype.start = function () {
    };
    NodeSetting.prototype.onEnable = function () {
        var effect = localStorage.getItem('effect') || '1';
        this.toggleEffect.isChecked = effect == '1';
        var sound = localStorage.getItem('sound') || '1';
        this.toggleSound.isChecked = sound == '1';
        var language = i18nMgr_1.i18nMgr.getlanguage();
        this.labEn.node.active = language == 'en';
        this.labZh.node.active = language == 'zh';
        this.toggleSound.node.getChildByName('checkmark_2').active = !this.toggleSound.isChecked;
        this.toggleEffect.node.getChildByName('checkmark_2').active = !this.toggleEffect.isChecked;
    };
    NodeSetting.prototype.onToggleEffect = function (toggle) {
        localStorage.setItem('effect', toggle.isChecked ? '1' : '0');
        toggle.node.getChildByName('checkmark_2').active = !toggle.isChecked;
        AudioMng_1.AudioMng.getInstance().effectRatio = toggle.isChecked ? 1 : 0;
    };
    NodeSetting.prototype.onToggleSound = function (toggle) {
        localStorage.setItem('sound', toggle.isChecked ? '1' : '0');
        toggle.node.getChildByName('checkmark_2').active = !toggle.isChecked;
        AudioMng_1.AudioMng.getInstance().bgmRatio = toggle.isChecked ? 1 : 0;
        if (toggle.isChecked) {
            AudioMng_1.AudioMng.getInstance().playBGM();
        }
        else {
            AudioMng_1.AudioMng.getInstance().stopBGM();
        }
    };
    NodeSetting.prototype.onToggleLanguage = function (toggle) {
        var language = toggle.isChecked ? 'en' : 'zh';
        this.labEn.node.active = language == 'en';
        this.labZh.node.active = language == 'zh';
        i18nMgr_1.i18nMgr.setLanguage(language);
    };
    NodeSetting.prototype.onBtnClose = function () {
        this.node.active = false;
    };
    __decorate([
        property(cc.Label)
    ], NodeSetting.prototype, "labEn", void 0);
    __decorate([
        property(cc.Label)
    ], NodeSetting.prototype, "labZh", void 0);
    __decorate([
        property(cc.Toggle)
    ], NodeSetting.prototype, "toggleEffect", void 0);
    __decorate([
        property(cc.Toggle)
    ], NodeSetting.prototype, "toggleSound", void 0);
    NodeSetting = __decorate([
        ccclass
    ], NodeSetting);
    return NodeSetting;
}(cc.Component));
exports.default = NodeSetting;

cc._RF.pop();