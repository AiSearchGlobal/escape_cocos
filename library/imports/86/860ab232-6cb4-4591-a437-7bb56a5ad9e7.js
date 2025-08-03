"use strict";
cc._RF.push(module, '860abIybLRFkaQ3e7VqWtnn', 'ViewManager');
// script/framework/adapter/manager/ViewManager.ts

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
exports.ViewManager = void 0;
// import { _decorator, Node, instantiate } from 'cc';
var Group_1 = require("../abstract/Group");
var Manager_1 = require("../abstract/Manager");
var View_1 = require("../abstract/View");
var enum_1 = require("../define/enum");
var helper_1 = require("../help/helper");
var ModelManager_1 = require("./ModelManager");
var ScrollManager_1 = require("./ScrollManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Event;
(function (Event) {
    Event[Event["ON_SCROLL"] = 0] = "ON_SCROLL";
    Event[Event["ON_LATEUPDATE"] = 1] = "ON_LATEUPDATE";
    Event[Event["ON_CLEARVIEWS"] = 2] = "ON_CLEARVIEWS";
    Event[Event["ON_UPDATE_VIEWS"] = 3] = "ON_UPDATE_VIEWS";
    Event[Event["ON_CHANGED_VIRTUALSIZE"] = 4] = "ON_CHANGED_VIRTUALSIZE";
    Event[Event["ON_MAGNETIC"] = 5] = "ON_MAGNETIC";
    Event[Event["ON_CHANGED_OVERFLOWHEADER"] = 6] = "ON_CHANGED_OVERFLOWHEADER";
    Event[Event["ON_RESET_ALL_STATE"] = 7] = "ON_RESET_ALL_STATE";
    Event[Event["ON_CHANGED_SPACING"] = 8] = "ON_CHANGED_SPACING";
})(Event || (Event = {}));
var ViewManager = /** @class */ (function (_super) {
    __extends(ViewManager, _super);
    function ViewManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._arrangeAxis = enum_1.ArrangeAxis.Start;
        _this.stretchDirection = enum_1.StretchDirection.Auto;
        _this.overflowOffset = 0.3;
        _this.enterOffset = 0;
        _this._spacing = 0;
        _this.left = 0;
        _this.right = 0;
        _this.top = 0;
        _this.bottom = 0;
        _this.magnetic = false;
        _this.magneticDirection = enum_1.MagneticDirection.Header;
        _this.magneticDuration = 0.5;
        _this.magneticSizeChanges = false;
        _this.loopHeader = false;
        _this.loopFooter = false;
        _this._groupLength = 0;
        _this._cacheGroups = [];
        _this._groups = [];
        _this._disableViews = [];
        _this._visibleViews = [];
        _this._fixedViews = [];
        _this._disableHolders = [];
        _this._isFill = false;
        _this._headerIndex = -1;
        _this._footerIndex = -1;
        _this._virtualSize = 0;
        _this._overflowHeader = 0;
        _this._cacheHeadeDatas = [];
        return _this;
    }
    Object.defineProperty(ViewManager.prototype, "arrangeAxis", {
        get: function () { return this._arrangeAxis; },
        set: function (value) {
            if (value == this._arrangeAxis)
                return;
            this._arrangeAxis = value;
            this._resetAllState();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewManager.prototype, "spacing", {
        get: function () { return this._spacing; },
        set: function (value) {
            if (value == this._spacing)
                return;
            this._spacing = value;
            this._resetAllState();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewManager.prototype, "header", {
        get: function () { return this._visibleViews[0]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewManager.prototype, "footer", {
        get: function () { return this._visibleViews[this._visibleViews.length - 1]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewManager.prototype, "overflowHeader", {
        get: function () { return this._overflowHeader; },
        set: function (value) {
            if (value == this._overflowHeader)
                return;
            this._overflowHeader = value;
            this.emit(Event.ON_CHANGED_OVERFLOWHEADER, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewManager.prototype, "virtualSize", {
        get: function () { return this._virtualSize; },
        set: function (value) {
            if (value == this._virtualSize)
                return;
            this._virtualSize = value;
            this.emit(Event.ON_CHANGED_VIRTUALSIZE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewManager.prototype, "groupLength", {
        get: function () { return this._groupLength; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewManager.prototype, "visibleLength", {
        get: function () { return this._visibleViews.length; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewManager.prototype, "min", {
        get: function () {
            if (!this.header)
                return 0;
            var value = this.adapter.isArrangeAxisStart
                ? this.internal_getGroupFooterBoundary(this.footer.group)
                : this.internal_getGroupHeaderBoundary(this.header.group);
            return value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewManager.prototype, "max", {
        get: function () {
            if (!this.header)
                return 0;
            var value = this.adapter.isArrangeAxisStart
                ? this.internal_getGroupHeaderBoundary(this.header.group)
                : this.internal_getGroupFooterBoundary(this.footer.group);
            return value;
            // return this.adapter.isArrangeStart ? this.header.headerBoundary : this.footer.footerBoundary
        },
        enumerable: false,
        configurable: true
    });
    ViewManager.prototype.onInit = function () {
        this.adapter.modelManager.on(ModelManager_1.ModelManager.Event.ON_CHANGE_BEFORE, this._onModelChangeBefore, this);
        this.adapter.modelManager.on(ModelManager_1.ModelManager.Event.ON_INSERT, this._updateGroups, this);
        this.adapter.modelManager.on(ModelManager_1.ModelManager.Event.ON_REMOVE, this._updateGroups, this);
        this.adapter.modelManager.on(ModelManager_1.ModelManager.Event.ON_MOVE, this._updateGroups, this);
        this.adapter.modelManager.on(ModelManager_1.ModelManager.Event.ON_CLEAR, this._onClearModel, this);
        this.adapter.scrollManager.on(ScrollManager_1.ScrollManager.Event.ON_SCROLL, this._onScroll, this);
        this.adapter.scrollManager.on(ScrollManager_1.ScrollManager.Event.ON_VIEW_SIZE_CHANGED, this._resetAllState, this);
        this.adapter.scrollManager.on(ScrollManager_1.ScrollManager.Event.ON_CHANGED_ORIENTATION, this._resetAllState, this);
    };
    ViewManager.prototype._clearAll = function () {
        var _a;
        for (var i = 0, len = this._visibleViews.length; i < len; i++) {
            this._recycleViewToDisableViews(this._visibleViews[i]);
        }
        (_a = this._cacheGroups).push.apply(_a, this._groups);
        this._clearFixedViews();
        this._visibleViews.length = 0;
        this._groups.length = 0;
        this.virtualSize = 0;
        this.overflowHeader = 0;
    };
    ViewManager.prototype._onClearModel = function () {
        this._clearAll();
        this.emit(Event.ON_CLEARVIEWS);
    };
    ViewManager.prototype._resetAllState = function () {
        if (CC_EDITOR)
            return;
        this._clearAll();
        this.internal_updateVisibleView(0);
        this.emit(Event.ON_RESET_ALL_STATE);
    };
    /**
     * 数据即将发生变化，在这之前缓存当前header信息
     */
    ViewManager.prototype._onModelChangeBefore = function () {
        if (!this.header)
            return;
        // 优先以索引0为参考
        if (this.virtualSize > this.adapter.mainAxisSize) {
            var index = this.getVisibleIndexByGroupIndex(0);
            if (-1 != index) {
                var header = this._visibleViews[index];
                this._cacheHeadeDatas = header.group.models.map(function (item) { return item.data; });
                this._cacheHeadePosition = {
                    x: header.group.position.x,
                    y: header.group.position.y,
                };
            }
            else {
                this._cacheHeadeDatas = this.header.group.models.map(function (item) { return item.data; });
                this._cacheHeadePosition = { x: this.header.group.position.x, y: this.header.group.position.y };
            }
        }
    };
    /**
     * 更新所有Group
     */
    ViewManager.prototype._updateGroups = function (insertIndex) {
        var _a;
        var _this = this;
        var view = this._getViewFromDisibleViews(null);
        var gindex = this.getGroupIndexByModelIndex(insertIndex);
        if (-1 == gindex) {
            gindex = this._groupLength - 1;
        }
        var group = null;
        var clear = false;
        var options = { modelIndex: insertIndex, fixedIndex: -1 };
        var prevGroup = this._groups[gindex - 1];
        if (prevGroup) {
            options.fixedIndex = prevGroup.fixedIndex;
        }
        while (true) {
            group = this._groups[gindex];
            if (!group) {
                group = this._getGroupFromCache();
                group.internal_setIndex(this._groups.length);
                this._groups.push(group);
                gindex = this._groups.length;
            }
            var ok = group.internal_insert(options, view, clear);
            gindex++;
            clear = true;
            if (!ok) {
                break;
            }
        }
        var caches = this._groups.splice(gindex, this._groups.length);
        (_a = this._cacheGroups).push.apply(_a, caches);
        this._groupLength = this._groups.length;
        // 查询变化前的画面信息
        var referIndex = -1;
        var virtualSize = 0;
        if (this._cacheHeadeDatas.length > 0) {
            referIndex = this._groups.findIndex(function (item) { return item.internal_includes(_this._cacheHeadeDatas); });
        }
        var relative = this._groups[referIndex];
        if (relative) {
            // 如果参考点存在，则保持不动
            virtualSize += relative.size[this.adapter.mainAxis] + this.spacing;
            relative.internal_setPosition(this._cacheHeadePosition[this.adapter.mainAxis]);
        }
        // 以参考点为起始向下上扩展
        for (var i = referIndex - 1; i >= 0; i--) {
            var curr = this._groups[i];
            this._calcMainAxisPosition(curr, relative, enum_1.MagneticDirection.Header);
            virtualSize += curr.size[this.adapter.mainAxis] + this.spacing;
            relative = curr;
        }
        relative = this._groups[referIndex];
        // 以参考点为起始向下扩展
        for (var i = referIndex + 1; i < this.groupLength; i++) {
            var curr = this._groups[i];
            this._calcMainAxisPosition(curr, relative, enum_1.MagneticDirection.Footer);
            virtualSize += curr.size[this.adapter.mainAxis] + this.spacing;
            relative = curr;
        }
        virtualSize -= this.spacing;
        this._virtualSize = Math.max(0, virtualSize);
        this._resetOverflowHeader(this._groups[0]);
        view.internal_reset();
        this._disableViews.push(view);
        this.updateVisibles(referIndex);
        this._cacheHeadeDatas = [];
        this._cacheHeadePosition = null;
    };
    ViewManager.prototype.updateVisibles = function (referIndex) {
        var cacheHolders = [];
        referIndex = Math.max(0, referIndex);
        var findHolder = function (model) {
            var index = cacheHolders.findIndex(function (holder) { return holder.oldData == model.data; });
            if (-1 != index) {
                return cacheHolders.splice(index, 1)[0];
            }
            return null;
        };
        // 将所有holder取出来
        for (var i = 0; i < this._visibleViews.length; i++) {
            var view_1 = this._visibleViews[i];
            cacheHolders = cacheHolders.concat(view_1.holderList);
            view_1.internal_reset();
        }
        var mainAxisSize = this.adapter.mainAxisSize;
        var visibleIndex = 0;
        var length = this.visibleLength;
        for (var i = referIndex, len = this._groups.length; i < len; i++) {
            var group = this._groups[i];
            var visibleSize = this.getVisibleMainAxisSize();
            if (visibleSize >= mainAxisSize && length <= 0) {
                break;
            }
            var view = this._visibleViews[visibleIndex++];
            if (!view) {
                view = this._getViewFromDisibleViews(group.index);
                this._visibleViews.push(view);
            }
            // 只处理创建Holder的逻辑，不会马上显示
            view.internal_preVisible(group, findHolder);
            length--;
        }
        // 回收空view
        for (var i = this._visibleViews.length - 1; i >= 0; i--) {
            var view = this._visibleViews[i];
            if (view.holderList.length > 0) {
                break;
            }
            this._disableFromVisibleViews(i);
        }
        // 回收未使用的holder
        for (var i = 0, len = cacheHolders.length; i < len; i++) {
            var holder = cacheHolders[i];
            holder.internal_disable();
            this._disableHolders.push(holder);
        }
        // 最后将所有Holder显示（解决：向数据头部添加数据时，每个Holder在显示同时修改了尺寸，导致后续的Holder坐标没有更新）
        // 解决办法：将显示的逻辑放到最后执行
        for (var i = 0; i < this.visibleLength; i++) {
            this._visibleViews[i].internal_visible();
        }
        this._forceFill();
        this._calcMagnetic();
        this.emit(Event.ON_UPDATE_VIEWS);
    };
    ViewManager.prototype._getGroupFromCache = function () {
        var group = this._cacheGroups.pop();
        if (!group) {
            group = new Group_1.Group(this.adapter);
        }
        group.internal_reset();
        return group;
    };
    ViewManager.prototype._calcMagnetic = function () {
        if (!this.magnetic)
            return;
        if (!this.header)
            return;
        var ok = false;
        if (this.adapter.scrollManager.velocity == 0) {
            if (this.magneticDirection == enum_1.MagneticDirection.Footer) {
                if (this.footer.index == this._groupLength - 1) {
                    this.adapter.scrollManager.scrollToFooter(this.magneticDuration);
                    ok = true;
                }
            }
            else {
                if (this.header.index == 0) {
                    this.adapter.scrollManager.scrollToHeader(this.magneticDuration);
                    ok = true;
                }
            }
        }
        this.emit(Event.ON_MAGNETIC, ok);
    };
    ViewManager.prototype._calcMainAxisPosition = function (group, relativeGroup, direction) {
        if (!group)
            return;
        if (!relativeGroup) {
            // this._setGroupPosition(group, this._getMainAxisHeaderPosition(group))
            group.internal_setPosition(this._getMainAxisHeaderPosition(group));
        }
        else {
            var xy = this.adapter.mainAxis;
            var multiplier = this.adapter.multiplier;
            var dirMultiplier = direction == enum_1.MagneticDirection.Footer ? 1 : -1;
            var relPoint, curPoint;
            if (direction == enum_1.MagneticDirection.Footer) {
                relPoint = multiplier == 1 ? relativeGroup.anchorPoint[xy] : 1 - relativeGroup.anchorPoint[xy];
                curPoint = multiplier == 1 ? 1 - group.anchorPoint[xy] : group.anchorPoint[xy];
            }
            else {
                relPoint = multiplier == 1 ? 1 - relativeGroup.anchorPoint[xy] : relativeGroup.anchorPoint[xy];
                curPoint = multiplier == 1 ? group.anchorPoint[xy] : 1 - group.anchorPoint[xy];
            }
            var position = relativeGroup.position[xy];
            position -= (relativeGroup.size[xy] * relPoint * dirMultiplier) * multiplier;
            position -= this.spacing * multiplier * dirMultiplier;
            position -= (group.size[xy] * curPoint * dirMultiplier) * multiplier;
            // this._setGroupPosition(group, position)
            group.internal_setPosition(position);
        }
    };
    ViewManager.prototype._getMainAxisHeaderPosition = function (group) {
        var position = 0;
        var anchor = 0;
        if (this.adapter.isVertical) {
            position = this.adapter.isArrangeAxisStart ? -this.top : this.bottom;
            anchor = this.adapter.isArrangeAxisStart ? 1 - group.anchorPoint[this.adapter.mainAxis] : group.anchorPoint[this.adapter.mainAxis];
        }
        else {
            position = this.adapter.isArrangeAxisStart ? this.left : -this.right;
            anchor = this.adapter.isArrangeAxisStart ? group.anchorPoint[this.adapter.mainAxis] : 1 - group.anchorPoint[this.adapter.mainAxis];
        }
        position -= anchor * group.size[this.adapter.mainAxis] * this.adapter.multiplier;
        return position;
    };
    ViewManager.prototype._getViewFromDisibleViews = function (groupIndex) {
        var view = null;
        if (groupIndex != null) {
            var index = this._fixedViews.findIndex(function (view) { return view.index == groupIndex; });
            if (-1 != index) {
                var remView = this._fixedViews.splice(index, 1)[0];
                this._recycleViewToDisableViews(remView);
            }
        }
        if (!view) {
            view = this._disableViews.pop();
        }
        if (!view) {
            view = this.adapter.getView();
        }
        return view;
    };
    ViewManager.prototype._getHolderFromDisableHolders = function (model) {
        var index = this._disableHolders.findIndex(function (holder) { return holder.code == model.code; });
        if (-1 != index) {
            return this._disableHolders.splice(index, 1)[0];
        }
    };
    /**
     * 禁用 view 并回收所有节点
     * @param visibleIndex 可视view索引
     */
    ViewManager.prototype._disableFromVisibleViews = function (visibleIndexOrView) {
        var remIndex = -1;
        if (visibleIndexOrView instanceof View_1.View) {
            remIndex = this._visibleViews.findIndex(function (item) { return item.index == visibleIndexOrView.index; });
        }
        else {
            remIndex = visibleIndexOrView;
        }
        this._recycleViewToDisableViews(this._visibleViews[remIndex]);
        this._visibleViews.splice(remIndex, 1);
    };
    ViewManager.prototype._recycleViewToDisableViews = function (view) {
        var _this = this;
        if (!view)
            return;
        view.internal_recycleHolders(function (holder) { return _this._disableHolders.push(holder); });
        view.internal_disable();
        this._disableViews.push(view);
    };
    ViewManager.prototype._clearFixedViews = function () {
        for (var i = 0, len = this._fixedViews.length; i < len; i++) {
            var view = this._fixedViews[i];
            this._recycleViewToDisableViews(view);
        }
        this._fixedViews.length = 0;
    };
    ViewManager.prototype._checkHeaderInvisible = function () {
        if (!this.header)
            return;
        if (!this.loopFooter && this.footer.index == this.groupLength - 1) {
            return;
        }
        if (this._isOverflowHeader(this.header.group)) {
            this._disableFromVisibleViews(0);
            this._checkHeaderInvisible();
        }
    };
    ViewManager.prototype._checkFooterInvisible = function () {
        if (!this.footer)
            return;
        if (!this.loopHeader && this.header.index == 0) {
            return;
        }
        if (this._isOverflowFooter(this.footer.group)) {
            this._disableFromVisibleViews(this._visibleViews.length - 1);
            this._checkFooterInvisible();
        }
    };
    ViewManager.prototype._isOverflowHeader = function (group, defaultOffset) {
        if (defaultOffset === void 0) { defaultOffset = this.overflowOffset; }
        var footerBoundary = this.internal_getGroupFooterBoundary(group);
        defaultOffset = defaultOffset * group.size[this.adapter.mainAxis];
        return this.adapter.multiplier == 1 ? footerBoundary >= defaultOffset : footerBoundary <= -defaultOffset;
    };
    ViewManager.prototype._isOverflowFooter = function (group, defaultOffset) {
        if (defaultOffset === void 0) { defaultOffset = this.overflowOffset; }
        var headerBoundary = this.internal_getGroupHeaderBoundary(group);
        defaultOffset = defaultOffset * group.size[this.adapter.mainAxis];
        return this.adapter.multiplier == 1
            ? headerBoundary + this.adapter.mainAxisSize <= -defaultOffset
            : headerBoundary - this.adapter.mainAxisSize >= defaultOffset;
    };
    ViewManager.prototype._isEnterFooter = function (group) {
        if (!group)
            return false;
        var footerBoundary = this.internal_getGroupFooterBoundary(group);
        var defaultOffset = (this.enterOffset) * group.size[this.adapter.mainAxis];
        return this.adapter.multiplier == 1
            ? footerBoundary + this.adapter.mainAxisSize + defaultOffset >= 0
            : footerBoundary - this.adapter.mainAxisSize - defaultOffset <= 0;
    };
    ViewManager.prototype._isEnterHeader = function (group) {
        if (!group)
            return false;
        var headerBoundary = this.internal_getGroupHeaderBoundary(group);
        var defaultOffset = (this.overflowOffset) * group.size[this.adapter.mainAxis];
        return this.adapter.multiplier == 1
            ? headerBoundary - defaultOffset <= 0
            : headerBoundary + defaultOffset >= 0;
    };
    ViewManager.prototype._fillHeader = function () {
        var group = this._groups[this._headerIndex];
        if (!this._isEnterHeader(group)) {
            return;
        }
        // 初始化尺寸
        var _a = this._accumTargetSizeTowardsHeader(group.index, this.internal_getInitHeaderSize(group)), index = _a.index, size = _a.size;
        var target = this._groups[index];
        if (!target) {
            return;
        }
        if (-1 != this.getVisibleIndexByGroupIndex(index)) {
            return;
        }
        var position = this.internal_convertSizeToHeaderPosition(size, target);
        // this._setGroupPosition(target, position)
        target.internal_setPosition(position);
        var view = this._getViewFromDisibleViews(target.index);
        this._visibleViews.unshift(view);
        view.internal_preVisible(target).internal_visible();
        if (view.index == 0) {
            this._resetOverflowHeader(view.group);
        }
        this._headerIndex = target.index;
        this._fillHeader();
    };
    ViewManager.prototype._fillFooter = function () {
        var group = this._groups[this._footerIndex];
        if (!this._isEnterFooter(group)) {
            return;
        }
        // 初始化尺寸
        var _a = this._accumTargetSizeTowardsFooter(group.index, this.internal_getInitFooterSize(group)), index = _a.index, size = _a.size;
        var target = this._groups[index];
        if (!target) {
            return;
        }
        if (-1 != this.getVisibleIndexByGroupIndex(index)) {
            return;
        }
        var position = this.internal_convertSizeToFooterPosition(size, target);
        target.internal_setPosition(position);
        // this._setGroupPosition(target, position)
        var view = this._getViewFromDisibleViews(target.index);
        this._visibleViews.push(view);
        view.internal_preVisible(target).internal_visible();
        if (view.index == 0) {
            this._resetOverflowHeader(view.group);
        }
        this._footerIndex = target.index;
        this._fillFooter();
    };
    ViewManager.prototype._fillFixedView = function () {
        if (!this.header || (this.header.group.fixedIndex == -1 && !this.header.group.isFixed)) {
            return;
        }
        var startIndex = this.header.index;
        var mainAxis = this.adapter.mainAxis;
        // 创建当前应该显示的fixed
        var size = this.internal_getInitHeaderSize(this.header.group);
        for (var i = startIndex - 1; i >= 0; i--) {
            var group = this._groups[i];
            if (!group) {
                console.error("_fillFixedView错误 找不到group", i);
                return;
            }
            size += group.size[mainAxis] + this.spacing;
            if (!group.isFixed) {
                continue;
            }
            var position = this.internal_convertSizeToHeaderPosition(size, group);
            if (-1 != this._fixedViews.findIndex(function (view) { return view.index == group.index; })) {
                if (!helper_1.Helper.approximately(position, group.position[mainAxis])) {
                    // this._setGroupPosition(group, position)
                    group.internal_setPosition(position);
                    this.adapter.layoutManager.layout(group);
                }
                break;
            }
            this._clearFixedViews();
            var position = this.internal_convertSizeToHeaderPosition(size, group);
            // this._setGroupPosition(group, position)
            group.internal_setPosition(position);
            var view = this._getViewFromDisibleViews(group.index);
            view.internal_preVisible(group).internal_visible();
            this._fixedViews.push(view);
            break;
        }
    };
    ViewManager.prototype._accumTargetSizeTowardsHeader = function (index, size) {
        var length = this._groups.length;
        do {
            if (index == 0) {
                if (this.loopHeader) {
                    index = length;
                }
            }
            if (index == 0) {
                return { index: index, size: size };
            }
            index--;
            var info = this._groups[index];
            if (!info) {
                return { index: index, size: size };
            }
            size += this.internal_accumulationSize(index);
            if (size >= 0) {
                return { index: index, size: size };
            }
        } while (true);
    };
    ViewManager.prototype._accumTargetSizeTowardsFooter = function (index, size) {
        var length = this._groups.length;
        do {
            if (index == length - 1) {
                if (this.loopFooter) {
                    index = -1;
                }
            }
            if (index == length - 1) {
                return { index: index, size: size };
            }
            index++;
            var viewInfo = this._groups[index];
            if (!viewInfo) {
                return { index: index, size: size };
            }
            size += this.internal_accumulationSize(index);
            if (size >= 0) {
                return { index: index, size: size };
            }
        } while (true);
    };
    ViewManager.prototype._fillFooterHandle = function () {
        this._checkHeaderInvisible();
        this._fillFooter();
    };
    ViewManager.prototype._fillHeaderHandle = function () {
        this._checkFooterInvisible();
        this._fillHeader();
    };
    ViewManager.prototype._forceFill = function () {
        this._updateHeaderFooterIndex();
        this._fillHeaderHandle();
        this._fillFooterHandle();
    };
    ViewManager.prototype._updateHeaderFooterIndex = function () {
        this._headerIndex = this.header ? this.header.index : 0;
        this._footerIndex = this.footer ? this.footer.index : 0;
    };
    ViewManager.prototype._onScroll = function (direction) {
        if (this._groups.length == 0)
            return;
        this._updateHeaderFooterIndex();
        switch (direction) {
            case enum_1.ScrollDirection.Up:
            case enum_1.ScrollDirection.Left:
                // 向下填充 
                if (this.adapter.isArrangeAxisStart) {
                    this._fillFooterHandle();
                }
                else {
                    this._fillHeaderHandle();
                }
                break;
            case enum_1.ScrollDirection.Down:
            case enum_1.ScrollDirection.Right:
                // 向上填充
                if (this.adapter.isArrangeAxisStart) {
                    this._fillHeaderHandle();
                }
                else {
                    this._fillFooterHandle();
                }
                break;
        }
        this._fillFixedView();
        this.emit(Event.ON_SCROLL);
    };
    /**
     * 向头部伸展
     */
    ViewManager.prototype._stretchToHeader = function (current, start) {
        // 以当前改变的内容为基础 向上头部延伸
        var prev = this._visibleViews[current];
        for (var i = start; i >= 0; i--) {
            var curr = this._visibleViews[i];
            if (prev) {
                this._calcMainAxisPosition(curr.group, prev.group, enum_1.MagneticDirection.Header);
                this.adapter.layoutManager.layout(curr.group);
            }
            else if (this.getVisibleMainAxisSize() < this.adapter.mainAxisSize) {
                this._calcMainAxisPosition(curr.group, null, enum_1.MagneticDirection.Header);
            }
            prev = curr;
        }
    };
    /**
     * 向尾部伸展
     */
    ViewManager.prototype._stretchToFooter = function (current, start) {
        // 以当前改变的内容为基础 向上尾部延伸
        var prev = this._visibleViews[current];
        for (var i = start; i < this._visibleViews.length; i++) {
            var curr = this._visibleViews[i];
            if (prev) {
                this._calcMainAxisPosition(curr.group, prev.group, enum_1.MagneticDirection.Footer);
                this.adapter.layoutManager.layout(curr.group);
            }
            else if (this.getVisibleMainAxisSize() < this.adapter.mainAxisSize) {
                this._calcMainAxisPosition(curr.group, null, enum_1.MagneticDirection.Footer);
            }
            prev = curr;
        }
    };
    /**
     * 重置overflowHeader 使其保持在0的位置
     */
    ViewManager.prototype._resetOverflowHeader = function (group) {
        if (!group)
            return this.overflowHeader = 0;
        var mainAxis = this.adapter.mainAxis;
        var anchor = group.anchorPoint[mainAxis];
        anchor = this.adapter.multiplier == 1 ? 1 - anchor : anchor;
        var offset = group.position[mainAxis];
        offset += group.size[mainAxis] * anchor * this.adapter.multiplier;
        this.overflowHeader = offset;
    };
    /**
    * 当item尺寸改变时 计算相对于content的头部溢出偏移量
    */
    ViewManager.prototype._calcOverflowHeader = function (group, centerIndex, visibleIndex) {
        var zero = this.getVisibleIndexByGroupIndex(0);
        if (-1 != zero) {
            var header = this._visibleViews[zero];
            return this._resetOverflowHeader(header.group);
        }
        var mainAxis = this.adapter.mainAxis;
        var anchor = group.anchorPoint[mainAxis];
        anchor = this.adapter.multiplier == 1 ? 1 - anchor : anchor;
        var oldSize = group.oldSize[mainAxis];
        var newSize = group.size[mainAxis];
        var multiplier = this.adapter.multiplier;
        switch (this.stretchDirection) {
            case enum_1.StretchDirection.Header: //✅
                // 判断改变的item是否有被testNode覆盖 也就是说是否在范围内，如果不在则不用理会
                // 判断旧坐标是否大于overflowHeader 大于说明有被覆盖
                var oldOffset = group.oldPosition[mainAxis] + (oldSize * anchor) * multiplier;
                var ok = multiplier == 1 ? this.overflowHeader >= oldOffset : this.overflowHeader <= oldOffset;
                if (ok) {
                    this.overflowHeader += (newSize - oldSize) * multiplier;
                }
                break;
            case enum_1.StretchDirection.Footer: //✅
                var oldOffset = group.oldPosition[mainAxis] + (oldSize * anchor) * multiplier;
                var ok = multiplier == 1 ? this.overflowHeader >= oldOffset : this.overflowHeader <= oldOffset;
                if (ok) {
                }
                else {
                    this.overflowHeader -= (newSize - oldSize) * multiplier;
                }
                break;
            case enum_1.StretchDirection.Center: //✅
                var oldOffset = group.oldPosition[mainAxis] + (oldSize * anchor) * multiplier;
                var ok = multiplier == 1 ? this.overflowHeader >= oldOffset : this.overflowHeader <= oldOffset;
                if (ok) {
                    this.overflowHeader += (newSize - oldSize) * 0.5 * multiplier;
                }
                else {
                    this.overflowHeader -= (newSize - oldSize) * 0.5 * multiplier;
                }
                break;
            case enum_1.StretchDirection.Auto: //✅
                var oldOffset = group.oldPosition[mainAxis] + (oldSize * anchor) * multiplier;
                var ok = multiplier == 1 ? this.overflowHeader >= oldOffset : this.overflowHeader <= oldOffset;
                if (centerIndex <= visibleIndex) {
                    oldOffset = group.oldPosition[mainAxis] + (oldSize * anchor) * multiplier;
                    ok = multiplier == -1 ? this.overflowHeader >= oldOffset : this.overflowHeader <= oldOffset;
                }
                if (ok) {
                    if (centerIndex <= visibleIndex) {
                        this.overflowHeader -= (newSize - oldSize) * multiplier;
                    }
                    else {
                        this.overflowHeader += (newSize - oldSize) * multiplier;
                    }
                }
                break;
        }
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    ViewManager.prototype.internal_lateUpdate = function (deltaTime) {
        if (this._isFill) {
            this._isFill = false;
            this._forceFill();
        }
        this.emit(Event.ON_LATEUPDATE, deltaTime);
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    ViewManager.prototype.internal_viewChanged = function (view, oldMainAxisSize) {
        var cross = view.group.size[this.adapter.mainAxis] - oldMainAxisSize;
        this.virtualSize += cross;
        var visibleIndex = this.getVisibleIndexByGroupIndex(view.index);
        var centerIndex = -1;
        if (this.getVisibleMainAxisSize() < this.adapter.mainAxisSize || this.stretchDirection == enum_1.StretchDirection.Footer) {
            // 以当前改变的内容为基础 向上尾部延伸
            var prev = visibleIndex - 1;
            if (!this._visibleViews[prev]) {
                this.adapter.layoutManager.layout(view.group);
            }
            this._stretchToFooter(prev, visibleIndex);
        }
        else if (this.stretchDirection == enum_1.StretchDirection.Header) {
            // 以当前改变的内容为基础 向上头部延伸
            var prev = visibleIndex + 1;
            if (!this._visibleViews[prev]) {
                this.adapter.layoutManager.layout(view.group);
            }
            this._stretchToHeader(prev, visibleIndex);
        }
        else if (this.stretchDirection == enum_1.StretchDirection.Center) {
            this.adapter.layoutManager.layout(view.group);
            this._stretchToHeader(visibleIndex, visibleIndex - 1);
            this._stretchToFooter(visibleIndex, visibleIndex + 1);
        }
        else {
            centerIndex = this.adapter.centerManager.getCenterVisibleIndex();
            if (-1 != centerIndex) {
                var center = this._visibleViews[centerIndex];
                this.adapter.layoutManager.layout(center.group);
                this._stretchToHeader(centerIndex, centerIndex - 1);
                this._stretchToFooter(centerIndex, centerIndex + 1);
            }
            else {
                throw Error("找不到中心索引" + view.index);
            }
        }
        // 尺寸改变时 修复百分比
        this._calcOverflowHeader(view.group, centerIndex, visibleIndex);
        if (this.magneticSizeChanges) {
            this._calcMagnetic();
        }
        this._isFill = true;
        this.emit(Event.ON_CHANGED_VIRTUALSIZE);
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    ViewManager.prototype.internal_getHolder = function (model) {
        var holder = this._getHolderFromDisableHolders(model);
        if (!holder) {
            var prefab = this.adapter.getPrefab(model.data);
            var node = cc.instantiate(prefab);
            holder = this.adapter.getHolder(node, model.code);
        }
        holder.node.parent = this.adapter.scrollManager.getLayerNode(model.element.layer);
        return holder;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    ViewManager.prototype.internal_updateVisibleView = function (index) {
        // 延迟刷新，取最小影响行数
        this._onModelChangeBefore();
        this._updateGroups(index);
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    ViewManager.prototype.internal_getGroupFooterBoundary = function (group) {
        if (!group)
            return 0;
        var anchor = group.anchorPoint[this.adapter.mainAxis];
        anchor = this.adapter.multiplier == 1 ? anchor : 1 - anchor;
        var value = group.position[this.adapter.mainAxis];
        value -= (group.size[this.adapter.mainAxis] * anchor) * this.adapter.multiplier;
        value += this.adapter.scrollManager.contentPosition;
        return value;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    ViewManager.prototype.internal_getGroupHeaderBoundary = function (group) {
        if (!group)
            return 0;
        var anchor = group.anchorPoint[this.adapter.mainAxis];
        anchor = this.adapter.multiplier == 1 ? 1 - anchor : anchor;
        var value = group.position[this.adapter.mainAxis]
            + this.adapter.scrollManager.contentPosition
            + (anchor * group.size[this.adapter.mainAxis]) * this.adapter.multiplier;
        return value;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    ViewManager.prototype.internal_getInitHeaderSize = function (group) {
        if (!group)
            return 0;
        var anchor = group.anchorPoint[this.adapter.mainAxis];
        anchor = this.adapter.multiplier == 1 ? 1 - anchor : anchor;
        var value = -group.position[this.adapter.mainAxis] * this.adapter.multiplier;
        value -= group.size[this.adapter.mainAxis] * anchor;
        value -= this.adapter.scrollManager.contentPosition * this.adapter.multiplier;
        value = this.adapter.mainAxisSize - value;
        return value;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    ViewManager.prototype.internal_getInitFooterSize = function (group) {
        if (!group)
            return 0;
        var anchor = group.anchorPoint[this.adapter.mainAxis];
        anchor = this.adapter.multiplier == 1 ? anchor : 1 - anchor;
        var value = -group.position[this.adapter.mainAxis] * this.adapter.multiplier;
        value += group.size[this.adapter.mainAxis] * anchor;
        value -= this.adapter.scrollManager.contentPosition * this.adapter.multiplier;
        return value;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    ViewManager.prototype.internal_accumulationSize = function (index) {
        var group = this._groups[index];
        if (!group)
            return 0;
        return group.size[this.adapter.mainAxis] + this.spacing;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    ViewManager.prototype.internal_convertSizeToFooterPosition = function (totalSize, group) {
        var anchor = group.anchorPoint[this.adapter.mainAxis];
        anchor = this.adapter.multiplier == 1 ? anchor : 1 - anchor;
        var size = group.size[this.adapter.mainAxis] * anchor;
        var value = -this.adapter.scrollManager.contentPosition;
        value -= (this.adapter.multiplier * totalSize - this.adapter.multiplier * size);
        return value;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    ViewManager.prototype.internal_convertSizeToHeaderPosition = function (totalSize, group) {
        var anchor = group.anchorPoint[this.adapter.mainAxis];
        anchor = this.adapter.multiplier == 1 ? 1 - anchor : anchor;
        var size = group.size[this.adapter.mainAxis] * anchor;
        var value = this.adapter.multiplier * totalSize - this.adapter.multiplier * size;
        value -= this.adapter.multiplier * this.adapter.mainAxisSize;
        value -= this.adapter.scrollManager.contentPosition;
        return value;
    };
    // public
    ViewManager.prototype.getGroup = function (index) {
        return this._groups[index];
    };
    ViewManager.prototype.getVisibleView = function (index) {
        return this._visibleViews[index];
    };
    ViewManager.prototype.getVisibleMainAxisSize = function () {
        if (this._visibleViews.length == 0)
            return 0;
        var size = 0;
        var xy = this.adapter.mainAxis;
        for (var i = 0, len = this._visibleViews.length; i < len; i++) {
            var view = this._visibleViews[i];
            if (view.group) {
                size += view.group.size[xy] + this.spacing;
            }
        }
        size -= this.spacing;
        return size;
    };
    ViewManager.prototype.getGroupIndexByModelIndex = function (modelIndex) {
        for (var i = 0, len = this._groups.length; i < len; i++) {
            var group = this._groups[i];
            var index = group.findModelIndex(modelIndex);
            if (-1 != index)
                return i;
        }
        return -1;
    };
    ViewManager.prototype.getVisibleIndexByGroupIndex = function (index) {
        return this._visibleViews.findIndex(function (view) { return view.index == index; });
    };
    ViewManager.prototype.getNextFixedHolders = function (index) {
        var list = [];
        var start = this.getVisibleIndexByGroupIndex(index);
        for (var i = start + 1, len = this._visibleViews.length; i < len; i++) {
            var view = this._visibleViews[i];
            if (view.index == index)
                continue;
            if (view.group.isFixed) {
                list = view.getFixedHolders();
                break;
            }
        }
        return list;
    };
    ViewManager.prototype.getMagneticOffset = function () {
        if (!this.magnetic) {
            return 0;
        }
        var direction = this.adapter.isHorizontal ? -this.adapter.multiplier : this.adapter.multiplier;
        if (this.magneticDirection == enum_1.MagneticDirection.Footer) {
            if (!this.footer) {
                return this.adapter.mainAxisSize * direction;
            }
            var value = Math.max(0, this.adapter.mainAxisSize - this.adapter.mainAxisPadding - this.getVisibleMainAxisSize()) * direction;
            return value;
        }
        return 0;
    };
    ViewManager.Event = Event;
    __decorate([
        property({ type: enum_1.ArrangeAxis })
    ], ViewManager.prototype, "_arrangeAxis", void 0);
    __decorate([
        property({
            type: enum_1.ArrangeAxis,
            tooltip: "\u4E3B\u8F74\u65B9\u5411\u7684\u6392\u5217\u65B9\u5F0F\n        Start: \u4ECE\u4E0A\u5230\u4E0B\u3001\u4ECE\u5DE6\u5230\u53F3\n        End: \u4ECE\u4E0B\u5230\u4E0A\u3001\u4ECE\u53F3\u5230\u5DE6"
        })
    ], ViewManager.prototype, "arrangeAxis", null);
    __decorate([
        property({
            type: enum_1.StretchDirection,
            tooltip: "\u5F53\u5143\u7D20\u7684\u5C3A\u5BF8\u3001\u7F29\u653E\u6539\u53D8\u65F6\uFF0C\u53D7\u5F71\u54CD\u7684\u5176\u4ED6\u5143\u7D20\u5E94\u8BE5\u5982\u4F55\u8BA1\u7B97\u65B0\u7684\u4F4D\u7F6E\n        Auto: \u4EE5\u53EF\u89C6\u533A\u57DF\u4E2D\u5FC3\u4E3A\u8D77\u70B9\uFF0C\u6240\u6709\u5176\u4ED6\u5143\u7D20\u5411\u4E24\u8FB9\u5EF6\u4F38\n        Center: \u4EE5\u5F53\u524D\u53D8\u5316\u7684\u5143\u7D20\u4E3A\u8D77\u70B9\uFF0C\u6240\u6709\u5176\u4ED6\u5143\u7D20\u5411\u4E24\u8FB9\u5EF6\u4F38\n        Header: \u4EE5\u5F53\u524D\u53D8\u5316\u7684\u5143\u7D20\u548C\u5B83\u5934\u90E8\u7684\u6240\u6709\u5143\u7D20\u5411\u5934\u90E8\u5EF6\u4F38\n        Footer: \u4EE5\u5F53\u524D\u53D8\u5316\u7684\u5143\u7D20\u548C\u5B83\u5C3E\u90E8\u7684\u6240\u6709\u5143\u7D20\u5411\u5C3E\u90E8\u5EF6\u4F38"
        })
    ], ViewManager.prototype, "stretchDirection", void 0);
    __decorate([
        property({
            range: [0, 1],
            slide: true,
            step: 0.01,
            tooltip: "\u5F53\u5143\u7D20\u79FB\u52A8\u5230\u53EF\u89C6\u533A\u57DF\u5916\u504F\u79FB\u591A\u5C11\u65F6\u624D\u8FDB\u884C\u56DE\u6536\n        \u6BD4\u5982\u5143\u7D20\u7684\u5C3A\u5BF8\u4E3A100\uFF0C\u5F53\u5143\u7D20\u8D85\u51FA\u53EF\u89C6\u8303\u56F4 100+100*0.3 \u65F6\u5C31\u4F1A\u88AB\u56DE\u6536\n        \u6CA1\u6709\u7279\u6B8A\u9700\u6C42\u65F6\uFF0C\u9ED8\u8BA4\u503C\u5373\u53EF"
        })
    ], ViewManager.prototype, "overflowOffset", void 0);
    __decorate([
        property({
            range: [0, 1],
            slide: true,
            step: 0.01,
            tooltip: "\u6B64\u503C\u4F1A\u5F71\u54CD\u586B\u5145\u5143\u7D20\u7684\u65F6\u673A\n        \u6CA1\u6709\u7279\u6B8A\u9700\u6C42\u65F6\uFF0C\u9ED8\u8BA4\u503C\u5373\u53EF"
        })
    ], ViewManager.prototype, "enterOffset", void 0);
    __decorate([
        property()
    ], ViewManager.prototype, "_spacing", void 0);
    __decorate([
        property({
            tooltip: "主轴方向元素的间隙"
        })
    ], ViewManager.prototype, "spacing", null);
    __decorate([
        property({ group: { id: "padding", name: "padding" } })
    ], ViewManager.prototype, "left", void 0);
    __decorate([
        property({ group: { id: "padding", name: "padding" } })
    ], ViewManager.prototype, "right", void 0);
    __decorate([
        property({ group: { id: "padding", name: "padding" } })
    ], ViewManager.prototype, "top", void 0);
    __decorate([
        property({ group: { id: "padding", name: "padding" } })
    ], ViewManager.prototype, "bottom", void 0);
    __decorate([
        property({
            tooltip: "\u78C1\u6027\u505C\u9760\n        \u5F00\u542F\u540E\uFF0C\u4F1A\u5728\u589E\u52A0\u6570\u636E\u65F6\uFF0C\u6839\u636E\u8BBE\u7F6E\u8FDB\u884C\u81EA\u52A8\u6EDA\u52A8\u5230\u9876\u90E8\u6216\u5E95\u90E8"
        })
    ], ViewManager.prototype, "magnetic", void 0);
    __decorate([
        property({
            type: enum_1.MagneticDirection,
            visible: function () { return this.magnetic; },
            tooltip: "\u505C\u9760\u7684\u65B9\u5411"
        })
    ], ViewManager.prototype, "magneticDirection", void 0);
    __decorate([
        property({
            visible: function () { return this.magnetic; },
            tooltip: "停靠动画的时长"
        })
    ], ViewManager.prototype, "magneticDuration", void 0);
    __decorate([
        property({
            visible: function () { return this.magnetic; },
            tooltip: "\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u4EC5\u5F53\u6DFB\u52A0\u6570\u636E\u65F6\u624D\u4F1A\u89E6\u53D1\u505C\u9760\n        \u5F53\u5F00\u542F\u65F6\uFF0C\u5143\u7D20\u7684\u5C3A\u5BF8\u6539\u53D8\u65F6,\u4E5F\u4F1A\u5426\u89E6\u53D1\u505C\u9760"
        })
    ], ViewManager.prototype, "magneticSizeChanges", void 0);
    __decorate([
        property({
            tooltip: "头部循环"
        })
    ], ViewManager.prototype, "loopHeader", void 0);
    __decorate([
        property({
            tooltip: "尾部循环"
        })
    ], ViewManager.prototype, "loopFooter", void 0);
    ViewManager = __decorate([
        ccclass('ViewManager')
    ], ViewManager);
    return ViewManager;
}(Manager_1.Manager));
exports.ViewManager = ViewManager;

cc._RF.pop();