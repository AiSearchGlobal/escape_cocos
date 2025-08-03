"use strict";
cc._RF.push(module, 'b67f48O01ZCk7Uo4zGuBZwZ', 'auto_jiluItem5');
// script/data/autoui/prefab/auto_jiluItem5.ts

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
var auto_jiluItem5 = /** @class */ (function (_super) {
    __extends(auto_jiluItem5, _super);
    function auto_jiluItem5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    auto_jiluItem5.prototype.onLoad = function () {
        this.jiluItem5 = this.node;
        this.font_1 = this.jiluItem5.getChildByName("font_1");
    };
    auto_jiluItem5.URL = "db://assets/resources/prefab/jiluItem5.prefab";
    auto_jiluItem5 = __decorate([
        ccclass
    ], auto_jiluItem5);
    return auto_jiluItem5;
}(cc.Component));
exports.default = auto_jiluItem5;

cc._RF.pop();