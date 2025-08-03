"use strict";
cc._RF.push(module, '6aac4MVzmBG76b+fgkL3gIP', 'UIJiluItem3');
// script/logic/ui/prefab/UIJiluItem3.ts

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
var auto_jiluItem3_1 = require("../../../data/autoui/prefab/auto_jiluItem3");
var UIBase_1 = require("../../../framework/ui/UIBase");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var GameDataCenter_1 = require("../../../userData/GameDataCenter");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var UIJiluItem3 = /** @class */ (function (_super) {
    __extends(UIJiluItem3, _super);
    function UIJiluItem3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.iconsSpr = [];
        return _this;
    }
    UIJiluItem3_1 = UIJiluItem3;
    UIJiluItem3.prototype.onUILoad = function () {
        var _this = this;
        this.ui = this.node.addComponent(auto_jiluItem3_1.default);
        UIJiluItem3_1.instance = this;
        window.GetGameInfo()
            .then(function (res) {
            console.log(res, '获取游戏信息成功');
            if (res.code == 0) {
                window.currencyIcon = res.data.icon;
                window.currencyName = res.data.coin;
                cc.assetManager.loadRemote(window.currencyIcon, function (err, texture) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(texture, 'texture');
                    var spriteFrame = new cc.SpriteFrame(texture);
                    spriteFrame.addRef();
                    _this.iconsSpr.forEach(function (item) {
                        item.spriteFrame = spriteFrame;
                    });
                });
            }
        })
            .catch(function (err) {
            console.log(err, '获取游戏信息失败');
        });
    };
    UIJiluItem3.prototype.onShow = function () {
    };
    UIJiluItem3.prototype.onHide = function () {
    };
    UIJiluItem3.prototype.onStart = function () {
    };
    UIJiluItem3.prototype.show = function (holder) {
        var roomType = GameDataCenter_1.default.roomInfoModel.roomType;
        // this.ui.coin_1_1.active = roomType == 1;
        // this.ui.coin_1_2.active = roomType == 2;
        // this.ui.coin_1_3.active = roomType == 3;
        // this.ui.coin_2_1.active = roomType == 1;
        // this.ui.coin_2_2.active = roomType == 2;
        // this.ui.coin_2_3.active = roomType == 3;
        UIHelp_1.default.SetLabel(this.ui.lab_touru_num, holder.data.betting_total);
        UIHelp_1.default.SetLabel(this.ui.lab_huode_num, holder.data.result_total);
    };
    UIJiluItem3.prototype.hide = function () {
    };
    UIJiluItem3.prototype.onClose = function () {
        UIHelp_1.default.CloseUI(UIJiluItem3_1);
    };
    var UIJiluItem3_1;
    UIJiluItem3.prefabUrl = "jiluItem3";
    UIJiluItem3.className = "UIJiluItem3";
    UIJiluItem3.instance = null;
    __decorate([
        property({ type: [cc.Sprite] })
    ], UIJiluItem3.prototype, "iconsSpr", void 0);
    UIJiluItem3 = UIJiluItem3_1 = __decorate([
        ccclass,
        menu("UI/prefab/UIJiluItem3")
    ], UIJiluItem3);
    return UIJiluItem3;
}(UIBase_1.default));
exports.default = UIJiluItem3;

cc._RF.pop();