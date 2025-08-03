"use strict";
cc._RF.push(module, 'e8031RbaMBN1p1keGuyKO2z', 'JgTool');
// script/framework/sdkTools/JgTool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JPushPlugin = void 0;
var Log_1 = require("../../utils/Log");
var JPushPlugin = /** @class */ (function () {
    function JPushPlugin() {
    }
    //修改极光推送别名，方便后端在后台进行集体推送
    JPushPlugin.setOtherName = function (uid) {
        if (this.isAndroid) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "registId", "(Ljava/lang/String;I)V", uid, Date.now());
        }
        else if (this.isIOS) {
            jsb.reflection.callStaticMethod("AppController", "setJPushAlias:", uid);
        }
        else {
            Log_1.Log.error("只有android和IOS有极光");
        }
    };
    JPushPlugin.isAndroid = cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID;
    JPushPlugin.isIOS = cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS;
    return JPushPlugin;
}());
exports.JPushPlugin = JPushPlugin;
cc["JPushPlugin"] = JPushPlugin;

cc._RF.pop();