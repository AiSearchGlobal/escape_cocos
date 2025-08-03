"use strict";
cc._RF.push(module, 'a2c68jq+BBPaZB6dpOY8srR', 'auto_jiluItem3');
// script/data/autoui/prefab/auto_jiluItem3.ts

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
var auto_jiluItem3 = /** @class */ (function (_super) {
    __extends(auto_jiluItem3, _super);
    function auto_jiluItem3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    auto_jiluItem3.prototype.onLoad = function () {
        this.jiluItem3 = this.node;
        this.bg = this.jiluItem3.getChildByName("bg");
        this.font_1 = this.bg.getChildByName("font_1");
        this.font_2 = this.bg.getChildByName("font_2");
        this.font_3 = this.bg.getChildByName("font_3");
        this.layout_1 = this.bg.getChildByName("layout_1");
        this.coin_1_1 = this.layout_1.getChildByName("coin_1_1");
        this.coin_1_2 = this.layout_1.getChildByName("coin_1_2");
        this.coin_1_3 = this.layout_1.getChildByName("coin_1_3");
        this.lab_touru_num = this.layout_1.getChildByName("lab_touru_num");
        this.layout_2 = this.bg.getChildByName("layout_2");
        this.coin_2_1 = this.layout_2.getChildByName("coin_2_1");
        this.coin_2_2 = this.layout_2.getChildByName("coin_2_2");
        this.coin_2_3 = this.layout_2.getChildByName("coin_2_3");
        this.lab_huode_num = this.layout_2.getChildByName("lab_huode_num");
    };
    auto_jiluItem3.URL = "db://assets/resources/prefab/jiluItem3.prefab";
    auto_jiluItem3 = __decorate([
        ccclass
    ], auto_jiluItem3);
    return auto_jiluItem3;
}(cc.Component));
exports.default = auto_jiluItem3;

cc._RF.pop();