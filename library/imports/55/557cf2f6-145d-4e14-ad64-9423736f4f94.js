"use strict";
cc._RF.push(module, '557cfL2FF1OFK1klCNzb0+U', 'UIRankLayer');
// script/logic/ui/prefab/UIRankLayer.ts

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
var auto_rankLayer_1 = require("../../../data/autoui/prefab/auto_rankLayer");
var UIBase_1 = require("../../../framework/ui/UIBase");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var GameDataCenter_1 = require("../../../userData/GameDataCenter");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var UIRankLayer = /** @class */ (function (_super) {
    __extends(UIRankLayer, _super);
    function UIRankLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.iconsSpr = [];
        return _this;
    }
    UIRankLayer_1 = UIRankLayer;
    UIRankLayer.prototype.onUILoad = function () {
        var _this = this;
        this.ui = this.node.addComponent(auto_rankLayer_1.default);
        UIRankLayer_1.instance = this;
        UIHelp_1.default.SetSpriteFrame(this.ui.touxiangshiyi, GameDataCenter_1.default.accountModel.avatar);
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
    UIRankLayer.prototype.onShow = function () {
        this.onRegisterEvent(this.ui.btn_back, this.onClose);
    };
    UIRankLayer.prototype.onHide = function () {
    };
    UIRankLayer.prototype.onStart = function () {
    };
    UIRankLayer.prototype.onClose = function () {
        UIHelp_1.default.CloseUI(UIRankLayer_1);
    };
    var UIRankLayer_1;
    UIRankLayer.prefabUrl = "rankLayer";
    UIRankLayer.className = "UIRankLayer";
    UIRankLayer.instance = null;
    __decorate([
        property({ type: [cc.Sprite] })
    ], UIRankLayer.prototype, "iconsSpr", void 0);
    UIRankLayer = UIRankLayer_1 = __decorate([
        ccclass,
        menu("UI/prefab/UIRankLayer")
    ], UIRankLayer);
    return UIRankLayer;
}(UIBase_1.default));
exports.default = UIRankLayer;

cc._RF.pop();