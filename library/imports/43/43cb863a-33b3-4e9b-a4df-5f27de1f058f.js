"use strict";
cc._RF.push(module, '43cb8Y6M7NOm6TfXyfeHwWP', 'auto_game');
// script/data/autoui/scene/auto_game.ts

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
var auto_game = /** @class */ (function (_super) {
    __extends(auto_game, _super);
    function auto_game() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    auto_game.prototype.onLoad = function () {
        var parent = this.node.getParent();
        this.Canvas = parent.getChildByName("Canvas");
        this.ScrollView = this.Canvas.getChildByName("ScrollView");
        this.view = this.ScrollView.getChildByName("view");
        this.content = this.view.getChildByName("content");
        this.gameLayer = this.content.getChildByName("gameLayer");
        this.VMTimer = this.Canvas.getChildByName("VMTimer");
        this.node_stage = this.Canvas.getChildByName("node_stage");
        this.stage_3 = this.node_stage.getChildByName("stage_3");
        this.model_stage_3 = this.stage_3.getChildByName("model_stage_3");
        this.img_djs3 = this.stage_3.getChildByName("img_djs3");
        this.stage_4 = this.node_stage.getChildByName("stage_4");
        this.stage_5 = this.node_stage.getChildByName("stage_5");
        this.mode_stage_5 = this.stage_5.getChildByName("mode_stage_5");
        this.VM_result = this.stage_5.getChildByName("VM_result");
        this.tc_over_0 = this.VM_result.getChildByName("tc_over_0");
        this.tc_over_1 = this.VM_result.getChildByName("tc_over_1");
        this.tc_over_layout_1 = this.tc_over_1.getChildByName("tc_over_layout_1");
        this.font_shadiao = this.tc_over_layout_1.getChildByName("font_shadiao");
        this.lab_kill_room_name = this.tc_over_layout_1.getChildByName("lab_kill_room_name");
        this.font_suoyouren = this.tc_over_layout_1.getChildByName("font_suoyouren");
        this.font_duobishibai = this.tc_over_1.getChildByName("font_duobishibai");
        this.tc_over_2 = this.VM_result.getChildByName("tc_over_2");
        this.tc_over_layout_2 = this.tc_over_2.getChildByName("tc_over_layout_2");
        this.lab_guafen_coin = this.tc_over_2.getChildByName("lab_guafen_coin");
        this.guafen_coin = this.tc_over_2.getChildByName("guafen_coin");
        this.icon_coin1 = this.guafen_coin.getChildByName("icon_coin1");
        this.icon_coin2 = this.guafen_coin.getChildByName("icon_coin2");
        this.icon_coin3 = this.guafen_coin.getChildByName("icon_coin3");
        this.lab_num = this.guafen_coin.getChildByName("lab_num");
        this.VM = this.guafen_coin.getChildByName("VM");
        this.tc_over_3 = this.VM_result.getChildByName("tc_over_3");
        this.pop_win1 = this.tc_over_3.getChildByName("pop_win1");
        this.pop_win2 = this.tc_over_3.getChildByName("pop_win2");
        this.pop_win3 = this.tc_over_3.getChildByName("pop_win3");
        this.lab_weiguafen = this.tc_over_3.getChildByName("lab_weiguafen");
        this.VM_over_3 = this.tc_over_3.getChildByName("VM_over_3");
        this.tc_over_4 = this.VM_result.getChildByName("tc_over_4");
        this.pop_win4_1 = this.tc_over_4.getChildByName("pop_win4_1");
        this.pop_win4_2 = this.tc_over_4.getChildByName("pop_win4_2");
        this.pop_win4_3 = this.tc_over_4.getChildByName("pop_win4_3");
        this.lab_touru = this.tc_over_4.getChildByName("lab_touru");
        this.lab_touru_num = this.tc_over_4.getChildByName("lab_touru_num");
        this.coin_1_1 = this.tc_over_4.getChildByName("coin_1_1");
        this.coin_1_2 = this.tc_over_4.getChildByName("coin_1_2");
        this.coin_1_3 = this.tc_over_4.getChildByName("coin_1_3");
        this.lab_huode = this.tc_over_4.getChildByName("lab_huode");
        this.lab_huode_num = this.tc_over_4.getChildByName("lab_huode_num");
        this.coin_2_1 = this.tc_over_4.getChildByName("coin_2_1");
        this.coin_2_2 = this.tc_over_4.getChildByName("coin_2_2");
        this.coin_2_3 = this.tc_over_4.getChildByName("coin_2_3");
        this.VM_coin = this.tc_over_4.getChildByName("VM_coin");
    };
    auto_game.URL = "db://assets/scene/game.fire";
    auto_game = __decorate([
        ccclass
    ], auto_game);
    return auto_game;
}(cc.Component));
exports.default = auto_game;

cc._RF.pop();