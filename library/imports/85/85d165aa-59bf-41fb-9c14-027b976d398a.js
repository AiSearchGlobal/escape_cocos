"use strict";
cc._RF.push(module, '85d16WqWb9B+5wUAnuXbTmK', 'LayoutManager');
// script/framework/adapter/manager/LayoutManager.ts

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
exports.LayoutManager = void 0;
var Manager_1 = require("../abstract/Manager");
var enum_1 = require("../define/enum");
var helper_1 = require("../help/helper");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Event;
(function (Event) {
    Event[Event["ON_LAYOUT_COMPLATED"] = 0] = "ON_LAYOUT_COMPLATED";
    Event[Event["ON_CHANGED_LAYOUT_STATE"] = 1] = "ON_CHANGED_LAYOUT_STATE";
})(Event || (Event = {}));
var LayoutManager = /** @class */ (function (_super) {
    __extends(LayoutManager, _super);
    function LayoutManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._childAlignment = enum_1.ChildAlignment.UpperLeft;
        _this._spacing = 0;
        _this._reverseArrangement = false;
        _this.delayLayout = true;
        _this._forceExpandWidth = false;
        _this._forceExpandHeight = true;
        _this._controlSizeWidth = false;
        _this._controlSizeHeight = false;
        _this._controlScaleWidth = false;
        _this._controlScaleHeight = false;
        _this._isDirty = false;
        _this._layoutQueue = [];
        return _this;
    }
    Object.defineProperty(LayoutManager.prototype, "childAlignment", {
        get: function () { return this._childAlignment; },
        set: function (value) {
            if (value == this._childAlignment)
                return;
            this._childAlignment = value;
            this.emit(Event.ON_CHANGED_LAYOUT_STATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "spacing", {
        get: function () { return this._spacing; },
        set: function (value) {
            if (value == this._spacing)
                return;
            this._spacing = value;
            this.emit(Event.ON_CHANGED_LAYOUT_STATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "reverseArrangement", {
        get: function () { return this._reverseArrangement; },
        set: function (value) {
            if (value == this._reverseArrangement)
                return;
            this._reverseArrangement = value;
            this.emit(Event.ON_CHANGED_LAYOUT_STATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "forceExpandWidth", {
        get: function () { return this._forceExpandWidth; },
        set: function (value) {
            if (value == this._forceExpandWidth)
                return;
            this._forceExpandWidth = value;
            this.emit(Event.ON_CHANGED_LAYOUT_STATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "forceExpandHeight", {
        get: function () { return this._forceExpandHeight; },
        set: function (value) {
            if (value == this._forceExpandHeight)
                return;
            this._forceExpandHeight = value;
            this.emit(Event.ON_CHANGED_LAYOUT_STATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "controlSizeWidth", {
        get: function () { return this._controlSizeWidth; },
        set: function (value) {
            if (value == this._controlSizeWidth)
                return;
            this._controlSizeWidth = value;
            this.emit(Event.ON_CHANGED_LAYOUT_STATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "controlSizeHeight", {
        get: function () { return this._controlSizeHeight; },
        set: function (value) {
            if (value == this._controlSizeHeight)
                return;
            this._controlSizeHeight = value;
            this.emit(Event.ON_CHANGED_LAYOUT_STATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "controlScaleWidth", {
        get: function () { return this._controlScaleWidth; },
        set: function (value) {
            if (value == this._controlScaleWidth)
                return;
            this._controlScaleWidth = value;
            this.emit(Event.ON_CHANGED_LAYOUT_STATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "controlScaleHeight", {
        get: function () { return this._controlScaleHeight; },
        set: function (value) {
            if (value == this._controlScaleHeight)
                return;
            this._controlScaleHeight = value;
            this.emit(Event.ON_CHANGED_LAYOUT_STATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "top", {
        get: function () {
            if (this.adapter.isVertical)
                return 0;
            return this.adapter.viewManager.top;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "bottom", {
        get: function () {
            if (this.adapter.isVertical)
                return 0;
            return this.adapter.viewManager.bottom;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "left", {
        get: function () {
            if (this.adapter.isHorizontal)
                return 0;
            return this.adapter.viewManager.left;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "right", {
        get: function () {
            if (this.adapter.isHorizontal)
                return 0;
            return this.adapter.viewManager.right;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "horizontal", {
        get: function () {
            return this.left + this.right;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "vertical", {
        get: function () {
            return this.top + this.bottom;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "isControlMainAxisSize", {
        get: function () {
            return this.adapter.isHorizontal && this.controlSizeWidth || this.adapter.isVertical && this.controlSizeHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "isControlCrossAxisSize", {
        get: function () {
            return this.adapter.isHorizontal && this.controlSizeHeight || this.adapter.isVertical && this.controlSizeWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "isControlCrossAxisScale", {
        get: function () {
            return this.adapter.isHorizontal && this.controlScaleHeight || this.adapter.isVertical && this.controlScaleWidth;
        },
        enumerable: false,
        configurable: true
    });
    LayoutManager.prototype.onInit = function () {
    };
    LayoutManager.prototype.layout = function (group) {
        if (!group)
            return;
        if (this.delayLayout) {
            this.unLayout(group.index);
            this._layoutQueue.push(group);
            this._isDirty = true;
        }
        else {
            this._layoutHandler(group);
            this.emit(Event.ON_LAYOUT_COMPLATED, [group.index]);
        }
    };
    LayoutManager.prototype.unLayout = function (index) {
        var index = this._layoutQueue.findIndex(function (item) { return item.index == index; });
        if (-1 != index) {
            this._layoutQueue.splice(index, 1);
        }
    };
    LayoutManager.prototype._layoutHandler = function (group) {
        this._calcAlongAxis(group, enum_1.Orientation.Horizontal, this.adapter.isHorizontal);
        this._setChildrenAlongAxis(group, enum_1.Orientation.Horizontal, this.adapter.isHorizontal);
        this._calcAlongAxis(group, enum_1.Orientation.Vertical, this.adapter.isHorizontal);
        this._setChildrenAlongAxis(group, enum_1.Orientation.Vertical, this.adapter.isHorizontal);
    };
    LayoutManager.prototype._calcAlongAxis = function (group, axis, isVertical) {
        var combinedPadding = (axis == enum_1.Orientation.Horizontal ? this.horizontal : this.vertical);
        var controlSize = this._getControlSize(axis);
        var controlScale = this._getControlScale(axis);
        var forceExpand = this._getForceExpandSize(axis);
        var totalMin = combinedPadding;
        var totalPreferred = combinedPadding;
        var totalFlexible = 0;
        var alongOtherAxis = isVertical != (axis == enum_1.Orientation.Vertical);
        var layoutList = this._getLayoutList(group.models);
        for (var i = 0; i < layoutList.length; i++) {
            var model = layoutList[i];
            var _a = this._getChildSizes(model, axis, controlSize, forceExpand), min = _a.min, preferred = _a.preferred, flexible = _a.flexible;
            if (controlScale) {
                var scaleFactor = model.scale[this._getAxis(axis)];
                min *= scaleFactor;
                preferred *= scaleFactor;
                flexible *= scaleFactor;
            }
            if (alongOtherAxis) {
                totalMin = Math.max(min + combinedPadding, totalMin);
                totalPreferred = Math.max(preferred + combinedPadding, totalPreferred);
                totalFlexible = Math.max(flexible, totalFlexible);
            }
            else {
                totalMin += min + this.spacing;
                totalPreferred += preferred + this.spacing;
                totalFlexible += flexible;
            }
        }
        if (!alongOtherAxis && layoutList.length > 0) {
            totalMin -= this.spacing;
            totalPreferred -= this.spacing;
        }
        totalPreferred = Math.max(totalMin, totalPreferred);
        this._setLayoutInputForAxis(group, totalMin, totalPreferred, totalFlexible, axis);
    };
    LayoutManager.prototype._getControlSize = function (axis) {
        return axis == enum_1.Orientation.Horizontal ? this.controlSizeWidth : this.controlSizeHeight;
    };
    LayoutManager.prototype._getControlScale = function (axis) {
        return axis == enum_1.Orientation.Horizontal ? this.controlScaleWidth : this.controlScaleHeight;
    };
    LayoutManager.prototype._getForceExpandSize = function (axis) {
        return axis == enum_1.Orientation.Horizontal ? this.forceExpandWidth : this.forceExpandHeight;
    };
    LayoutManager.prototype._setChildrenAlongAxis = function (group, axis, isVertical) {
        var size = group.size[this._getAxis(axis)];
        var controlSize = this._getControlSize(axis);
        var controlScale = this._getControlScale(axis);
        var forceExpand = this._getForceExpandSize(axis);
        var alignmentOnAxis = this._getAlignmentOnAxis(axis);
        var layoutList = this._getLayoutList(group.models);
        var alongOtherAxis = isVertical != (axis == enum_1.Orientation.Vertical);
        var startIndex = this.reverseArrangement ? layoutList.length - 1 : 0;
        var endIndex = this.reverseArrangement ? 0 : layoutList.length;
        var increment = this.reverseArrangement ? -1 : 1;
        var key = this._getAxis(axis);
        if (alongOtherAxis) {
            var innerSize = size - (axis == enum_1.Orientation.Horizontal ? this.horizontal : this.vertical);
            for (var i = startIndex; this.reverseArrangement ? i >= endIndex : i < endIndex; i += increment) {
                var model_1 = layoutList[i];
                var _a = this._getChildSizes(model_1, axis, controlSize, forceExpand), min = _a.min, preferred = _a.preferred, flexible = _a.flexible;
                var scaleFactor = controlScale ? model_1.scale[key] : 1;
                var requiredSpace = helper_1.Helper.clamp(innerSize, min, flexible > 0 ? size : preferred);
                var startOffset = this._getStartOffset(group, axis, requiredSpace * scaleFactor);
                if (controlSize) {
                    this._setChildAlongAxisWithScale(group, model_1, axis, startOffset, scaleFactor, requiredSpace);
                }
                else {
                    var offsetInCell = (requiredSpace - model_1.size[key]) * alignmentOnAxis;
                    offsetInCell *= scaleFactor;
                    this._setChildAlongAxisWithScale(group, model_1, axis, startOffset + offsetInCell, scaleFactor);
                }
            }
        }
        else {
            var pos = (axis == enum_1.Orientation.Horizontal ? this.left : this.top);
            var itemFlexibleMultiplier = 0;
            var surplusSpace = size - this._getTotalPreferredSize(group, axis);
            if (surplusSpace > 0) {
                if (this._getTotalFlexibleSize(group, axis) == 0) {
                    pos = this._getStartOffset(group, axis, this._getTotalPreferredSize(group, axis) - (axis == enum_1.Orientation.Horizontal ? this.horizontal : this.vertical));
                }
                else if (this._getTotalFlexibleSize(group, axis) > 0) {
                    itemFlexibleMultiplier = surplusSpace / this._getTotalFlexibleSize(group, axis);
                }
            }
            var minMaxLerp = 0;
            if (this._getTotalMinSize(group, axis) != this._getTotalPreferredSize(group, axis)) {
                minMaxLerp = helper_1.Helper.clamp01((size - this._getTotalMinSize(group, axis)) / (this._getTotalPreferredSize(group, axis) - this._getTotalMinSize(group, axis)));
            }
            for (var i = startIndex; this.reverseArrangement ? i >= endIndex : i < endIndex; i += increment) {
                var model = layoutList[i];
                var _b = this._getChildSizes(model, axis, controlSize, forceExpand), min = _b.min, preferred = _b.preferred, flexible = _b.flexible;
                var scaleFactor = controlScale ? model.scale[key] : 1;
                var childSize = helper_1.Helper.lerp(min, preferred, minMaxLerp);
                childSize += flexible * itemFlexibleMultiplier;
                if (controlSize) {
                    this._setChildAlongAxisWithScale(group, model, axis, pos, scaleFactor, childSize);
                }
                else {
                    var offsetInCell = (childSize - model.size[key]) * alignmentOnAxis;
                    this._setChildAlongAxisWithScale(group, model, axis, pos + offsetInCell, scaleFactor);
                }
                pos += childSize * scaleFactor + this.spacing;
            }
        }
    };
    LayoutManager.prototype._setChildAlongAxisWithScale = function (group, model, axis, pos, scaleFactor, size) {
        if (model == null)
            return;
        var key = this._getAxis(axis);
        var layoutSize = 0;
        if (!isNaN(size)) {
            model.layoutSize[key] = size;
            layoutSize = size;
        }
        else {
            layoutSize = model.size[key];
        }
        var position = { x: model.position.x, y: model.position.y };
        var value = 0;
        if (axis == enum_1.Orientation.Horizontal) {
            value = pos + layoutSize * model.anchorPoint[key] * scaleFactor;
            value -= group.size[key] * group.anchorPoint[key];
            value += group.position[key];
        }
        else {
            value = -pos - layoutSize * (1 - model.anchorPoint[key]) * scaleFactor;
            value += group.size[key] * (1 - group.anchorPoint[key]);
            value += group.position[key];
        }
        position[key] = value;
        model.position = position;
    };
    LayoutManager.prototype._getStartOffset = function (group, axis, requiredSpaceWithoutPadding) {
        var requiredSpace = requiredSpaceWithoutPadding + (axis == enum_1.Orientation.Horizontal ? this.horizontal : this.vertical);
        var availableSpace = group.size[this._getAxis(axis)];
        var surplusSpace = availableSpace - requiredSpace;
        var alignmentOnAxis = this._getAlignmentOnAxis(axis);
        return (axis == enum_1.Orientation.Horizontal ? this.left : this.top) + surplusSpace * alignmentOnAxis;
    };
    LayoutManager.prototype._setLayoutInputForAxis = function (group, totalMin, totalPreferred, totalFlexible, axis) {
        var key = this._getAxis(axis);
        group.totalMinSize[key] = totalMin;
        group.totalPreferredSize[key] = totalPreferred;
        group.totalFlexibleSize[key] = totalFlexible;
    };
    LayoutManager.prototype._getAxis = function (axis) {
        return axis == enum_1.Orientation.Horizontal ? "x" : "y";
    };
    LayoutManager.prototype._getMinSize = function (element, axis) {
        return element.minSize[this._getAxis(axis)];
    };
    LayoutManager.prototype._getPreferredSize = function (element, axis) {
        var key = this._getAxis(axis);
        return Math.max(element.minSize[key], element.preferredSize[key]);
    };
    LayoutManager.prototype._getFlexibleSize = function (element, axis) {
        return element.flexibleSize[this._getAxis(axis)];
    };
    LayoutManager.prototype._getTotalMinSize = function (group, axis) {
        return group.totalMinSize[this._getAxis(axis)];
    };
    LayoutManager.prototype._getTotalPreferredSize = function (group, axis) {
        return group.totalPreferredSize[this._getAxis(axis)];
    };
    LayoutManager.prototype._getTotalFlexibleSize = function (group, axis) {
        return group.totalFlexibleSize[this._getAxis(axis)];
    };
    LayoutManager.prototype._getChildSizes = function (model, axis, controlSize, childForceExpand) {
        var min, preferred, flexible;
        if (!controlSize) {
            min = model.size[this._getAxis(axis)];
            preferred = min;
            flexible = 0;
        }
        else {
            min = this._getMinSize(model.element, axis);
            preferred = this._getPreferredSize(model.element, axis);
            flexible = this._getFlexibleSize(model.element, axis);
        }
        if (childForceExpand) {
            flexible = Math.max(flexible, 1);
        }
        return { min: min, preferred: preferred, flexible: flexible };
    };
    LayoutManager.prototype._getAlignmentOnAxis = function (axis) {
        if (axis == enum_1.Orientation.Horizontal) {
            return (this.adapter.layoutManager.childAlignment % 3) * 0.5;
        }
        else {
            return Math.floor(this.adapter.layoutManager.childAlignment / 3) * 0.5;
        }
    };
    LayoutManager.prototype._getLayoutList = function (models) {
        var list = [];
        for (var i = 0; i < models.length; i++) {
            var model = models[i];
            if (model.element.ignoreLayout)
                continue;
            list.push(model);
        }
        return list;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    LayoutManager.prototype.internal_lateUpdate = function (deltaTime) {
        if (this._isDirty) {
            this._isDirty = false;
            var complatedIndexs = [];
            while (this._layoutQueue.length > 0) {
                var item = this._layoutQueue.shift();
                this._layoutHandler(item);
                complatedIndexs.push(item.index);
            }
            if (complatedIndexs.length > 0) {
                this.emit(Event.ON_LAYOUT_COMPLATED, complatedIndexs);
            }
        }
    };
    LayoutManager.Event = Event;
    __decorate([
        property({ type: enum_1.ChildAlignment })
    ], LayoutManager.prototype, "_childAlignment", void 0);
    __decorate([
        property({
            type: enum_1.ChildAlignment,
            tooltip: "布局元素的对齐方式"
        })
    ], LayoutManager.prototype, "childAlignment", null);
    __decorate([
        property()
    ], LayoutManager.prototype, "_spacing", void 0);
    __decorate([
        property({
            tooltip: "元素交叉轴布局的间距"
        })
    ], LayoutManager.prototype, "spacing", null);
    __decorate([
        property()
    ], LayoutManager.prototype, "_reverseArrangement", void 0);
    __decorate([
        property({
            tooltip: "反转布局"
        })
    ], LayoutManager.prototype, "reverseArrangement", null);
    __decorate([
        property({
            tooltip: "延迟布局，开启后会统一在下一帧布局，建议开启"
        })
    ], LayoutManager.prototype, "delayLayout", void 0);
    __decorate([
        property()
    ], LayoutManager.prototype, "_forceExpandWidth", void 0);
    __decorate([
        property({
            group: { id: "0", name: "forceExpand" },
            tooltip: "是否强制布局元素宽度扩展以填充额外的可用空间"
        })
    ], LayoutManager.prototype, "forceExpandWidth", null);
    __decorate([
        property()
    ], LayoutManager.prototype, "_forceExpandHeight", void 0);
    __decorate([
        property({
            group: { id: "0", name: "forceExpand" },
            tooltip: "是否强制布局元素高度扩展以填充额外的可用空间"
        })
    ], LayoutManager.prototype, "forceExpandHeight", null);
    __decorate([
        property()
    ], LayoutManager.prototype, "_controlSizeWidth", void 0);
    __decorate([
        property({
            group: { id: "0", name: "controlSize" },
            tooltip: "如果设置为 false，布局只会影响元素的位置，而不会影响宽度，在这种情况下你可以设置元素的宽度\n如果设置为 true，元素的宽度将由布局根据它们各自的 IElement.minSize、IElement.preferredSize、IElement.flexibleSize自动设置。如果元素的宽度应根据可用空间的大小而变化，应开启此功能。在这种情况下不能直接设置每个元素的宽度，但可以通过控制每个元素的IElement.minSize、IElement.preferredSize、IElement.flexibleSize来进行控制"
        })
    ], LayoutManager.prototype, "controlSizeWidth", null);
    __decorate([
        property()
    ], LayoutManager.prototype, "_controlSizeHeight", void 0);
    __decorate([
        property({
            group: { id: "0", name: "controlSize" },
            tooltip: "如果设置为 false，布局只会影响元素的位置，而不会影响高度，在这种情况下你可以设置元素的高度\n如果设置为 true，元素的高度将由布局根据它们各自的 IElement.minSize、IElement.preferredSize、IElement.flexibleSize自动设置。如果元素的高度应根据可用空间的大小而变化，应开启此功能。在这种情况下不能直接设置每个元素的高度，但可以通过控制每个元素的IElement.minSize、IElement.preferredSize、IElement.flexibleSize来进行控制"
        })
    ], LayoutManager.prototype, "controlSizeHeight", null);
    __decorate([
        property()
    ], LayoutManager.prototype, "_controlScaleWidth", void 0);
    __decorate([
        property({
            group: { id: "0", name: "controlScale" },
            tooltip: "是否使用 x 缩放计算宽度"
        })
    ], LayoutManager.prototype, "controlScaleWidth", null);
    __decorate([
        property()
    ], LayoutManager.prototype, "_controlScaleHeight", void 0);
    __decorate([
        property({
            group: { id: "0", name: "controlScale" },
            tooltip: "是否使用 y 缩放计算高度"
        })
    ], LayoutManager.prototype, "controlScaleHeight", null);
    LayoutManager = __decorate([
        ccclass('LayoutManager')
    ], LayoutManager);
    return LayoutManager;
}(Manager_1.Manager));
exports.LayoutManager = LayoutManager;

cc._RF.pop();