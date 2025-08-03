"use strict";
cc._RF.push(module, '0da53w3nbVJRrmOVi2znxBL', 'GameDataCenter');
// script/userData/GameDataCenter.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SingletonFactory_1 = require("../framework/lib/SingletonFactory");
var ViewModel_1 = require("./../framework/component/ViewModel");
var SocketModel_1 = require("./SocketModel");
var AccountModel_1 = require("./AccountModel");
var RoomInfoModel_1 = require("./RoomInfoModel");
var RoomChoseModel_1 = require("./RoomChoseModel");
var GameDataCenter = /** @class */ (function () {
    function GameDataCenter() {
        this._tModel = [];
        this.accountModel = null;
        this.socketModel = null;
        this.roomInfoModel = null;
        this.roomChoseModel = null;
        GameDataCenter.instance = this;
    }
    GameDataCenter.prototype.newModel = function (c) {
        var obj = SingletonFactory_1.SingletonFactory.getInstance(c);
        this._tModel.push(obj);
        return obj;
    };
    GameDataCenter.prototype.clear = function () {
        this._tModel.forEach(function (m) {
            m.clear();
        });
    };
    GameDataCenter.prototype.initModule = function () {
        this.accountModel = this.newModel(AccountModel_1.default);
        this.socketModel = this.newModel(SocketModel_1.default);
        this.roomInfoModel = this.newModel(RoomInfoModel_1.default);
        this.roomChoseModel = this.newModel(RoomChoseModel_1.default);
        ViewModel_1.VM.add(this.accountModel, 'account');
        ViewModel_1.VM.add(this.roomInfoModel, 'roomInfo');
        ViewModel_1.VM.add(this.roomChoseModel, 'roomChose');
    };
    return GameDataCenter;
}());
exports.default = new GameDataCenter();
window.GameDataCenter = GameDataCenter;

cc._RF.pop();