"use strict";
cc._RF.push(module, 'fb44fRZjRpDUJe0hBybFEN4', 'UIJiluItem2');
// script/logic/ui/prefab/UIJiluItem2.ts

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
var auto_jiluItem2_1 = require("../../../data/autoui/prefab/auto_jiluItem2");
var i18nMgr_1 = require("../../../framework/i18n/i18nMgr");
var i18nSprite_1 = require("../../../framework/i18n/i18nSprite");
var UIBase_1 = require("../../../framework/ui/UIBase");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var UIJiluItem2 = /** @class */ (function (_super) {
    __extends(UIJiluItem2, _super);
    function UIJiluItem2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.roomNameSprList = [];
        return _this;
    }
    UIJiluItem2_1 = UIJiluItem2;
    UIJiluItem2.prototype.onUILoad = function () {
        this.ui = this.node.addComponent(auto_jiluItem2_1.default);
        UIJiluItem2_1.instance = this;
    };
    UIJiluItem2.prototype.onShow = function () {
    };
    UIJiluItem2.prototype.onHide = function () {
    };
    UIJiluItem2.prototype.onStart = function () {
    };
    UIJiluItem2.prototype.show = function (holder) {
        var language = {
            en: 'Round',
            zh: '期數'
        }[i18nMgr_1.i18nMgr.getlanguage()];
        for (var i = 0; i < 10; i++) {
            var index = holder.data.list[i];
            var labQi = this.ui["lab_qi_" + (i + 1)];
            var spr = this.ui["room_name_" + (i + 1)];
            if (index) {
                labQi.active = true;
                spr.active = true;
                UIHelp_1.default.SetLabel(labQi, language + index.game_no);
                // spr.getComponent(cc.Sprite).spriteFrame = this.roomNameSprList[Number(index.shaid) - 1];
                spr.getComponent(i18nSprite_1.i18nSprite).i18n_string = 'room_name_' + Number(index.shaid);
            }
            else {
                labQi.active = false;
                spr.active = false;
            }
        }
    };
    UIJiluItem2.prototype.hide = function () {
    };
    UIJiluItem2.prototype.onClose = function () {
        UIHelp_1.default.CloseUI(UIJiluItem2_1);
    };
    var UIJiluItem2_1;
    UIJiluItem2.prefabUrl = "jiluItem2";
    UIJiluItem2.className = "UIJiluItem2";
    UIJiluItem2.instance = null;
    __decorate([
        property({ type: [cc.SpriteFrame] })
    ], UIJiluItem2.prototype, "roomNameSprList", void 0);
    UIJiluItem2 = UIJiluItem2_1 = __decorate([
        ccclass,
        menu("UI/prefab/UIJiluItem2")
    ], UIJiluItem2);
    return UIJiluItem2;
}(UIBase_1.default));
exports.default = UIJiluItem2;

cc._RF.pop();