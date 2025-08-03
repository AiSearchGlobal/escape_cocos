"use strict";
cc._RF.push(module, 'a2e55x8IrFONpOi6irOVW1/', 'auto_playerName');
// script/data/autoui/prefab/auto_playerName.ts

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
var auto_playerName = /** @class */ (function (_super) {
    __extends(auto_playerName, _super);
    function auto_playerName() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    auto_playerName.prototype.onLoad = function () {
        this.playerName = this.node;
        this.label_name_bg = this.playerName.getChildByName("label_name_bg");
        this.lan_name1 = this.label_name_bg.getChildByName("lan_name1");
        this.lan_name = this.playerName.getChildByName("lan_name");
    };
    auto_playerName.URL = "db://assets/resources/prefab/playerName.prefab";
    auto_playerName = __decorate([
        ccclass
    ], auto_playerName);
    return auto_playerName;
}(cc.Component));
exports.default = auto_playerName;

cc._RF.pop();