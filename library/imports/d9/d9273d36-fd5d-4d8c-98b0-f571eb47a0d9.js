"use strict";
cc._RF.push(module, 'd927302/V1NjJiw9XHrR6DZ', 'UIJiluItem5');
// script/logic/ui/prefab/UIJiluItem5.ts

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
var auto_jiluItem5_1 = require("../../../data/autoui/prefab/auto_jiluItem5");
var UIBase_1 = require("../../../framework/ui/UIBase");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var UIJiluItem5 = /** @class */ (function (_super) {
    __extends(UIJiluItem5, _super);
    function UIJiluItem5() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = null;
        return _this;
    }
    UIJiluItem5_1 = UIJiluItem5;
    UIJiluItem5.prototype.onUILoad = function () {
        this.ui = this.node.addComponent(auto_jiluItem5_1.default);
        UIJiluItem5_1.instance = this;
    };
    UIJiluItem5.prototype.onShow = function () {
    };
    UIJiluItem5.prototype.onHide = function () {
    };
    UIJiluItem5.prototype.onStart = function () {
    };
    UIJiluItem5.prototype.show = function (holder) {
    };
    UIJiluItem5.prototype.hide = function () {
    };
    UIJiluItem5.prototype.onClose = function () {
        UIHelp_1.default.CloseUI(UIJiluItem5_1);
    };
    var UIJiluItem5_1;
    UIJiluItem5.prefabUrl = "jiluItem5";
    UIJiluItem5.className = "UIJiluItem5";
    UIJiluItem5.instance = null;
    UIJiluItem5 = UIJiluItem5_1 = __decorate([
        ccclass,
        menu("UI/prefab/UIJiluItem5")
    ], UIJiluItem5);
    return UIJiluItem5;
}(UIBase_1.default));
exports.default = UIJiluItem5;

cc._RF.pop();