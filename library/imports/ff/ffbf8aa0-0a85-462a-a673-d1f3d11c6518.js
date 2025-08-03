"use strict";
cc._RF.push(module, 'ffbf8qgCoVGKqZz0fPRHGUY', 'VMAvatar');
// script/framework/component/VMAvatar.ts

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
var VMBase_1 = require("./VMBase");
var UIHelp_1 = require("../ui/UIHelp");
var Log_1 = require("../../utils/Log");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, executeInEditMode = _a.executeInEditMode, help = _a.help;
var AVATAR_TYPE;
(function (AVATAR_TYPE) {
    AVATAR_TYPE[AVATAR_TYPE["URL"] = 0] = "URL";
    AVATAR_TYPE[AVATAR_TYPE["LOCAL"] = 1] = "LOCAL";
})(AVATAR_TYPE || (AVATAR_TYPE = {}));
/**
 *  [VM-Avatar]
 *  加载头像,网络or本地
 */
var VMAvatar = /** @class */ (function (_super) {
    __extends(VMAvatar, _super);
    function VMAvatar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.watchPath = "";
        _this.avatarTpye = AVATAR_TYPE.URL;
        _this.dAtlas = null;
        return _this;
    }
    VMAvatar.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
    };
    VMAvatar.prototype.start = function () {
        if (CC_EDITOR)
            return;
        this.onValueInit();
    };
    /**初始化获取数据 */
    VMAvatar.prototype.onValueInit = function () {
        Log_1.Log.log("avatar onValueInit");
        this.setSpriteImage(this.VM.getValue(this.watchPath));
    };
    /**监听数据发生了变动的情况 */
    VMAvatar.prototype.onValueChanged = function (n, o, pathArr) {
        this.setSpriteImage(n);
    };
    VMAvatar.prototype.setSpriteImage = function (value) {
        if (this.avatarTpye == AVATAR_TYPE.LOCAL) {
            if (this.dAtlas) {
                UIHelp_1.default.SetSpriteFrame(this.node, this.dAtlas, value);
            }
            else {
                Log_1.Log.error("没有绑定头像图集");
            }
        }
        else {
            UIHelp_1.default.SetSpriteFrame(this.node, value);
        }
    };
    __decorate([
        property()
    ], VMAvatar.prototype, "watchPath", void 0);
    __decorate([
        property({
            type: cc.Enum(AVATAR_TYPE),
            tooltip: "网络or本地"
        })
    ], VMAvatar.prototype, "avatarTpye", void 0);
    __decorate([
        property({
            type: cc.SpriteAtlas,
            tooltip: '本地图片图集',
            visible: function () { return this.avatarTpye == AVATAR_TYPE.LOCAL; }
        })
    ], VMAvatar.prototype, "dAtlas", void 0);
    VMAvatar = __decorate([
        ccclass,
        executeInEditMode,
        menu('ModelViewer/VM-Avatar(网络or本地头像)')
    ], VMAvatar);
    return VMAvatar;
}(VMBase_1.default));
exports.default = VMAvatar;

cc._RF.pop();