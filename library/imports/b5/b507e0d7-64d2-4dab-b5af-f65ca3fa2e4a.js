"use strict";
cc._RF.push(module, 'b507eDXZNJNq7Wv9lyj+i5K', 'IDataModel');
// script/framework/model/IDataModel.ts

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
var GameController_1 = require("../../GameController");
var Log_1 = require("../../utils/Log");
var EventMng_1 = require("../manager/EventMng");
var ISerialize_1 = require("./ISerialize");
var IDataModel = /** @class */ (function (_super) {
    __extends(IDataModel, _super);
    function IDataModel(modelName) {
        if (modelName === void 0) { modelName = 'default'; }
        var _this = _super.call(this, modelName) || this;
        _this.registerListeners();
        return _this;
    }
    IDataModel.prototype.clear = function () {
    };
    /**
     * 注册网络监听事件
     */
    IDataModel.prototype.registerListeners = function () {
        var tbMsg = this.getMessageListeners();
        var _loop_1 = function (key) {
            if (tbMsg.hasOwnProperty(key)) {
                EventMng_1.default.on(key.toString(), function (msg) {
                    tbMsg[key](msg);
                });
            }
        };
        for (var key in tbMsg) {
            _loop_1(key);
        }
    };
    /**
     * 子类需要重写此方法，返回需要注册的监听事件
     */
    IDataModel.prototype.getMessageListeners = function () {
        return {};
    };
    ;
    IDataModel.prototype.postHttpMsg = function (cmd, msg, callback, loding) {
        if (loding === void 0) { loding = true; }
        try {
            GameController_1.default.network.httpPost(cmd, msg, callback, loding);
        }
        catch (e) {
            Log_1.Log.error('send http proto', msg, e);
        }
    };
    IDataModel.prototype.sendHttpMsg = function (cmd, msg, callback, loding) {
        if (loding === void 0) { loding = true; }
        try {
            GameController_1.default.network.httpSend(cmd, msg, callback, loding);
        }
        catch (e) {
            Log_1.Log.error('send http proto', msg, e);
        }
    };
    IDataModel.prototype.sendSocketMsg = function (c, m, data) {
        try {
            GameController_1.default.socket.send(c, m, data);
        }
        catch (e) {
            Log_1.Log.error('send socket proto', m, e);
        }
    };
    return IDataModel;
}(ISerialize_1.default));
exports.default = IDataModel;

cc._RF.pop();