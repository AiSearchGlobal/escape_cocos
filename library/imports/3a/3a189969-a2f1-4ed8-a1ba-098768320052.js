"use strict";
cc._RF.push(module, '3a189lpovFO2KG6CYdoMgBS', 'Utils');
// script/utils/Utils.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var Log_1 = require("./Log");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils_1 = Utils;
    //获得查询字符串
    Utils.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    };
    // 对Date的扩展，将 Date 转化为指定格式的String   
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
    // 例子：   
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
    //Utils.getFormateDate(new Date(data["time_add"] * 1000), "yyyy-M-d h:m:s");
    Utils.getFormateDate = function (data, formate) {
        var o = {
            "M+": data.getMonth() + 1,
            "d+": data.getDate(),
            "h+": data.getHours(),
            "m+": data.getMinutes(),
            "s+": data.getSeconds(),
            "q+": Math.floor((data.getMonth() + 3) / 3),
            "S": data.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(formate))
            formate = formate.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(formate))
                formate = formate.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return formate;
    };
    //clone对象
    Utils.cloneObj = function (obj) {
        var a = JSON.stringify(obj);
        return JSON.parse(a);
    };
    Utils.getCookie = function (cookieName) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (cookieName == arr[0]) {
                return arr[1];
            }
        }
        return "";
    };
    Utils.delCookie = function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = Utils_1.getCookie(name);
        Log_1.Log.log('____删除cookie:', cval);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
    };
    //生成随机数，>=a,<b
    Utils.random = function (a, b) {
        var diff = b - a - 1;
        var r = Math.random() * diff;
        return Math.round(r) + a;
    };
    /**
     * JS使用POST方式进行跳转
     * @param URL 跳转链接
     * @param PARAMS 参数{a:1,b:2}
     */
    Utils.prototype.postOpenWindow = function (URL, PARAMS) {
        var temp_form = document.createElement("form");
        temp_form.action = URL;
        temp_form.target = "_blank";
        temp_form.method = "post";
        temp_form.style.display = "none";
        for (var x in PARAMS) {
            var opt = document.createElement("textarea");
            opt.name = x;
            opt.value = PARAMS[x];
            temp_form.appendChild(opt);
        }
        document.body.appendChild(temp_form);
        temp_form.submit();
    };
    var Utils_1;
    Utils = Utils_1 = __decorate([
        ccclass
    ], Utils);
    return Utils;
}());
exports.Utils = Utils;

cc._RF.pop();