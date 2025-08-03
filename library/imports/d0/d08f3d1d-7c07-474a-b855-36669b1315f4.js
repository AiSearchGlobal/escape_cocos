"use strict";
cc._RF.push(module, 'd08f30dfAdHSrhVNmabExX0', 'SocketModel');
// script/userData/SocketModel.ts

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
var EventMng_1 = require("../framework/manager/EventMng");
var IDataModel_1 = require("../framework/model/IDataModel");
var UIGameLayer_1 = require("../logic/ui/prefab/UIGameLayer");
var UIKiller_1 = require("../logic/ui/prefab/UIKiller");
var UIGame_1 = require("../logic/ui/scene/UIGame");
var Log_1 = require("../utils/Log");
var EventConst_1 = require("./EventConst");
var GameDataCenter_1 = require("./GameDataCenter");
var PlayerModel_1 = require("./PlayerModel");
var SocketModel = /** @class */ (function (_super) {
    __extends(SocketModel, _super);
    function SocketModel() {
        return _super.call(this, 'SocketModel') || this;
    }
    /**需要重写 */
    SocketModel.prototype.getMessageListeners = function () {
        var _a;
        var _this = this;
        return _a = {},
            // key为消息名，value为触发函数
            _a['game_login'] = function (msg) { _this.socket_login(msg); },
            _a['game_move'] = function (msg) { _this.socket_move(msg); },
            _a['game_roominfo'] = function (msg) { _this.socket_roominfo(msg); },
            _a['game_stage'] = function (msg) { _this.socket_stage(msg); },
            _a['game_betting'] = function (msg) { _this.socket_betting(msg); },
            _a['game_leave'] = function (msg) { _this.socket_leave(msg); },
            _a['game_join'] = function (msg) { _this.socket_join(msg); },
            _a['game_userlist'] = function (msg) { _this.socket_userlist(msg); },
            _a['game_bettinglist'] = function (msg) { _this.socket_bettinglist(msg); },
            _a['game_sync_status'] = function (msg) { _this.socket_sync_status(msg); },
            _a['game_close'] = function (msg) { _this.socket_close(msg); },
            _a;
    };
    //登录
    SocketModel.prototype.login = function () {
        this.sendSocketMsg("game", "login", { jwt: GameDataCenter_1.default.accountModel.jwt });
    };
    /** 加入房间 */
    SocketModel.prototype.joinRoom = function (room_type) {
        this.sendSocketMsg("game", "joinroom", { room_type: room_type });
    };
    /**
     * 移动到某一房间
     * @param roomId
     */
    SocketModel.prototype.move = function (roomId) {
        this.sendSocketMsg("game", "move", { roomid: roomId });
    };
    /**
     * 下注
     * @param roomId 房间id
     * @param id 下注id
     */
    SocketModel.prototype.betting = function (roomId, id) {
        this.sendSocketMsg("game", "betting", { roomid: roomId, id: id });
    };
    SocketModel.prototype.socket_login = function (msg) {
        Log_1.Log.warn("长链接登录成功");
        var accountModel = GameDataCenter_1.default.accountModel;
        var data = msg.data.user;
        accountModel.avatar = data.avatar;
        accountModel.nickName = data.nickname;
        accountModel.uid = data.id;
        accountModel.status = data.status;
        this.joinRoom(1);
    };
    //进入游戏会执行一次
    SocketModel.prototype.socket_roominfo = function (msg) {
        GameDataCenter_1.default.accountModel.players.forEach(function (player) {
            player.destroy();
        });
        var data = msg.data;
        GameDataCenter_1.default.roomInfoModel.roomId = data.betting_roomid;
        GameDataCenter_1.default.roomInfoModel.initData(data.roominfo);
        GameDataCenter_1.default.roomInfoModel.initRoomsCoin(data.rooms, false);
        GameDataCenter_1.default.roomInfoModel.initBettingConf(data.betting_config);
        GameDataCenter_1.default.roomInfoModel.setCoin(msg.data.user);
        EventMng_1.default.emit(EventConst_1.GameEvent.SET_DOORS, data.roominfo.game_stage);
        UIGameLayer_1.default.instance.showLastKillerAni();
    };
    SocketModel.prototype.socket_move = function (msg) {
        var data = msg.data;
        GameDataCenter_1.default.roomInfoModel.initRoomsCoin(data.rooms, true);
        if (data.betting.uid != GameDataCenter_1.default.accountModel.uid) {
            GameDataCenter_1.default.accountModel.players.get(data.betting.uid).moveToRoomById(data.betting.roomid);
        }
    };
    SocketModel.prototype.socket_stage = function (msg) {
        var data = msg.data;
        var game_stage = data.game_stage;
        GameDataCenter_1.default.roomInfoModel.changeRoomStage(data);
        UIGameLayer_1.default.instance.showLastKillerAni();
        switch (game_stage) {
            case 1:
                EventMng_1.default.emit(EventConst_1.GameEvent.OPEN_GAME);
                GameDataCenter_1.default.roomInfoModel.roomId = data.betting_roomid;
                GameDataCenter_1.default.roomInfoModel.initData(data.roominfo);
                GameDataCenter_1.default.roomInfoModel.initRoomsCoin(data.rooms, false);
                GameDataCenter_1.default.roomInfoModel.initBettingConf(data.betting_config);
                break;
            case 3:
                UIGame_1.default.instance.showStage3Ani();
                UIGameLayer_1.default.instance.showStage3Ani();
                break;
            case 4:
                UIKiller_1.default.instance.kill(data.shaid);
                break;
            case 5:
                GameDataCenter_1.default.roomInfoModel.setKillResult(data);
                GameDataCenter_1.default.roomInfoModel.setCoin(data.user);
                UIGame_1.default.instance.showStage5Ani();
                break;
            default:
                break;
        }
    };
    SocketModel.prototype.socket_betting = function (msg) {
        var data = msg.data;
        var betting = data.betting;
        var player = GameDataCenter_1.default.accountModel.players.get(betting.uid);
        if (betting.uid != GameDataCenter_1.default.accountModel.uid) {
            player.moveToRoomById(betting.roomid);
        }
        else {
            player.showBetting(betting.coin);
        }
        GameDataCenter_1.default.roomInfoModel.minPlayerNum = data.betting_num;
        GameDataCenter_1.default.roomInfoModel.maxPlayerNum = data.total_num;
        GameDataCenter_1.default.roomInfoModel.initRoomsCoin(data.rooms, true);
        GameDataCenter_1.default.roomInfoModel.setCoin(msg.data.user);
    };
    SocketModel.prototype.socket_leave = function (msg) {
        var data = msg.data;
        var player = GameDataCenter_1.default.accountModel.players.get(data.uid);
        player === null || player === void 0 ? void 0 : player.destroy();
    };
    SocketModel.prototype.socket_join = function (msg) {
        var data = msg.data;
        if (data.is_betting) {
            return;
        }
        this.createPlayer(data.user, 0);
    };
    //没选择房间的玩家
    SocketModel.prototype.socket_userlist = function (msg) {
        var data = msg.data;
        var userlist = data.userlist;
        for (var _i = 0, userlist_1 = userlist; _i < userlist_1.length; _i++) {
            var index = userlist_1[_i];
            this.createPlayer(index, 0);
        }
    };
    //选择房间的玩家
    SocketModel.prototype.socket_bettinglist = function (msg) {
        var data = msg.data;
        var bettinglist = data.bettinglist;
        for (var i in bettinglist) {
            var index = bettinglist[i];
            this.createPlayer(index, index.roomid);
            if (index.uid == GameDataCenter_1.default.accountModel.uid) {
                GameDataCenter_1.default.roomInfoModel.roomId = index.roomid;
                var player = GameDataCenter_1.default.accountModel.players.get(index.uid);
                player.showBetting(index.coin); //
            }
        }
    };
    SocketModel.prototype.socket_sync_status = function (msg) {
        var data = msg.data;
        GameDataCenter_1.default.roomChoseModel.initData(data.room_status);
    };
    SocketModel.prototype.socket_close = function (msg) {
        EventMng_1.default.emit(EventConst_1.GameEvent.CLOSE_GAME);
    };
    SocketModel.prototype.createPlayer = function (user, roomId) {
        if (GameDataCenter_1.default.accountModel.players.get(user.uid)) {
            return;
        }
        var player = new PlayerModel_1.default();
        player.initData(user);
        if (GameDataCenter_1.default.accountModel.players.size <= 60) {
            player.loadPlayerAni(roomId);
        }
        GameDataCenter_1.default.accountModel.players.set(user.uid, player);
    };
    return SocketModel;
}(IDataModel_1.default));
exports.default = SocketModel;

cc._RF.pop();