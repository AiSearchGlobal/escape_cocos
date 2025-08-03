"use strict";
cc._RF.push(module, 'bf160oURsRAtJBdIk4+YYfl', 'UIComTips');
// script/logic/ui/comPop/UIComTips.ts

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
var auto_comTips_1 = require("../../../data/autoui/comPop/auto_comTips");
var UIBase_1 = require("../../../framework/ui/UIBase");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var UIComTipsItem_1 = require("./UIComTipsItem");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var UIComTips = /** @class */ (function (_super) {
    __extends(UIComTips, _super);
    function UIComTips() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.tipPrefab = null;
        _this.tipPool = [];
        return _this;
    }
    UIComTips_1 = UIComTips;
    UIComTips.prototype.onUILoad = function () {
        this.ui = this.node.addComponent(auto_comTips_1.default);
    };
    UIComTips.prototype.onShow = function () {
    };
    UIComTips.prototype.onHide = function () {
    };
    UIComTips.prototype.onStart = function () {
    };
    UIComTips.prototype.onClose = function () {
        UIHelp_1.default.CloseUI(UIComTips_1);
    };
    UIComTips.prototype.showTip = function (message) {
        for (var i = 0; i < this.tipPool.length; ++i) {
            if (this.tipPool[i] != null && this.tipPool[i].isReady()) {
                this.tipPool[i].playTip(message);
                return;
            }
        }
        var TipNode = cc.instantiate(this.tipPrefab);
        TipNode.parent = this.node;
        var tip = TipNode.getComponent(UIComTipsItem_1.default);
        this.tipPool.push(tip);
        tip.playTip(message);
    };
    var UIComTips_1;
    UIComTips.prefabUrl = "comPop/comTips";
    UIComTips.className = "UIComTips";
    __decorate([
        property(cc.Prefab)
    ], UIComTips.prototype, "tipPrefab", void 0);
    UIComTips = UIComTips_1 = __decorate([
        ccclass,
        menu("UI/comPop/UIComTips")
    ], UIComTips);
    return UIComTips;
}(UIBase_1.default));
exports.default = UIComTips;

cc._RF.pop();