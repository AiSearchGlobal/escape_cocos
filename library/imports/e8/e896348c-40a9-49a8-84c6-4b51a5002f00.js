"use strict";
cc._RF.push(module, 'e8963SMQKlJqITGS1GlAC8A', 'PageViewManager');
// script/framework/adapter/manager/PageViewManager.ts

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
exports.PageViewManager = void 0;
// import { _decorator, EventTouch } from 'cc';
var Manager_1 = require("../abstract/Manager");
var enum_1 = require("../define/enum");
var ScrollManager_1 = require("./ScrollManager");
var ViewManager_1 = require("./ViewManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Event;
(function (Event) {
    /** 分页的长度变更时 */
    Event[Event["ON_PAGE_LENGTH_CHANGED"] = 0] = "ON_PAGE_LENGTH_CHANGED";
    /** 滚动分页开始时 */
    Event[Event["ON_SCROLL_PAGE_BEFOR"] = 1] = "ON_SCROLL_PAGE_BEFOR";
    /** 滚动分页结束时 */
    Event[Event["ON_SCROLL_PAGE_END"] = 2] = "ON_SCROLL_PAGE_END";
})(Event || (Event = {}));
var PageViewManager = /** @class */ (function (_super) {
    __extends(PageViewManager, _super);
    function PageViewManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._enabled = false;
        _this.scrollThreshold = 0.5;
        _this.pageTurningEventTiming = 0.1;
        _this.autoPageTurningThreshold = 100;
        _this.pageTurningSpeed = 0.3;
        _this._currentIndex = 0;
        return _this;
    }
    Object.defineProperty(PageViewManager.prototype, "enabled", {
        get: function () { return this._enabled; },
        set: function (value) {
            if (value == this._enabled)
                return;
            this._enabled = value;
            if (this._enabled) {
                this._register();
            }
            else {
                this._unregister();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PageViewManager.prototype, "currentIndex", {
        get: function () { return this._currentIndex; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PageViewManager.prototype, "length", {
        get: function () { return this.adapter.viewManager.groupLength; },
        enumerable: false,
        configurable: true
    });
    PageViewManager.prototype.onInit = function () {
        this._register();
    };
    PageViewManager.prototype._register = function () {
        if (!this.adapter || !this.enabled)
            return;
        this.adapter.scrollManager.on(ScrollManager_1.ScrollManager.Event.ON_SCROLL_END, this._handleReleaseLogic, this);
        this.adapter.scrollManager.on(ScrollManager_1.ScrollManager.Event.ON_SCROLL_CANCEL, this._handleReleaseLogic, this);
        this.adapter.scrollManager.on(ScrollManager_1.ScrollManager.Event.ON_SCROLL_TO_GROUPINDEX_BEFOR, this._onScrollToIndex, this);
        this.adapter.viewManager.on(ViewManager_1.ViewManager.Event.ON_UPDATE_VIEWS, this._onUpdateViews, this, true);
    };
    PageViewManager.prototype._unregister = function () {
        if (!this.adapter || this.enabled)
            return;
        this.adapter.scrollManager.off(ScrollManager_1.ScrollManager.Event.ON_SCROLL_END, this._handleReleaseLogic, this);
        this.adapter.scrollManager.off(ScrollManager_1.ScrollManager.Event.ON_SCROLL_CANCEL, this._handleReleaseLogic, this);
        this.adapter.scrollManager.off(ScrollManager_1.ScrollManager.Event.ON_SCROLL_TO_GROUPINDEX_BEFOR, this._onScrollToIndex, this);
        this.adapter.viewManager.off(ViewManager_1.ViewManager.Event.ON_UPDATE_VIEWS, this._onUpdateViews, this);
    };
    PageViewManager.prototype.scrollToPage = function (duration, index, alwaysScroll) {
        if (index < 0 || index >= this.length) {
            return;
        }
        if (index == this.currentIndex && this.adapter.scrollManager.calcOffset() != 0) {
            return;
        }
        this.adapter.scrollManager.scrollToGroupIndex(duration, index, alwaysScroll);
        this.emit(Event.ON_SCROLL_PAGE_BEFOR, index);
    };
    /**
     * 滚动到上一页
     * @param duration 持续时间
     * @param alwaysScrollToHeader 强制向头部滚动
     */
    PageViewManager.prototype.scrollToPrevPage = function (duration, alwaysScroll) {
        if (duration === void 0) { duration = this.pageTurningSpeed; }
        if (alwaysScroll === void 0) { alwaysScroll = enum_1.AlwaysScroll.Header; }
        if (this._currentIndex == 0) {
            if (this.adapter.viewManager.loopHeader) {
                this.scrollToPage(duration, this.length - 1, alwaysScroll);
            }
            return;
        }
        this.scrollToPage(duration, this._currentIndex - 1, alwaysScroll);
    };
    /**
     * 滚动到下一页
     * @param duration 持续时间
     * @param alwaysScrollToFooter 强制向尾部滚动
     */
    PageViewManager.prototype.scrollToNextPage = function (duration, alwaysScroll) {
        if (duration === void 0) { duration = this.pageTurningSpeed; }
        if (alwaysScroll === void 0) { alwaysScroll = enum_1.AlwaysScroll.Footer; }
        if (this._currentIndex >= this.length - 1) {
            if (this.adapter.viewManager.loopFooter) {
                this.scrollToPage(duration, 0, alwaysScroll);
            }
            return;
        }
        this.scrollToPage(duration, this._currentIndex + 1, alwaysScroll);
    };
    PageViewManager.prototype._onUpdateViews = function () {
        this.emit(Event.ON_PAGE_LENGTH_CHANGED);
        this._currentIndex = 0;
        this.scrollToPage(this.pageTurningSpeed, this._currentIndex);
    };
    PageViewManager.prototype._onScrollToIndex = function (index) {
        this._currentIndex = index;
        this.emit(Event.ON_SCROLL_PAGE_END, index);
    };
    PageViewManager.prototype._handleReleaseLogic = function (event) {
        if (!this._enabled || !this.adapter.scrollManager.isMyEventAndMoved)
            return;
        var start = event.getStartLocation()[this.adapter.mainAxis];
        var end = event.getLocation()[this.adapter.mainAxis];
        var offset = start - end;
        var nextIndex = this._getNextIndex(offset);
        if (this._isScrollable(offset) || this._isQuicklyScrollable(this.adapter.scrollManager.velocity)) {
            this.scrollToPage(this.pageTurningSpeed, nextIndex);
            return;
        }
        this.scrollToPage(this.pageTurningSpeed, this._currentIndex);
    };
    PageViewManager.prototype._getNextIndex = function (offset) {
        var index = this._currentIndex;
        if (this.adapter.isHorizontal) {
            if (this.adapter.isArrangeAxisStart) {
                if (offset > 0) {
                    index++;
                }
                else if (offset < 0) {
                    index--;
                }
            }
            else {
                if (offset < 0) {
                    index++;
                }
                if (offset > 0) {
                    index--;
                }
            }
        }
        else {
            if (this.adapter.isArrangeAxisStart) {
                if (offset < 0) {
                    index++;
                }
                else if (offset > 0) {
                    index--;
                }
            }
            else {
                if (offset > 0) {
                    index++;
                }
                else if (offset < 0) {
                    index--;
                }
            }
        }
        if (index >= this.length && this.adapter.viewManager.loopFooter) {
            index = 0;
        }
        else if (index < 0 && this.adapter.viewManager.loopHeader) {
            index = this.length - 1;
        }
        if (index < 0 || index >= this.length) {
            index = this._currentIndex;
        }
        return index;
    };
    PageViewManager.prototype._isScrollable = function (offset) {
        return Math.abs(offset) >= this.adapter.mainAxisSize * this.scrollThreshold;
    };
    PageViewManager.prototype._isQuicklyScrollable = function (touchMoveVelocity) {
        return Math.abs(touchMoveVelocity) > this.autoPageTurningThreshold;
    };
    PageViewManager.Event = Event;
    __decorate([
        property()
    ], PageViewManager.prototype, "_enabled", void 0);
    __decorate([
        property()
    ], PageViewManager.prototype, "enabled", null);
    __decorate([
        property({
            range: [0, 1],
            slide: true,
            step: 0.01,
            visible: function () { return this.enabled; },
            tooltip: "滚动临界值，默认单位百分比，当拖拽超出该数值时，松开会自动滚动下一页，小于时则还原"
        })
    ], PageViewManager.prototype, "scrollThreshold", void 0);
    __decorate([
        property({
            range: [0, 1],
            slide: true,
            step: 0.01,
            visible: function () { return this.enabled; },
            tooltip: "设置 PageView PageTurning 事件的发送时机"
        })
    ], PageViewManager.prototype, "pageTurningEventTiming", void 0);
    __decorate([
        property({
            visible: function () { return this.enabled; },
            tooltip: "\u5FEB\u901F\u6ED1\u52A8\u7FFB\u9875\u4E34\u754C\u503C\n        \u5F53\u7528\u6237\u5FEB\u901F\u6ED1\u52A8\u65F6\uFF0C\u4F1A\u6839\u636E\u6ED1\u52A8\u5F00\u59CB\u548C\u7ED3\u675F\u7684\u8DDD\u79BB\u4E0E\u65F6\u95F4\u8BA1\u7B97\u51FA\u4E00\u4E2A\u901F\u5EA6\u503C\n        \u8BE5\u503C\u4E0E\u6B64\u4E34\u754C\u503C\u76F8\u6BD4\u8F83\uFF0C\u5982\u679C\u5927\u4E8E\u4E34\u754C\u503C\uFF0C\u5219\u8FDB\u884C\u81EA\u52A8\u7FFB\u9875"
        })
    ], PageViewManager.prototype, "autoPageTurningThreshold", void 0);
    __decorate([
        property({
            visible: function () { return this.enabled; },
            tooltip: "每个页面翻页时所需时间。单位：秒"
        })
    ], PageViewManager.prototype, "pageTurningSpeed", void 0);
    PageViewManager = __decorate([
        ccclass('PageViewManager')
    ], PageViewManager);
    return PageViewManager;
}(Manager_1.Manager));
exports.PageViewManager = PageViewManager;

cc._RF.pop();