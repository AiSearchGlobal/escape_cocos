"use strict";
cc._RF.push(module, 'cb3c01mOapHjrJ7p01yxTmw', 'auto_jiluItem2');
// script/data/autoui/prefab/auto_jiluItem2.ts

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
var auto_jiluItem2 = /** @class */ (function (_super) {
    __extends(auto_jiluItem2, _super);
    function auto_jiluItem2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    auto_jiluItem2.prototype.onLoad = function () {
        this.jiluItem2 = this.node;
        this.bg = this.jiluItem2.getChildByName("bg");
        this.room_name_1 = this.bg.getChildByName("room_name_1");
        this.room_name_2 = this.bg.getChildByName("room_name_2");
        this.room_name_3 = this.bg.getChildByName("room_name_3");
        this.room_name_4 = this.bg.getChildByName("room_name_4");
        this.room_name_5 = this.bg.getChildByName("room_name_5");
        this.room_name_6 = this.bg.getChildByName("room_name_6");
        this.room_name_7 = this.bg.getChildByName("room_name_7");
        this.room_name_8 = this.bg.getChildByName("room_name_8");
        this.room_name_9 = this.bg.getChildByName("room_name_9");
        this.room_name_10 = this.bg.getChildByName("room_name_10");
        this.node_labs = this.jiluItem2.getChildByName("node_labs");
        this.lab_qi_1 = this.node_labs.getChildByName("lab_qi_1");
        this.lab_qi_2 = this.node_labs.getChildByName("lab_qi_2");
        this.lab_qi_3 = this.node_labs.getChildByName("lab_qi_3");
        this.lab_qi_4 = this.node_labs.getChildByName("lab_qi_4");
        this.lab_qi_5 = this.node_labs.getChildByName("lab_qi_5");
        this.lab_qi_6 = this.node_labs.getChildByName("lab_qi_6");
        this.lab_qi_7 = this.node_labs.getChildByName("lab_qi_7");
        this.lab_qi_8 = this.node_labs.getChildByName("lab_qi_8");
        this.lab_qi_9 = this.node_labs.getChildByName("lab_qi_9");
        this.lab_qi_10 = this.node_labs.getChildByName("lab_qi_10");
        this.biaoti1 = this.jiluItem2.getChildByName("biaoti1");
    };
    auto_jiluItem2.URL = "db://assets/resources/prefab/jiluItem2.prefab";
    auto_jiluItem2 = __decorate([
        ccclass
    ], auto_jiluItem2);
    return auto_jiluItem2;
}(cc.Component));
exports.default = auto_jiluItem2;

cc._RF.pop();