"use strict";
cc._RF.push(module, '3c2eahU8V5Lg7AKNTIS3es/', 'AccountModel');
// script/userData/AccountModel.ts

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
var i18nMgr_1 = require("../framework/i18n/i18nMgr");
var IDataModel_1 = require("../framework/model/IDataModel");
var GameDataCenter_1 = require("./GameDataCenter");
var AccountModel = /** @class */ (function (_super) {
    __extends(AccountModel, _super);
    function AccountModel() {
        var _this = _super.call(this, 'account') || this;
        _this.avatar = "";
        _this.nickName = "";
        _this.uid = 0;
        _this.status = 0;
        _this.players = new Map();
        _this.noMoreJilu = false;
        _this.myRankNo = ""; //vm显示排行榜自己排名
        _this.lastRankNo = "";
        _this.thisRankNo = "";
        _this.myRankNum = ""; //vm显示排行榜自己金币
        _this.lastRankNum = "";
        _this.thisRankNum = "";
        _this.jwt = "";
        return _this;
    }
    // public get jwt() : string {
    //     return this.Query("jwt", "");
    // }
    // public set jwt(v : string) {
    //     this.Set("jwt", v);
    //     this.Save();
    // }
    //登录
    AccountModel.prototype.login = function (token, company_code) {
        var _this = this;
        var params = {
            token: token,
            company_code: company_code,
        };
        return new Promise(function (resolve, reject) {
            _this.postHttpMsg("game/v1/login", params, function (res) {
                var data = res.data;
                console.log(data, '登录数据');
                resolve(data);
            }.bind(_this));
        });
    };
    //获取记录
    AccountModel.prototype.getGameLog = function () {
        var _this = this;
        var params = {
            room_type: GameDataCenter_1.default.roomInfoModel.roomType
        };
        return new Promise(function (resolve, reject) {
            _this.postHttpMsg("game/v1/getGameLog", params, function (res) {
                var data = res.data;
                var item1 = {
                    type: 1,
                    list: data.sha_100_list
                };
                var item2 = {
                    type: 2,
                    list: data.sha_list
                };
                var item3 = {
                    type: 3,
                    betting_total: data.betting_total,
                    result_total: data.result_total,
                };
                resolve([item1, item2, item3]);
            }.bind(_this));
        });
    };
    //下注记录
    AccountModel.prototype.getBettingLog = function (page) {
        var _this = this;
        var params = {
            room_type: GameDataCenter_1.default.roomInfoModel.roomType,
            page: page,
            limit: 20
        };
        return new Promise(function (resolve, reject) {
            if (_this.noMoreJilu) {
                resolve([]);
                return;
            }
            _this.postHttpMsg("game/v1/getbettinglog", params, function (res) {
                var data = res.data;
                var list = [];
                for (var _i = 0, _a = data.list; _i < _a.length; _i++) {
                    var index = _a[_i];
                    var item = {
                        type: 4,
                        user: index
                    };
                    list.push(item);
                }
                if (list.length < 20) {
                    if (!this.noMoreJilu) {
                        this.noMoreJilu = true;
                        list.push({ type: 5 });
                    }
                }
                resolve(list);
            }.bind(_this));
        });
    };
    //获得排行榜数据
    AccountModel.prototype.getRank = function () {
        var _this = this;
        var params = {
            room_type: GameDataCenter_1.default.roomInfoModel.roomType
        };
        var language = {
            zh: '未上榜',
            en: 'Not Ranked'
        };
        return new Promise(function (resolve, reject) {
            _this.postHttpMsg("game/v1/getRank", params, function (res) {
                var l = language[i18nMgr_1.i18nMgr.getlanguage()];
                var data = res.data;
                _this.lastRankNum = data.last_rank_num;
                _this.myRankNum = _this.thisRankNum = data.this_rank_num;
                _this.lastRankNo = data.last_rank_no == 0 ? l : String(data.last_rank_no);
                _this.myRankNo = _this.thisRankNo = data.this_rank_no == 0 ? l : String(data.this_rank_no);
                resolve(data);
            });
        });
    };
    Object.defineProperty(AccountModel.prototype, "myPlayer", {
        get: function () {
            return this.players.get(this.uid);
        },
        enumerable: false,
        configurable: true
    });
    return AccountModel;
}(IDataModel_1.default));
exports.default = AccountModel;

cc._RF.pop();