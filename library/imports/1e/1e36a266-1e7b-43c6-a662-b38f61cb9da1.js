"use strict";
cc._RF.push(module, '1e36aJmHntDxqZis49hy52h', 'i18nMgr');
// script/framework/i18n/i18nMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18nMgr = void 0;
var Log_1 = require("../../utils/Log");
var i18nMgr = /** @class */ (function () {
    function i18nMgr() {
    }
    i18nMgr.getlanguage = function () {
        return cc.sys.localStorage.getItem("language") || "zh";
    };
    i18nMgr.checkInit = function () {
        if (!this.language) {
            var _language = cc.sys.localStorage.getItem("language") || "zh";
            this.setLanguage(_language);
        }
    };
    /**
     * 设置语言
     */
    i18nMgr.setLanguage = function (language) {
        if (this.language === language) {
            return;
        }
        this.language = language;
        cc.sys.localStorage.setItem("language", language);
        this.reloadLabel();
        this.reloadSprite();
    };
    /**
     * 添加或移除 i18nLabel
     */
    i18nMgr._addOrDelLabel = function (label, isAdd) {
        if (isAdd) {
            this.labelArr.push(label);
        }
        else {
            var index = this.labelArr.indexOf(label);
            if (index !== -1) {
                this.labelArr.splice(index, 1);
            }
        }
    };
    i18nMgr._getLabel = function (opt, params) {
        this.checkInit();
        if (params.length === 0) {
            return this.labelData[opt] || opt;
        }
        var str = this.labelData[opt] || opt;
        if (typeof str === 'number') {
            str = str.toString();
        }
        for (var i = 0; i < params.length; i++) {
            var reg = new RegExp("#" + i, "g");
            str = str.replace(reg, params[i]);
        }
        return str;
    };
    /**
     * 添加或移除 i18nSprite
     */
    i18nMgr._addOrDelSprite = function (sprite, isAdd) {
        if (isAdd) {
            this.spriteArr.push(sprite);
        }
        else {
            var index = this.spriteArr.indexOf(sprite);
            if (index !== -1) {
                this.spriteArr.splice(index, 1);
            }
        }
    };
    i18nMgr._getSprite = function (path, cb) {
        this.checkInit();
        cc.loader.loadRes("i18n/sprite/" + this.language + "/" + path, cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                return cb(null);
            }
            cb(spriteFrame);
        });
    };
    i18nMgr.reloadLabel = function () {
        var _this = this;
        var url = "i18n/label/" + this.language;
        cc.loader.loadRes(url, function (err, data) {
            if (err) {
                Log_1.Log.error(err);
                _this.labelData = {};
            }
            else {
                _this.labelData = data.json;
            }
            for (var _i = 0, _a = _this.labelArr; _i < _a.length; _i++) {
                var one = _a[_i];
                one._resetValue();
            }
        });
    };
    i18nMgr.reloadSprite = function () {
        for (var _i = 0, _a = this.spriteArr; _i < _a.length; _i++) {
            var one = _a[_i];
            one._resetValue();
        }
    };
    i18nMgr.labelArr = []; // i18nLabel 列表
    i18nMgr.labelData = {}; // 文字配置
    i18nMgr.spriteArr = []; // i18nSprite 列表
    i18nMgr.language = "";
    return i18nMgr;
}());
exports.i18nMgr = i18nMgr;

cc._RF.pop();