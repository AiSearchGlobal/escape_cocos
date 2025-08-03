"use strict";
cc._RF.push(module, '6c212CgWnZM+7ueFzm9YvHL', 'ScrollManager');
// script/framework/adapter/manager/ScrollManager.ts

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
exports.ScrollManager = exports.ADAPTER = void 0;
// import { UITransform, Widget, _decorator, Node, cc.Event.EventTouch, Vec3, instantiate, cc.Event.EventMouse, macro, easing, NodeEventType, Label, sp, Graphics, Color } from 'cc';
var Manager_1 = require("../abstract/Manager");
var debug_1 = require("../define/debug");
var enum_1 = require("../define/enum");
var helper_1 = require("../help/helper");
var ViewManager_1 = require("./ViewManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var _tempPosition = new cc.Vec3();
exports.ADAPTER = '__ADAPTER__';
var Event;
(function (Event) {
    /** 滚动中 */
    Event[Event["ON_SCROLL"] = 0] = "ON_SCROLL";
    /** 更新滚动百分比 */
    Event[Event["ON_UPDATE_PERCENTAGE"] = 1] = "ON_UPDATE_PERCENTAGE";
    /** 当View 尺寸变化时 */
    Event[Event["ON_VIEW_SIZE_CHANGED"] = 2] = "ON_VIEW_SIZE_CHANGED";
    /** 当自动滚动即将停止时 */
    Event[Event["ON_ABOUT_TO_STOP"] = 3] = "ON_ABOUT_TO_STOP";
    /** 当滚动开始时 */
    Event[Event["ON_SCROLL_START"] = 4] = "ON_SCROLL_START";
    /** 当滚动抬起时 */
    Event[Event["ON_SCROLL_END"] = 5] = "ON_SCROLL_END";
    /** 当滚动取消时 */
    Event[Event["ON_SCROLL_CANCEL"] = 6] = "ON_SCROLL_CANCEL";
    /** 当主轴方向改变时 */
    Event[Event["ON_CHANGED_ORIENTATION"] = 7] = "ON_CHANGED_ORIENTATION";
    /** 当滚动到指定单行索引之前 */
    Event[Event["ON_SCROLL_TO_GROUPINDEX_BEFOR"] = 8] = "ON_SCROLL_TO_GROUPINDEX_BEFOR";
    /** 当滚动到指定单行索引之后 */
    Event[Event["ON_SCROLL_TO_GROUPINDEX_AFTER"] = 9] = "ON_SCROLL_TO_GROUPINDEX_AFTER";
    /** 当滚动到指定数据索引之后 */
    Event[Event["ON_SCROLL_TO_MODELINDEX_BEFOR"] = 10] = "ON_SCROLL_TO_MODELINDEX_BEFOR";
    /** 当滚动到指定数据索引之后 */
    Event[Event["ON_SCROLL_TO_MODELINDEX_AFTER"] = 11] = "ON_SCROLL_TO_MODELINDEX_AFTER";
})(Event || (Event = {}));
var ScrollManager = /** @class */ (function (_super) {
    __extends(ScrollManager, _super);
    function ScrollManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._view = null;
        _this._content = null;
        _this._orientation = enum_1.Orientation.Vertical;
        _this.touchMode = enum_1.TouchMode.Auto;
        _this.movementType = enum_1.MovementType.Elastic;
        _this.elasticity = 0.1;
        _this.inertia = true;
        _this.decelerationRate = 0.135;
        // TODO 鼠标滚轮暂时不做，感觉不是必要功能
        // @property scrollSensitivity: number = 0.01 
        _this.aboutToStopVelocity = 100;
        _this.cancelInnerEvents = true;
        _this.nestedMinThreshold = 0.001;
        _this.nestedMaxThreshold = 0.999;
        _this._boundaryOffset = 0;
        _this._viewWidget = null;
        _this._percentage = 0;
        _this._velocity = 0;
        _this._dragging = false;
        _this._scrolling = false;
        _this._isCanceledEvent = false;
        _this._contentStartPosition = new cc.Vec2();
        _this._prevContentPosition = new cc.Vec2();
        _this._nestedDirection = enum_1.NestedDirection.Both;
        _this._parentTouch = false;
        _this._stopCheckNested = false;
        _this._scrollHandlePercentage = null;
        _this._scrollHandlePosition = null;
        _this._isEmitAboutToStop = false;
        _this._isMyEventAndMoved = false;
        _this._scrollDirection = enum_1.ScrollDirection.None;
        _this._laseScrollDirection = enum_1.ScrollDirection.None;
        _this._touchEvent = null;
        _this.test = false;
        return _this;
    }
    Object.defineProperty(ScrollManager.prototype, "view", {
        get: function () { return this._view; },
        set: function (value) {
            this._view = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "content", {
        get: function () { return this._content; },
        set: function (value) {
            this._content = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "orientation", {
        get: function () { return this._orientation; },
        set: function (value) {
            if (value == this._orientation)
                return;
            this._orientation = value;
            this.emit(Event.ON_CHANGED_ORIENTATION);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "_viewMin", {
        get: function () { return -this.adapter.mainAxisSize; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "_viewMax", {
        get: function () { return this.adapter.mainAxisSize; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "_defaultMin", {
        get: function () { return this.adapter.multiplier == 1 ? -this.adapter.mainAxisSize : 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "_defaultMax", {
        get: function () { return this.adapter.multiplier == 1 ? 0 : this.adapter.mainAxisSize; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "isMyEventAndMoved", {
        get: function () { return this._isMyEventAndMoved; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "velocity", {
        get: function () { return this._velocity; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "scrollDirection", {
        get: function () { return this._scrollDirection; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "laseScrollDirection", {
        get: function () { return this._laseScrollDirection; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "percentage", {
        get: function () { return this._percentage; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "dragging", {
        get: function () { return this._dragging; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "boundaryOffset", {
        get: function () { return this._boundaryOffset; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "parentAdapter", {
        get: function () { return this._parentAdapter; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "canAutoScroll", {
        get: function () {
            return !this.dragging && this.adapter.viewManager.virtualSize > this.adapter.mainAxisSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "canTouch", {
        get: function () {
            if (this.touchMode == enum_1.TouchMode.AlwaysAllow) {
                return true;
            }
            if (this.touchMode == enum_1.TouchMode.Disabled) {
                return false;
            }
            if (this.adapter.centerManager.enabled) {
                return true;
            }
            if (this.adapter.releaseManager.enabled) {
                return true;
            }
            return this.adapter.viewManager.virtualSize > this.adapter.mainAxisSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollManager.prototype, "contentPosition", {
        get: function () {
            return this.content.position[this.adapter.mainAxis];
        },
        enumerable: false,
        configurable: true
    });
    ScrollManager.prototype.onInit = function () {
        var _this = this;
        this._initView();
        this._initContent();
        this._parentAdapter = this.adapter.getParentAdapter(this.adapter.node.parent);
        this.view[exports.ADAPTER] = true;
        this.adapter.viewManager.on(ViewManager_1.ViewManager.Event.ON_UPDATE_VIEWS, this._onUpdateViews, this);
        this.adapter.viewManager.on(ViewManager_1.ViewManager.Event.ON_CHANGED_VIRTUALSIZE, this._onChangedVirtualSize, this);
        this.adapter.viewManager.on(ViewManager_1.ViewManager.Event.ON_CHANGED_OVERFLOWHEADER, this._onChangedOverflowHeader, this);
        this.adapter.viewManager.on(ViewManager_1.ViewManager.Event.ON_RESET_ALL_STATE, this._onResetAllState, this);
        this.adapter.viewManager.on(ViewManager_1.ViewManager.Event.ON_CLEARVIEWS, this._onResetAllState, this);
        this.adapter.node.on(cc.Node.EventType.SIZE_CHANGED, this._onAdapterSizeChanged, this);
        this.view.on(cc.Node.EventType.SIZE_CHANGED, this._onViewSizeChanged, this);
        this._registerTouchEvent();
        this.__createDebug();
        this.adapter.scheduleOnce(function () {
            _this._updatePercentage();
        });
    };
    ScrollManager.prototype._initView = function () {
        if (!this.view) {
            throw Error("ScrollManager view 参数为空！");
        }
        var anchorPoint = { x: 0.5, y: 0.5 };
        anchorPoint[this.adapter.mainAxis] = this.adapter.mainAxisAnchorPoint;
        this.view.setAnchorPoint(anchorPoint.x, anchorPoint.y);
        var widget = this.view.getComponent(cc.Widget);
        if (!widget) {
            widget = this.view.addComponent(cc.Widget);
            widget.isAlignLeft = widget.isAlignRight = widget.isAlignTop = widget.isAlignBottom = true;
            widget.left = widget.right = widget.top = widget.bottom = 0;
        }
        widget.updateAlignment();
        this._viewWidget = widget;
    };
    ScrollManager.prototype.__createDebug = function () {
        if (debug_1.ADAPTER_DEBUG_CONTENT) {
            var obj = new cc.Node("__DEBUG_CONTENT_RECT__");
            obj.parent = this.view;
            // obj.layer = this.view.node.layer
            this.__debug_graphics = obj.addComponent(cc.Graphics);
            this.__debug_graphics.lineWidth = debug_1.DEBUG_DRAW_LIND_WIDTH;
            this.__debug_graphics.fillColor = debug_1.DEBUG_DRAW_FILL_COLOR;
            this.__debug_graphics.strokeColor = debug_1.DEBUG_DRAW_BORDER_COLOR;
        }
    };
    ScrollManager.prototype.__drawDebug = function () {
        if (!this.__debug_graphics)
            return;
        this.__debug_graphics.clear();
        var mainAxis = this.adapter.mainAxis;
        var crossAxis = this.adapter.crossAxis;
        var multiplier = this.adapter.multiplier;
        var position = { x: 0, y: 0 };
        var size = { x: 0, y: 0 };
        size[mainAxis] = this.adapter.viewManager.virtualSize;
        size[crossAxis] = this.adapter.crossAxisSize;
        position[mainAxis] = this.contentPosition - (size[mainAxis] * this.content.getAnchorPoint()[mainAxis]) * multiplier;
        position[mainAxis] += this.adapter.viewManager.overflowHeader;
        position[crossAxis] -= size[crossAxis] * this.view.getAnchorPoint()[crossAxis];
        this.__debug_graphics.fillRect(position.x, position.y, size.x, size.y);
        this.__debug_graphics.stroke();
    };
    ScrollManager.prototype._initContent = function () {
        if (!this.content) {
            throw Error("ScrollManager content 参数为空！");
        }
        this.content.setAnchorPoint(this.view.getAnchorPoint());
        var size = { x: 0, y: 0 };
        size[this.adapter.crossAxis] = helper_1.Helper.sizeToVec(this.view.getContentSize())[this.adapter.crossAxis];
        this.content.setContentSize(size.x, size.y);
        if (!this._layerLowest) {
            this._layerLowest = new cc.Node("_layerLowest");
            this._layerMedium = new cc.Node("_layerMedium");
            this._layerHighest = new cc.Node("_layerHighest");
            this.content.addChild(this._layerLowest);
            this.content.addChild(this._layerMedium);
            this.content.addChild(this._layerHighest);
        }
        this._updateContentPosition({ x: 0, y: 0 });
    };
    ScrollManager.prototype._registerTouchEvent = function () {
        this.view.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this, true);
        this.view.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this, true);
        this.view.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this, true);
        this.view.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this, true);
    };
    ScrollManager.prototype._bubbleToParent = function (event) {
        if (!this._parentAdapter)
            return;
        this._parentAdapter.scrollManager.view.dispatchEvent(event);
    };
    ScrollManager.prototype._emitCancelEvent = function (event) {
        if (this._isCanceledEvent)
            return;
        var deltaMove = event.getLocation();
        deltaMove.subSelf(event.getStartLocation());
        if (this.cancelInnerEvents && deltaMove.mag() > 7) {
            if (event.target !== this.view) {
                this._simulateEvent(event, cc.Node.EventType.MOUSE_LEAVE);
                this._simulateEvent(event, cc.Node.EventType.TOUCH_CANCEL);
                this._isCanceledEvent = true;
            }
        }
    };
    ScrollManager.prototype._simulateEvent = function (event, type, isSimulate) {
        if (isSimulate === void 0) { isSimulate = true; }
        if (!event)
            return;
        var _event = new cc.Event.EventTouch(event.getTouches(), event.bubbles);
        var target = event.target;
        _event.type = type;
        _event.touch = event.touch;
        _event.simulate = isSimulate;
        target.dispatchEvent(_event);
    };
    ScrollManager.prototype._onUpdateViews = function () {
        this._velocity = 0;
        this._updatePercentage();
    };
    ScrollManager.prototype._onChangedVirtualSize = function () {
        this._updatePercentage();
        if (this._scrollHandlePosition != null && this._scrollHandlePosition.change != null) {
            this._scrollHandlePosition.change();
        }
    };
    ScrollManager.prototype._onChangedOverflowHeader = function (overflowHeader) {
        this.__drawDebug();
    };
    ScrollManager.prototype._onResetAllState = function () {
        this._velocity = 0;
        this._scrolling = false;
        this._dragging = false;
        this._isMyEventAndMoved = false;
        this._scrollDirection = enum_1.ScrollDirection.None;
        this._percentage = 0;
        this._isEmitAboutToStop = false;
        this._boundaryOffset = 0;
        this._isCanceledEvent = false;
        this._parentTouch = false;
        this._stopCheckNested = false;
        this._scrollDirection = enum_1.ScrollDirection.None;
        this._touchEvent = null;
        this.stopScroll();
        this._initView();
        this._initContent();
    };
    /** 当adapter尺寸改变时 更新 view 尺寸 这里手动更新的原因是Widget不会自动更新 ...  */
    ScrollManager.prototype._onAdapterSizeChanged = function () {
        this._viewWidget.updateAlignment();
    };
    /** 当view尺寸改变时 */
    ScrollManager.prototype._onViewSizeChanged = function () {
        this.emit(Event.ON_VIEW_SIZE_CHANGED);
    };
    /** 是否由我来处理触摸事件 */
    ScrollManager.prototype._isMyEvent = function (event, useCaptures) {
        if (event.eventPhase == cc.Event.EventTouch.AT_TARGET || !useCaptures || useCaptures[0] == this.view && !event.target[exports.ADAPTER]) {
            return true;
        }
        return false;
    };
    ScrollManager.prototype._onTouchStart = function (event, useCaptures) {
        this._velocity = 0;
        this._dragging = true;
        this._isMyEventAndMoved = false;
        this._isCanceledEvent = false;
        this._parentTouch = false;
        this._stopCheckNested = false;
        this._isEmitAboutToStop = false;
        this._scrollDirection = enum_1.ScrollDirection.None;
        this._contentStartPosition.set(this.content.position);
        this._touchEvent = event;
        this.stopScroll();
        this._calcNestedDirection();
        this.emit(Event.ON_SCROLL_START);
    };
    ScrollManager.prototype._onTouchEnd = function (event, useCaptures) {
        this._dragging = false;
        this._touchEvent = null;
        this.emit(Event.ON_SCROLL_END, event);
    };
    ScrollManager.prototype._onTouchCancel = function (event, useCaptures) {
        if (event.simulate) {
            return;
        }
        this._dragging = false;
        this._touchEvent = null;
        this.emit(Event.ON_SCROLL_CANCEL, event);
    };
    ScrollManager.prototype._onTouchMove = function (event, useCaptures) {
        if (!this._isMyEvent(event, useCaptures)) {
            return;
        }
        // 取消Button事件
        this._emitCancelEvent(event);
        // 如果已经确定不能移动，直接抛给上层
        if (this._parentTouch || !this.canTouch) {
            return this._bubbleToParent(event);
        }
        // if (!this._touchEvent && this.adapter.centerManager.enabled) return
        if (!this._touchEvent)
            return;
        var mainAxis = this.adapter.mainAxis;
        var location = event.getLocation();
        var startLocation = event.getStartLocation();
        var pointerDelta = location.sub(startLocation);
        if (pointerDelta.equals(cc.v2())) {
            return;
        }
        var position = { x: 0, y: 0 };
        position[mainAxis] = this._contentStartPosition[mainAxis] + pointerDelta[mainAxis];
        var delta = position[mainAxis] - this.contentPosition;
        var offset = this.calcOffset(delta);
        var axis = this.adapter.isHorizontal ? -1 : 1;
        position[mainAxis] += axis * offset;
        if (this.movementType == enum_1.MovementType.Elastic && offset != 0) {
            position[mainAxis] -= axis * this._rubberDelta(offset, this.adapter.mainAxisSize);
        }
        // 这里判断是否移动了 如果移动了 则停止向上传播
        this._checkNested(event, position, this._parentAdapter);
        if (this._parentTouch) {
            this._bubbleToParent(event);
        }
        else {
            this._isMyEventAndMoved = true;
            this._updateContentPosition(position);
        }
    };
    ScrollManager.prototype._calcNestedDirection = function () {
        if (!this._parentAdapter)
            return;
        if (this.percentage <= this.nestedMinThreshold && !this.adapter.viewManager.loopHeader) {
            this._nestedDirection = this.adapter.multiplier == 1 ? enum_1.NestedDirection.Footer : enum_1.NestedDirection.Header;
        }
        else if (this.percentage >= this.nestedMaxThreshold && !this.adapter.viewManager.loopFooter) {
            this._nestedDirection = this.adapter.multiplier == 1 ? enum_1.NestedDirection.Header : enum_1.NestedDirection.Footer;
        }
        else {
            this._nestedDirection = enum_1.NestedDirection.Both;
        }
    };
    /** 当嵌套时 根据当前滑动方向 决定谁可以滑动，（自己 或 父级Adapter） */
    ScrollManager.prototype._checkNested = function (event, position, adapter) {
        if (!adapter || this._stopCheckNested)
            return;
        // 同方向
        if (this.orientation == adapter.scrollManager.orientation) {
            var offset = position[this.adapter.mainAxis] - this._contentStartPosition[this.adapter.mainAxis];
            if (Math.abs(offset) <= 0.1) {
                return;
            }
            if (this._nestedDirection == enum_1.NestedDirection.Footer) {
                if (offset < 0) {
                    this._parentTouch = true;
                }
            }
            else if (this._nestedDirection == enum_1.NestedDirection.Header) {
                if (offset > 0) {
                    this._parentTouch = true;
                }
            }
        }
        else {
            // 反方向
            var xOffset = 0, yOffset = 0;
            if (event instanceof cc.Event.EventTouch) {
                var start = event.getStartLocation();
                var curre = event.getLocation();
                xOffset = Math.abs(start.x - curre.x);
                yOffset = Math.abs(start.y - curre.y);
            }
            else {
                xOffset = Math.abs(event.getScrollX());
                yOffset = Math.abs(event.getScrollY());
            }
            if (xOffset == yOffset)
                return;
            if (xOffset > yOffset) {
                if (this.adapter.isVertical) {
                    this._parentTouch = true;
                }
            }
            else if (yOffset > xOffset) {
                if (this.adapter.isHorizontal) {
                    this._parentTouch = true;
                }
            }
        }
        if (!this._parentTouch && adapter.scrollManager.parentAdapter) {
            return this._checkNested(event, position, adapter.scrollManager.parentAdapter);
        }
        this._stopCheckNested = true;
    };
    /** 更新content坐标 */
    ScrollManager.prototype._updateContentPosition = function (position, updatePercentage) {
        if (updatePercentage === void 0) { updatePercentage = true; }
        this._updateScrollDirection(position);
        this.content.setPosition(position.x, position.y);
        this.emit(Event.ON_SCROLL, this._scrollDirection);
        // 这里顺序很重要 必须先发送滚动事件，然后再更新进度，否则可能内容还没有填充时 计算 this._calcOffset 会有偏移
        if (updatePercentage) {
            this._updatePercentage();
        }
        else {
            this.__drawDebug();
        }
    };
    /** 缓存当前content坐标 */
    ScrollManager.prototype._updatePrevContentPosition = function () {
        this._prevContentPosition.set(this.content.position);
    };
    /**
     * 更新进度 难啃的骨头马勒戈壁
     */
    ScrollManager.prototype._calcPercentage = function (contentPosition, offset) {
        var hiddenSize = this.internal_getHiddenSize();
        var loopHeader = this.adapter.viewManager.loopHeader;
        var loopFooter = this.adapter.viewManager.loopFooter;
        var multiplier = this.adapter.multiplier;
        var overflowHeader = this.adapter.viewManager.overflowHeader;
        var position = contentPosition * multiplier;
        if (this.adapter.isHorizontal) {
            position -= offset * multiplier;
        }
        else {
            position += offset * multiplier;
        }
        if (loopFooter) {
            hiddenSize += this.adapter.viewManager.spacing;
            position += (overflowHeader + hiddenSize * multiplier) * multiplier;
            if (this.adapter.centerManager.enabled) {
                position += this.adapter.centerManager.getContainerOffset();
            }
            else {
                position += this.adapter.paddingHeader;
            }
            position += 1;
            position = position % hiddenSize;
        }
        else if (loopHeader) {
            position += this.adapter.mainAxisSize - 1;
            if (this.adapter.centerManager.enabled) {
                position -= this.adapter.centerManager.getContainerOffset();
            }
            else {
                position -= this.adapter.paddingFooter;
            }
            position += (overflowHeader + hiddenSize * multiplier) * multiplier;
            var ok = contentPosition * -multiplier > overflowHeader * multiplier;
            if (ok) {
                position += this.adapter.viewManager.spacing;
            }
            position = position % hiddenSize;
        }
        else {
            position += overflowHeader * multiplier;
            if (this.adapter.centerManager.enabled) {
                position += this.adapter.centerManager.getContainerOffset();
            }
            else {
                position += this.adapter.paddingHeader;
            }
            if (position > hiddenSize) {
                position = hiddenSize;
            }
        }
        return position / hiddenSize;
    };
    ScrollManager.prototype._updatePercentage = function () {
        var offset = this.calcOffset();
        if (this.adapter.viewManager.virtualSize <= this.adapter.mainAxisSize) {
            this._percentage = 0;
        }
        else {
            this._percentage = this._calcPercentage(this.contentPosition, offset);
        }
        this.emit(Event.ON_UPDATE_PERCENTAGE, this._percentage, offset);
        this.__drawDebug();
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    ScrollManager.prototype.internal_disableTouchTarget = function (node) {
        // if (this.adapter.pageViewManager.enabled) return
        if (this._touchEvent && this._touchEvent.target.uuid == node.uuid) {
            var event = this._touchEvent;
            this._simulateEvent(event, cc.Node.EventType.TOUCH_CANCEL, false);
            this._simulateEvent(event, cc.Node.EventType.MOUSE_LEAVE, false);
            this._touchEvent = null;
        }
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    ScrollManager.prototype.internal_getHiddenSize = function () {
        var loopHeader = this.adapter.viewManager.loopHeader;
        var loopFooter = this.adapter.viewManager.loopFooter;
        var hiddenSize = this.adapter.viewManager.virtualSize;
        if (!loopHeader && !loopFooter && !this.adapter.centerManager.enabled) {
            hiddenSize -= this.adapter.mainAxisSize;
            hiddenSize += this.adapter.mainAxisPadding;
        }
        return hiddenSize;
    };
    ScrollManager.prototype._getContentMinBoundaryOffset = function (delta, position) {
        if (!this.adapter.viewManager.header || !this.adapter.centerManager.enabled && this.adapter.viewManager.virtualSize <= this.adapter.mainAxisSize) {
            if (this.adapter.isHorizontal) {
                return position + this._defaultMax + delta;
            }
            else {
                return position + this._defaultMin + delta;
            }
        }
        return this.adapter.viewManager.min + delta;
    };
    ScrollManager.prototype._getContentMaxBoundaryOffset = function (delta, position) {
        if (!this.adapter.viewManager.header || !this.adapter.centerManager.enabled && this.adapter.viewManager.virtualSize <= this.adapter.mainAxisSize) {
            if (this.adapter.isHorizontal) {
                return position + this._defaultMin + delta;
            }
            else {
                return position + this._defaultMax + delta;
            }
        }
        return this.adapter.viewManager.max + delta;
    };
    ScrollManager.prototype._getMaxBoundaryOffset = function (max) {
        var viewMax = this._viewMax;
        if (this.adapter.isHorizontal) {
            return this.adapter.isArrangeAxisStart ? max : viewMax + max;
        }
        else {
            return this.adapter.isArrangeAxisStart ? -max : viewMax - max;
        }
    };
    ScrollManager.prototype._getMinBoundaryOffset = function (min) {
        var viewMin = this._viewMin;
        if (this.adapter.isHorizontal) {
            return this.adapter.isArrangeAxisStart ? viewMin + min : min;
        }
        else {
            return this.adapter.isArrangeAxisStart ? viewMin - min : -min;
        }
    };
    ScrollManager.prototype._rubberDelta = function (overStretching, viewSize) {
        return (1 - (1 / ((Math.abs(overStretching) * 0.55 / viewSize) + 1))) * viewSize * Math.sign(overStretching);
    };
    ScrollManager.prototype._calcElastic = function (deltaTime, offset, out) {
        var mainAxis = this.adapter.mainAxis;
        var smoothTime = this.elasticity;
        if (this._scrolling) {
            smoothTime *= 3;
        }
        var axis = this.adapter.isHorizontal ? -1 : 1;
        var _a = helper_1.Helper.smoothDamp(this.contentPosition, this.contentPosition + axis * offset, this._velocity, smoothTime, helper_1.Helper.Infinity, deltaTime), velocity = _a.velocity, position = _a.position;
        if (Math.abs(velocity) < 1) {
            velocity = 0;
        }
        this._velocity = velocity;
        out[mainAxis] = position;
    };
    ScrollManager.prototype._calcInertia = function (deltaTime, out) {
        this._velocity *= Math.pow(this.decelerationRate, deltaTime);
        if (Math.abs(this._velocity) < 1) {
            this._velocity = 0;
        }
        out[this.adapter.mainAxis] += this._velocity * deltaTime;
    };
    ScrollManager.prototype._calcClamped = function (out) {
        var mainAxis = this.adapter.mainAxis;
        var boundary = out[mainAxis] - this.contentPosition;
        var offset = this.calcOffset(boundary);
        if (this.adapter.isHorizontal) {
            out[mainAxis] -= offset;
        }
        else {
            out[mainAxis] += offset;
        }
    };
    ScrollManager.prototype._updateScrollDirection = function (position) {
        var delta = position[this.adapter.mainAxis] - this.contentPosition;
        if (delta == 0) {
            this._scrollDirection = enum_1.ScrollDirection.None;
            return;
        }
        if (this.adapter.isHorizontal) {
            this._scrollDirection = delta > 0 ? enum_1.ScrollDirection.Right : enum_1.ScrollDirection.Left;
        }
        else {
            this._scrollDirection = delta > 0 ? enum_1.ScrollDirection.Up : enum_1.ScrollDirection.Down;
        }
        this._laseScrollDirection = this._scrollDirection;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    ScrollManager.prototype.internal_setContentPosition = function (mainPosition, updatePercentage) {
        if (updatePercentage === void 0) { updatePercentage = true; }
        var position = { x: 0, y: 0 };
        position[this.adapter.mainAxis] = mainPosition;
        this._updateContentPosition(position, updatePercentage);
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    ScrollManager.prototype.internal_lateUpdate = function (deltaTime) {
        if (this.test)
            return;
        this._autoScrolling(deltaTime);
        this._scrollHandler(deltaTime, this._scrollHandlePosition, this._scrollPositionHandler.bind(this));
        this._scrollHandler(deltaTime, this._scrollHandlePercentage, this._scrollPercentageHandler.bind(this));
    };
    ScrollManager.prototype._autoScrolling = function (deltaTime) {
        var offset = this.calcOffset();
        this._boundaryOffset = offset;
        if (!this._dragging && (offset != 0 || this._velocity != 0)) {
            this.content.getPosition(_tempPosition);
            if (this.movementType == enum_1.MovementType.Elastic && offset != 0) {
                this._calcElastic(deltaTime, offset, _tempPosition);
            }
            else if (this.inertia) {
                this._calcInertia(deltaTime, _tempPosition);
            }
            else {
                this._velocity = 0;
            }
            if (this.movementType == enum_1.MovementType.Clamped) {
                this._calcClamped(_tempPosition);
            }
            this._updateContentPosition(_tempPosition);
        }
        if (this._dragging && this.inertia) {
            var newVelocity = (this.contentPosition - this._prevContentPosition[this.adapter.mainAxis]) / deltaTime;
            this._velocity = helper_1.Helper.lerp(this._velocity, newVelocity, deltaTime * 10);
        }
        if (!this._prevContentPosition.equals(this.content.position)) {
            this._updatePrevContentPosition();
        }
        if (!this._isEmitAboutToStop && !this._dragging && Math.abs(this._velocity) <= this.aboutToStopVelocity) {
            if (!this._scrollHandlePercentage && !this._scrollHandlePosition) {
                this.emit(Event.ON_ABOUT_TO_STOP, this._velocity);
                this._isEmitAboutToStop = true;
            }
        }
        this._scrolling = false;
    };
    ScrollManager.prototype._scrollHandler = function (deltaTime, info, handler) {
        if (info == null)
            return;
        info.deltaTime += deltaTime;
        var time = info.deltaTime / (info.duration > cc.macro.FLT_EPSILON ? info.duration : cc.macro.FLT_EPSILON);
        time = helper_1.Helper.clamp01(time);
        var easingTime = cc.easing.quintOut(time);
        info.current = helper_1.Helper.progress(info.from, info.to, info.current, easingTime);
        handler(info, time);
    };
    ScrollManager.prototype._scrollPercentageHandler = function (info, time) {
        var old = this.percentage;
        this.setPercentage(info.current);
        if (time == 1 || old == this.percentage) {
            var stop = true;
            if (this._scrollHandlePercentage.stop) {
                stop = this._scrollHandlePercentage.stop();
            }
            if (stop) {
                this._scrollHandlePercentage = null;
            }
        }
    };
    ScrollManager.prototype._scrollPositionHandler = function (info, time) {
        var position = { x: 0, y: 0 };
        position[this.adapter.mainAxis] = info.current;
        this._setAutoScroll(position);
        if (time == 1 || Math.abs(this.contentPosition - info.to) <= 0.0001) {
            if (this._scrollHandlePosition.stop) {
                this._scrollHandlePosition.stop();
            }
            this._scrollHandlePosition = null;
        }
    };
    ScrollManager.prototype._setAutoScroll = function (position) {
        var _this = this;
        var handler = function (target) {
            _this._updateContentPosition(target);
            _this._updatePrevContentPosition();
            _this._velocity = 0;
        };
        handler(position);
        var offset = this.calcOffset();
        if (offset != 0) {
            var direction = this.adapter.isHorizontal ? -1 : 1;
            position[this.adapter.mainAxis] += offset * direction;
            handler(position);
            return false;
        }
        return true;
    };
    ScrollManager.prototype._scrollToPosition = function (duration, getPosition, onStop) {
        var _this = this;
        if (!this.canAutoScroll) {
            return false;
        }
        var position = getPosition();
        if (position == null || Math.abs(this.contentPosition - position) < cc.macro.FLT_EPSILON) {
            return false;
        }
        this._scrollHandlePercentage = null;
        this._scrollHandlePosition = {
            current: 0,
            from: this.contentPosition,
            to: position,
            deltaTime: 0,
            duration: Math.max(0, duration),
            change: function () {
                position = getPosition();
                _this._scrollHandlePosition.to = position;
            },
            stop: function () {
                onStop();
            }
        };
        return true;
    };
    // public 
    ScrollManager.prototype.getLayerNode = function (layer) {
        switch (layer) {
            case enum_1.Layer.Medium:
                return this._layerMedium;
            case enum_1.Layer.Highest:
                return this._layerHighest;
            default:
                return this._layerLowest;
        }
    };
    /**
     * 滚动到数据索引位置
     * @param duration 滚动时长
     * @param index 数据索引
     * @param alwaysScroll 滚动方向，默认 AlwaysScroll.Auto
     */
    ScrollManager.prototype.scrollToModelIndex = function (duration, index, alwaysScroll) {
        var _this = this;
        var groupIndex = this.adapter.viewManager.getGroupIndexByModelIndex(index);
        if (-1 == groupIndex)
            return;
        var priorityCheckExists = false;
        var ok = this._scrollToPosition(duration, function () {
            var position = _this.adapter.centerManager.getPositionByGroupIndex(groupIndex, alwaysScroll, priorityCheckExists);
            priorityCheckExists = true;
            return position;
        }, function () {
            _this.emit(Event.ON_SCROLL_TO_MODELINDEX_AFTER, index);
        });
        if (ok) {
            this.emit(Event.ON_SCROLL_TO_MODELINDEX_BEFOR, index);
        }
    };
    /**
     * 滚动到指定单行索引位置
     * @param duration 滚动时长
     * @param index 单行索引
     * @param alwaysScroll 滚动方向，默认 AlwaysScroll.Auto
     */
    ScrollManager.prototype.scrollToGroupIndex = function (duration, index, alwaysScroll) {
        var _this = this;
        var priorityCheckExists = false;
        var ok = this._scrollToPosition(duration, function () {
            var position = _this.adapter.centerManager.getPositionByGroupIndex(index, alwaysScroll, priorityCheckExists);
            priorityCheckExists = true;
            return position;
        }, function () {
            _this.emit(Event.ON_SCROLL_TO_GROUPINDEX_AFTER, index);
        });
        if (ok) {
            this.emit(Event.ON_SCROLL_TO_GROUPINDEX_BEFOR, index);
        }
    };
    /**
     * 滚动到数据头部
     * @param duration 滚动时间
     */
    ScrollManager.prototype.scrollToHeader = function (duration) {
        this.scrollToGroupIndex(duration, 0);
    };
    /**
     * 滚动到数据尾部
     * @param duration 滚动时间
     */
    ScrollManager.prototype.scrollToFooter = function (duration) {
        this.scrollToGroupIndex(duration, this.adapter.viewManager.groupLength - 1);
    };
    /**
     * 滚动到指定百分比位置
     * 注意！如果你的item在滚动过程中会实时修改主轴尺寸，则不建议使用百分比来定位，请使用索引定位滚动 scrollToGroupIndex
     * 这是因为在滚动时如果主轴尺寸变化会改变运行时百分比，导致某些情况下可能永远也无法达到你指定的百分比位置
     * 如果你的item不会在滚动过程中改变主轴尺寸，那么请随意使用，不会有任何问题
     * @param duration 滚动时长
     * @param percentage 百分比 0-1
     */
    ScrollManager.prototype.scrollToPercentage = function (duration, percentage) {
        if (!this.canAutoScroll) {
            return false;
        }
        if (Math.abs(this._percentage - percentage) < 0.001) {
            return;
        }
        percentage = helper_1.Helper.clamp01(percentage);
        duration = Math.max(0, duration);
        this._scrollHandlePercentage = null;
        this._scrollHandlePercentage = {
            deltaTime: 0,
            duration: duration,
            current: 0,
            from: this._percentage,
            to: percentage,
        };
    };
    ScrollManager.prototype.stopVelocity = function () {
        this._velocity = 0;
    };
    /** 停止所有自动滚动 */
    ScrollManager.prototype.stopScroll = function () {
        this._scrollHandlePosition = null;
        this._scrollHandlePercentage = null;
        this.stopVelocity();
    };
    ScrollManager.prototype.setPercentage = function (percentage) {
        var hiddenSize = this.internal_getHiddenSize();
        var position = { x: 0, y: 0 };
        var total = 0;
        var old = null;
        // TODO 最大循环100次 防止死循环
        while ( /** true **/total < 100) {
            total++;
            var cross = this._percentage - percentage;
            if (old != null && this._percentage === old) {
                break;
            }
            if (Math.abs(cross) < cc.macro.FLT_EPSILON) {
                break;
            }
            old = this._percentage;
            var target = this.contentPosition - cross * this.adapter.multiplier * hiddenSize;
            position[this.adapter.mainAxis] = target;
            var ok = this._setAutoScroll(position);
            if (!ok) {
                break;
            }
        }
        if (total == 100) {
            console.warn("循环次数已达最大值，尽量不要在滚动过程中频繁修改尺寸");
        }
    };
    /** 计算overflow偏移量 */
    ScrollManager.prototype.calcOffset = function (delta, position) {
        if (delta === void 0) { delta = 0; }
        if (position === void 0) { position = this.contentPosition; }
        var offset = 0;
        if (this.movementType == enum_1.MovementType.Unrestricted) {
            return offset;
        }
        var max = this._getContentMaxBoundaryOffset(delta, position);
        var min = this._getContentMinBoundaryOffset(delta, position);
        var maxOffset = this._getMaxBoundaryOffset(max);
        var minOffset = this._getMinBoundaryOffset(min);
        if (!this.adapter.centerManager.enabled && this.adapter.viewManager.virtualSize > this.adapter.mainAxisSize) {
            if (this.adapter.isVertical) {
                maxOffset -= this.adapter.viewManager.top;
                minOffset += this.adapter.viewManager.bottom;
            }
            else {
                maxOffset -= this.adapter.viewManager.left;
                minOffset += this.adapter.viewManager.right;
            }
        }
        var minExpand = 0, maxExpand = 0;
        if (this.adapter.centerManager.enabled && this.adapter.viewManager.groupLength > 0) {
            maxExpand = this.adapter.centerManager.max;
            minExpand = this.adapter.centerManager.min;
        }
        else {
            var magneticOffset = this.adapter.viewManager.getMagneticOffset();
            maxOffset -= magneticOffset;
            minOffset -= magneticOffset;
        }
        if (this.adapter.releaseManager.enabled) {
            maxExpand = Math.max(maxExpand, this.adapter.releaseManager.max);
            minExpand = Math.max(minExpand, this.adapter.releaseManager.min);
        }
        maxOffset -= maxExpand;
        minOffset += minExpand;
        if (minOffset < -0.001) {
            offset = minOffset;
        }
        else if (maxOffset > 0.001) {
            offset = maxOffset;
        }
        return offset;
    };
    ScrollManager.Event = Event;
    __decorate([
        property()
    ], ScrollManager.prototype, "_view", void 0);
    __decorate([
        property({ type: cc.Node })
    ], ScrollManager.prototype, "view", null);
    __decorate([
        property()
    ], ScrollManager.prototype, "_content", void 0);
    __decorate([
        property({ type: cc.Node })
    ], ScrollManager.prototype, "content", null);
    __decorate([
        property({ type: enum_1.Orientation })
    ], ScrollManager.prototype, "_orientation", void 0);
    __decorate([
        property({ type: enum_1.Orientation })
    ], ScrollManager.prototype, "orientation", null);
    __decorate([
        property({
            type: enum_1.TouchMode,
            tooltip: "Auto: \u5F53\u5185\u5BB9\u6491\u6EE1\u53EF\u89C6\u533A\u57DF\u6216\u5F00\u542FReleaseManager\u65F6\u5141\u8BB8\u62D6\u52A8\n        AlwaysAllow: \u4EFB\u4F55\u60C5\u51B5\u4E0B\u90FD\u53EF\u4EE5\u62D6\u52A8\uFF0C\u5373\u4F7F\u6CA1\u6709\u4EFB\u4F55\u5143\u7D20\n        Disabled: \u4EFB\u4F55\u60C5\u51B5\u4E0B\u90FD\u7981\u7528\u62D6\u52A8\n        "
        })
    ], ScrollManager.prototype, "touchMode", void 0);
    __decorate([
        property({ type: enum_1.MovementType })
    ], ScrollManager.prototype, "movementType", void 0);
    __decorate([
        property({
            range: [0, 1], slide: true, step: 0.001,
            visible: function () { return this.movementType == enum_1.MovementType.Elastic; }
        })
    ], ScrollManager.prototype, "elasticity", void 0);
    __decorate([
        property()
    ], ScrollManager.prototype, "inertia", void 0);
    __decorate([
        property({
            range: [0, 1], slide: true, step: 0.001,
            visible: function () { return this.inertia; }
        })
    ], ScrollManager.prototype, "decelerationRate", void 0);
    __decorate([
        property({
            tooltip: "当滚动速度小于这个值时，会发送ON_ABOUT_TO_STOP广播"
        })
    ], ScrollManager.prototype, "aboutToStopVelocity", void 0);
    __decorate([
        property({
            tooltip: "取消子节点的Button点击事件"
        })
    ], ScrollManager.prototype, "cancelInnerEvents", void 0);
    __decorate([
        property({
            range: [0, 0.5], slide: true, step: 0.001,
            visible: function () { return this.inertia; },
            tooltip: "\u5D4C\u5957\u65F6\uFF0C\u5F53\u5B50\u5143\u7D20\u7684ScrollView\u62D6\u52A8\u65B9\u5411\u548C\u5F53\u524D\u62D6\u52A8\u65B9\u5411\u76F8\u540C\u65F6\uFF0C\u4F7F\u7528\u5F53\u524D\u9608\u503C\u8FDB\u884C\u8BA1\u7B97\u7531\u8C01\u6765\u5904\u7406\u62D6\u52A8\n        \u65E0\u7279\u6B8A\u9700\u6C42\u65F6\uFF0C\u9ED8\u8BA4\u503C\u5373\u53EF"
        })
    ], ScrollManager.prototype, "nestedMinThreshold", void 0);
    __decorate([
        property({
            range: [0.5, 1], slide: true, step: 0.001,
            visible: function () { return this.inertia; },
            tooltip: "\u5D4C\u5957\u65F6\uFF0C\u5F53\u5B50\u5143\u7D20\u7684ScrollView\u62D6\u52A8\u65B9\u5411\u548C\u5F53\u524D\u62D6\u52A8\u65B9\u5411\u76F8\u540C\u65F6\uFF0C\u4F7F\u7528\u5F53\u524D\u9608\u503C\u8FDB\u884C\u8BA1\u7B97\u7531\u8C01\u6765\u5904\u7406\u62D6\u52A8\n        \u65E0\u7279\u6B8A\u9700\u6C42\u65F6\uFF0C\u9ED8\u8BA4\u503C\u5373\u53EF"
        })
    ], ScrollManager.prototype, "nestedMaxThreshold", void 0);
    ScrollManager = __decorate([
        ccclass('ScrollManager')
    ], ScrollManager);
    return ScrollManager;
}(Manager_1.Manager));
exports.ScrollManager = ScrollManager;

cc._RF.pop();