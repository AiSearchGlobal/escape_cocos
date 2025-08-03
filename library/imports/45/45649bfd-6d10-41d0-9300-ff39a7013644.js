"use strict";
cc._RF.push(module, '45649v9bRBB0JMA/zmnATZE', 'UIBase');
// script/framework/ui/UIBase.ts

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
var EventMng_1 = require("../manager/EventMng");
var AudioMng_1 = require("../manager/AudioMng");
var PREFAB_UI_DIR = 'prefab/';
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var VMParent_1 = require("../component/VMParent");
var Log_1 = require("../../utils/Log");
var UIBase = /** @class */ (function (_super) {
    __extends(UIBase, _super);
    function UIBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maskNode = null;
        _this.alertNode = null;
        return _this;
    }
    Object.defineProperty(UIBase.prototype, "tags", {
        get: function () {
            return this.mTag;
        },
        set: function (value) {
            this.mTag = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 得到prefab的路径，相对于resources目录
     */
    UIBase.getUrl = function () {
        return PREFAB_UI_DIR + this.prefabUrl;
    };
    /**
     * 类名，用于给UI命名
     */
    UIBase.getName = function () {
        return this.className;
    };
    /* ----------------------------- 以下方法不能在子类重写 ----------------------------- */
    /**初始化函数，在onLoad之前被调用，params为打开ui是传入的不定参数数组 */
    UIBase.prototype.init = function (params) {
        this.onInit(params);
    };
    /**onLoad 会在组件被首次加载的时候被回调。且优先于任何start */
    UIBase.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this._notifyEventList = new Map();
        this._registerEventList = new Map();
        this.onUILoad();
    };
    UIBase.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        this.onUIDestroy();
    };
    UIBase.prototype.onEnable = function () {
        this.onShow();
    };
    UIBase.prototype.onDisable = function () {
        this.onHide();
        var self = this;
        this._notifyEventList.forEach(function (f, key) {
            EventMng_1.default.off(key, f, self);
        }, this);
        this._notifyEventList.clear();
        this._registerEventList.forEach(function (f, key) {
            f["node"].off(f["type"]);
        }, this);
        this._registerEventList.clear();
    };
    /**注册notice事件，disable的时候会自动移除 */
    UIBase.prototype.initEvent = function (eventName, cb) {
        EventMng_1.default.on(eventName, cb, this);
        this._notifyEventList.set(eventName, cb);
    };
    UIBase.prototype.touchEvent = function (event) {
        event.stopPropagation();
    };
    UIBase.prototype.start = function () {
        if (this.maskNode) {
            var opacity = this.maskNode.opacity;
            this.maskNode.opacity = 0;
            cc.tween(this.maskNode).to(0.3, { opacity: opacity }).start();
        }
        if (this.alertNode) {
            this.alertNode.scale = 0;
            this.alertNode.opacity = 0;
            cc.tween(this.alertNode).to(0.3, { opacity: 255 }).start();
            cc.tween(this.alertNode).to(0.3, { scale: 1.2 }).to(0.1, { scale: 1 }).start();
        }
        this.onStart();
    };
    UIBase.prototype.update = function (dt) {
        this.onUpdate(dt);
    };
    /* ---------------------------------------------------------------------------------- */
    UIBase.prototype.onInit = function (params) {
    };
    UIBase.prototype.onUILoad = function () {
    };
    UIBase.prototype.onUIDestroy = function () {
    };
    UIBase.prototype.onShow = function () {
    };
    UIBase.prototype.onHide = function () {
    };
    UIBase.prototype.onStart = function () {
    };
    UIBase.prototype.onUpdate = function (dt) {
    };
    UIBase.prototype.onClose = function () {
    };
    /**
     * 注册touch事件
     * @param node
     * @param callback
     * @param target
     * @param playAudio 是否播放音效，默认播放
     */
    UIBase.prototype.onRegisterEvent = function (node, callback, audioclip, playAudio) {
        if (audioclip === void 0) { audioclip = 'ui_click'; }
        if (playAudio === void 0) { playAudio = true; }
        var btn = node.getComponent(cc.Button);
        var toggle = node.getComponent(cc.Toggle);
        var self = this;
        if (!node) {
            Log_1.Log.error("no node");
            return;
        }
        if (btn) {
            btn.node.on("click", function () {
                if (playAudio && AudioMng_1.audioCnf.click) {
                    AudioMng_1.AudioMng.getInstance().playSFX(audioclip);
                }
                callback.call(self, btn);
            }, self);
            this._registerEventList.set(node.uuid, { node: node, type: "click" });
        }
        else if (toggle) {
            toggle.node.on("toggle", function () {
                if (playAudio && AudioMng_1.audioCnf.click) {
                    AudioMng_1.AudioMng.getInstance().playSFX(audioclip);
                }
                callback.call(self, toggle);
            }, self);
            this._registerEventList.set(node.uuid, { node: node, type: "toggle" });
        }
        else {
            Log_1.Log.error("not btn or toggle");
        }
    };
    __decorate([
        property(cc.Node)
    ], UIBase.prototype, "maskNode", void 0);
    __decorate([
        property(cc.Node)
    ], UIBase.prototype, "alertNode", void 0);
    UIBase = __decorate([
        ccclass
    ], UIBase);
    return UIBase;
}(VMParent_1.default));
exports.default = UIBase;

cc._RF.pop();