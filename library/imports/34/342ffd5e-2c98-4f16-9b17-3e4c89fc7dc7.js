"use strict";
cc._RF.push(module, '342ff1eLJhPFpsXPkyJ/H3H', 'Http');
// script/network/Http.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Http = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Http = /** @class */ (function () {
    function Http() {
    }
    Http.get = function (url, callback, thisObj) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
        };
        xhr.onerror = function () {
            callback.call(thisObj, "ERROR", xhr);
        };
        xhr.onprogress = function () {
            callback.call(thisObj, "PROGRESS", xhr);
        };
        xhr.onloadend = function () {
            callback.call(thisObj, "COMPLETE", xhr);
        };
        xhr.ontimeout = function () {
            callback.call(thisObj, "TIMEOUT", xhr);
        };
        xhr.open("GET", url, true);
        xhr.send();
    };
    Http.catobj = function (obj) {
        var a = [];
        for (var k in obj) {
            var v = obj[k];
            var s = "" + k + "=" + v;
            a.push(s);
        }
        return a.join("&");
    };
    Http.post = function (url, params, callback, thisObj) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
        };
        xhr.onerror = function () {
            callback.call(thisObj, "ERROR", xhr);
        };
        xhr.onprogress = function () {
            callback.call(thisObj, "PROGRESS", xhr);
        };
        xhr.onloadend = function () {
            callback.call(thisObj, "COMPLETE", xhr);
        };
        xhr.ontimeout = function () {
            callback.call(thisObj, "TIMEOUT", xhr);
        };
        xhr.open("POST", url, true);
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // var s = Http.catobj(params)
        // xhr.send(s);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(params));
    };
    Http = __decorate([
        ccclass
    ], Http);
    return Http;
}());
exports.Http = Http;

cc._RF.pop();