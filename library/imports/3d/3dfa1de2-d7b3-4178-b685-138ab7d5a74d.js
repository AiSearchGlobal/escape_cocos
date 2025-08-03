"use strict";
cc._RF.push(module, '3dfa13i17NBeLaFE4q31adN', 'RankPart1');
// script/logic/ui/prefab/RankPart1.ts

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
exports.RankPart1 = void 0;
var i18nMgr_1 = require("../../../framework/i18n/i18nMgr");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var RankPart1 = /** @class */ (function (_super) {
    __extends(RankPart1, _super);
    function RankPart1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labMian1 = null;
        _this.labMian2 = null;
        _this.labMian3 = null;
        _this.labDes = null;
        return _this;
    }
    RankPart1.prototype.show = function (holder) {
        var language = {
            mianshang: {
                en: 'Loss Reduction ',
                zh: '減損'
            },
            desc: {
                en: 'Reward outfits with Up to Loss Reduction',
                zh: '獎勵減損裝扮，最高減損'
            }
        };
        var mian = holder.data.data;
        this.labMian1.string = language.mianshang[i18nMgr_1.i18nMgr.getlanguage()] + ("" + mian.mian_top1);
        this.labMian2.string = language.mianshang[i18nMgr_1.i18nMgr.getlanguage()] + ("" + mian.mian_top2);
        this.labMian3.string = language.mianshang[i18nMgr_1.i18nMgr.getlanguage()] + ("" + mian.mian_top3);
        this.labDes.string = language.desc[i18nMgr_1.i18nMgr.getlanguage()] + ("" + mian.mian_top1);
    };
    RankPart1.prototype.hide = function () {
    };
    __decorate([
        property(cc.Label)
    ], RankPart1.prototype, "labMian1", void 0);
    __decorate([
        property(cc.Label)
    ], RankPart1.prototype, "labMian2", void 0);
    __decorate([
        property(cc.Label)
    ], RankPart1.prototype, "labMian3", void 0);
    __decorate([
        property(cc.Label)
    ], RankPart1.prototype, "labDes", void 0);
    RankPart1 = __decorate([
        ccclass,
        menu("UI/prefab/RankPart1")
    ], RankPart1);
    return RankPart1;
}(cc.Component));
exports.RankPart1 = RankPart1;

cc._RF.pop();