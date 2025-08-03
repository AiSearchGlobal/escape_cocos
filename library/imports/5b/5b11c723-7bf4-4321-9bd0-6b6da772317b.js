"use strict";
cc._RF.push(module, '5b11ccje/RDIZvQa22ncjF7', 'RankPart3');
// script/logic/ui/prefab/RankPart3.ts

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
exports.RankPart3 = void 0;
var EventMng_1 = require("../../../framework/manager/EventMng");
var EventConst_1 = require("../../../userData/EventConst");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var RankPart3 = /** @class */ (function (_super) {
    __extends(RankPart3, _super);
    function RankPart3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tab1 = null;
        _this.tab2 = null;
        _this.labJianshaoList = [];
        _this.labNameList = [];
        return _this;
    }
    RankPart3.prototype.onEnable = function () {
        EventMng_1.default.on(EventConst_1.GameEvent.RANK_TAB_CHANGE, this.tabChange, this);
    };
    RankPart3.prototype.onDisable = function () {
        EventMng_1.default.off(EventConst_1.GameEvent.RANK_TAB_CHANGE, this.tabChange, this);
    };
    RankPart3.prototype.start = function () {
        this.tab1.active = true;
        this.tab2.active = false;
    };
    RankPart3.prototype.tabChange = function (index) {
        this.tab1.active = index == 0;
        this.tab2.active = index == 1;
    };
    RankPart3.prototype.show = function (holder) {
    };
    RankPart3.prototype.hide = function () {
    };
    __decorate([
        property(cc.Node)
    ], RankPart3.prototype, "tab1", void 0);
    __decorate([
        property(cc.Node)
    ], RankPart3.prototype, "tab2", void 0);
    __decorate([
        property([cc.Label])
    ], RankPart3.prototype, "labJianshaoList", void 0);
    __decorate([
        property([cc.Label])
    ], RankPart3.prototype, "labNameList", void 0);
    RankPart3 = __decorate([
        ccclass,
        menu("UI/prefab/RankPart3")
    ], RankPart3);
    return RankPart3;
}(cc.Component));
exports.RankPart3 = RankPart3;

cc._RF.pop();