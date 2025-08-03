"use strict";
cc._RF.push(module, '34a8capEKRMlKbumef4sK/3', 'RoomCoin');
// script/logic/ui/prefab/RoomCoin.ts

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
exports.RoomCoin = void 0;
var EventMng_1 = require("../../../framework/manager/EventMng");
var EventConst_1 = require("../../../userData/EventConst");
var GameDataCenter_1 = require("../../../userData/GameDataCenter");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var RoomCoin = /** @class */ (function (_super) {
    __extends(RoomCoin, _super);
    function RoomCoin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labCoin = null;
        _this.id = 0;
        _this.scaling = false;
        return _this;
    }
    RoomCoin.prototype.onLoad = function () {
        EventMng_1.default.on(EventConst_1.GameEvent.COIN_SCALE, this.showScale, this);
    };
    RoomCoin.prototype.onDestroy = function () {
        EventMng_1.default.off(EventConst_1.GameEvent.COIN_SCALE, this.showScale, this);
    };
    RoomCoin.prototype.showScale = function (rooms) {
        var _this = this;
        if (this.scaling) {
            return;
        }
        if (GameDataCenter_1.default.roomInfoModel["coin" + this.id] >= rooms[this.id - 1].total) {
            return;
        }
        this.scaling = true;
        cc.tween(this.node)
            .by(0.5, { scale: 0.2 })
            .by(0.5, { scale: -0.2 })
            .call(function () {
            _this.scaling = false;
        })
            .start();
    };
    __decorate([
        property(cc.Label)
    ], RoomCoin.prototype, "labCoin", void 0);
    __decorate([
        property(cc.Integer)
    ], RoomCoin.prototype, "id", void 0);
    RoomCoin = __decorate([
        ccclass,
        menu("UI/prefab/RoomCoin")
    ], RoomCoin);
    return RoomCoin;
}(cc.Component));
exports.RoomCoin = RoomCoin;

cc._RF.pop();