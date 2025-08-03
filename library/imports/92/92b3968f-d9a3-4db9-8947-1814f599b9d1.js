"use strict";
cc._RF.push(module, '92b39aP2aNNuYlHGBT1mbnR', 'debug');
// script/framework/adapter/define/debug.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADAPTER_DEBUG_CONTENT = exports.ADAPTER_DEBUG_VIEW = exports.DEBUG_DRAW_LIND_WIDTH = exports.DEBUG_DRAW_BORDER_COLOR = exports.DEBUG_DRAW_FILL_COLOR = exports.DEBUG_DRAW_LINE_COLOR = void 0;
// import { Color } from "cc"
/** 调试用 */
exports.DEBUG_DRAW_LINE_COLOR = new cc.Color(238, 124, 55, 255);
exports.DEBUG_DRAW_FILL_COLOR = new cc.Color(88, 175, 64, 50);
exports.DEBUG_DRAW_BORDER_COLOR = new cc.Color(56, 120, 94, 255);
exports.DEBUG_DRAW_LIND_WIDTH = 3;
/** 开启View边框 */
exports.ADAPTER_DEBUG_VIEW = false;
/** 开启虚拟Content遮罩 */
exports.ADAPTER_DEBUG_CONTENT = false;

cc._RF.pop();