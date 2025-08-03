"use strict";
cc._RF.push(module, '73567+7e5tGdIQRdLLolBBg', 'auto_player');
// script/data/autoui/prefab/auto_player.ts

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
var auto_player = /** @class */ (function (_super) {
    __extends(auto_player, _super);
    function auto_player() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    auto_player.prototype.onLoad = function () {
        this.player = this.node;
        this.img_cat = this.player.getChildByName("img_cat");
        this.img_bubble = this.player.getChildByName("img_bubble");
        this.coin_1 = this.img_bubble.getChildByName("coin_1");
        this.coin_2 = this.img_bubble.getChildByName("coin_2");
        this.coin_3 = this.img_bubble.getChildByName("coin_3");
        this.lab_coin = this.img_bubble.getChildByName("lab_coin");
        this.VM = this.player.getChildByName("VM");
    };
    auto_player.URL = "db://assets/resources/prefab/player.prefab";
    auto_player = __decorate([
        ccclass
    ], auto_player);
    return auto_player;
}(cc.Component));
exports.default = auto_player;

cc._RF.pop();