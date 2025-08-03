"use strict";
cc._RF.push(module, '4cc64rWWDZJZpiFyp1TUAA6', 'UIComDialog');
// script/logic/ui/comPop/UIComDialog.ts

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
var auto_comDialog_1 = require("../../../data/autoui/comPop/auto_comDialog");
var UIBase_1 = require("../../../framework/ui/UIBase");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var Log_1 = require("../../../utils/Log");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var UIComDialog = /** @class */ (function (_super) {
    __extends(UIComDialog, _super);
    function UIComDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = null;
        return _this;
    }
    UIComDialog_1 = UIComDialog;
    UIComDialog.prototype.onInit = function (params) {
        if (params == undefined) {
            Log_1.Log.error("UIComDialog:\u6CA1\u6709\u4F20\u5165\u53C2\u6570\uFF01\uFF01\uFF01");
            return;
        }
        var data = params[0];
        this._title = data.title;
        this._content = data.content;
        this._certainCb = data.certainCb;
        this._cancelCb = data.cancelCb;
    };
    UIComDialog.prototype.onUILoad = function () {
        this.ui = this.node.addComponent(auto_comDialog_1.default);
    };
    UIComDialog.prototype.onShow = function () {
        this.onRegisterEvent(this.ui.btn_close, this.onClose);
        this.onRegisterEvent(this.ui.btn_cancel, this.onCancel);
        this.onRegisterEvent(this.ui.btn_certain, this.onCertain);
    };
    UIComDialog.prototype.onHide = function () {
    };
    UIComDialog.prototype.onStart = function () {
        UIHelp_1.default.SetLabel(this.ui.lbl_title, this._title);
        UIHelp_1.default.SetLabel(this.ui.lbl_content, this._content);
        this.ui.btn_cancel.active = Boolean(this._cancelCb);
        this.ui.btn_certain.active = Boolean(this._certainCb);
    };
    UIComDialog.prototype.onClose = function () {
        UIHelp_1.default.CloseUI(UIComDialog_1);
    };
    UIComDialog.prototype.onCancel = function () {
        this.onClose();
        this._cancelCb && this._cancelCb();
    };
    UIComDialog.prototype.onCertain = function () {
        this.onClose();
        this._certainCb && this._certainCb();
    };
    var UIComDialog_1;
    UIComDialog.prefabUrl = "comPop/comDialog";
    UIComDialog.className = "UIComDialog";
    UIComDialog = UIComDialog_1 = __decorate([
        ccclass,
        menu("UI/comPop/UIComDialog")
    ], UIComDialog);
    return UIComDialog;
}(UIBase_1.default));
exports.default = UIComDialog;

cc._RF.pop();