"use strict";
cc._RF.push(module, 'dbdfdbIDIBKtL232M9qnlEC', 'UIComTipsItem');
// script/logic/ui/comPop/UIComTipsItem.ts

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
var auto_comTipsItem_1 = require("../../../data/autoui/comPop/auto_comTipsItem");
var UIBase_1 = require("../../../framework/ui/UIBase");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var UIComTipsItem = /** @class */ (function (_super) {
    __extends(UIComTipsItem, _super);
    function UIComTipsItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.ready = true;
        return _this;
    }
    UIComTipsItem_1 = UIComTipsItem;
    UIComTipsItem.prototype.onUILoad = function () {
        this.ui = this.node.addComponent(auto_comTipsItem_1.default);
    };
    UIComTipsItem.prototype.onShow = function () {
    };
    UIComTipsItem.prototype.onHide = function () {
    };
    UIComTipsItem.prototype.onStart = function () {
    };
    UIComTipsItem.prototype.onClose = function () {
        UIHelp_1.default.CloseUI(UIComTipsItem_1);
    };
    UIComTipsItem.prototype.playTip = function (message) {
        this.node.stopAllActions();
        this.ready = false;
        UIHelp_1.default.SetLabel(this.ui.lab_des, message);
        this.reset();
        var action0 = cc.moveTo(0.5, 0, 128);
        var action1 = cc.fadeIn(0.5);
        var action2 = cc.spawn(action0, action1);
        var action3 = cc.delayTime(1);
        var action4 = cc.fadeOut(0.5);
        var callback = cc.callFunc(function () {
            this.ready = true;
        }, this);
        var action = cc.sequence(action2, action3, action4, callback);
        this.node.runAction(action);
    };
    UIComTipsItem.prototype.isReady = function () {
        return this.ready;
    };
    UIComTipsItem.prototype.reset = function () {
        this.node.setPosition(0, 0);
        this.node.opacity = 255;
    };
    var UIComTipsItem_1;
    UIComTipsItem.prefabUrl = "comPop/comTipsItem";
    UIComTipsItem.className = "UIComTipsItem";
    UIComTipsItem = UIComTipsItem_1 = __decorate([
        ccclass,
        menu("UI/comPop/UIComTipsItem")
    ], UIComTipsItem);
    return UIComTipsItem;
}(UIBase_1.default));
exports.default = UIComTipsItem;

cc._RF.pop();