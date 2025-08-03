"use strict";
cc._RF.push(module, '800acXluV9LHb2cLsp3Pdc+', 'SocketDelegate');
// script/network/SocketDelegate.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketDelegate = void 0;
var GameDataCenter_1 = require("../userData/GameDataCenter");
var EventMng_1 = require("../framework/manager/EventMng");
var UIHelp_1 = require("../framework/ui/UIHelp");
var Websocket_1 = require("./Websocket");
var ConfigModule_1 = require("../userData/ConfigModule");
var GameController_1 = require("../GameController");
var Log_1 = require("../utils/Log");
var SocketDelegate = /** @class */ (function () {
    function SocketDelegate() {
        if (ConfigModule_1.ConfigModule.IS_TEST) {
            this.url = ConfigModule_1.ConfigModule.WS_URL_TEST;
        }
        else {
            this.url = ConfigModule_1.ConfigModule.WS_URL_DEV;
        }
    }
    SocketDelegate.prototype.connect = function () {
        this.websocket = new Websocket_1.Websocket({
            url: this.url,
            pingTimeout: 3000,
            pongTimeout: 5000,
            pingMsg: JSON.stringify({ "c": "game", "m": "ping", "data": {} })
        });
        this.websocket.onopen = this.onopen.bind(this);
        this.websocket.onmessage = this.onmessage.bind(this);
        this.websocket.onreconnect = this.onreconnect.bind(this);
        this.websocket.onclose = this.onclose.bind(this);
        this.websocket.onerror = this.onerror.bind(this);
    };
    SocketDelegate.prototype.send = function (c, m, data) {
        var obj = {
            "c": c,
            "m": m,
            "data": data
        };
        this.websocket.send(JSON.stringify(obj));
        if (cc.sys.isNative) {
            Log_1.Log.logTag(Log_1.LOG_TAG.SOCKET, '%cSOCKET发送-->', 'color:#fff;background:red', JSON.stringify(obj));
        }
        else {
            Log_1.Log.logTag(Log_1.LOG_TAG.SOCKET, '%cSOCKET发送-->', 'color:#fff;background:red', obj);
        }
    };
    SocketDelegate.prototype.close = function () {
        this.websocket.close();
    };
    //需要自己补充逻辑
    SocketDelegate.prototype.toLoginScene = function () {
        GameController_1.default.socket.close();
        // if (cc.director.getScene().name == "hallScene") {
        //     cc.director.loadScene("loginScene");
        // }
    };
    SocketDelegate.prototype.onopen = function () {
        Log_1.Log.warn('connect success');
        // cc.director.resume();
        UIHelp_1.default.CloseLoding();
        GameDataCenter_1.default.socketModel.login();
    };
    SocketDelegate.prototype.appandeMsg = function (data) {
        var self = this;
        if (data.m != "ping" && data.m != "pong") {
            if (cc.sys.isNative) {
                Log_1.Log.logTag(Log_1.LOG_TAG.SOCKET, '%cSOCKET接收-->', 'color:#fff;background:green', JSON.stringify(data));
            }
            else {
                Log_1.Log.logTag(Log_1.LOG_TAG.SOCKET, '%cSOCKET接收-->', 'color:#fff;background:green', data);
            }
        }
        data['src'] = 'tcp';
        if (data.m == "pong") {
            self.websocket.heartCheck();
        }
        else {
            if (data.data.errcode) {
                UIHelp_1.default.ShowTips(data['data']["errmsg"]);
                if (data.m == "login") {
                    Log_1.Log.error("login失败，返回首页，清空jwt");
                    self.toLoginScene();
                    return;
                }
                if (data.data.errcode == 503) {
                    //服务器维护中
                    self.toLoginScene();
                }
                return;
            }
            EventMng_1.default.emit(data.c + "_" + data.m, data.data);
        }
    };
    SocketDelegate.prototype.onmessage = function (e) {
        var self = this;
        if (cc.sys.isNative) {
            var a = new Uint8Array(e.data);
            var packet = JSON.parse(self.Utf8ArrayToStr(a));
            self.appandeMsg(packet);
        }
        else {
            if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                var str = self.arrayBufferToString(e);
                var packet = JSON.parse(str);
                self.appandeMsg(packet);
            }
            else {
                var fileReader = new FileReader();
                fileReader.onload = function (progressEvent) {
                    var arrayBuffer = this.result; //arrayBuffer即为blob对应的arrayBuffer  
                    var a = new Uint8Array(arrayBuffer);
                    var packet = JSON.parse(self.Utf8ArrayToStr(a));
                    self.appandeMsg(packet);
                };
                fileReader.readAsArrayBuffer(e.data);
            }
        }
    };
    SocketDelegate.prototype.onreconnect = function () {
        Log_1.Log.error('reconnecting...');
        // cc.director.pause();
        UIHelp_1.default.ShowLoding();
    };
    SocketDelegate.prototype.onclose = function () {
    };
    SocketDelegate.prototype.onerror = function () {
    };
    SocketDelegate.prototype.Utf8ArrayToStr = function (array) {
        var out, i, len, c;
        var char2, char3;
        out = "";
        len = array.length;
        i = 0;
        while (i < len) {
            c = array[i++];
            switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12:
                case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out;
    };
    SocketDelegate.prototype.arrayBufferToString = function (arr) {
        if (typeof arr === 'string') {
            return arr;
        }
        var dataview = new DataView(arr.data);
        var ints = new Uint8Array(arr.data.byteLength);
        for (var i = 0; i < ints.length; i++) {
            ints[i] = dataview.getUint8(i);
        }
        arr = ints;
        var str = '', _arr = arr;
        for (var i = 0; i < _arr.length; i++) {
            var one = _arr[i].toString(2), v = one.match(/^1+?(?=0)/);
            if (v && one.length == 8) {
                var bytesLength = v[0].length;
                var store = _arr[i].toString(2).slice(7 - bytesLength);
                for (var st = 1; st < bytesLength; st++) {
                    store += _arr[st + i].toString(2).slice(2);
                }
                str += String.fromCharCode(parseInt(store, 2));
                i += bytesLength - 1;
            }
            else {
                str += String.fromCharCode(_arr[i]);
            }
        }
        return str;
    };
    return SocketDelegate;
}());
exports.SocketDelegate = SocketDelegate;

cc._RF.pop();