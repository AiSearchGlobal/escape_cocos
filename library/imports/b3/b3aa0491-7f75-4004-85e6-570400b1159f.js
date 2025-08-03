"use strict";
cc._RF.push(module, 'b3aa0SRf3VABIXmVwQAsRWf', 'RankPart2');
// script/logic/ui/prefab/RankPart2.ts

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
exports.RankPart2 = void 0;
var EventMng_1 = require("../../../framework/manager/EventMng");
var EventConst_1 = require("../../../userData/EventConst");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var RankPart2 = /** @class */ (function (_super) {
    __extends(RankPart2, _super);
    function RankPart2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labCoinName = null;
        return _this;
    }
    RankPart2.prototype.show = function (holder) {
        EventMng_1.default.emit(EventConst_1.GameEvent.RANK_PAGE_1, holder.data.data.thisWeekRank);
        EventMng_1.default.emit(EventConst_1.GameEvent.RANK_PAGE_2, holder.data.data.lastWeekRank);
    };
    RankPart2.prototype.hide = function () {
    };
    RankPart2.prototype.start = function () {
        // const coinName = {
        // 	zh: '金幣',
        // 	en: 'Coin'
        // }
        // const language = {
        //     en: 'Bonus' + GameDataCenter.roomInfoModel.coinName,
        //     zh: '獎勵' + GameDataCenter.roomInfoModel.coinName
        // }
        // UIHelp.SetLabel(this.labCoinName,  language[i18nMgr.getlanguage()]);
    };
    __decorate([
        property(cc.Node)
    ], RankPart2.prototype, "labCoinName", void 0);
    RankPart2 = __decorate([
        ccclass,
        menu("UI/prefab/RankPart2")
    ], RankPart2);
    return RankPart2;
}(cc.Component));
exports.RankPart2 = RankPart2;

cc._RF.pop();