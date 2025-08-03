"use strict";
cc._RF.push(module, '71a1dw+pQJCMJGxCIJTziRn', 'View');
// script/framework/adapter/abstract/View.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
var debug_1 = require("../define/debug");
var enum_1 = require("../define/enum");
var helper_1 = require("../help/helper");
var LayoutManager_1 = require("../manager/LayoutManager");
var ViewManager_1 = require("../manager/ViewManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
// @ccclass
var View = /** @class */ (function () {
    function View(adapter) {
        this._total = 0;
        this._innerSize = 0;
        this._group = null;
        this._holderList = [];
        this._tempHolderList = [];
        this._adapter = adapter;
        this.internal_reset();
        this.__createDebug();
    }
    Object.defineProperty(View.prototype, "isOverflowFixed", {
        get: function () { return this._isOverflowFixed; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(View.prototype, "adapter", {
        get: function () { return this._adapter; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(View.prototype, "group", {
        get: function () { return this._group; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(View.prototype, "holderList", {
        get: function () { return this._holderList; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(View.prototype, "index", {
        get: function () {
            if (!this.group)
                return -1;
            return this.group.index;
        },
        enumerable: false,
        configurable: true
    });
    View.prototype.__createDebug = function () {
        if (debug_1.ADAPTER_DEBUG_VIEW) {
            var obj = new cc.Node("__DEBUG_VIEW_RECT__");
            obj.parent = this.adapter.scrollManager.content;
            // obj.layer = this.adapter.scrollManager.content.node.layer
            this.__debug_graphics = obj.addComponent(cc.Graphics);
            this.__debug_graphics.lineWidth = debug_1.DEBUG_DRAW_LIND_WIDTH;
            this.__debug_graphics.strokeColor = debug_1.DEBUG_DRAW_LINE_COLOR;
        }
    };
    View.prototype.__drawDebug = function () {
        if (!this.__debug_graphics || !this.group)
            return;
        this.__debug_graphics.clear();
        // if (this.index != 0) return
        var mainAxis = this.adapter.mainAxis;
        var crossAxis = this.adapter.crossAxis;
        var position = { x: 0, y: 0 };
        var size = { x: this.group.size.x, y: this.group.size.y };
        var anchor = { x: this.group.anchorPoint.x, y: this.group.anchorPoint.y };
        position[mainAxis] = this.group.position[mainAxis] - size[mainAxis] * anchor[mainAxis];
        position[mainAxis] += debug_1.DEBUG_DRAW_LIND_WIDTH * 0.5;
        position[crossAxis] = this.group.position[crossAxis] - size[crossAxis] * (1 - anchor[crossAxis]);
        position[crossAxis] += debug_1.DEBUG_DRAW_LIND_WIDTH * 0.5;
        size[mainAxis] -= debug_1.DEBUG_DRAW_LIND_WIDTH;
        size[crossAxis] -= debug_1.DEBUG_DRAW_LIND_WIDTH;
        this.__debug_graphics.roundRect(position.x, position.y, size.x, size.y, 2);
        this.__debug_graphics.stroke();
    };
    View.prototype.getFixedHolders = function () {
        if (!this.group.isFixed)
            return [];
        var list = [];
        var length = this.holderList.length;
        for (var i = 0; i < length; i++) {
            var holder = this.holderList[i];
            if (holder.model.element.fixed) {
                list.push(holder);
            }
        }
        return list;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    View.prototype.internal_isWrap = function (model, group) {
        var wrap = false;
        var prev = group && group.models[group.models.length - 1];
        if (prev) { //当前view为空 所以无论什么设置都不换行
            switch (model.element.wrapBeforeMode) {
                case enum_1.WrapMode.Wrap:
                    wrap = true;
                    break;
                case enum_1.WrapMode.Nowrap:
                    // 判断前一个是否允许在其后排列
                    wrap = prev.element.wrapAfterMode == enum_1.WrapMode.Wrap;
                    break;
                case enum_1.WrapMode.Auto:
                    wrap = prev.element.wrapAfterMode == enum_1.WrapMode.Wrap;
                    if (!wrap) { //前一个允许排列其后，计算是否已填满
                        wrap = this._calculateInnerSize(model, group);
                    }
                    break;
            }
        }
        return wrap;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    View.prototype.internal_reset = function () {
        this._group = null;
        this._innerSize = 0;
        this._total = 0;
        this._holderList.length = 0;
        this._isOverflowFixed = true;
        this._tempHolderList.length = 0;
        if (this.__debug_graphics) {
            this.__debug_graphics.clear();
        }
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    View.prototype.internal_push = function (model) {
        this._total++;
        var mainAxis = this.adapter.mainAxis;
        var crossAxis = this.adapter.crossAxis;
        if (!model.element.ignoreLayout || model.element.ignoreLayout && model.element.placeholder) {
            if (this._innerSize != 0) {
                this._innerSize += this.adapter.layoutManager.spacing;
            }
            this._innerSize += model.size[crossAxis];
        }
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    View.prototype.internal_recycleHolders = function (done) {
        for (var i = 0; i < this._holderList.length; i++) {
            var holder = this._holderList[i];
            holder.internal_disable();
            done(holder);
        }
        this._holderList.length = 0;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    View.prototype.internal_preVisible = function (group, findHolder) {
        this._group = group;
        this._createHolders(findHolder);
        return this;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    View.prototype.internal_visible = function () {
        this.register();
        for (var i = 0; i < this._tempHolderList.length; i++) {
            var _a = this._tempHolderList[i], holder = _a.holder, model = _a.model, isNew = _a.isNew;
            holder.internal_visible(this, model, isNew);
        }
        this._tempHolderList.length = 0;
        this.adapter.layoutManager.layout(this.group);
        this.onVisible();
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    View.prototype.internal_disable = function () {
        this.adapter.layoutManager.unLayout(this.index);
        this.unregister();
        this.onDisable();
        this.internal_reset();
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    View.prototype.internal_holderChanged = function (isMainAxisEqual) {
        var layoutSelf = true;
        var mainAxis = this.adapter.mainAxis;
        var oldMainAxisSize = this.group.size[mainAxis];
        if (!isMainAxisEqual) {
            var size = 0;
            for (var i = 0; i < this.group.models.length; i++) {
                var model = this.group.models[i];
                var mainAxisSize = model.size[mainAxis];
                if (this.adapter.isVertical && this.adapter.layoutManager.controlScaleHeight
                    || this.adapter.isHorizontal && this.adapter.layoutManager.controlScaleWidth) {
                    mainAxisSize *= model.scale[mainAxis];
                }
                size = Math.max(size, mainAxisSize);
            }
            if (!helper_1.Helper.approximately(this.group.size[mainAxis], size)) {
                this.group.oldSize[mainAxis] = this.group.size[mainAxis];
                this.group.size[mainAxis] = size;
                layoutSelf = false;
            }
        }
        if (layoutSelf) {
            // 交叉轴改变 不影响主轴 只布局自己
            this.adapter.layoutManager.layout(this.group);
        }
        else {
            // 主轴改变 交给viewManager来重新计算所有受影响的view
            this.adapter.viewManager.internal_viewChanged(this, oldMainAxisSize);
        }
    };
    View.prototype.register = function () {
        this.adapter.viewManager.on(ViewManager_1.ViewManager.Event.ON_SCROLL, this._onScroll, this);
        this.adapter.viewManager.on(ViewManager_1.ViewManager.Event.ON_LATEUPDATE, this._onLateUpdate, this);
        this.adapter.layoutManager.on(LayoutManager_1.LayoutManager.Event.ON_LAYOUT_COMPLATED, this._onLayoutComplated, this);
        this.adapter.layoutManager.on(LayoutManager_1.LayoutManager.Event.ON_CHANGED_LAYOUT_STATE, this._onChangedLayoutState, this);
    };
    View.prototype.unregister = function () {
        this.adapter.viewManager.off(ViewManager_1.ViewManager.Event.ON_SCROLL, this._onScroll, this);
        this.adapter.viewManager.off(ViewManager_1.ViewManager.Event.ON_LATEUPDATE, this._onLateUpdate, this);
        this.adapter.layoutManager.off(LayoutManager_1.LayoutManager.Event.ON_LAYOUT_COMPLATED, this._onLayoutComplated, this);
        this.adapter.layoutManager.off(LayoutManager_1.LayoutManager.Event.ON_CHANGED_LAYOUT_STATE, this._onChangedLayoutState, this);
    };
    View.prototype._createHolders = function (findHolder) {
        var mainAxis = this.adapter.mainAxis;
        this._tempHolderList.length = 0;
        for (var i = 0; i < this.group.models.length; i++) {
            var model = this.group.models[i];
            var isNew = false;
            var holder = findHolder && findHolder(model);
            if (!holder) {
                holder = this.adapter.viewManager.internal_getHolder(model);
                isNew = true;
            }
            // 处理开启了延迟布局时导致的当前帧position=0的情况 预先设置一个默认值
            model.position[mainAxis] = this.group.position[mainAxis];
            this._holderList.push(holder);
            this._tempHolderList.push({ holder: holder, model: model, isNew: isNew });
        }
    };
    View.prototype._calculateInnerSize = function (model, group) {
        if (this._total == 0)
            return false;
        var size = model.size[this.adapter.crossAxis];
        return this._innerSize + size + this.adapter.layoutManager.spacing > group.size[this.adapter.crossAxis];
    };
    View.prototype._onLayoutComplated = function (complatedIndexs) {
        if (complatedIndexs.indexOf(this.index) != -1) {
            for (var i = 0; i < this.holderList.length; i++) {
                var holder = this.holderList[i];
                holder.internal_layout();
            }
            if (this.group.isFixed) {
                this._calcFixedPosition();
            }
        }
    };
    View.prototype._calcFixedPosition = function () {
        var length = this._holderList.length;
        var mainAxis = this.adapter.mainAxis;
        for (var i = 0; i < length; i++) {
            var holder = this._holderList[i];
            if (!holder.element.fixed)
                continue;
            var position = { x: holder.model.position.x, y: holder.model.position.y };
            var relativeOffset = 0;
            var boundary = this._getModelBoundary(holder.model);
            if (this._isNeedFixed(boundary)) {
                position[mainAxis] -= boundary;
                var holderList = this.adapter.viewManager.getNextFixedHolders(this.index);
                relativeOffset = this._getRelativeNextHolderOffset(holder, holderList);
            }
            position[mainAxis] += relativeOffset * this.adapter.multiplier;
            if (position[mainAxis] != holder.node.position[mainAxis]) {
                holder.node.setPosition(position.x, position.y);
            }
        }
    };
    /** 当布局参数改变时 重新计算布局 */
    View.prototype._onChangedLayoutState = function () {
        this.adapter.layoutManager.layout(this.group);
    };
    View.prototype._onScroll = function () {
        if (!this.group.isFixed || this._holderList.length == 0)
            return;
        this._calcFixedPosition();
    };
    View.prototype._onLateUpdate = function (deltaTime) {
        if (debug_1.ADAPTER_DEBUG_VIEW && this.group) {
            this.__drawDebug();
        }
    };
    View.prototype._isNeedFixed = function (boundary) {
        return this.adapter.multiplier == 1 ? boundary >= 0 : boundary <= 0;
    };
    View.prototype._getModelBoundary = function (model) {
        var fixedOffset = helper_1.Helper.isNumber(model.element.fixedOffset) ? model.element.fixedOffset : 0;
        return this.adapter.multiplier == 1
            ? this._getModelHeaderBoundary(model) + fixedOffset
            : this._getModelFooterBoundary(model) - fixedOffset;
    };
    View.prototype._getModelHeaderBoundary = function (model) {
        var mainAxis = this.adapter.mainAxis;
        return model.position[mainAxis]
            + model.size[mainAxis]
                * (1 - model.anchorPoint[mainAxis])
                * model.scale[mainAxis]
            + this.adapter.scrollManager.contentPosition;
    };
    View.prototype._getModelFooterBoundary = function (model) {
        var mainAxis = this.adapter.mainAxis;
        return model.position[mainAxis]
            - model.size[mainAxis]
                * model.anchorPoint[mainAxis]
                * model.scale[mainAxis]
            + this.adapter.scrollManager.contentPosition;
    };
    View.prototype._getModelSizeWithSpacing = function (model) {
        var mainAxis = this.adapter.mainAxis;
        var fixedOffset = helper_1.Helper.isNumber(model.element.fixedOffset) ? model.element.fixedOffset : 0;
        var spacing = helper_1.Helper.isNumber(model.element.fixedSpacing) ? model.element.fixedSpacing : this.adapter.viewManager.spacing;
        return model.size[mainAxis] * model.scale[mainAxis] + fixedOffset + spacing;
    };
    View.prototype._getReatureRelativeBoundary = function (model, offset) {
        var boundary = this.adapter.multiplier == 1
            ? this._getModelHeaderBoundary(model)
            : this._getModelFooterBoundary(model);
        var value = this.adapter.multiplier == 1
            ? boundary + offset
            : offset - boundary;
        return Math.min(value, offset);
    };
    View.prototype._getRelativeNextHolderOffset = function (currentHolder, holderList) {
        var length = holderList.length;
        var crossAxis = this.adapter.crossAxis;
        var sizeSpacing = this._getModelSizeWithSpacing(currentHolder.model);
        var relativeOffset = 0;
        for (var i = 0; i < length; i++) {
            var holder = holderList[i];
            var offset = this._getReatureRelativeBoundary(holder.model, sizeSpacing);
            var sameScale = currentHolder.model.scale[crossAxis] == holder.model.scale[crossAxis];
            var sameSize = currentHolder.model.size[crossAxis] == holder.model.size[crossAxis];
            if (currentHolder.fixedIndex == holder.fixedIndex && sameScale && sameSize) {
                relativeOffset = offset > 0 ? offset : 0;
                break;
            }
            if (offset > 0) {
                relativeOffset = Math.max(relativeOffset, offset);
            }
        }
        return relativeOffset;
    };
    return View;
}());
exports.View = View;

cc._RF.pop();