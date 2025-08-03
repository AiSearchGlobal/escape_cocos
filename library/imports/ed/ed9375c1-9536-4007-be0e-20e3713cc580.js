"use strict";
cc._RF.push(module, 'ed937XBlTZAB74OIONxPMWA', 'ViewZorder');
// script/framework/const/ViewZorder.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewZorder = void 0;
var ViewZorder = /** @class */ (function () {
    function ViewZorder() {
    }
    /**场景层 */
    ViewZorder.Scene = 20;
    /**顶部和底部菜单栏层级 */
    ViewZorder.MenuPanel = 80;
    /**UI层 */
    ViewZorder.UI = 100;
    /**对话框层 */
    ViewZorder.Dialog = 200;
    /**提示层 */
    ViewZorder.Tips = 300;
    /**引导层 */
    ViewZorder.Guide = 400;
    /**通知层 */
    ViewZorder.Notice = 500;
    /**loading层 */
    ViewZorder.Loading = 600;
    return ViewZorder;
}());
exports.ViewZorder = ViewZorder;

cc._RF.pop();