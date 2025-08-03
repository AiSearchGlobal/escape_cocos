"use strict";
cc._RF.push(module, '8449fru6hxMdKwUnP3UN6sJ', 'auto_comDialog');
// script/data/autoui/comPop/auto_comDialog.ts

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
var ccclass = cc._decorator.ccclass;
var auto_comDialog = /** @class */ (function (_super) {
    __extends(auto_comDialog, _super);
    function auto_comDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    auto_comDialog.prototype.onLoad = function () {
        this.confirmDialog = this.node;
        this.model = this.confirmDialog.getChildByName("model");
        this.background = this.confirmDialog.getChildByName("background");
        this.lbl_title = this.background.getChildByName("lbl_title");
        this.lbl_content = this.background.getChildByName("lbl_content");
        this.btn_close = this.background.getChildByName("btn_close");
        this.Background_close = this.btn_close.getChildByName("Background_close");
        this.Label_close = this.Background_close.getChildByName("Label_close");
        this.layout_btn = this.background.getChildByName("layout_btn");
        this.btn_cancel = this.layout_btn.getChildByName("btn_cancel");
        this.Background_cancel = this.btn_cancel.getChildByName("Background_cancel");
        this.Label_cancel = this.Background_cancel.getChildByName("Label_cancel");
        this.btn_certain = this.layout_btn.getChildByName("btn_certain");
        this.Background_certain = this.btn_certain.getChildByName("Background_certain");
        this.Label_certain = this.Background_certain.getChildByName("Label_certain");
    };
    auto_comDialog.URL = "db://assets/resources/prefab/comPop/comDialog.prefab";
    auto_comDialog = __decorate([
        ccclass
    ], auto_comDialog);
    return auto_comDialog;
}(cc.Component));
exports.default = auto_comDialog;

cc._RF.pop();