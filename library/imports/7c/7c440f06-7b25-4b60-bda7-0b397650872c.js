"use strict";
cc._RF.push(module, '7c4408GeyVLYL2nCzl2UIcs', 'CenterManager');
// script/framework/adapter/manager/CenterManager.ts

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
exports.CenterManager = void 0;
var Manager_1 = require("../abstract/Manager");
var enum_1 = require("../define/enum");
var ScrollManager_1 = require("./ScrollManager");
var ViewManager_1 = require("./ViewManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CenterManager = /** @class */ (function (_super) {
    __extends(CenterManager, _super);
    function CenterManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._enabled = false;
        _this.duration = 1;
        _this.containerAnchorPoint = 0;
        _this.elementAnchorPoint = 0;
        return _this;
    }
    Object.defineProperty(CenterManager.prototype, "enabled", {
        get: function () { return this._enabled; },
        set: function (value) {
            if (value == this._enabled)
                return;
            this._enabled = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CenterManager.prototype, "max", {
        get: function () {
            var cantainerOffset = this.getContainerOffset(this.containerAnchorPoint);
            if (this.adapter.isArrangeAxisStart) {
                return cantainerOffset;
            }
            return this.adapter.mainAxisSize - cantainerOffset;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CenterManager.prototype, "min", {
        get: function () {
            var cantainerOffset = this.getContainerOffset(this.containerAnchorPoint);
            if (this.adapter.isArrangeAxisStart) {
                return this.adapter.mainAxisSize - cantainerOffset;
            }
            else {
                return cantainerOffset;
            }
        },
        enumerable: false,
        configurable: true
    });
    CenterManager.prototype.getContainerOffset = function (containerAnchorPoint) {
        if (containerAnchorPoint === void 0) { containerAnchorPoint = this.containerAnchorPoint; }
        var offset = 0;
        var point = 0;
        if (this.adapter.isHorizontal) {
            point = this.adapter.multiplier == -1 ? containerAnchorPoint : 1 - containerAnchorPoint;
        }
        else {
            point = this.adapter.multiplier == 1 ? containerAnchorPoint : 1 - containerAnchorPoint;
        }
        offset = this.adapter.mainAxisSize * point;
        return offset;
    };
    CenterManager.prototype.getElementOffset = function (elementAnchorPoint) {
        if (elementAnchorPoint === void 0) { elementAnchorPoint = this.elementAnchorPoint; }
        var offset = 0;
        if (this.adapter.isHorizontal) {
            offset = this.adapter.multiplier == -1 ? elementAnchorPoint : 1 - elementAnchorPoint;
        }
        else {
            offset = this.adapter.multiplier == 1 ? elementAnchorPoint : 1 - elementAnchorPoint;
        }
        return offset;
    };
    CenterManager.prototype.onInit = function () {
        this.adapter.scrollManager.on(ScrollManager_1.ScrollManager.Event.ON_ABOUT_TO_STOP, this._onAboutToStop, this);
        this.adapter.viewManager.on(ViewManager_1.ViewManager.Event.ON_UPDATE_VIEWS, this.scrollToCenter, this, true);
    };
    CenterManager.prototype._onAboutToStop = function () {
        this.scrollToCenter();
    };
    /**
     * 自动居中
     * @param duration 滚动事件
     */
    CenterManager.prototype.scrollToCenter = function (duration) {
        if (duration === void 0) { duration = this.duration; }
        if (!this.enabled)
            return;
        var visibleIndex = this.getCenterVisibleIndex();
        if (-1 == visibleIndex)
            return;
        var view = this.adapter.viewManager.getVisibleView(visibleIndex);
        this.adapter.scrollManager.scrollToGroupIndex(duration, view.index);
    };
    /**
     * 获取距离给定锚点最近的单行索引
     * @param containerAnchorPoint 容器锚点
     * @param elementAnchorPoint 元素锚点
     * @returns 单行索引 groupIndex
     */
    CenterManager.prototype.getCenterVisibleIndex = function (containerAnchorPoint, elementAnchorPoint) {
        if (containerAnchorPoint === void 0) { containerAnchorPoint = this.containerAnchorPoint; }
        if (elementAnchorPoint === void 0) { elementAnchorPoint = this.elementAnchorPoint; }
        var mainAxis = this.adapter.mainAxis;
        var center = this.getContainerOffset(containerAnchorPoint);
        var visibleIndex = -1;
        var minDistance = Number.MAX_SAFE_INTEGER;
        for (var i = 0; i < this.adapter.viewManager.visibleLength; i++) {
            var view = this.adapter.viewManager.getVisibleView(i);
            if (!view || !view.group)
                break;
            var position = { x: view.group.position.x, y: view.group.position.y };
            position[mainAxis] -= this.adapter.multiplier * view.group.size[mainAxis] * elementAnchorPoint;
            var world = this.adapter.scrollManager.content.convertToWorldSpaceAR(cc.v3(position.x, position.y));
            var local = this.adapter.scrollManager.view.convertToNodeSpaceAR(world);
            var distance = Math.abs(local[mainAxis] + this.adapter.multiplier * center);
            if (distance < minDistance) {
                minDistance = distance;
                visibleIndex = i;
            }
        }
        return visibleIndex;
    };
    /**
     * 获取单行索引的坐标
     * @param index 单行索引 optionsIndex
     * @param alwaysScroll 滚动方向，默认：AlwaysScroll.Auto
     * @param priorityCheckExists 当 alwaysScroll != AlwaysScroll.Auto时 是否优先从可见列表中查找 默认false
     * @returns 坐标
     */
    CenterManager.prototype.getPositionByGroupIndex = function (index, alwaysScroll, priorityCheckExists) {
        if (alwaysScroll === void 0) { alwaysScroll = enum_1.AlwaysScroll.Auto; }
        if (priorityCheckExists === void 0) { priorityCheckExists = false; }
        var group = this.adapter.viewManager.getGroup(index);
        if (!group) {
            return null;
        }
        var target = null;
        if (alwaysScroll == enum_1.AlwaysScroll.Header && this.adapter.viewManager.loopHeader) {
            // 向头部滚动
            if (priorityCheckExists) {
                target = this._checkExists(index);
            }
            if (target == null) {
                target = this._alwaysHeader(index, group);
            }
        }
        else if (alwaysScroll == enum_1.AlwaysScroll.Footer && this.adapter.viewManager.loopFooter) {
            // 向尾部滚动
            if (priorityCheckExists) {
                target = this._checkExists(index);
            }
            if (target == null) {
                target = this._alwaysFooter(index, group);
            }
        }
        else {
            // 如果目标已存在
            target = this._checkExists(index);
            if (target == null) {
                // 目标不存在
                var header = this.adapter.viewManager.header;
                var footer = this.adapter.viewManager.footer;
                if (header) {
                    if (index > footer.index) {
                        // 向尾部滚动
                        target = this._calcTargetFooter(footer.group, footer.index + 1, index, group);
                    }
                    else if (index < header.index) {
                        // 向头部滚动
                        target = this._calcTargetHeader(header.group, header.index - 1, index, group);
                    }
                }
                else {
                    // 当前可见区域为空，没有参考点
                    // var startOptions = this.adapter.viewManager.getViewOptions(0)
                    // target = this.calcTargetFooter(startOptions, startOptions.index, index)
                    // TODO 测试
                    target = {
                        position: group.position[this.adapter.mainAxis],
                        size: group.size[this.adapter.mainAxis],
                        anchor: group.anchorPoint[this.adapter.mainAxis]
                    };
                }
            }
        }
        return this._convertTargetToPosition(target);
    };
    CenterManager.prototype._convertTargetToPosition = function (target) {
        var position = null;
        if (target) {
            var multiplier = this.adapter.multiplier;
            var anchor = multiplier == -1 ? target.anchor : 1 - target.anchor;
            position = -target.position;
            position -= this.getContainerOffset() * multiplier;
            position -= target.size * anchor * multiplier;
            position += target.size * this.getElementOffset() * multiplier;
        }
        return position;
    };
    CenterManager.prototype._checkExists = function (index) {
        var visibleIndex = this.adapter.viewManager.getVisibleIndexByGroupIndex(index);
        if (-1 != visibleIndex) {
            var view = this.adapter.viewManager.getVisibleView(visibleIndex);
            return {
                position: view.group.position[this.adapter.mainAxis],
                size: view.group.size[this.adapter.mainAxis],
                anchor: view.group.anchorPoint[this.adapter.mainAxis]
            };
        }
        return null;
    };
    /**
     * 正序累计尺寸
     */
    CenterManager.prototype._calcTargetFooter = function (group, start, end, target) {
        var size = this.adapter.viewManager.internal_getInitFooterSize(group);
        for (var i = start; i <= end; i++) {
            size += this.adapter.viewManager.internal_accumulationSize(i);
        }
        return {
            position: this.adapter.viewManager.internal_convertSizeToFooterPosition(size, target),
            size: target.size[this.adapter.mainAxis],
            anchor: target.anchorPoint[this.adapter.mainAxis]
        };
    };
    /**
     * 倒序累计尺寸
     */
    CenterManager.prototype._calcTargetHeader = function (group, start, end, target) {
        var size = this.adapter.viewManager.internal_getInitHeaderSize(group);
        for (var i = start; i >= end; i--) {
            size += this.adapter.viewManager.internal_accumulationSize(i);
        }
        return {
            position: this.adapter.viewManager.internal_convertSizeToHeaderPosition(size, target),
            size: target.size[this.adapter.mainAxis],
            anchor: target.anchorPoint[this.adapter.mainAxis]
        };
    };
    /**
     * 朝向头部计算目标位置
     */
    CenterManager.prototype._alwaysHeader = function (index, target) {
        var size = 0;
        var start = index;
        var header = this.adapter.viewManager.header;
        if (header) {
            size = this.adapter.viewManager.internal_getInitHeaderSize(header.group);
            start = header.index;
        }
        if (index != start) {
            size = this._calcSizeToHeader(start, index, size);
        }
        return {
            position: this.adapter.viewManager.internal_convertSizeToHeaderPosition(size, target),
            size: target.size[this.adapter.mainAxis],
            anchor: target.anchorPoint[this.adapter.mainAxis]
        };
    };
    /**
     * 朝向尾部计算目标位置
     * @returns
     */
    CenterManager.prototype._alwaysFooter = function (index, target) {
        var size = 0;
        var start = index;
        var footer = this.adapter.viewManager.footer;
        if (footer) {
            size = this.adapter.viewManager.internal_getInitFooterSize(footer.group);
            start = footer.index;
        }
        if (index != start) {
            size = this._calcSizeToFooter(start, index, size);
        }
        return {
            position: this.adapter.viewManager.internal_convertSizeToFooterPosition(size, target),
            size: target.size[this.adapter.mainAxis],
            anchor: target.anchorPoint[this.adapter.mainAxis]
        };
    };
    /**
     * 倒序累计尺寸，直到找到目标为止
     */
    CenterManager.prototype._calcSizeToHeader = function (index, targetIndex, size) {
        do {
            index--;
            if (index < 0) {
                if (!this.adapter.viewManager.loopHeader) {
                    return size;
                }
                index = this.adapter.viewManager.groupLength - 1;
            }
            size += this.adapter.viewManager.internal_accumulationSize(index);
            if (targetIndex == index)
                return size;
        } while (true);
    };
    /**
     * 正序累计尺寸，直到找到目标为止
     */
    CenterManager.prototype._calcSizeToFooter = function (index, targetIndex, size) {
        do {
            index++;
            if (index >= this.adapter.viewManager.groupLength) {
                if (!this.adapter.viewManager.loopFooter) {
                    return size;
                }
                index = 0;
            }
            size += this.adapter.viewManager.internal_accumulationSize(index);
            if (index == targetIndex)
                return size;
        } while (true);
    };
    __decorate([
        property()
    ], CenterManager.prototype, "_enabled", void 0);
    __decorate([
        property()
    ], CenterManager.prototype, "enabled", null);
    __decorate([
        property({
            visible: function () { return this.enabled; },
            tooltip: "自动居中动画的时长"
        })
    ], CenterManager.prototype, "duration", void 0);
    __decorate([
        property({
            range: [0, 1],
            slide: true,
            step: 0.1,
            tooltip: "容器(view)的锚点,当滚动停止时,元素锚点位置会和容器锚点位置重合"
        })
    ], CenterManager.prototype, "containerAnchorPoint", void 0);
    __decorate([
        property({
            range: [0, 1],
            slide: true,
            step: 0.1,
            tooltip: "元素(item)的锚点位置,当滚动停止时,元素锚点位置会和容器锚点位置重合"
        })
    ], CenterManager.prototype, "elementAnchorPoint", void 0);
    CenterManager = __decorate([
        ccclass('CenterManager')
    ], CenterManager);
    return CenterManager;
}(Manager_1.Manager));
exports.CenterManager = CenterManager;

cc._RF.pop();