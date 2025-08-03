"use strict";
cc._RF.push(module, '68466nNnrlM+6/IPveXpcke', 'BhvGroupToggle');
// script/framework/behavior/BhvGroupToggle.ts

"use strict";
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var PARAM_TYPE;
(function (PARAM_TYPE) {
    PARAM_TYPE[PARAM_TYPE["CHILDREN_INDEX"] = 0] = "CHILDREN_INDEX";
    PARAM_TYPE[PARAM_TYPE["CHILDREN_NAME"] = 1] = "CHILDREN_NAME";
})(PARAM_TYPE || (PARAM_TYPE = {}));
/**
 * 群体事件，适合绑定节点组的回调信息
 * 将该组件的所处节点的 所有子节点，绑定相同的回调对象
 */
var BhvGroupToggle = /** @class */ (function (_super) {
    __extends(BhvGroupToggle, _super);
    function BhvGroupToggle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.transition = cc.Toggle.Transition.NONE;
        _this.hoverColor = cc.color(255, 255, 255);
        _this.normalColor = cc.color(214, 214, 214);
        _this.pressedColor = cc.color(211, 211, 211);
        _this.disabledColor = cc.color(124, 124, 124);
        _this.normalSprite = null;
        _this.pressedSprite = null;
        _this.hoverSprite = null;
        _this.disabledSprite = null;
        _this.duration = 1.0;
        _this.zoomScale = 1.1;
        _this.paramType = PARAM_TYPE.CHILDREN_INDEX;
        _this.touchEvents = [];
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    BhvGroupToggle.prototype.onLoad = function () {
        var _this = this;
        this.node.children.forEach(function (node, nodeIndex) {
            var comp = node.getComponent(cc.Toggle);
            if (!comp) {
                comp = node.addComponent(cc.Toggle);
            }
            //同步属性
            comp.target = node;
            comp.transition = _this.transition;
            comp.zoomScale = _this.zoomScale;
            comp.disabledSprite = _this.disabledSprite;
            comp.hoverSprite = _this.hoverSprite;
            comp.normalSprite = _this.normalSprite;
            comp.pressedSprite = _this.pressedSprite;
            comp.hoverColor = _this.hoverColor;
            comp.normalColor = _this.normalColor;
            comp.pressedColor = _this.pressedColor;
            comp.disabledColor = _this.disabledColor;
            //绑定回调事件
            _this.touchEvents.forEach(function (event) {
                //克隆数据，每个节点获取的都是不同的回调
                var hd = new cc.Component.EventHandler(); //copy对象
                hd.target = event.target;
                hd.handler = event.handler;
                hd.component = event.component;
                hd['_componentId'] = event['_componentId'];
                if (_this.paramType === PARAM_TYPE.CHILDREN_INDEX) {
                    hd.customEventData = nodeIndex.toString();
                }
                else {
                    hd.customEventData = node.name;
                }
                comp.clickEvents.push(hd);
            });
        });
    };
    __decorate([
        property({
            type: cc.Enum(cc.Toggle.Transition)
        })
    ], BhvGroupToggle.prototype, "transition", void 0);
    __decorate([
        property({ visible: function () { return this.transition === cc.Toggle.Transition.COLOR; } })
    ], BhvGroupToggle.prototype, "hoverColor", void 0);
    __decorate([
        property({ visible: function () { return this.transition === cc.Toggle.Transition.COLOR; } })
    ], BhvGroupToggle.prototype, "normalColor", void 0);
    __decorate([
        property({ visible: function () { return this.transition === cc.Toggle.Transition.COLOR; } })
    ], BhvGroupToggle.prototype, "pressedColor", void 0);
    __decorate([
        property({ visible: function () { return this.transition === cc.Toggle.Transition.COLOR; } })
    ], BhvGroupToggle.prototype, "disabledColor", void 0);
    __decorate([
        property({
            type: cc.SpriteFrame,
            visible: function () { return this.transition === cc.Toggle.Transition.SPRITE; }
        })
    ], BhvGroupToggle.prototype, "normalSprite", void 0);
    __decorate([
        property({
            type: cc.SpriteFrame,
            visible: function () { return this.transition === cc.Toggle.Transition.SPRITE; }
        })
    ], BhvGroupToggle.prototype, "pressedSprite", void 0);
    __decorate([
        property({
            type: cc.SpriteFrame,
            visible: function () { return this.transition === cc.Toggle.Transition.SPRITE; }
        })
    ], BhvGroupToggle.prototype, "hoverSprite", void 0);
    __decorate([
        property({
            type: cc.SpriteFrame,
            visible: function () { return this.transition === cc.Toggle.Transition.SPRITE; }
        })
    ], BhvGroupToggle.prototype, "disabledSprite", void 0);
    __decorate([
        property({ visible: function () { return this.transition === cc.Toggle.Transition.SCALE || this.transition === cc.Toggle.Transition.COLOR; } })
    ], BhvGroupToggle.prototype, "duration", void 0);
    __decorate([
        property({ visible: function () { return this.transition === cc.Toggle.Transition.SCALE; } })
    ], BhvGroupToggle.prototype, "zoomScale", void 0);
    __decorate([
        property({
            type: cc.Enum(PARAM_TYPE)
        })
    ], BhvGroupToggle.prototype, "paramType", void 0);
    __decorate([
        property([cc.Component.EventHandler])
    ], BhvGroupToggle.prototype, "touchEvents", void 0);
    BhvGroupToggle = __decorate([
        ccclass,
        menu("添加特殊行为/Input/Toggle Group(一组Toggle控制)")
    ], BhvGroupToggle);
    return BhvGroupToggle;
}(cc.Component));
exports.default = BhvGroupToggle;

cc._RF.pop();