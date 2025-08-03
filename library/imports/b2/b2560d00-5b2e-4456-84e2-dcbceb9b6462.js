"use strict";
cc._RF.push(module, 'b25600AWy5EVoTi3Lzrm2Ri', 'RoomInfoModel');
// script/userData/RoomInfoModel.ts

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
exports.ROOM_NAME = exports.ROAD_NAME = void 0;
var i18nLabel_1 = require("../framework/i18n/i18nLabel");
var i18nMgr_1 = require("../framework/i18n/i18nMgr");
var EventMng_1 = require("../framework/manager/EventMng");
var IDataModel_1 = require("../framework/model/IDataModel");
var EventConst_1 = require("./EventConst");
var GameDataCenter_1 = require("./GameDataCenter");
exports.ROAD_NAME = {
    1: { zh: "雜物間", en: 'Utility room' },
    2: { zh: "休息室", en: 'Rest room' },
    3: { zh: "廠長室", en: 'Director room' },
    4: { zh: "談話室", en: 'Conversation room' },
    5: { zh: "洗衣室", en: 'Laundry room' },
    6: { zh: "工作室", en: 'studio room' },
    7: { zh: "茶水間", en: 'Tea room' },
    8: { zh: "音樂室", en: 'Music room' },
};
exports.ROOM_NAME = {
    1: { zh: "GSP", en: 'GSP' },
    2: { zh: "GSP", en: 'GSP' },
    3: { zh: "GSP", en: 'GSP' },
};
var RoomInfoModel = /** @class */ (function (_super) {
    __extends(RoomInfoModel, _super);
    function RoomInfoModel() {
        var _this = _super.call(this, 'roomInfo') || this;
        _this.gameStage = 1; //游戏状态
        _this.roomType = 1; //房间类型
        _this.waitTime = 0; //状态等待时间
        _this.coin = 0; //拥有的coin
        _this.coin1 = 0; //房间1所有玩家下注的coin
        _this.coin2 = 0;
        _this.coin3 = 0;
        _this.coin4 = 0;
        _this.coin5 = 0;
        _this.coin6 = 0;
        _this.coin7 = 0;
        _this.coin8 = 0;
        _this.coinName = "金币";
        _this.bettingConfig1 = 0;
        _this.bettingConfig2 = 0;
        _this.bettingConfig3 = 0;
        _this.bettingNum = 0;
        _this.bettingId = 1; //下注id：1-3
        _this.roomId = 0; //房间id：1-8
        _this.minPlayerNum = 0; //等待状态当前人数
        _this.maxPlayerNum = 0; //等待状态所需最大人数
        // public killRoomName: string = "工具房";  //被杀房间名字
        _this.killRoomId = undefined;
        _this.coinGuafenNum = 0; //所有人瓜分的coin数量
        _this.resultType = 0; //游戏结束显示的类型
        _this.gameNo = 0; //当前期数
        _this.lastShaRoomId = undefined;
        // public lastShaRoomName: string = "";    //上期被杀房间名字
        _this.bettingCoin = 0; //下注coin数量
        _this.winCoin = 0; //获得coin数量
        return _this;
    }
    Object.defineProperty(RoomInfoModel.prototype, "killRoomName", {
        get: function () {
            if (exports.ROAD_NAME[this.killRoomId]) {
                return exports.ROAD_NAME[this.killRoomId][i18nMgr_1.i18nMgr.getlanguage()];
            }
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RoomInfoModel.prototype, "lastShaRoomName", {
        get: function () {
            if (exports.ROAD_NAME[this.lastShaRoomId]) {
                return exports.ROAD_NAME[this.lastShaRoomId][i18nMgr_1.i18nMgr.getlanguage()];
            }
            return '';
        },
        enumerable: false,
        configurable: true
    });
    RoomInfoModel.prototype.initData = function (res) {
        this.roomType = res.room_type;
        this.minPlayerNum = res.betting_num;
        this.maxPlayerNum = res.total_num;
        this.gameNo = res.game_no;
        // this.lastShaRoomName = ROAD_NAME[res.last_shaid][i18nMgr.getlanguage()] || "";
        this.lastShaRoomId = res.last_shaid;
        this.changeRoomStage(res);
        this.setRoomName(res.room_type);
    };
    /** 改变房间状态
     * 阶段1 等待阶段 满人即开局
     * 阶段2 等待杀手阶段
     * 阶段3 杀手准备出现阶段
     * 阶段4 杀手出现阶段
     * 阶段5 游戏结果阶段
     */
    RoomInfoModel.prototype.changeRoomStage = function (res) {
        this.gameStage = res.game_stage;
        this.waitTime = res.wait_time;
        console.warn("game_stage:  ", this.gameStage);
    };
    /** 初始化金币/钻石消耗数量 */
    RoomInfoModel.prototype.initBettingConf = function (res) {
        var _a, _b, _c;
        this.bettingConfig1 = this.bettingNum = ((_a = res[0]) === null || _a === void 0 ? void 0 : _a.coin) || 0.2;
        this.bettingConfig2 = ((_b = res[1]) === null || _b === void 0 ? void 0 : _b.coin) || 0.2;
        this.bettingConfig3 = ((_c = res[2]) === null || _c === void 0 ? void 0 : _c.coin) || 0.2;
        this.bettingId = 1;
    };
    /** vm刷新房间下注的金币/钻石 */
    RoomInfoModel.prototype.initRoomsCoin = function (rooms, isScale) {
        if (isScale) {
            EventMng_1.default.emit(EventConst_1.GameEvent.COIN_SCALE, rooms);
        }
        for (var _i = 0, rooms_1 = rooms; _i < rooms_1.length; _i++) {
            var index = rooms_1[_i];
            this["coin" + index.roomid] = index.total;
        }
    };
    RoomInfoModel.prototype.setCoin = function (user) {
        if (user.uid == GameDataCenter_1.default.accountModel.uid) {
            this.coin = user.coin;
        }
    };
    RoomInfoModel.prototype.setKillResult = function (data) {
        // const language = i18nMgr.getlanguage()
        // this.killRoomName = ROAD_NAME[data.shaid][language];
        // this.lastShaRoomName = ROAD_NAME[data.shaid][language];
        this.lastShaRoomId = data.shaid;
        this.killRoomId = data.shaid;
        this.coinGuafenNum = data.sha_total;
        this.bettingCoin = data.betting_coin;
        this.winCoin = data.win_coin;
        if (data.tp == "over") {
            //没下注
            if (this.roomId == 0) {
                //没进房间
                this.resultType = 2;
            }
            else if (this.roomId == data.shaid) {
                //输
                this.resultType = 1;
            }
            else {
                //赢
                this.resultType = 3;
            }
        }
        else if (data.tp == "win") {
            //已下注，赢
            this.resultType = 4;
        }
        else if (data.tp == "lose") {
            //已下注，输
            this.resultType = 1;
        }
    };
    /** 设置房间名 */
    RoomInfoModel.prototype.setRoomName = function (id) {
        this.coinName = i18nLabel_1.replaceMatchingCharacters(exports.ROOM_NAME[id][i18nMgr_1.i18nMgr.getlanguage()], 'GSP', window.currencyName);
    };
    return RoomInfoModel;
}(IDataModel_1.default));
exports.default = RoomInfoModel;

cc._RF.pop();