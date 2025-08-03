"use strict";
cc._RF.push(module, 'c24fc6o/MZOEaSDXsaggLbC', 'UIComSharePop');
// script/logic/ui/comPop/UIComSharePop.ts

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
var auto_comSharePop_1 = require("../../../data/autoui/comPop/auto_comSharePop");
var UIBase_1 = require("../../../framework/ui/UIBase");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var UIComSharePop = /** @class */ (function (_super) {
    __extends(UIComSharePop, _super);
    function UIComSharePop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = null;
        return _this;
    }
    UIComSharePop_1 = UIComSharePop;
    UIComSharePop.prototype.onUILoad = function () {
        this.ui = this.node.addComponent(auto_comSharePop_1.default);
    };
    UIComSharePop.prototype.onShow = function () {
        this.onRegisterEvent(this.ui.btn_close, this.onClose);
    };
    UIComSharePop.prototype.onHide = function () {
    };
    UIComSharePop.prototype.onStart = function () {
    };
    UIComSharePop.prototype.onClose = function () {
        UIHelp_1.default.CloseUI(UIComSharePop_1);
    };
    var UIComSharePop_1;
    UIComSharePop.prefabUrl = "comPop/comSharePop";
    UIComSharePop.className = "UIComSharePop";
    UIComSharePop = UIComSharePop_1 = __decorate([
        ccclass,
        menu("UI/comPop/UIComSharePop")
    ], UIComSharePop);
    return UIComSharePop;
}(UIBase_1.default));
exports.default = UIComSharePop;

cc._RF.pop();