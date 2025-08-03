"use strict";
cc._RF.push(module, '29987aQXe9OGp5qQxgWRaYF', 'VMTurntable');
// script/framework/component/VMTurntable.ts

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
var UIBase_1 = require("../ui/UIBase");
var Utils_1 = require("../../utils/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, executeInEditMode = _a.executeInEditMode, help = _a.help;
/**
 *  [VM-Turntable]
 *  调用VMTurntable.instance.roll();
 *  转盘转动过程中自动生成屏蔽层，结束后删除屏蔽层
 */
var VMTurntable = /** @class */ (function (_super) {
    __extends(VMTurntable, _super);
    // @help('https://github.com/wsssheep/cocos_creator_mvvm_tools/blob/master/docs/VMLogin.md')
    function VMTurntable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeRoll = null;
        _this.scores = 8;
        _this.skew = 0;
        _this.qMin = 4;
        _this.qMax = 8;
        _this.delayTiem = 0;
        _this.hasOffset = false;
        return _this;
    }
    VMTurntable_1 = VMTurntable;
    VMTurntable.prototype.onUILoad = function () {
        VMTurntable_1.instance = this;
    };
    VMTurntable.prototype.onShow = function () {
    };
    VMTurntable.prototype.onStart = function () {
    };
    /**
     *
     * @param type 要停止的份数（1-总份数）
     * @param callback 转盘停止后的回掉
     */
    VMTurntable.prototype.roll = function (type, callback) {
        var _modelNode = new cc.Node("xxx");
        _modelNode.anchorX = 0;
        _modelNode.anchorY = 0;
        _modelNode.width = cc.winSize.width;
        _modelNode.height = cc.winSize.height;
        _modelNode.addComponent(cc.BlockInputEvents);
        _modelNode.parent = cc.director.getScene();
        _modelNode.zIndex = 888;
        var totalRotate = this.getRotationLong(type); //获取总长度
        this.nodeRoll.rotation = 0;
        cc.tween(this.nodeRoll)
            .to(4, { angle: -totalRotate }, { easing: 'expoOut' })
            .delay(this.delayTiem)
            .call(function () {
            _modelNode.destroy();
            callback && callback();
        }.bind(this))
            .start();
    };
    /**
     * 总的旋转角度
     * @param awardPosition 奖品所在奖区
     * @return 总的旋转角度
     */
    VMTurntable.prototype.getRotationLong = function (awardPosition) {
        var _q = 360 * (Math.floor(Math.random() * (this.qMax - this.qMin)) + this.qMin); //整圈长度
        var _Skew = -(360 / this.scores) * this.skew; //第一个奖区起始点与0点位置的偏移比例
        var _location = (360 / this.scores) * (this.scores - awardPosition + 1); //目标奖区的起始点
        var _offset = Utils_1.Utils.random(0, 360 / this.scores) / 2 * (Utils_1.Utils.random(0, 2) == 1 ? 1 : -1);
        if (this.hasOffset) {
            return _q + _Skew + _location + _offset;
        }
        else {
            return _q + _Skew + _location;
        }
    };
    var VMTurntable_1;
    __decorate([
        property({ type: cc.Node, displayName: "需要转动的node" })
    ], VMTurntable.prototype, "nodeRoll", void 0);
    __decorate([
        property({ type: cc.Integer, displayName: "转盘拆分份数" })
    ], VMTurntable.prototype, "scores", void 0);
    __decorate([
        property({ type: cc.Integer, displayName: "偏移份数", tooltip: "结果显示顺时针增加相应份数" })
    ], VMTurntable.prototype, "skew", void 0);
    __decorate([
        property({ type: cc.Integer, displayName: "转过最少圈数" })
    ], VMTurntable.prototype, "qMin", void 0);
    __decorate([
        property({ type: cc.Integer, displayName: "转过最多圈数" })
    ], VMTurntable.prototype, "qMax", void 0);
    __decorate([
        property({ type: cc.Integer, displayName: "延迟回掉x秒" })
    ], VMTurntable.prototype, "delayTiem", void 0);
    __decorate([
        property({ displayName: "所停位置是否有偏移浮动", tooltip: "指针所停位置离奖区是否有偏移浮动" })
    ], VMTurntable.prototype, "hasOffset", void 0);
    VMTurntable = VMTurntable_1 = __decorate([
        ccclass
        // @executeInEditMode
        ,
        menu('ModelViewer/VM-Turntable(转盘动画)')
        // @help('https://github.com/wsssheep/cocos_creator_mvvm_tools/blob/master/docs/VMLogin.md')
    ], VMTurntable);
    return VMTurntable;
}(UIBase_1.default));
exports.default = VMTurntable;

cc._RF.pop();