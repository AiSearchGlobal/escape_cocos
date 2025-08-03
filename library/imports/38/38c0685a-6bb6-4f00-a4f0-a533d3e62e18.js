"use strict";
cc._RF.push(module, '38c06haa7ZPAKTwpTPT5i4Y', 'UIJiluItem1');
// script/logic/ui/prefab/UIJiluItem1.ts

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
var auto_jiluItem1_1 = require("../../../data/autoui/prefab/auto_jiluItem1");
var UIBase_1 = require("../../../framework/ui/UIBase");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var UIJiluItem1 = /** @class */ (function (_super) {
    __extends(UIJiluItem1, _super);
    function UIJiluItem1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = null;
        return _this;
    }
    UIJiluItem1_1 = UIJiluItem1;
    UIJiluItem1.prototype.onUILoad = function () {
        this.ui = this.node.addComponent(auto_jiluItem1_1.default);
        UIJiluItem1_1.instance = this;
    };
    UIJiluItem1.prototype.onShow = function () {
    };
    UIJiluItem1.prototype.onHide = function () {
    };
    UIJiluItem1.prototype.onStart = function () {
    };
    UIJiluItem1.prototype.show = function (holder) {
        for (var _i = 0, _a = holder.data.list; _i < _a.length; _i++) {
            var index = _a[_i];
            UIHelp_1.default.SetLabel(this.ui["lab_name_num_" + index.shaid], index.sha_total);
        }
    };
    UIJiluItem1.prototype.hide = function () {
    };
    UIJiluItem1.prototype.onClose = function () {
        UIHelp_1.default.CloseUI(UIJiluItem1_1);
    };
    var UIJiluItem1_1;
    UIJiluItem1.prefabUrl = "jiluItem1";
    UIJiluItem1.className = "UIJiluItem1";
    UIJiluItem1.instance = null;
    UIJiluItem1 = UIJiluItem1_1 = __decorate([
        ccclass,
        menu("UI/prefab/UIJiluItem1")
    ], UIJiluItem1);
    return UIJiluItem1;
}(UIBase_1.default));
exports.default = UIJiluItem1;

cc._RF.pop();