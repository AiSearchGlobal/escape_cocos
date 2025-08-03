"use strict";
cc._RF.push(module, 'edeeeB+3ZhFOZeD4YCnJnFe', 'auto_jiluItem1');
// script/data/autoui/prefab/auto_jiluItem1.ts

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
var auto_jiluItem1 = /** @class */ (function (_super) {
    __extends(auto_jiluItem1, _super);
    function auto_jiluItem1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    auto_jiluItem1.prototype.onLoad = function () {
        this.jiluItem1 = this.node;
        this.bg = this.jiluItem1.getChildByName("bg");
        this.room_name_1 = this.bg.getChildByName("room_name_1");
        this.room_name_2 = this.bg.getChildByName("room_name_2");
        this.room_name_3 = this.bg.getChildByName("room_name_3");
        this.room_name_4 = this.bg.getChildByName("room_name_4");
        this.room_name_5 = this.bg.getChildByName("room_name_5");
        this.room_name_6 = this.bg.getChildByName("room_name_6");
        this.room_name_7 = this.bg.getChildByName("room_name_7");
        this.room_name_8 = this.bg.getChildByName("room_name_8");
        this.gui_1 = this.bg.getChildByName("gui_1");
        this.gui_2 = this.bg.getChildByName("gui_2");
        this.gui_3 = this.bg.getChildByName("gui_3");
        this.gui_4 = this.bg.getChildByName("gui_4");
        this.gui_5 = this.bg.getChildByName("gui_5");
        this.gui_6 = this.bg.getChildByName("gui_6");
        this.gui_7 = this.bg.getChildByName("gui_7");
        this.gui_8 = this.bg.getChildByName("gui_8");
        this.node_labs = this.jiluItem1.getChildByName("node_labs");
        this.lab_name_num_1 = this.node_labs.getChildByName("lab_name_num_1");
        this.lab_name_num_2 = this.node_labs.getChildByName("lab_name_num_2");
        this.lab_name_num_3 = this.node_labs.getChildByName("lab_name_num_3");
        this.lab_name_num_4 = this.node_labs.getChildByName("lab_name_num_4");
        this.lab_name_num_5 = this.node_labs.getChildByName("lab_name_num_5");
        this.lab_name_num_6 = this.node_labs.getChildByName("lab_name_num_6");
        this.lab_name_num_7 = this.node_labs.getChildByName("lab_name_num_7");
        this.lab_name_num_8 = this.node_labs.getChildByName("lab_name_num_8");
        this.biaoti1 = this.jiluItem1.getChildByName("biaoti1");
    };
    auto_jiluItem1.URL = "db://assets/resources/prefab/jiluItem1.prefab";
    auto_jiluItem1 = __decorate([
        ccclass
    ], auto_jiluItem1);
    return auto_jiluItem1;
}(cc.Component));
exports.default = auto_jiluItem1;

cc._RF.pop();