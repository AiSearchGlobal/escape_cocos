"use strict";
cc._RF.push(module, '746d36kpoZJz5avvZ/Nm+vI', 'auto_rankLayer');
// script/data/autoui/prefab/auto_rankLayer.ts

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
var auto_rankLayer = /** @class */ (function (_super) {
    __extends(auto_rankLayer, _super);
    function auto_rankLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    auto_rankLayer.prototype.onLoad = function () {
        this.rankLayer = this.node;
        this.model = this.rankLayer.getChildByName("model");
        this.scrollView = this.rankLayer.getChildByName("scrollView");
        this.view = this.scrollView.getChildByName("view");
        this.content = this.view.getChildByName("content");
        this.dingbubiaoti = this.content.getChildByName("dingbubiaoti");
        this.paihangbai1 = this.content.getChildByName("paihangbai1");
        this.paihangbai2 = this.content.getChildByName("paihangbai2");
        this.paihangbai3 = this.content.getChildByName("paihangbai3");
        this.paihang1 = this.content.getChildByName("paihang1");
        this.paihang2 = this.content.getChildByName("paihang2");
        this.paihang3 = this.content.getChildByName("paihang3");
        this.lab_max_mianshang = this.content.getChildByName("lab_max_mianshang");
        this.lab_mianshang_1 = this.content.getChildByName("lab_mianshang_1");
        this.lab_mianshang_2 = this.content.getChildByName("lab_mianshang_2");
        this.lab_mianshang_3 = this.content.getChildByName("lab_mianshang_3");
        this.lab_bang_1 = this.content.getChildByName("lab_bang_1");
        this.lab_bang_2 = this.content.getChildByName("lab_bang_2");
        this.lab_bang_3 = this.content.getChildByName("lab_bang_3");
        this.lab_coin_name = this.content.getChildByName("lab_coin_name");
        this.font_paiming = this.content.getChildByName("font_paiming");
        this.font_buchomg = this.content.getChildByName("font_buchomg");
        this.font_des = this.content.getChildByName("font_des");
        this.btn_back = this.rankLayer.getChildByName("btn_back");
        this.spr_back = this.btn_back.getChildByName("spr_back");
        this.bg_bottom = this.rankLayer.getChildByName("bg_bottom");
        this.touxiangshiyi = this.bg_bottom.getChildByName("touxiangshiyi");
        this.icon_coin = this.bg_bottom.getChildByName("icon_coin");
        this.font_2 = this.bg_bottom.getChildByName("font_2");
        this.lab_my_name = this.bg_bottom.getChildByName("lab_my_name");
        this.lab_my_coin = this.bg_bottom.getChildByName("lab_my_coin");
    };
    auto_rankLayer.URL = "db://assets/resources/prefab/rankLayer.prefab";
    auto_rankLayer = __decorate([
        ccclass
    ], auto_rankLayer);
    return auto_rankLayer;
}(cc.Component));
exports.default = auto_rankLayer;

cc._RF.pop();