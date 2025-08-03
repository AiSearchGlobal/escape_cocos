"use strict";
cc._RF.push(module, '5fbd58N2+pEyr+W921djk+I', 'UIJiluItem4');
// script/logic/ui/prefab/UIJiluItem4.ts

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
var auto_jiluItem4_1 = require("../../../data/autoui/prefab/auto_jiluItem4");
var i18nLabel_1 = require("../../../framework/i18n/i18nLabel");
var i18nMgr_1 = require("../../../framework/i18n/i18nMgr");
var UIBase_1 = require("../../../framework/ui/UIBase");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var RoomInfoModel_1 = require("../../../userData/RoomInfoModel");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var UIJiluItem4 = /** @class */ (function (_super) {
    __extends(UIJiluItem4, _super);
    function UIJiluItem4() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = null;
        return _this;
    }
    UIJiluItem4_1 = UIJiluItem4;
    UIJiluItem4.prototype.onUILoad = function () {
        this.ui = this.node.addComponent(auto_jiluItem4_1.default);
        UIJiluItem4_1.instance = this;
    };
    UIJiluItem4.prototype.onShow = function () {
    };
    UIJiluItem4.prototype.onHide = function () {
    };
    UIJiluItem4.prototype.onStart = function () {
    };
    UIJiluItem4.prototype.show = function (holder) {
        var language = {
            Round: {
                en: 'Round',
                zh: '期數'
            },
            Stake: {
                en: 'Stake',
                zh: '投入'
            },
            Obtain: {
                en: 'Obtain',
                zh: '獲得'
            },
            Loss: {
                en: 'Loss',
                zh: '損失'
            }
        };
        var user = holder.data.user;
        var isWin = user.result_type == "win";
        UIHelp_1.default.SetLabel(this.ui.lab_qi, language.Round[i18nMgr_1.i18nMgr.getlanguage()] + (user.game_no + "  " + user.created_at));
        UIHelp_1.default.SetLabel(this.ui.lab_choose_room, "\u300C" + RoomInfoModel_1.ROAD_NAME[user.roomid][i18nMgr_1.i18nMgr.getlanguage()] + "\u300D");
        UIHelp_1.default.SetLabel(this.ui.lba_kill_room, "\u300C" + RoomInfoModel_1.ROAD_NAME[user.shaid][i18nMgr_1.i18nMgr.getlanguage()] + "\u300D");
        UIHelp_1.default.SetLabel(this.ui.lab_touru_num, user.betting_coin);
        UIHelp_1.default.SetLabel(this.ui.lab_huode_num, user.result_coin);
        UIHelp_1.default.SetLabel(this.ui.lab_touru_name, language.Stake[i18nMgr_1.i18nMgr.getlanguage()] + ("" + i18nLabel_1.replaceMatchingCharacters(RoomInfoModel_1.ROOM_NAME[user.room_type][i18nMgr_1.i18nMgr.getlanguage()], 'GSP', window.currencyName)));
        UIHelp_1.default.SetLabel(this.ui.lab_huode_name, isWin ? language.Obtain[i18nMgr_1.i18nMgr.getlanguage()] + ("" + i18nLabel_1.replaceMatchingCharacters(RoomInfoModel_1.ROOM_NAME[user.room_type][i18nMgr_1.i18nMgr.getlanguage()], 'GSP', window.currencyName)) : language.Loss[i18nMgr_1.i18nMgr.getlanguage()] + ("" + i18nLabel_1.replaceMatchingCharacters(RoomInfoModel_1.ROOM_NAME[user.room_type][i18nMgr_1.i18nMgr.getlanguage()], 'GSP', window.currencyName)));
        this.ui.lab_win.active = isWin ? true : false;
        this.ui.lab_lose.active = isWin ? false : true;
    };
    UIJiluItem4.prototype.hide = function () {
    };
    UIJiluItem4.prototype.onClose = function () {
        UIHelp_1.default.CloseUI(UIJiluItem4_1);
    };
    var UIJiluItem4_1;
    UIJiluItem4.prefabUrl = "jiluItem4";
    UIJiluItem4.className = "UIJiluItem4";
    UIJiluItem4.instance = null;
    UIJiluItem4 = UIJiluItem4_1 = __decorate([
        ccclass,
        menu("UI/prefab/UIJiluItem4")
    ], UIJiluItem4);
    return UIJiluItem4;
}(UIBase_1.default));
exports.default = UIJiluItem4;

cc._RF.pop();