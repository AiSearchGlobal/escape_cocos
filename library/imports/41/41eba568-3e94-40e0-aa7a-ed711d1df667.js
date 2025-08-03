"use strict";
cc._RF.push(module, '41ebaVoPpRA4Kp67XEdHfZn', 'i18nLabel');
// script/framework/i18n/i18nLabel.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18nLabel = exports.replaceMatchingCharacters = void 0;
var i18nMgr_1 = require("./i18nMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, disallowMultiple = _a.disallowMultiple, menu = _a.menu;
function replaceMatchingCharacters(inputStr, pattern, replacement) {
    // 如果pattern不是正则表达式，则转换为正则表达式
    var regexPattern;
    if (typeof pattern === 'string') {
        // 转义特殊字符以确保安全地创建正则表达式
        var escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        regexPattern = new RegExp(escapedPattern, 'g');
    }
    else {
        regexPattern = pattern;
    }
    // 使用replace方法进行替换
    return inputStr.replace(regexPattern, replacement);
}
exports.replaceMatchingCharacters = replaceMatchingCharacters;
var i18nLabel = /** @class */ (function (_super) {
    __extends(i18nLabel, _super);
    function i18nLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.i18n_string = "";
        _this.i18n_params = [];
        return _this;
    }
    Object.defineProperty(i18nLabel.prototype, "i18n_key", {
        get: function () {
            return this.i18n_string;
        },
        set: function (value) {
            this.i18n_string = value;
            this.setEndValue();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(i18nLabel.prototype, "params", {
        get: function () {
            return this.i18n_params;
        },
        set: function (value) {
            this.i18n_params = value;
            this.setEndValue();
        },
        enumerable: false,
        configurable: true
    });
    i18nLabel.prototype.start = function () {
        i18nMgr_1.i18nMgr._addOrDelLabel(this, true);
        this._resetValue();
    };
    i18nLabel.prototype.init = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (this.params.length == 0) {
            this.i18n_string = String(params[0]);
        }
        else if (params.length >= 1) {
            this.i18n_params = params;
        }
        this.setEndValue();
    };
    i18nLabel.prototype.setEndValue = function () {
        if (this.i18n_string) {
            var str = i18nMgr_1.i18nMgr._getLabel(this.i18n_string, this.i18n_params);
            this.string = replaceMatchingCharacters(str, 'GSP', window.currencyName);
        }
    };
    i18nLabel.prototype._resetValue = function () {
        this.i18n_key = this.i18n_string;
    };
    i18nLabel.prototype.onDestroy = function () {
        i18nMgr_1.i18nMgr._addOrDelLabel(this, false);
    };
    __decorate([
        property({ type: cc.String })
    ], i18nLabel.prototype, "i18n_key", null);
    __decorate([
        property({ type: [cc.String] })
    ], i18nLabel.prototype, "params", null);
    __decorate([
        property({ visible: false })
    ], i18nLabel.prototype, "i18n_string", void 0);
    __decorate([
        property({ visible: false })
    ], i18nLabel.prototype, "i18n_params", void 0);
    i18nLabel = __decorate([
        ccclass,
        executeInEditMode,
        disallowMultiple,
        menu("多语言/i18nLabel")
    ], i18nLabel);
    return i18nLabel;
}(cc.Label));
exports.i18nLabel = i18nLabel;

cc._RF.pop();