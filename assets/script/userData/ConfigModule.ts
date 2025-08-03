export class ConfigModule {
    // public static WS_URL_TEST = "wss://hunter-dts-api.gamespace.life/ws"         //正式服地址
    // public static HTTP_URL_TEST = "https://hunter-dts-api.gamespace.life";           //正式服地址

    // public static WS_URL_DEV = "wss://hunter-dts-api.gamestest.xyz/ws"     //测试服地址
    // public static HTTP_URL_DEV = "https://hunter-dts-api.gamestest.xyz";        //测试服地址

    public static WS_URL_TEST = CC_DEV ? "ws://dtsapi.zetaclub.org/ws" : "wss://dtsapi.zetaclub.org/ws"         //正式服地址
    public static HTTP_URL_TEST = CC_DEV ? "https://dtsapi.zetaclub.org" : "https://dtsapi.zetaclub.org";           //正式服地址

    public static WS_URL_DEV = CC_DEV ? "wss://dtszetaapi.zetatest.xyz/ws" : "wss://dtszetaapi.zetatest.xyz/ws"    //测试服地址
    public static HTTP_URL_DEV = CC_DEV ? "https://dtszetaapi.zetatest.xyz" : "https://dtszetaapi.zetatest.xyz";        //测试服地址

    public static SHARE_URL = "";           //分享下载页链接
    public static VERSION = "v1.0.1"
    public static SHOW_LOG = true;                    //是否展示log
    public static IS_TEST = false;                 //是否是正式版
    public static APPID = ""      //android                   //微信开放平台appid
    public static UNIVERSAL_LINK = ""     //ios微信跳转链接
}

// appId: dts dtsapi.zetatest.xyz dtsapi.zetaclub.org
// appSecret: hZ22QkhEDRmurV3B

// appId: dtszt dtsztapi.zetaclub.org dtsztapi.zetaclub.org
// appSecret: hZ22QkhEDRmurV3B

// appId: pubg
// appSecret: hZ22QkhEDRmurV3B

// appId: pubgzt
// appSecret: hZ22QkhEDRmurV3B