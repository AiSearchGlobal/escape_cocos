"use strict";
cc._RF.push(module, 'ff2e1XwwT5N+Zspp+ZP2d2v', 'auto_jiluLayer');
// script/data/autoui/prefab/auto_jiluLayer.ts

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
var auto_jiluLayer = /** @class */ (function (_super) {
    __extends(auto_jiluLayer, _super);
    function auto_jiluLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    auto_jiluLayer.prototype.onLoad = function () {
        this.jiluLayer = this.node;
        this.model = this.jiluLayer.getChildByName("model");
        this.scrollView = this.jiluLayer.getChildByName("scrollView");
        this.view = this.scrollView.getChildByName("view");
        this.content = this.view.getChildByName("content");
        this.header = this.view.getChildByName("header");
        this.Node_1 = this.header.getChildByName("Node_1");
        this.loading = this.Node_1.getChildByName("loading");
        this.btn_back = this.jiluLayer.getChildByName("btn_back");
        this.spr_back = this.btn_back.getChildByName("spr_back");
    };
    auto_jiluLayer.URL = "db://assets/resources/prefab/jiluLayer.prefab";
    auto_jiluLayer = __decorate([
        ccclass
    ], auto_jiluLayer);
    return auto_jiluLayer;
}(cc.Component));
exports.default = auto_jiluLayer;

cc._RF.pop();