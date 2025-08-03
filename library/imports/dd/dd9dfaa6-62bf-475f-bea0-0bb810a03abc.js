"use strict";
cc._RF.push(module, 'dd9dfqmYr9HX76gC7gQoDq8', 'UIPlayerName');
// script/logic/ui/prefab/UIPlayerName.ts

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
var auto_playerName_1 = require("../../../data/autoui/prefab/auto_playerName");
var i18nMgr_1 = require("../../../framework/i18n/i18nMgr");
var UIBase_1 = require("../../../framework/ui/UIBase");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var UIPlayerName = /** @class */ (function (_super) {
    __extends(UIPlayerName, _super);
    function UIPlayerName() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.speed = 200;
        _this.speed1 = 200;
        _this.speed2 = 300;
        return _this;
    }
    UIPlayerName_1 = UIPlayerName;
    UIPlayerName.prototype.onUILoad = function () {
        this.ui = this.node.addComponent(auto_playerName_1.default);
        UIPlayerName_1.instance = this;
    };
    UIPlayerName.prototype.onShow = function () {
    };
    UIPlayerName.prototype.onHide = function () {
    };
    UIPlayerName.prototype.onStart = function () {
    };
    UIPlayerName.prototype.setName = function (nickname) {
        var language = {
            zh: '自己',
            en: 'Myself'
        };
        this.ui.label_name_bg.active = nickname == language[i18nMgr_1.i18nMgr.getlanguage()] ? true : false;
        //this.ui.lan_name.active = nickname == "自己" ? false : true;
        this.ui.lan_name.active = false;
        UIHelp_1.default.SetLabel(this.ui.lan_name, nickname);
    };
    UIPlayerName.prototype.flashToRoomById = function (pos) {
        this.node.stopAllActions();
        this.node.setPosition(pos);
    };
    UIPlayerName.prototype.move = function (list, isBack) {
        var _this = this;
        if (list.length <= 0) {
            return;
        }
        this.speed = isBack ? this.speed2 : this.speed1;
        var dis = this.getDistance(this.node.position, list[0]);
        var t = dis / this.speed;
        cc.tween(this.node)
            .to(t, { position: list[0] })
            .call(function () {
            list.splice(0, 1);
            _this.move(list, isBack);
        })
            .start();
    };
    // 距离
    UIPlayerName.prototype.getDistance = function (start, end) {
        var pos = cc.v2(start.x - end.x, start.y - end.y);
        var dis = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
        return dis;
    };
    UIPlayerName.prototype.onClose = function () {
        UIHelp_1.default.CloseUI(UIPlayerName_1);
    };
    var UIPlayerName_1;
    UIPlayerName.prefabUrl = "playerName";
    UIPlayerName.className = "UIPlayerName";
    UIPlayerName.instance = null;
    UIPlayerName = UIPlayerName_1 = __decorate([
        ccclass,
        menu("UI/prefab/UIPlayerName")
    ], UIPlayerName);
    return UIPlayerName;
}(UIBase_1.default));
exports.default = UIPlayerName;

cc._RF.pop();