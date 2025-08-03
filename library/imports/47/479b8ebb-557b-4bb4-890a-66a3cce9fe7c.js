"use strict";
cc._RF.push(module, '479b867VXtLtIkKZqPM6f58', 'JSBridgeManager');
// script/framework/lib/JSBridgeManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSBridgeManager = void 0;
var JSBridgeManager = /** @class */ (function () {
    function JSBridgeManager() {
        //注册可以供flutter调用的方法
        this.registerFunc("callBack", this.callFromFlutter);
    }
    JSBridgeManager.getInstance = function () {
        if (JSBridgeManager._instance == null) {
            JSBridgeManager._instance = new JSBridgeManager();
        }
        return this._instance;
    };
    /**
     * 注册可以供flutter调用的方法
     * @param method 注册的方法名称
     * @param func 注册的方法(example: function(params, responseCall) params:flutter返回的参数 responseCall:回传数据时调用)
     *  在回调中如果有对creator ui操作要用event事件派发,否则会操作失败
     */
    JSBridgeManager.prototype.registerFunc = function (method, func) {
        if (window['jsBridge']) {
            window['jsBridge'].registerFuncForFlutter(method, func);
        }
        else {
            document.addEventListener("jsBridgeReady", function () {
                window['jsWebBridge'].registerFuncForFlutter(method, func);
            }, false);
        }
    };
    /**
    * js调用flutter方法
    * @param method 方法名
    * @param params 参数
    * @param receiveCall 接收flutter返回的数据函数(在回调中如果有对creator ui操作的行为要用event事件派发)
    *
    * example: JSBridgeManager.getInstance().callFlutterFunc('getCocosParams',{
                   data1:'xxx',
                   data2: 'xxxx'
               },()=>{
                   Log.log("********调用flutter成功********")
               })
    */
    JSBridgeManager.prototype.callFlutterFunc = function (method, params, receiveCall) {
        if (window['jsBridge']) {
            window['jsBridge'].callFlutterFunc(method, params, receiveCall);
        }
    };
    /**
     * flutter调用js方法,通过事件派发
     * @param params
     * @param responseCall
     */
    JSBridgeManager.prototype.callFromFlutter = function (params, responseCall) {
        // EventMng.emit(GameEvent.CALL_FROM_FLUTTER, params, responseCall)
    };
    return JSBridgeManager;
}());
exports.JSBridgeManager = JSBridgeManager;

cc._RF.pop();