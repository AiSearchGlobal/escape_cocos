"use strict";
cc._RF.push(module, '87150hsnDVAobcJbm9xgim5', 'UIKiller');
// script/logic/ui/prefab/UIKiller.ts

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
var auto_killer_1 = require("../../../data/autoui/prefab/auto_killer");
var AudioMng_1 = require("../../../framework/manager/AudioMng");
var UIBase_1 = require("../../../framework/ui/UIBase");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var GameDataCenter_1 = require("../../../userData/GameDataCenter");
var PlayerModel_1 = require("../../../userData/PlayerModel");
var UIGameLayer_1 = require("./UIGameLayer");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var UIKiller = /** @class */ (function (_super) {
    __extends(UIKiller, _super);
    function UIKiller() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.speed = 200;
        _this.speed1 = 200;
        _this.speed2 = 700;
        _this.killing = false;
        _this.roadList = [];
        _this.killRoomId = 0;
        return _this;
    }
    UIKiller_1 = UIKiller;
    UIKiller.prototype.onUILoad = function () {
        this.ui = this.node.addComponent(auto_killer_1.default);
        UIKiller_1.instance = this;
    };
    UIKiller.prototype.onShow = function () {
    };
    UIKiller.prototype.onHide = function () {
    };
    UIKiller.prototype.onStart = function () {
    };
    UIKiller.prototype.resetUI = function () {
        this.unscheduleAllCallbacks();
        this.node.stopAllActions();
        this.node.setPosition(UIGameLayer_1.default.instance.ui.pos12.position);
    };
    UIKiller.prototype.kill = function (roomId) {
        this.killRoomId = roomId;
        this.killing = true;
        this.speed = this.speed1;
        this.roadList = [];
        var roads = PlayerModel_1.KILLER_ROADS[roomId];
        var pos0 = UIGameLayer_1.default.instance.ui["pos" + roads[0]].position;
        var pos1 = UIGameLayer_1.default.instance.ui["pos" + roads[1]].position;
        var pos2 = UIGameLayer_1.default.instance.ui["pos" + roads[2]].position;
        var pos3 = UIGameLayer_1.default.instance.ui["pos" + roads[3]].position;
        var d2 = pos1.sub(pos2).mag();
        var d3 = pos2.sub(pos3).mag();
        var spd = (d2 + d3) / 4;
        var p1 = { t: 0, p: pos0 };
        var p2 = { t: 2, p: pos1 };
        var p3 = { t: d2 / spd, p: pos2 };
        var p4 = { t: d3 / spd, p: pos3 };
        var p5 = { t: 2, p: UIGameLayer_1.default.instance.ui["kill_" + roomId].position };
        this.roadList = [p1, p2, p3, p4, p5];
        // for(let index of KILLER_ROADS[roomId]){
        // 	let node: cc.Node = UIGameLayer.instance.ui[`pos${index}`];
        // 	this.roadList.push(node.position);
        // }
        // this.roadList.push(UIGameLayer.instance.ui[`kill_${roomId}`].position);
        var list = [].concat(this.roadList);
        this.move(list, false);
    };
    UIKiller.prototype.moveBack = function () {
        this.killing = false;
        this.speed = this.speed2;
        this.roadList.reverse();
        var list = [].concat(this.roadList);
        this.move(list, true);
    };
    UIKiller.prototype.move = function (list, isBack) {
        var _this = this;
        if (list.length <= 0) {
            if (this.killing) {
                this.ui.sp_killer.getComponent(sp.Skeleton).animation = "attack";
                AudioMng_1.AudioMng.getInstance().playSFX("kan");
                this.scheduleOnce(function () {
                    AudioMng_1.AudioMng.getInstance().playSFX("jianshe");
                }, 0.4);
                this.scheduleOnce(function () {
                    GameDataCenter_1.default.accountModel.players.forEach(function (element) {
                        if (element.roomId == _this.killRoomId) {
                            element.destroy();
                        }
                    });
                    _this.ui.sp_killer.getComponent(sp.Skeleton).animation = "walk";
                    _this.moveBack();
                    UIGameLayer_1.default.instance.dropCoins(_this.killRoomId);
                }, 2);
            }
            console.warn("杀手抵达房间");
            return;
        }
        this.ui.sp_killer.scaleX = this.node.x > list[0].p.x ? 1 : -1;
        var dis = this.getDistance(this.node.position, list[0].p);
        var t = isBack ? dis / this.speed : list[0].t;
        if (list.length == 1 && !isBack) {
            UIGameLayer_1.default.instance.openDoor(this.killRoomId);
        }
        cc.tween(this.node)
            .to(t, { position: list[0].p })
            .call(function () {
            list.splice(0, 1);
            _this.move(list, isBack);
        })
            .start();
    };
    // 距离
    UIKiller.prototype.getDistance = function (start, end) {
        var pos = cc.v2(start.x - end.x, start.y - end.y);
        var dis = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
        return dis;
    };
    UIKiller.prototype.onClose = function () {
        UIHelp_1.default.CloseUI(UIKiller_1);
    };
    var UIKiller_1;
    UIKiller.prefabUrl = "killer";
    UIKiller.className = "UIKiller";
    UIKiller.instance = null;
    UIKiller = UIKiller_1 = __decorate([
        ccclass,
        menu("UI/prefab/UIKiller")
    ], UIKiller);
    return UIKiller;
}(UIBase_1.default));
exports.default = UIKiller;

cc._RF.pop();