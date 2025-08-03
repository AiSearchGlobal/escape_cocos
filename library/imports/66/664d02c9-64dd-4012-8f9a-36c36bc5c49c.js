"use strict";
cc._RF.push(module, '664d0LJZN1AEo+aNsNrxcSc', 'Websocket');
// script/network/Websocket.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Websocket = void 0;
var Log_1 = require("../utils/Log");
var Websocket = /** @class */ (function () {
    function Websocket(_a) {
        var url = _a.url, _b = _a.pingTimeout, pingTimeout = _b === void 0 ? 15000 : _b, _c = _a.pongTimeout, pongTimeout = _c === void 0 ? 10000 : _c, _d = _a.reconnectTimeout, reconnectTimeout = _d === void 0 ? 2000 : _d, _e = _a.pingMsg, pingMsg = _e === void 0 ? 'heartbeat' : _e, _f = _a.repeatLimit, repeatLimit = _f === void 0 ? null : _f;
        this.ws = null; //websocket实例
        this.repeat = 0;
        this.forbidReconnect = false;
        this.forgroundCount = -1;
        this.isWx = cc.sys.platform == cc.sys.WECHAT_GAME;
        this.hasAddEvent = false;
        this.isHide = false;
        this.onclose = function () { };
        this.onerror = function () { };
        this.onopen = function () { };
        this.onmessage = function () { };
        this.onreconnect = function () { };
        this.createWebSocket = function () {
            if (this.ws && this.ws.readyState == this.ws.OPEN) {
                return;
            }
            try {
                if (this.isWx) {
                    this.ws = wx.connectSocket({
                        url: this.opts.url,
                        success: function () {
                            Log_1.Log.log("wx connect socket success");
                        },
                        fail: function () {
                            Log_1.Log.log("wx connect socket fail");
                        },
                    });
                }
                else {
                    // this.ws = new WebSocket(this.opts.url, [], this.pemUrl);
                    this.ws = new WebSocket(this.opts.url, []);
                }
                this.initEventHandle();
            }
            catch (e) {
                Log_1.Log.log("createWebSocket error", e);
                this.reconnect();
                throw e;
            }
        };
        this.initEventHandle = function () {
            var _this = this;
            if (this.isWx) {
                this.ws.onClose(function () {
                    Log_1.Log.log("wx --> onClose...");
                    this.onclose();
                    this.reconnect();
                }.bind(this));
                this.ws.onError(function (err) {
                    Log_1.Log.log("wx --> onError...", err);
                    this.onerror();
                    this.reconnect();
                }.bind(this));
                this.ws.onOpen(function () {
                    Log_1.Log.log("wx --> onOpen...");
                    if (!this.hasAddEvent) {
                        this.hasAddEvent = true;
                        cc.game.on(cc.game.EVENT_SHOW, this.applocationShow, this);
                        cc.game.on(cc.game.EVENT_HIDE, this.applocationHide, this);
                    }
                    this.repeat = 0;
                    this.onopen();
                    //心跳检测重置
                    this.heartCheck();
                }.bind(this));
                this.ws.onMessage(function (event) {
                    this.onmessage(event);
                    //如果获取到消息，心跳检测重置
                    //拿到任何消息都说明当前连接是正常的
                    this.heartCheck();
                }.bind(this));
            }
            else {
                this.ws.onclose = function () {
                    Log_1.Log.log("ws --> onclose...");
                    _this.onclose();
                    _this.reconnect();
                };
                this.ws.onerror = function (err) {
                    Log_1.Log.log("ws --> onerror...", err);
                    _this.onerror();
                    _this.reconnect();
                };
                this.ws.onopen = function () {
                    Log_1.Log.log("ws --> onopen...");
                    if (!_this.hasAddEvent) {
                        _this.hasAddEvent = true;
                        cc.game.on(cc.game.EVENT_SHOW, _this.applocationShow, _this);
                        cc.game.on(cc.game.EVENT_HIDE, _this.applocationHide, _this);
                    }
                    _this.repeat = 0;
                    _this.onopen();
                    //心跳检测重置
                    _this.heartCheck();
                };
                this.ws.onmessage = function (event) {
                    _this.onmessage(event);
                    //如果获取到消息，心跳检测重置
                    //拿到任何消息都说明当前连接是正常的
                    // this.heartCheck();
                };
            }
        };
        this.reconnect = function () {
            var _this = this;
            if (this.ws && this.ws.readyState == this.ws.OPEN) {
                Log_1.Log.log("reconnect--------重复连接");
                return;
            }
            if (this.opts.repeatLimit > 0 && this.opts.repeatLimit <= this.repeat)
                return; //limit repeat the number
            if (this.lockReconnect || this.forbidReconnect)
                return;
            this.lockReconnect = true;
            this.repeat++; //必须在lockReconnect之后，避免进行无效计数
            this.onreconnect();
            //没连接上会一直重连，设置延迟避免请求过多
            setTimeout(function () {
                _this.createWebSocket();
                _this.lockReconnect = false;
            }, this.opts.reconnectTimeout);
        };
        this.send = function (msg) {
            if (this.ws && this.ws.readyState == this.ws.OPEN) {
                if (this.isWx) {
                    this.ws.send({
                        data: msg,
                        success: function () {
                        }
                    });
                }
                else {
                    this.ws.send(msg);
                }
            }
            else {
                Log_1.Log.log("发送失败:", JSON.stringify(msg));
            }
        };
        //心跳检测
        this.heartCheck = function () {
            this.heartReset();
            this.heartStart();
        };
        this.heartStart = function () {
            var _this = this;
            if (this.forbidReconnect)
                return; //不再重连就不再执行心跳
            this.pingTimeoutId = setTimeout(function () {
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                //onmessage拿到返回的心跳就说明连接正常
                _this.ws.send(_this.opts.pingMsg);
                //如果超过一定时间还没重置，说明后端主动断开了
                _this.pongTimeoutId = setTimeout(function () {
                    //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                    _this.ws.close();
                    _this.onreconnect();
                }, _this.opts.pongTimeout);
            }, this.opts.pingTimeout);
        };
        this.heartReset = function () {
            // clearTimeout(this.pingTimeoutId);
            clearTimeout(this.pongTimeoutId);
        };
        this.close = function () {
            //如果手动关闭连接，不再重连
            Log_1.Log.log("主动断开 ws");
            this.forbidReconnect = true;
            this.heartReset();
            this.ws.close();
        };
        this.opts = {
            url: url,
            pingTimeout: pingTimeout,
            pongTimeout: pongTimeout,
            reconnectTimeout: reconnectTimeout,
            pingMsg: pingMsg,
            repeatLimit: repeatLimit
        };
        // this.pemUrl = cc.url.raw("resources/cacert1.cer")
        this.createWebSocket();
        cc.game.off(cc.game.EVENT_SHOW);
        cc.game.off(cc.game.EVENT_HIDE);
    }
    Websocket.prototype.applocationShow = function () {
        var _this = this;
        Log_1.Log.log("game show");
        if (!this.isHide) {
            return;
        }
        this.isHide = false;
        this.forbidReconnect = false;
        if (this.forgroundCount != -1) {
            clearTimeout(this.forgroundCount);
        }
        this.forgroundCount = setTimeout(function () {
            _this.createWebSocket();
        }, 500);
    };
    Websocket.prototype.applocationHide = function () {
        Log_1.Log.log("game hide");
        this.isHide = true;
        this.close();
    };
    return Websocket;
}());
exports.Websocket = Websocket;

cc._RF.pop();