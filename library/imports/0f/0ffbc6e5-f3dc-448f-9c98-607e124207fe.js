"use strict";
cc._RF.push(module, '0ffbcbl89xEj5yYYH4SQgf+', 'i18nSprite');
// script/framework/i18n/i18nSprite.ts

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
exports.i18nSprite = void 0;
var i18nMgr_1 = require("./i18nMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, disallowMultiple = _a.disallowMultiple, requireComponent = _a.requireComponent, menu = _a.menu;
var i18nSprite = /** @class */ (function (_super) {
    __extends(i18nSprite, _super);
    function i18nSprite() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.i18n_string = "";
        return _this;
    }
    i18nSprite.prototype.start = function () {
        i18nMgr_1.i18nMgr._addOrDelSprite(this, true);
        this._resetValue();
    };
    Object.defineProperty(i18nSprite.prototype, "string", {
        get: function () {
            return this.i18n_string;
        },
        set: function (value) {
            this.i18n_string = value;
            var sprite = this.getComponent(cc.Sprite);
            if (cc.isValid(sprite)) {
                i18nMgr_1.i18nMgr._getSprite(value, function (spriteFrame) {
                    if (cc.isValid(sprite)) {
                        sprite.spriteFrame = spriteFrame;
                    }
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    i18nSprite.prototype._resetValue = function () {
        this.string = this.i18n_string;
    };
    i18nSprite.prototype.onDestroy = function () {
        i18nMgr_1.i18nMgr._addOrDelSprite(this, false);
    };
    __decorate([
        property({ visible: false })
    ], i18nSprite.prototype, "i18n_string", void 0);
    __decorate([
        property({ type: cc.String })
    ], i18nSprite.prototype, "string", null);
    i18nSprite = __decorate([
        ccclass,
        executeInEditMode,
        requireComponent(cc.Sprite),
        disallowMultiple,
        menu("多语言/i18nSprite")
    ], i18nSprite);
    return i18nSprite;
}(cc.Component));
exports.i18nSprite = i18nSprite;

cc._RF.pop();