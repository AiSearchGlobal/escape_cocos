"use strict";
cc._RF.push(module, 'bf6aduZAvlGMZfmwOIvruRH', 'VMTimer');
// script/framework/component/VMTimer.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameDataCenter_1 = require("../../userData/GameDataCenter");
var AudioMng_1 = require("../manager/AudioMng");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var TimerNode = /** @class */ (function (_super) {
    __extends(TimerNode, _super);
    function TimerNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playingDidaAudio = false;
        return _this;
    }
    TimerNode.prototype.onLoad = function () {
        cc.game.addPersistRootNode(this.node);
        this.createSchedule();
        cc.game.on(cc.game.EVENT_SHOW, function () {
        });
    };
    TimerNode.prototype.onEnable = function () {
    };
    TimerNode.prototype.onDisable = function () {
    };
    TimerNode.prototype.createSchedule = function () {
        var _this = this;
        // 以秒为单位的时间间隔
        var interval = 1;
        // 重复次数
        var repeat = cc.macro.REPEAT_FOREVER;
        // 开始延时
        var delay = 0;
        this.schedule(function () {
            var _a;
            if (GameDataCenter_1.default.roomInfoModel.waitTime > 0) {
                GameDataCenter_1.default.roomInfoModel.waitTime -= 1;
            }
            if (GameDataCenter_1.default.roomInfoModel.waitTime <= 0) {
                _this.playingDidaAudio = false;
            }
            if (!_this.playingDidaAudio && GameDataCenter_1.default.roomInfoModel.waitTime <= 12 && ((_a = GameDataCenter_1.default === null || GameDataCenter_1.default === void 0 ? void 0 : GameDataCenter_1.default.roomInfoModel) === null || _a === void 0 ? void 0 : _a.gameStage) == 2) {
                _this.playingDidaAudio = true;
                AudioMng_1.AudioMng.getInstance().playSFX("daojishi", 12 - GameDataCenter_1.default.roomInfoModel.waitTime);
            }
            // 这里的 this 指向 component
            // if(GameDataCenter.playerModel.serverTime){
            // 	GameDataCenter.playerModel.serverTime += 1;
            // 	EventMng.emit(FrameEventConst.SERVER_TIME_CHANGE);
            // }
        }, interval, repeat, delay);
    };
    TimerNode = __decorate([
        ccclass,
        menu('ModelViewer/VM-Timer (计时器，每秒刷新时间)')
    ], TimerNode);
    return TimerNode;
}(cc.Component));
exports.default = TimerNode;

cc._RF.pop();