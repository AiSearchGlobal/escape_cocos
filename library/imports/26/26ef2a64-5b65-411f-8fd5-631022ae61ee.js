"use strict";
cc._RF.push(module, '26ef2pkW2VBH4/VYxAirmHu', 'Holder');
// script/framework/adapter/abstract/Holder.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Holder = void 0;
var helper_1 = require("../help/helper");
var ModelManager_1 = require("../manager/ModelManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
// @ccclass
var Holder = /** @class */ (function () {
    function Holder(node, code, adapter) {
        this._fixedIndex = -1;
        this._oldData = null;
        this._oldElement = null;
        this._isCallCreated = false;
        this._isLayout = false;
        this._node = node;
        this._code = code;
        this._adapter = adapter;
        this._transform = node;
    }
    Object.defineProperty(Holder.prototype, "node", {
        get: function () { return this._node; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Holder.prototype, "transform", {
        get: function () { return this._transform; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Holder.prototype, "code", {
        get: function () { return this._code; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Holder.prototype, "adapter", {
        get: function () { return this._adapter; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Holder.prototype, "model", {
        get: function () { return this._model; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Holder.prototype, "view", {
        get: function () { return this._view; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Holder.prototype, "data", {
        get: function () { return this._model && this._model.data; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Holder.prototype, "fixedIndex", {
        get: function () { return this._fixedIndex; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Holder.prototype, "oldData", {
        get: function () { return this._oldData; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Holder.prototype, "element", {
        get: function () { return this._model && this._model.element; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Holder.prototype, "index", {
        get: function () { return this._model && this._model.index; },
        enumerable: false,
        configurable: true
    });
    /** @deprecated 内部方法，调用会爆炸💥 */
    Holder.prototype.internal_visible = function (view, model, isNew) {
        var _this = this;
        this._view = view;
        this._model = model;
        this._oldElement = Object.assign({}, model.element);
        this._model.element.update = this._updateElement.bind(this);
        this._oldData = this.data;
        if (!isNew)
            return;
        this.node.active = true;
        if (!this._isCallCreated) {
            this._isCallCreated = true;
            this.onCreated();
        }
        if (this.element.fixed) {
            this._fixedIndex = this.view.group.models.findIndex(function (item) { return item.index == _this.model.index; });
        }
        this.transform.setContentSize(this.model.size.x, this.model.size.y);
        this.node.setScale(this.model.scale.x, this.model.scale.y);
        this._register();
        this.onVisible();
        this._model.update = this._updateHandler.bind(this);
    };
    Holder.prototype._updateElement = function () {
        if (this._oldElement.layer != this.element.layer) {
            this.node.parent = this.adapter.scrollManager.getLayerNode(this.element.layer);
            this._oldElement.layer = this.element.layer;
        }
        if (this._oldElement.wrapAfterMode != this.element.wrapAfterMode ||
            this._oldElement.wrapBeforeMode != this.element.wrapBeforeMode ||
            this._oldElement.ignoreLayout != this.element.ignoreLayout ||
            this.element.ignoreLayout && this._oldElement.placeholder != this.element.placeholder) {
            this.adapter.viewManager.internal_updateVisibleView(this.model.index);
            this._oldElement.wrapAfterMode = this.element.wrapAfterMode;
            this._oldElement.wrapBeforeMode = this.element.wrapBeforeMode;
            this._oldElement.ignoreLayout = this.element.ignoreLayout;
            this._oldElement.placeholder = this.element.placeholder;
        }
    };
    Holder.prototype._updateHandler = function () {
        this._model.update = function () { };
        this.onVisible();
        this._model.update = this._updateHandler.bind(this);
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    Holder.prototype.internal_disable = function () {
        this.adapter.scrollManager.internal_disableTouchTarget(this.node);
        this.onDisable();
        this._unregister();
        this._model.update = function () { };
        this._model.element.update = function () { };
        this._view = null;
        this._model = null;
        this._fixedIndex = -1;
        this._isLayout = false;
        this._oldData = null;
        this.node.active = false;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    Holder.prototype.internal_layout = function () {
        var size = { x: this.model.size.x, y: this.model.size.y };
        if (this.adapter.layoutManager.isControlMainAxisSize) {
            size[this.adapter.mainAxis] = this.model.layoutSize[this.adapter.mainAxis];
        }
        if (this.adapter.layoutManager.isControlCrossAxisSize) {
            size[this.adapter.crossAxis] = this.model.layoutSize[this.adapter.crossAxis];
        }
        this._isLayout = true;
        this.transform.setContentSize(size.x, size.y);
        this._isLayout = false;
        this.node.setPosition(this.model.position.x, this.model.position.y);
    };
    Holder.prototype._register = function () {
        this.node.on(cc.Node.EventType.SIZE_CHANGED, this._onSizeChanged, this);
        this.node.on(cc.Node.EventType.SCALE_CHANGED, this._onScaleChanged, this);
        this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this._onAnchorPointChanged, this);
        this._adapter.modelManager.on(ModelManager_1.ModelManager.Event.ON_UPDATE, this._updateHandler, this);
    };
    Holder.prototype._unregister = function () {
        this.node.off(cc.Node.EventType.SIZE_CHANGED, this._onSizeChanged, this);
        this.node.off(cc.Node.EventType.SCALE_CHANGED, this._onScaleChanged, this);
        this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this._onAnchorPointChanged, this);
        this._adapter.modelManager.off(ModelManager_1.ModelManager.Event.ON_UPDATE, this._updateHandler, this);
    };
    Holder.prototype._onSizeChanged = function () {
        if (this._isLayout)
            return;
        var isMainAxisEqual = helper_1.Helper.approximately(this.model.size[this.adapter.mainAxis], helper_1.Helper.sizeToVec(this.transform.getContentSize())[this.adapter.mainAxis]);
        var isCrossAxisEqual = helper_1.Helper.approximately(this.model.size[this.adapter.crossAxis], helper_1.Helper.sizeToVec(this.transform.getContentSize())[this.adapter.crossAxis]);
        this.model.size.x = this.transform.width;
        this.model.size.y = this.transform.height;
        if (isMainAxisEqual && isCrossAxisEqual) {
            return;
        }
        this.view.internal_holderChanged(isMainAxisEqual);
    };
    Holder.prototype._onScaleChanged = function (type) {
        // if (type != Node.TransformBit.SCALE) return
        // 如果未勾选缩放控制 则不关心缩放变化
        if (!this.adapter.layoutManager.controlScaleWidth && !this.adapter.layoutManager.controlScaleHeight) {
            return;
        }
        var isMainAxisEqual = helper_1.Helper.approximately(this.model.scale[this.adapter.mainAxis], this.node.scale[this.adapter.mainAxis]);
        var isCrossAxisEqual = helper_1.Helper.approximately(this.model.scale[this.adapter.crossAxis], this.node.scale[this.adapter.crossAxis]);
        this.model.scale.x = this.node.scaleX;
        this.model.scale.y = this.node.scaleY;
        if (isMainAxisEqual && isCrossAxisEqual) {
            return;
        }
        this.view.internal_holderChanged(isMainAxisEqual);
    };
    Holder.prototype._onAnchorPointChanged = function () {
        var isMainAxisEqual = helper_1.Helper.approximately(this.model.anchorPoint[this.adapter.mainAxis], this.transform.getAnchorPoint()[this.adapter.mainAxis]);
        var isCrossAxisEqual = helper_1.Helper.approximately(this.model.anchorPoint[this.adapter.crossAxis], this.transform.getAnchorPoint()[this.adapter.crossAxis]);
        this.model.anchorPoint.x = this.transform.anchorX;
        this.model.anchorPoint.y = this.transform.anchorY;
        if (isMainAxisEqual && isCrossAxisEqual) {
            return;
        }
        this.view.internal_holderChanged(isMainAxisEqual);
    };
    return Holder;
}());
exports.Holder = Holder;

cc._RF.pop();