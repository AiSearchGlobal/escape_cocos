"use strict";
cc._RF.push(module, '3adacx4eIVM+pyEOpvQHt8S', 'Log');
// script/utils/Log.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = exports.LOG_TAG = void 0;
// 个人开关，只对log方法有效
exports.LOG_TAG = {
    SOCKET: { desc: 'LOG_SOCKET', isOpen: true },
    HTTP: { desc: 'LOG_HTTP', isOpen: true },
    TEST: { desc: 'LOG_TEST', isOpen: true },
};
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var backLog = console.log || cc.log;
        var tag = exports.LOG_TAG.TEST;
        if (!tag || !tag.isOpen) {
            return;
        }
        var arr = Array.prototype.slice.call(arguments);
        arr.splice(0, 0, "[" + tag.desc + "]");
        var info = Log.stack(2) + Log.getDateString() + " ";
        arr.splice(1, 0, info);
        backLog.apply(backLog, arr);
    };
    Log.logTag = function (tag) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var backLog = console.log || cc.log;
        if (!tag || !tag.isOpen) {
            return;
        }
        if (tag == exports.LOG_TAG.SOCKET || tag == exports.LOG_TAG.HTTP) {
            backLog.apply(backLog, args);
        }
        else {
            var arr = Array.prototype.slice.call(arguments);
            arr.splice(0, 1, "[" + tag.desc + "]");
            var info = Log.stack(2) + Log.getDateString() + " ";
            arr.splice(1, 0, info);
            backLog.apply(backLog, arr);
        }
    };
    Log.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var backLog = console.warn || cc.warn;
        var arr = Array.prototype.slice.call(arguments);
        var info = Log.stack(2) + Log.getDateString() + " ";
        arr.splice(0, 0, info);
        backLog.apply(backLog, arr);
    };
    Log.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var backLog = console.error || cc.error;
        var arr = Array.prototype.slice.call(arguments);
        var info = Log.stack(2) + Log.getDateString() + " ";
        arr.splice(0, 0, info);
        backLog.apply(backLog, arr);
    };
    Log.getDateString = function () {
        var d = new Date();
        var str = d.getHours().toString();
        var timeStr = "";
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMinutes().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getSeconds().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMilliseconds().toString();
        if (str.length == 1)
            str = "00" + str;
        if (str.length == 2)
            str = "0" + str;
        timeStr += str;
        timeStr = "[" + timeStr + "]";
        return timeStr;
    };
    Log.stack = function (index) {
        if (index === void 0) { index = 2; }
        var e = new Error();
        var lines = e.stack.split("\n");
        lines.shift();
        var result = [];
        lines.forEach(function (line) {
            var _a;
            line = line.substring(7);
            var lineBreak = line.split(" ");
            if (lineBreak.length < 2) {
                result.push(lineBreak[0]);
            }
            else {
                result.push((_a = {}, _a[lineBreak[0]] = lineBreak[1], _a));
            }
        });
        var list = [];
        if (index < result.length - 1) {
            for (var a in result[index]) {
                list.push(a);
            }
        }
        if (list[0]) {
            var splitList = list[0].split(".");
            return (splitList[0] + ".js->" + splitList[1] + ":");
        }
        else {
            return "";
        }
    };
    return Log;
}());
exports.Log = Log;

cc._RF.pop();