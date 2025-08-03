"use strict";
cc._RF.push(module, '44fb0GtNJBETJLEnhIdcBfw', 'GameController');
// script/GameController.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Network_1 = require("./network/Network");
var SocketDelegate_1 = require("./network/SocketDelegate");
var GameDataCenter_1 = require("./userData/GameDataCenter");
var SingletonFactory_1 = require("./framework/lib/SingletonFactory");
var GameController = /** @class */ (function () {
    function GameController() {
        this.network = null;
        this.socket = null;
    }
    GameController.prototype.init = function () {
        // 初始化数据模块
        GameDataCenter_1.default.initModule();
        // 新建一个网络单例
        this.network = SingletonFactory_1.SingletonFactory.getInstance(Network_1.Network);
        this.socket = SingletonFactory_1.SingletonFactory.getInstance(SocketDelegate_1.SocketDelegate);
    };
    return GameController;
}());
exports.default = new GameController();

cc._RF.pop();