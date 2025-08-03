"use strict";
cc._RF.push(module, '58946XfbLZKxpiM751KchRO', 'auto_choseRoomLayer');
// script/data/autoui/prefab/auto_choseRoomLayer.ts

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
var auto_choseRoomLayer = /** @class */ (function (_super) {
    __extends(auto_choseRoomLayer, _super);
    function auto_choseRoomLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    auto_choseRoomLayer.prototype.onLoad = function () {
        this.choseRoomLayer = this.node;
        this.btn_close = this.choseRoomLayer.getChildByName("btn_close");
        this.layout = this.choseRoomLayer.getChildByName("layout");
        this.btn_1 = this.layout.getChildByName("btn_1");
        this.node_room1_type1 = this.btn_1.getChildByName("node_room1_type1");
        this.houzi1 = this.node_room1_type1.getChildByName("houzi1");
        this.lab_min1 = this.node_room1_type1.getChildByName("lab_min1");
        this.lab_max1 = this.node_room1_type1.getChildByName("lab_max1");
        this.node_room1_type2 = this.btn_1.getChildByName("node_room1_type2");
        this.font_1 = this.node_room1_type2.getChildByName("font_1");
        this.btn_2 = this.layout.getChildByName("btn_2");
        this.node_room2_type1 = this.btn_2.getChildByName("node_room2_type1");
        this.houzi2 = this.node_room2_type1.getChildByName("houzi2");
        this.lab_min2 = this.node_room2_type1.getChildByName("lab_min2");
        this.lab_max2 = this.node_room2_type1.getChildByName("lab_max2");
        this.node_room2_type2 = this.btn_2.getChildByName("node_room2_type2");
        this.font_2 = this.node_room2_type2.getChildByName("font_2");
        this.btn_3 = this.layout.getChildByName("btn_3");
        this.node_room3_type1 = this.btn_3.getChildByName("node_room3_type1");
        this.houzi3 = this.node_room3_type1.getChildByName("houzi3");
        this.lab_min3 = this.node_room3_type1.getChildByName("lab_min3");
        this.lab_max3 = this.node_room3_type1.getChildByName("lab_max3");
        this.node_room3_type2 = this.btn_3.getChildByName("node_room3_type2");
        this.font_3 = this.node_room3_type2.getChildByName("font_3");
        this.VM = this.choseRoomLayer.getChildByName("VM");
        this.font_title = this.choseRoomLayer.getChildByName("font_title");
    };
    auto_choseRoomLayer.URL = "db://assets/resources/prefab/choseRoomLayer.prefab";
    auto_choseRoomLayer = __decorate([
        ccclass
    ], auto_choseRoomLayer);
    return auto_choseRoomLayer;
}(cc.Component));
exports.default = auto_choseRoomLayer;

cc._RF.pop();