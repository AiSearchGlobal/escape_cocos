"use strict";
cc._RF.push(module, '13917If7fpNl5++gVEKI3xH', 'UIJiluLayer');
// script/logic/ui/prefab/UIJiluLayer.ts

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
var auto_jiluLayer_1 = require("../../../data/autoui/prefab/auto_jiluLayer");
var UIBase_1 = require("../../../framework/ui/UIBase");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var UIJiluLayer = /** @class */ (function (_super) {
    __extends(UIJiluLayer, _super);
    function UIJiluLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = null;
        return _this;
    }
    UIJiluLayer_1 = UIJiluLayer;
    UIJiluLayer.prototype.onUILoad = function () {
        this.ui = this.node.addComponent(auto_jiluLayer_1.default);
        UIJiluLayer_1.instance = this;
    };
    UIJiluLayer.prototype.onShow = function () {
        this.onRegisterEvent(this.ui.btn_back, this.onClose);
    };
    UIJiluLayer.prototype.onHide = function () {
    };
    UIJiluLayer.prototype.onStart = function () {
    };
    UIJiluLayer.prototype.onClose = function () {
        UIHelp_1.default.CloseUI(UIJiluLayer_1);
    };
    var UIJiluLayer_1;
    UIJiluLayer.prefabUrl = "jiluLayer";
    UIJiluLayer.className = "UIJiluLayer";
    UIJiluLayer.instance = null;
    UIJiluLayer = UIJiluLayer_1 = __decorate([
        ccclass,
        menu("UI/prefab/UIJiluLayer")
    ], UIJiluLayer);
    return UIJiluLayer;
}(UIBase_1.default));
exports.default = UIJiluLayer;

cc._RF.pop();