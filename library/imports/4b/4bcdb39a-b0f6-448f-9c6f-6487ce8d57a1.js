"use strict";
cc._RF.push(module, '4bcdbOasPZEj5xvZIfOjVeh', 'auto_jiluItem4');
// script/data/autoui/prefab/auto_jiluItem4.ts

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
var auto_jiluItem4 = /** @class */ (function (_super) {
    __extends(auto_jiluItem4, _super);
    function auto_jiluItem4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    auto_jiluItem4.prototype.onLoad = function () {
        this.jiluItem4 = this.node;
        this.bg = this.jiluItem4.getChildByName("bg");
        this.fengexian1 = this.bg.getChildByName("fengexian1");
        this.font_1 = this.bg.getChildByName("font_1");
        this.font_2 = this.bg.getChildByName("font_2");
        this.lab_qi = this.bg.getChildByName("lab_qi");
        this.lab_touru_name = this.bg.getChildByName("lab_touru_name");
        this.lab_huode_name = this.bg.getChildByName("lab_huode_name");
        this.lab_choose_room = this.bg.getChildByName("lab_choose_room");
        this.lba_kill_room = this.bg.getChildByName("lba_kill_room");
        this.lab_touru_num = this.bg.getChildByName("lab_touru_num");
        this.lab_huode_num = this.bg.getChildByName("lab_huode_num");
        this.lab_win = this.bg.getChildByName("lab_win");
        this.lab_lose = this.bg.getChildByName("lab_lose");
    };
    auto_jiluItem4.URL = "db://assets/resources/prefab/jiluItem4.prefab";
    auto_jiluItem4 = __decorate([
        ccclass
    ], auto_jiluItem4);
    return auto_jiluItem4;
}(cc.Component));
exports.default = auto_jiluItem4;

cc._RF.pop();