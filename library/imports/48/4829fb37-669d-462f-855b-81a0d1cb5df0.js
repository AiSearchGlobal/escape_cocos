"use strict";
cc._RF.push(module, '4829fs3Zp1GL4VbgaDRy13w', 'RankPage1');
// script/logic/ui/prefab/RankPage1.ts

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
exports.RankPage1 = void 0;
var EventMng_1 = require("../../../framework/manager/EventMng");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var EventConst_1 = require("../../../userData/EventConst");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var RankPage1 = /** @class */ (function (_super) {
    __extends(RankPage1, _super);
    function RankPage1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankPage1.prototype.onEnable = function () {
        EventMng_1.default.on(EventConst_1.GameEvent.RANK_PAGE_1, this.initUI, this);
    };
    RankPage1.prototype.onDisable = function () {
        EventMng_1.default.off(EventConst_1.GameEvent.RANK_PAGE_1, this.initUI, this);
    };
    RankPage1.prototype.initUI = function (rankList) {
        for (var i = 0; i < 10; i++) {
            var index = rankList[i];
            var nodeXian = this.node.getChildByName("node_xian").getChildByName("fengexian" + (i + 1));
            var nodeQuanyi = this.node.getChildByName("node_quanxi").getChildByName("label_pfqy" + (i + 1));
            var nodeIcon = this.node.getChildByName("node_icon").getChildByName("VM_coin" + (i + 1));
            var nodeAvatar = this.node.getChildByName("node_avatar").getChildByName("spr_avatar" + (i + 1));
            var nodeCoin = this.node.getChildByName("node_coin").getChildByName("lab_coin" + (i + 1));
            var nodeRank = this.node.getChildByName("node_rank").getChildByName("lab_rank" + (i + 1));
            var nodeName = this.node.getChildByName("node_name").getChildByName("lab_name" + (i + 1));
            nodeXian.active = Boolean(index);
            nodeQuanyi.active = false;
            nodeIcon.active = Boolean(index);
            nodeAvatar.active = Boolean(index);
            nodeCoin.active = Boolean(index);
            nodeRank.active = Boolean(index);
            nodeName.active = Boolean(index);
            if (index) {
                UIHelp_1.default.SetLabel(nodeCoin, index.score);
                UIHelp_1.default.SetLabel(nodeName, index.nickname);
                UIHelp_1.default.SetSpriteFrame(nodeAvatar, index.avatar);
            }
        }
    };
    RankPage1 = __decorate([
        ccclass,
        menu("UI/prefab/RankPage1")
    ], RankPage1);
    return RankPage1;
}(cc.Component));
exports.RankPage1 = RankPage1;

cc._RF.pop();