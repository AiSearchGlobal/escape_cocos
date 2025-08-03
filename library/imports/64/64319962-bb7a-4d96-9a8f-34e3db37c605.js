"use strict";
cc._RF.push(module, '64319liu3pNlpqPNOPbN8YF', 'UIWeihuLayer');
// script/logic/ui/prefab/UIWeihuLayer.ts

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
var auto_weihuLayer_1 = require("../../../data/autoui/prefab/auto_weihuLayer");
var UIBase_1 = require("../../../framework/ui/UIBase");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var UIWeihuLayer = /** @class */ (function (_super) {
    __extends(UIWeihuLayer, _super);
    function UIWeihuLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = null;
        return _this;
    }
    UIWeihuLayer_1 = UIWeihuLayer;
    UIWeihuLayer.prototype.onUILoad = function () {
        this.ui = this.node.addComponent(auto_weihuLayer_1.default);
        UIWeihuLayer_1.instance = this;
    };
    UIWeihuLayer.prototype.onShow = function () {
    };
    UIWeihuLayer.prototype.onHide = function () {
    };
    UIWeihuLayer.prototype.onStart = function () {
    };
    UIWeihuLayer.prototype.onClose = function () {
        UIHelp_1.default.CloseUI(UIWeihuLayer_1);
    };
    var UIWeihuLayer_1;
    UIWeihuLayer.prefabUrl = "weihuLayer";
    UIWeihuLayer.className = "UIWeihuLayer";
    UIWeihuLayer.instance = null;
    UIWeihuLayer = UIWeihuLayer_1 = __decorate([
        ccclass,
        menu("UI/prefab/UIWeihuLayer")
    ], UIWeihuLayer);
    return UIWeihuLayer;
}(UIBase_1.default));
exports.default = UIWeihuLayer;

cc._RF.pop();