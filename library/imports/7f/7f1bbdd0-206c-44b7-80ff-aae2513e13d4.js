"use strict";
cc._RF.push(module, '7f1bb3QIGxEt4D/quJRPhPU', 'ConfigModule');
// script/userData/ConfigModule.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
var ConfigModule = /** @class */ (function () {
    function ConfigModule() {
    }
    // public static WS_URL_TEST = "wss://hunter-dts-api.gamespace.life/ws"         //正式服地址
    // public static HTTP_URL_TEST = "https://hunter-dts-api.gamespace.life";           //正式服地址
    // public static WS_URL_DEV = "wss://hunter-dts-api.gamestest.xyz/ws"     //测试服地址
    // public static HTTP_URL_DEV = "https://hunter-dts-api.gamestest.xyz";        //测试服地址
    ConfigModule.WS_URL_TEST = CC_DEV ? "ws://dtsapi.zetaclub.org/ws" : "wss://dtsapi.zetaclub.org/ws"; //正式服地址
    ConfigModule.HTTP_URL_TEST = CC_DEV ? "https://dtsapi.zetaclub.org" : "https://dtsapi.zetaclub.org"; //正式服地址
    ConfigModule.WS_URL_DEV = CC_DEV ? "wss://dtszetaapi.zetatest.xyz/ws" : "wss://dtszetaapi.zetatest.xyz/ws"; //测试服地址
    ConfigModule.HTTP_URL_DEV = CC_DEV ? "https://dtszetaapi.zetatest.xyz" : "https://dtszetaapi.zetatest.xyz"; //测试服地址
    ConfigModule.SHARE_URL = ""; //分享下载页链接
    ConfigModule.VERSION = "v1.0.1";
    ConfigModule.SHOW_LOG = true; //是否展示log
    ConfigModule.IS_TEST = false; //是否是正式版
    ConfigModule.APPID = ""; //android                   //微信开放平台appid
    ConfigModule.UNIVERSAL_LINK = ""; //ios微信跳转链接
    return ConfigModule;
}());
exports.ConfigModule = ConfigModule;
// appId: dts dtsapi.zetatest.xyz dtsapi.zetaclub.org
// appSecret: hZ22QkhEDRmurV3B
// appId: dtszt dtsztapi.zetaclub.org dtsztapi.zetaclub.org
// appSecret: hZ22QkhEDRmurV3B
// appId: pubg
// appSecret: hZ22QkhEDRmurV3B
// appId: pubgzt
// appSecret: hZ22QkhEDRmurV3B

cc._RF.pop();