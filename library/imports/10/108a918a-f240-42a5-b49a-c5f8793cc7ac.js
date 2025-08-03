"use strict";
cc._RF.push(module, '108a9GK8kBCpbSaxfh5PMes', 'PlayerModel');
// script/userData/PlayerModel.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KILLER_ROADS = exports.ROADS = void 0;
var i18nMgr_1 = require("../framework/i18n/i18nMgr");
var PoolMng_1 = require("../framework/manager/PoolMng");
var IDataModel_1 = require("../framework/model/IDataModel");
var UIHelp_1 = require("../framework/ui/UIHelp");
var UIGameLayer_1 = require("../logic/ui/prefab/UIGameLayer");
var UIPlayer_1 = require("../logic/ui/prefab/UIPlayer");
var UIPlayerName_1 = require("../logic/ui/prefab/UIPlayerName");
var GameDataCenter_1 = require("./GameDataCenter");
exports.ROADS = {
    1: [1, 3, 4, 1111],
    2: [1, 3, 9, 2222],
    3: [1, 3, 3333],
    4: [1, 3, 4, 4444],
    5: [1, 2, 5, 5555],
    6: [1, 2, 6666],
    7: [1, 2, 6, 7777],
    8: [1, 2, 7, 8888],
};
exports.KILLER_ROADS = {
    1: [12, 11, 3, 4],
    2: [12, 11, 3, 9],
    3: [12, 11, 2, 3],
    4: [12, 11, 3, 4],
    5: [12, 11, 2, 5],
    6: [12, 11, 10, 2],
    7: [12, 11, 2, 6],
    8: [12, 11, 2, 7],
};
var PlayerModel = /** @class */ (function (_super) {
    __extends(PlayerModel, _super);
    function PlayerModel() {
        var _this = _super.call(this, 'player') || this;
        _this.avatar = "";
        _this.coin = 0;
        _this.nickname = "";
        _this.uid = 0;
        _this.node = null;
        _this.nodeName = null;
        _this.roomId = 0;
        _this.rankNo = 0;
        _this.isMySelf = false;
        return _this;
    }
    PlayerModel.prototype.destroy = function () {
        if (this.node) {
            this.node.stopAllActions();
            PoolMng_1.PoolMng.instance.putNode(this.node);
            this.nodeName.stopAllActions();
            PoolMng_1.PoolMng.instance.putNode(this.nodeName);
        }
        GameDataCenter_1.default.accountModel.players.delete(this.uid);
    };
    PlayerModel.prototype.initData = function (res) {
        var language = {
            zh: '自己',
            en: 'Myself'
        };
        this.avatar = res.avatar;
        this.coin = res.coin;
        this.isMySelf = res.uid == GameDataCenter_1.default.accountModel.uid ? true : false;
        this.nickname = this.isMySelf ? language[i18nMgr_1.i18nMgr.getlanguage()] : res.nickname;
        this.uid = res.uid;
        if (this.isMySelf) {
            if (res.rank_no == 0) {
                this.rankNo = -1;
            }
            else {
                this.rankNo = res.rank_no;
            }
        }
        else {
            this.rankNo = res.rank_no;
        }
    };
    PlayerModel.prototype.showBetting = function (bettingCoin) {
        var _a;
        if (!this.node) {
            return;
        }
        (_a = this.node.getComponent(UIPlayer_1.default)) === null || _a === void 0 ? void 0 : _a.showBetting(bettingCoin);
    };
    /** 加载并显示人物 */
    PlayerModel.prototype.loadPlayerAni = function (roomId) {
        var _a, _b;
        this.roomId = roomId;
        var nodePlayer = this.node = PoolMng_1.PoolMng.instance.getNode(UIGameLayer_1.default.instance.playerPrefab, this.isMySelf ? UIGameLayer_1.default.instance.ui.node_player_my : UIGameLayer_1.default.instance.ui.node_player);
        var nodePlayerName = this.nodeName = PoolMng_1.PoolMng.instance.getNode(UIGameLayer_1.default.instance.playerNamePrefab, this.isMySelf ? UIGameLayer_1.default.instance.ui.node_player_name_my : UIGameLayer_1.default.instance.ui.node_player_name);
        var pos = this.isMySelf ? UIHelp_1.default.getRadomPos(UIGameLayer_1.default.instance.ui["room" + roomId * 100]) : UIHelp_1.default.getRadomPos(UIGameLayer_1.default.instance.ui["room" + roomId]);
        nodePlayer.setPosition(pos);
        (_a = nodePlayer.getComponent(UIPlayer_1.default)) === null || _a === void 0 ? void 0 : _a.initAni(this.rankNo);
        nodePlayerName.setPosition(pos);
        (_b = nodePlayerName.getComponent(UIPlayerName_1.default)) === null || _b === void 0 ? void 0 : _b.setName(this.nickname);
    };
    /** 移动到某一房间 */
    PlayerModel.prototype.moveToRoomById = function (roomId) {
        var _a, _b, _c, _d, _e, _f;
        if (!this.node) {
            return;
        }
        if (this.roomId == 0) {
            this.roomId = roomId;
            var list = [];
            for (var _i = 0, _g = exports.ROADS[roomId]; _i < _g.length; _i++) {
                var index = _g[_i];
                var node = UIGameLayer_1.default.instance.ui["pos" + index];
                list.push(node.position);
            }
            if (this.isMySelf) {
                list.push(UIHelp_1.default.getRadomPos(UIGameLayer_1.default.instance.ui["room" + roomId * 100]));
            }
            else {
                list.push(UIHelp_1.default.getRadomPos(UIGameLayer_1.default.instance.ui["room" + roomId]));
            }
            (_a = this.node.getComponent(UIPlayer_1.default)) === null || _a === void 0 ? void 0 : _a.playWalk();
            (_b = this.node.getComponent(UIPlayer_1.default)) === null || _b === void 0 ? void 0 : _b.move([].concat(list), false);
            (_c = this.nodeName.getComponent(UIPlayerName_1.default)) === null || _c === void 0 ? void 0 : _c.move([].concat(list), false);
        }
        else {
            this.roomId = roomId;
            (_d = this.node.getComponent(UIPlayer_1.default)) === null || _d === void 0 ? void 0 : _d.playWait();
            var pos = UIHelp_1.default.getRadomPos(UIGameLayer_1.default.instance.ui["room" + roomId * 100]);
            (_e = this.node.getComponent(UIPlayer_1.default)) === null || _e === void 0 ? void 0 : _e.flashToRoomById(pos);
            (_f = this.nodeName.getComponent(UIPlayerName_1.default)) === null || _f === void 0 ? void 0 : _f.flashToRoomById(pos);
        }
    };
    /** 从某一房间回到初始位置 */
    PlayerModel.prototype.moveBack = function () {
        var _a, _b, _c;
        if (!this.node) {
            return;
        }
        if (this.roomId == 0) {
            return;
        }
        var list = [];
        for (var _i = 0, _d = exports.ROADS[this.roomId]; _i < _d.length; _i++) {
            var index = _d[_i];
            var node = UIGameLayer_1.default.instance.ui["pos" + index];
            list.push(node.position);
        }
        list.reverse();
        list.push(UIHelp_1.default.getRadomPos(UIGameLayer_1.default.instance.ui["room0"]));
        (_a = this.node.getComponent(UIPlayer_1.default)) === null || _a === void 0 ? void 0 : _a.playWalk();
        (_b = this.node.getComponent(UIPlayer_1.default)) === null || _b === void 0 ? void 0 : _b.move([].concat(list), true);
        (_c = this.nodeName.getComponent(UIPlayerName_1.default)) === null || _c === void 0 ? void 0 : _c.move([].concat(list), true);
        this.roomId = 0;
        UIGameLayer_1.default.instance.resetRoomId();
    };
    //同步
    PlayerModel.prototype.demoXXX1 = function () {
        var _this = this;
        var params = {};
        return new Promise(function (resolve, reject) {
            _this.sendHttpMsg("index", params, function (res) {
                var data = res.data;
                resolve(data);
            }.bind(_this));
        });
    };
    return PlayerModel;
}(IDataModel_1.default));
exports.default = PlayerModel;

cc._RF.pop();