"use strict";
cc._RF.push(module, 'd340fDOUbRPdrvglgnDydg2', 'CsjTool');
// script/framework/sdkTools/CsjTool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsjPlugin = void 0;
var Log_1 = require("../../utils/Log");
var CsjPlugin = /** @class */ (function () {
    function CsjPlugin() {
    }
    //修改极光推送别名，方便后端在后台进行集体推送
    CsjPlugin.setOtherName = function (uid) {
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
    CsjPlugin.isAndroid = cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID;
    CsjPlugin.isIOS = cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS;
    return CsjPlugin;
}());
exports.CsjPlugin = CsjPlugin;
cc["CsjPlugin"] = CsjPlugin;

cc._RF.pop();