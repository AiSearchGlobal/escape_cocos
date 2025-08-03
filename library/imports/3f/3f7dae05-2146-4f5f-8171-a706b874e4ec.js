"use strict";
cc._RF.push(module, '3f7da4FIUZPX4Fxpwa4dOTs', 'Manager');
// script/framework/adapter/abstract/Manager.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Manager = /** @class */ (function () {
    function Manager() {
        this._inited = false;
        this._eventMap = new Map();
        this._adapter = null;
    }
    Object.defineProperty(Manager.prototype, "adapter", {
        get: function () { return this._adapter; },
        enumerable: false,
        configurable: true
    });
    /** @deprecated 内部方法，调用会爆炸💥 */
    Manager.prototype.internal_create = function (adapter) {
        this._adapter = adapter;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    Manager.prototype.internal_init = function () {
        if (this._inited)
            return;
        this._inited = true;
        this.onInit();
    };
    Manager.prototype.on = function (event, callback, target, once) {
        if (once === void 0) { once = false; }
        if (!this._eventMap.has(event)) {
            this._eventMap.set(event, []);
        }
        var list = this._eventMap.get(event);
        if (list && list.find(function (info) { return info.target == target && info.callback == callback; })) {
            return;
        }
        list.push({ callback: callback, target: target, once: once });
    };
    Manager.prototype.off = function (event, callback, target) {
        if (!this._eventMap.has(event)) {
            return;
        }
        var list = this._eventMap.get(event);
        var index = list && list.findIndex(function (info) { return info.callback == callback && info.target == target; });
        if (index == -1)
            return;
        list.splice(index, 1);
    };
    Manager.prototype.emit = function (event) {
        var _a;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (!this._eventMap.has(event)) {
            return;
        }
        var list = this._eventMap.get(event);
        for (var i = 0; i < list.length; i++) {
            var info = list[i];
            (_a = info.callback).call.apply(_a, __spreadArrays([info.target], params));
            if (info.once) {
                list.splice(i, 1);
                i--;
            }
        }
    };
    Manager = __decorate([
        ccclass('Manager')
    ], Manager);
    return Manager;
}());
exports.Manager = Manager;

cc._RF.pop();