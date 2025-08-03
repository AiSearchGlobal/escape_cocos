"use strict";
cc._RF.push(module, '27b98ncGaFEN4kT7kMMG7xJ', 'Network');
// script/network/Network.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = void 0;
var Http_1 = require("./Http");
var ConfigModule_1 = require("../userData/ConfigModule");
var UIHelp_1 = require("../framework/ui/UIHelp");
var GameDataCenter_1 = require("../userData/GameDataCenter");
var Log_1 = require("../utils/Log");
var Network = /** @class */ (function () {
    function Network() {
        if (ConfigModule_1.ConfigModule.IS_TEST) {
            this._httpUrl = ConfigModule_1.ConfigModule.HTTP_URL_TEST;
        }
        else {
            this._httpUrl = ConfigModule_1.ConfigModule.HTTP_URL_DEV;
        }
    }
    //http请求
    Network.prototype.httpSend = function (cmd, params, callback, loding) {
        var self = this;
        if (loding) {
            UIHelp_1.default.ShowLoding();
        }
        if (params && GameDataCenter_1.default.accountModel.jwt) {
            params["jwt"] = GameDataCenter_1.default.accountModel.jwt;
        }
        var param = this.obj_contact(params);
        var url = encodeURI(self._httpUrl + "/" + cmd + param);
        Log_1.Log.logTag(Log_1.LOG_TAG.HTTP, "%chttp\u53D1\u9001: " + cmd + "-->", 'color:#000;background:yellow', url);
        Http_1.Http.get(url, function (eventName, xhr) {
            UIHelp_1.default.CloseLoding();
            if (eventName == 'COMPLETE') {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText);
                    var replace = cmd.replace(/\//g, '_');
                    if (cc.sys.isNative) {
                        Log_1.Log.logTag(Log_1.LOG_TAG.HTTP, "%chttp\u63A5\u6536: " + replace + "-->", 'color:#000;background:orange', JSON.stringify(response));
                    }
                    else {
                        Log_1.Log.logTag(Log_1.LOG_TAG.HTTP, "%chttp\u63A5\u6536: " + replace + "-->", 'color:#000;background:orange', response);
                    }
                    if (response["errcode"] != 0) {
                        if (response["errcode"] == "1000") {
                            GameDataCenter_1.default.accountModel.jwt = "";
                        }
                        UIHelp_1.default.ShowTips(response["errmsg"]);
                        return;
                    }
                    callback && callback(response);
                }
                else {
                    UIHelp_1.default.ShowTips("服务器维护中");
                }
            }
            else if (eventName == 'TIMEOUT') {
                //TODO:添加提示连接网关超时
                // this.et.emit('TIMEOUT', {})
                Log_1.Log.error("添加提示连接网关超时");
            }
            else if (eventName == 'ERROR') {
                //TODO:添加提示连接网关发生错误
                Log_1.Log.error("添加提示连接网关发生错误");
            }
        }, this);
    };
    Network.prototype.httpPost = function (url, params, callback, loding) {
        var self = this;
        if (loding) {
            UIHelp_1.default.ShowLoding();
        }
        var surl;
        surl = url;
        if (GameDataCenter_1.default.accountModel.jwt) {
            surl = url + '?jwt=' + GameDataCenter_1.default.accountModel.jwt;
        }
        var urcl = encodeURI(self._httpUrl + "/" + surl);
        Log_1.Log.logTag(Log_1.LOG_TAG.HTTP, "%chttp\u53D1\u9001: " + url + "-->", 'color:#000;background:yellow', urcl);
        Http_1.Http.post(urcl, params, function (eventName, xhr) {
            UIHelp_1.default.CloseLoding();
            if (eventName == 'COMPLETE') {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText);
                    var replace = url.replace(/\//g, '_');
                    if (cc.sys.isNative) {
                        Log_1.Log.logTag(Log_1.LOG_TAG.HTTP, "%chttp\u63A5\u6536: " + replace + "-->", 'color:#000;background:orange', JSON.stringify(response));
                    }
                    else {
                        Log_1.Log.logTag(Log_1.LOG_TAG.HTTP, "%chttp\u63A5\u6536: " + replace + "-->", 'color:#000;background:orange', response);
                    }
                    if (response["errcode"] != 0) {
                        UIHelp_1.default.ShowTips(response["errmsg"]);
                        return;
                    }
                    if (response.data.jwt) {
                        GameDataCenter_1.default.accountModel.jwt = response.data.jwt;
                    }
                    callback && callback(response);
                }
            }
            else if (eventName == 'TIMEOUT') {
                //TODO:添加提示连接网关超时
                this.et.emit('TIMEOUT', {});
                Log_1.Log.error("添加提示连接网关超时");
            }
            else if (eventName == 'ERROR') {
                //TODO:添加提示连接网关发生错误
                Log_1.Log.error("添加提示连接网关发生错误");
            }
        }, this);
    };
    Network.prototype.obj_contact = function (obj) {
        var s = "";
        for (var k in obj) {
            var v = obj[k];
            if (s.length == 0) {
                s += "?" + k + "=" + v;
            }
            else {
                s += "&" + k + "=" + v;
            }
        }
        return s;
    };
    return Network;
}());
exports.Network = Network;

cc._RF.pop();