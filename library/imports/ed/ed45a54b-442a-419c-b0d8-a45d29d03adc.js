"use strict";
cc._RF.push(module, 'ed45aVLRCpBnLDYpF0p0Drc', 'Scrollbar');
// script/framework/adapter/component/Scrollbar.ts

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
exports.Scrollbar = void 0;
var ScrollAdapter_1 = require("../abstract/ScrollAdapter");
var enum_1 = require("../define/enum");
var helper_1 = require("../help/helper");
var ScrollManager_1 = require("../manager/ScrollManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MIN_SIZE_PERCENTAGE = 0.01;
var _tempColor = new cc.Color();
var Scrollbar = /** @class */ (function (_super) {
    __extends(Scrollbar, _super);
    function Scrollbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.adapter = null;
        _this.handle = null;
        _this.direction = enum_1.ScrollbarDirection.Top_To_Bottom;
        _this.interactable = true;
        _this.dragMinLimit = 0;
        _this.dragMaxLimit = 1;
        _this._transition = enum_1.Transition.None;
        _this.targetGraphic = null;
        //#region Sprite Transition
        _this.hoverSprite = null;
        _this.pressedSprite = null;
        //#endregion
        //#region Color Transition
        _this.hoverColor = cc.Color.WHITE.clone();
        _this.pressedColor = new cc.Color(211, 211, 211, 255);
        //#endregion
        //#region Scale Transition
        _this.hoverScale = new cc.Vec2(1, 1);
        _this.pressedScale = new cc.Vec2(1.2, 1.2);
        //#endregion
        _this.transitionDuration = 0.2;
        _this.numberOfSteps = 0;
        _this.enableAutoHide = false;
        _this.autoHideTime = 1;
        _this._isDirty = false;
        _this._size = 0;
        _this._value = -1;
        _this._opacity = 255;
        return _this;
    }
    Object.defineProperty(Scrollbar.prototype, "transition", {
        get: function () { return this._transition; },
        set: function (value) {
            if (value == this._transition)
                return;
            this._transition = value;
            if (value != enum_1.Transition.None) {
                if (!this.targetGraphic) {
                    this.targetGraphic = this.handle;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scrollbar.prototype, "size", {
        get: function () { return this._size; },
        set: function (v) {
            if (v != this._size) {
                this._size = helper_1.Helper.clamp(v, MIN_SIZE_PERCENTAGE, 1);
                this._isDirty = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scrollbar.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            if (v != this._value) {
                this._value = this.getSteps(v);
                this._isDirty = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scrollbar.prototype, "stepSize", {
        get: function () {
            return (this.numberOfSteps > 1) ? 1 / (this.numberOfSteps - 1) : 0.1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scrollbar.prototype, "transform", {
        get: function () {
            if (!this._transform) {
                this._transform = this.node;
            }
            return this._transform;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scrollbar.prototype, "handleTransform", {
        get: function () {
            if (!this.handle)
                return null;
            if (!this._handleTransform) {
                this._handleTransform = this.handle.node;
            }
            return this._handleTransform;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scrollbar.prototype, "xy", {
        get: function () { return this.axis == enum_1.Orientation.Horizontal ? "x" : "y"; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scrollbar.prototype, "wh", {
        get: function () { return this.axis == enum_1.Orientation.Horizontal ? "width" : "height"; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scrollbar.prototype, "axis", {
        get: function () {
            return (this.direction == enum_1.ScrollbarDirection.Left_To_Right || this.direction == enum_1.ScrollbarDirection.Right_To_Left) ? enum_1.Orientation.Horizontal : enum_1.Orientation.Vertical;
        },
        enumerable: false,
        configurable: true
    });
    Scrollbar.prototype.__preload = function () {
        this.transform.setAnchorPoint(0.5, 0.5);
        this.handleTransform.setAnchorPoint(0.5, 0.5);
        this.handle.node.setPosition(0, 0);
        if (this.adapter) {
            this.adapter.scrollManager.on(ScrollManager_1.ScrollManager.Event.ON_UPDATE_PERCENTAGE, this._onUpdateScrollbar, this);
            this._updateVisuals();
        }
        if (this.targetGraphic) {
            this.targetGraphic.node.getScale(this._rawTargetScale);
            this._rawTargetFrame = this.targetGraphic.spriteFrame;
            this._rawTargetColor = this.targetGraphic.node.color.clone();
        }
        this._openAutoHide(true);
    };
    Scrollbar.prototype.onEnable = function () {
        var renderComp = this.node;
        if (renderComp) {
            this._opacity = renderComp.opacity;
        }
        if (this.adapter) {
            this.node[ScrollManager_1.ADAPTER] = true;
            this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
            this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
            this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchEnd, this);
            this.node.on(cc.Node.EventType.MOUSE_ENTER, this._mouseEnter, this);
            this.node.on(cc.Node.EventType.MOUSE_LEAVE, this._mouseLeave, this);
            if (this.targetGraphic) {
                this.targetGraphic.node.on(cc.Node.EventType.MOUSE_ENTER, this._targetMouseEnter, this);
                this.targetGraphic.node.on(cc.Node.EventType.MOUSE_LEAVE, this._targetMouseLeave, this);
            }
        }
    };
    Scrollbar.prototype.onDisable = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchEnd, this);
        this.node.off(cc.Node.EventType.MOUSE_ENTER, this._mouseEnter, this);
        this.node.off(cc.Node.EventType.MOUSE_LEAVE, this._mouseLeave, this);
        if (this.targetGraphic) {
            this.targetGraphic.node.off(cc.Node.EventType.MOUSE_ENTER, this._targetMouseEnter, this);
            this.targetGraphic.node.off(cc.Node.EventType.MOUSE_LEAVE, this._targetMouseLeave, this);
        }
    };
    Scrollbar.prototype._targetMouseEnter = function () {
        this._targetEnter = true;
        this._openAutoHide(false);
        switch (this.transition) {
            case enum_1.Transition.Scale:
                this._transitionScale(this._targetStart ? this.pressedScale : this.hoverScale);
                break;
            case enum_1.Transition.SpriteSwap:
                this._transitionSprite(this._targetStart ? this.pressedSprite : this.hoverSprite);
                break;
            case enum_1.Transition.ColorTint:
                this._transitionColor(this._targetStart ? this.pressedColor : this.hoverColor);
                break;
        }
    };
    Scrollbar.prototype._targetMouseLeave = function () {
        this._targetEnter = false;
        this._openAutoHide(true);
        switch (this.transition) {
            case enum_1.Transition.Scale:
                this._transitionScale(this._targetStart ? this.pressedScale : this._rawTargetScale);
                break;
            case enum_1.Transition.SpriteSwap:
                this._transitionSprite(this._targetStart ? this.pressedSprite : this._rawTargetFrame);
                break;
            case enum_1.Transition.ColorTint:
                this._transitionColor(this._targetStart ? this.pressedColor : this._rawTargetColor);
                break;
        }
    };
    Scrollbar.prototype._transitionScale = function (to) {
        if (!to || !this.targetGraphic)
            return;
        var from = new cc.Vec3();
        this.targetGraphic.node.getScale(from);
        this._transitionInfo = {
            time: 0,
            from: from,
            to: to,
        };
    };
    Scrollbar.prototype._transitionColor = function (to) {
        if (!to || !this.targetGraphic)
            return;
        this._transitionInfo = {
            time: 0,
            from: this.targetGraphic.node.color,
            to: to,
        };
    };
    Scrollbar.prototype._transitionSprite = function (to) {
        if (!to || !this.targetGraphic)
            return;
        this.targetGraphic.spriteFrame = to;
    };
    Scrollbar.prototype._mouseEnter = function (event) {
        if (!this.interactable)
            return;
        this._openAutoHide(false);
    };
    Scrollbar.prototype._mouseLeave = function (event) {
        if (!this.interactable)
            return;
        this._openAutoHide(true);
    };
    Scrollbar.prototype._openAutoHide = function (open) {
        if (!this.enableAutoHide)
            return;
        this._autoHideRemainingTime = this.autoHideTime;
        this._isHide = open;
        if (!open) {
            this._setOpacity(this._opacity);
        }
    };
    Scrollbar.prototype._onTouchStart = function (event) {
        if (!this.interactable || this.size == 1 || this.size == 0)
            return;
        this._openAutoHide(false);
        this._pointerEvent = null;
        this._targetStart = true;
        var startCursor = event.getStartLocation();
        this._offset = this.handleTransform.convertToNodeSpaceAR(cc.v3(startCursor.x, startCursor.y));
        if (Math.abs(this._offset[this.xy]) > this.handleTransform[this.wh] * 0.5) {
            this._offset = null;
            this._pointerEvent = event;
            var percentage = this._calcPercentage(event);
            this._setPercentage(percentage);
        }
        if (this.transition == enum_1.Transition.Scale) {
            this._transitionScale(this.pressedScale);
        }
        else if (this.transition == enum_1.Transition.SpriteSwap) {
            this._transitionSprite(this.pressedSprite);
        }
        else if (this.transition == enum_1.Transition.ColorTint) {
            this._transitionColor(this.pressedColor);
        }
    };
    Scrollbar.prototype._onTouchMove = function (event) {
        if (!this.interactable || this.size == 1 || this.size == 0)
            return;
        if (this._offset) {
            var percentage = this._calcPercentage(event, this._offset[this.xy]);
            this._setPercentage(percentage);
        }
    };
    Scrollbar.prototype._onTouchEnd = function (event) {
        if (!this.interactable || this.size == 1 || this.size == 0)
            return;
        this._offset = null;
        this._pointerEvent = null;
        this._targetStart = false;
        switch (this.transition) {
            case enum_1.Transition.Scale:
                this._transitionScale(this._targetEnter ? this.hoverScale : this._rawTargetScale);
                break;
            case enum_1.Transition.SpriteSwap:
                this._transitionSprite(this._targetEnter ? this.hoverSprite : this._rawTargetFrame);
                break;
            case enum_1.Transition.ColorTint:
                this._transitionColor(this._targetEnter ? this.hoverColor : this._rawTargetColor);
                break;
        }
        this.adapter.centerManager.scrollToCenter();
    };
    Scrollbar.prototype._setPercentage = function (percentage) {
        this.adapter.scrollManager.stopScroll();
        this.adapter.scrollManager.setPercentage(percentage);
    };
    Scrollbar.prototype._calcPercentage = function (event, offset) {
        if (offset === void 0) { offset = 0; }
        var parentSize = this.axis == enum_1.Orientation.Horizontal ? this.transform.width : this.transform.height;
        var remainingSize = parentSize * (1 - this.size);
        var localCursor = event.getLocation();
        var pos = this.transform.convertToNodeSpaceAR(cc.v3(localCursor.x, localCursor.y));
        var handleCorner = pos[this.xy] - offset - -this.transform[this.wh] * 0.5;
        handleCorner -= this.handleTransform[this.wh] * 0.5;
        var percentage = this.adapter.scrollManager.percentage;
        switch (this.direction) {
            case enum_1.ScrollbarDirection.Right_To_Left:
            case enum_1.ScrollbarDirection.Top_To_Bottom:
                percentage = helper_1.Helper.clamp(1 - (handleCorner / remainingSize), this.dragMinLimit, this.dragMaxLimit);
                break;
            case enum_1.ScrollbarDirection.Left_To_Right:
            case enum_1.ScrollbarDirection.Bottom_To_Top:
                percentage = helper_1.Helper.clamp(handleCorner / remainingSize, this.dragMinLimit, this.dragMaxLimit);
                break;
        }
        return this.getSteps(percentage);
    };
    Scrollbar.prototype._onUpdateScrollbar = function (percentage, offset) {
        var size = 0;
        var value = 0;
        if (this.adapter.viewManager.virtualSize > 0) {
            if (this.adapter.viewManager.virtualSize >= this.adapter.mainAxisSize) {
                size = helper_1.Helper.clamp01((this.adapter.mainAxisSize - Math.abs(offset)) / this.adapter.viewManager.virtualSize);
            }
            else {
                size = 1;
            }
        }
        value = percentage;
        this.size = size;
        if (this.numberOfSteps > 1) {
            value = Math.round(value * (this.numberOfSteps - 1)) / (this.numberOfSteps - 1);
            value = helper_1.Helper.clamp01(value);
        }
        this.value = value;
        this._autoHideRemainingTime = this.autoHideTime;
        this._setOpacity(this._opacity);
    };
    Scrollbar.prototype._updateVisuals = function () {
        if (!this.handleTransform || !this.adapter)
            return;
        var min = { x: 0, y: 0 };
        var max = { x: 0, y: 0 };
        var mainAxis = this.adapter.mainAxis;
        var movement = helper_1.Helper.clamp01(this.value) * (1 - this.size);
        min[mainAxis] = movement;
        max[mainAxis] = movement + this.size;
        var header = this.transform.getContentSize()[this.wh] - max[mainAxis] * this.transform.getContentSize()[this.wh];
        var footer = min[mainAxis] * this.transform.getContentSize()[this.wh];
        var pos = this.handle.node.getPosition();
        switch (this.direction) {
            case enum_1.ScrollbarDirection.Bottom_To_Top:
            case enum_1.ScrollbarDirection.Left_To_Right:
                pos[this.xy] = (footer - header) * 0.5;
                break;
            case enum_1.ScrollbarDirection.Top_To_Bottom:
            case enum_1.ScrollbarDirection.Right_To_Left:
                pos[this.xy] = (header - footer) * 0.5;
                break;
        }
        this.handleTransform[this.wh] = this.transform.getContentSize()[this.wh] - header - footer;
        this.handle.node.setPosition(pos);
    };
    Scrollbar.prototype.update = function (deltaTime) {
        this._clearDirty();
        this._autoHide(deltaTime);
        this._tranitionHandler(deltaTime);
    };
    Scrollbar.prototype._clearDirty = function () {
        if (this._isDirty) {
            this._isDirty = false;
            this._updateVisuals();
            if (this._pointerEvent) {
                var startCursor = this._pointerEvent.getLocation();
                this._offset = this.handleTransform.convertToNodeSpaceAR(cc.v3(startCursor.x, startCursor.y));
                this._pointerEvent = null;
            }
        }
    };
    Scrollbar.prototype._autoHide = function (deltaTime) {
        if (!this.enableAutoHide)
            return;
        if (!this._isHide || this._autoHideRemainingTime <= 0)
            return;
        this._autoHideRemainingTime -= deltaTime;
        if (this._autoHideRemainingTime <= this.autoHideTime) {
            this._autoHideRemainingTime = Math.max(0, this._autoHideRemainingTime);
            var opacity = this._opacity * (this._autoHideRemainingTime / this.autoHideTime);
            this._setOpacity(opacity);
        }
    };
    Scrollbar.prototype._tranitionHandler = function (deltaTime) {
        var target = this.targetGraphic;
        if (this.transition == enum_1.Transition.None || !target || !this._transitionInfo)
            return;
        this._transitionInfo.time += deltaTime;
        var ratio = 1.0;
        if (this.transitionDuration > 0) {
            ratio = this._transitionInfo.time / this.transitionDuration;
        }
        if (ratio >= 1) {
            ratio = 1;
        }
        if (this.transition == enum_1.Transition.Scale) {
            this._transitionInfo.current = target.node.getScale(cc.v2());
            var from = this._transitionInfo.from;
            var to = this._transitionInfo.to;
            this._transitionInfo.current.x = helper_1.Helper.lerp(from.x, to.x, ratio);
            this._transitionInfo.current.y = helper_1.Helper.lerp(from.y, to.y, ratio);
            target.node.setScale(this._transitionInfo.current);
        }
        else if (this.transition == enum_1.Transition.ColorTint) {
            var from = this._transitionInfo.from;
            var to = this._transitionInfo.to;
            // _tempColor = from.lerp(to, ratio)
            target.node.color = from.lerp(to, ratio);
        }
        if (ratio === 1) {
            this._transitionInfo = null;
        }
    };
    Scrollbar.prototype._setOpacity = function (opacity) {
        if (!this.handle)
            return;
        var handler = function (comp) {
            if (comp) {
                comp.opacity = opacity;
                // _tempColor.set(comp.color)
                // _tempColor.a = opacity
                // comp.color = _tempColor
            }
        };
        handler(this.node.getComponent(cc.Sprite));
        handler(this.handle.getComponent(cc.Sprite));
    };
    Scrollbar.prototype.getSteps = function (percentage) {
        if (this.numberOfSteps > 1) {
            percentage = Math.round(percentage * (this.numberOfSteps - 1)) / (this.numberOfSteps - 1);
            percentage = helper_1.Helper.clamp(percentage, this.dragMinLimit, this.dragMaxLimit);
        }
        return percentage;
    };
    __decorate([
        property(ScrollAdapter_1.ScrollAdapter)
    ], Scrollbar.prototype, "adapter", void 0);
    __decorate([
        property(cc.Sprite)
    ], Scrollbar.prototype, "handle", void 0);
    __decorate([
        property({
            type: enum_1.ScrollbarDirection,
            tooltip: "滚动方向"
        })
    ], Scrollbar.prototype, "direction", void 0);
    __decorate([
        property({
            tooltip: "开启后会允许用户滑动进度条"
        })
    ], Scrollbar.prototype, "interactable", void 0);
    __decorate([
        property({
            range: [0, 1], slide: true, step: 0.001,
            visible: function () { return this.interactable; },
            tooltip: "可拖拽的最小限制，默认=0不限制,仅当你开启了循环,并且你的item会实时修改主轴尺寸时,那么你应该适当限制拖拽区域"
        })
    ], Scrollbar.prototype, "dragMinLimit", void 0);
    __decorate([
        property({
            range: [0, 1], slide: true, step: 0.001,
            visible: function () { return this.interactable; },
            tooltip: "可拖拽的最大限制，默认=1不限制,仅当你开启了循环,并且你的item会实时修改主轴尺寸时,那么你应该适当限制拖拽区域"
        })
    ], Scrollbar.prototype, "dragMaxLimit", void 0);
    __decorate([
        property({ type: enum_1.Transition })
    ], Scrollbar.prototype, "_transition", void 0);
    __decorate([
        property({
            type: enum_1.Transition,
            visible: function () { return this.interactable; }
        })
    ], Scrollbar.prototype, "transition", null);
    __decorate([
        property({
            type: cc.Sprite,
            visible: function () { return this.transition != enum_1.Transition.None && this.interactable; }
        })
    ], Scrollbar.prototype, "targetGraphic", void 0);
    __decorate([
        property({
            type: cc.SpriteFrame,
            visible: function () { return this.transition == enum_1.Transition.SpriteSwap && this.interactable; }
        })
    ], Scrollbar.prototype, "hoverSprite", void 0);
    __decorate([
        property({
            type: cc.SpriteFrame,
            visible: function () { return this.transition == enum_1.Transition.SpriteSwap && this.interactable; }
        })
    ], Scrollbar.prototype, "pressedSprite", void 0);
    __decorate([
        property({
            visible: function () { return this.transition == enum_1.Transition.ColorTint && this.interactable; }
        })
    ], Scrollbar.prototype, "hoverColor", void 0);
    __decorate([
        property({
            visible: function () { return this.transition == enum_1.Transition.ColorTint && this.interactable; }
        })
    ], Scrollbar.prototype, "pressedColor", void 0);
    __decorate([
        property({
            visible: function () { return this.transition == enum_1.Transition.Scale && this.interactable; }
        })
    ], Scrollbar.prototype, "hoverScale", void 0);
    __decorate([
        property({
            visible: function () { return this.transition == enum_1.Transition.Scale && this.interactable; }
        })
    ], Scrollbar.prototype, "pressedScale", void 0);
    __decorate([
        property({
            visible: function () { return this.transition == enum_1.Transition.Scale || this.transition == enum_1.Transition.ColorTint && this.interactable; }
        })
    ], Scrollbar.prototype, "transitionDuration", void 0);
    __decorate([
        property({
            range: [0, 11],
            slide: true,
            step: 1,
            tooltip: "用于进度的步数。值为 < 2 将禁用"
        })
    ], Scrollbar.prototype, "numberOfSteps", void 0);
    __decorate([
        property({
            tooltip: "开启后会在滚动条无更新时自动隐藏"
        })
    ], Scrollbar.prototype, "enableAutoHide", void 0);
    __decorate([
        property({
            visible: function () { return this.enableAutoHide; },
            tooltip: "自动隐藏滚动条的时间"
        })
    ], Scrollbar.prototype, "autoHideTime", void 0);
    Scrollbar = __decorate([
        ccclass
    ], Scrollbar);
    return Scrollbar;
}(cc.Component));
exports.Scrollbar = Scrollbar;

cc._RF.pop();