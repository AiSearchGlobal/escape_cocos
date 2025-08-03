"use strict";
cc._RF.push(module, 'effb2zQe+JLwolQH2dGj59B', 'ReleaseManager');
// script/framework/adapter/manager/ReleaseManager.ts

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
exports.ReleaseEvent = exports.ReleaseManager = void 0;
// import { _decorator, Component, Node } from 'cc';
var Manager_1 = require("../abstract/Manager");
var enum_1 = require("../define/enum");
var ScrollManager_1 = require("./ScrollManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Event;
(function (Event) {
    Event[Event["ON_PULL_UP"] = 0] = "ON_PULL_UP";
    Event[Event["ON_PULL_DOWN"] = 1] = "ON_PULL_DOWN";
    Event[Event["ON_PULL_LEFT"] = 2] = "ON_PULL_LEFT";
    Event[Event["ON_PULL_RIGHT"] = 3] = "ON_PULL_RIGHT";
})(Event || (Event = {}));
var ReleaseManager = /** @class */ (function (_super) {
    __extends(ReleaseManager, _super);
    function ReleaseManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._enabled = false;
        _this.left = 0;
        _this.right = 0;
        _this.top = 0;
        _this.bottom = 0;
        return _this;
    }
    Object.defineProperty(ReleaseManager.prototype, "enabled", {
        get: function () { return this._enabled; },
        set: function (value) {
            if (value == this._enabled)
                return;
            this._enabled = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReleaseManager.prototype, "max", {
        get: function () {
            if (!this.enabled)
                return 0;
            if (this.adapter.isHorizontal) {
                return this._pullLeft ? this._pullLeft.expand : 0;
            }
            else {
                return this._pullDown ? this._pullDown.expand : 0;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReleaseManager.prototype, "min", {
        get: function () {
            if (!this.enabled)
                return 0;
            if (this.adapter.isHorizontal) {
                return this._pullRight ? this._pullRight.expand : 0;
            }
            else {
                return this._pullUp ? this._pullUp.expand : 0;
            }
        },
        enumerable: false,
        configurable: true
    });
    ReleaseManager.prototype.onInit = function () {
        if (!this.enabled)
            return;
        this._pullUp = new ReleaseEvent(this, Event.ON_PULL_UP, this.bottom);
        this._pullDown = new ReleaseEvent(this, Event.ON_PULL_DOWN, this.top);
        this._pullLeft = new ReleaseEvent(this, Event.ON_PULL_LEFT, this.right);
        this._pullRight = new ReleaseEvent(this, Event.ON_PULL_RIGHT, this.left);
        this.adapter.scrollManager.on(ScrollManager_1.ScrollManager.Event.ON_SCROLL_START, this.onScrollStart, this);
        this.adapter.scrollManager.on(ScrollManager_1.ScrollManager.Event.ON_SCROLL_END, this.onScrollEnd, this);
        this.adapter.scrollManager.on(ScrollManager_1.ScrollManager.Event.ON_SCROLL_CANCEL, this.onScrollEnd, this);
        this.checkLoop();
    };
    ReleaseManager.prototype.checkLoop = function () {
        if (this.adapter.isHorizontal) {
            if (this.adapter.isArrangeAxisStart) {
                if (this.left > 0) {
                    this.adapter.viewManager.loopHeader = false;
                }
                if (this.right > 0) {
                    this.adapter.viewManager.loopFooter = false;
                }
            }
            else {
                if (this.left > 0) {
                    this.adapter.viewManager.loopFooter = false;
                }
                if (this.right > 0) {
                    this.adapter.viewManager.loopHeader = false;
                }
            }
        }
        else {
            if (this.adapter.isArrangeAxisStart) {
                if (this.top > 0) {
                    this.adapter.viewManager.loopHeader = false;
                }
                if (this.bottom > 0) {
                    this.adapter.viewManager.loopFooter = false;
                }
            }
            else {
                if (this.top > 0) {
                    this.adapter.viewManager.loopFooter = false;
                }
                if (this.bottom > 0) {
                    this.adapter.viewManager.loopHeader = false;
                }
            }
        }
    };
    ReleaseManager.prototype.onScrollStart = function () {
        if (this.adapter.isHorizontal) {
            if (this.left > 0) {
                this._pullRight["_setState"](enum_1.ReleaseState.IDLE);
            }
            if (this.right > 0) {
                this._pullLeft["_setState"](enum_1.ReleaseState.IDLE);
            }
        }
        else {
            if (this.top > 0) {
                this._pullDown["_setState"](enum_1.ReleaseState.IDLE);
            }
            if (this.bottom > 0) {
                this._pullUp["_setState"](enum_1.ReleaseState.IDLE);
            }
        }
    };
    ReleaseManager.prototype.onScrollEnd = function () {
        if (this.adapter.isHorizontal) {
            if (this.left > 0) {
                this._pullRight["_setState"](enum_1.ReleaseState.RELEASE);
            }
            if (this.right > 0) {
                this._pullLeft["_setState"](enum_1.ReleaseState.RELEASE);
            }
        }
        else {
            if (this.top > 0) {
                this._pullDown["_setState"](enum_1.ReleaseState.RELEASE);
            }
            if (this.bottom > 0) {
                this._pullUp["_setState"](enum_1.ReleaseState.RELEASE);
            }
        }
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    ReleaseManager.prototype.internal_lateUpdate = function (deltaTime) {
        if (!this.enabled)
            return;
        var offset = this.adapter.scrollManager.boundaryOffset;
        if (!this.adapter.scrollManager.dragging) {
            offset = 0;
        }
        if (this.adapter.isHorizontal) {
            if (this.left > 0) {
                this._pullRight["_set"](Math.max(-offset, 0), offset < 0);
            }
            if (this.right > 0) {
                this._pullLeft["_set"](Math.max(offset, 0), offset > 0);
            }
        }
        else {
            if (this.top > 0) {
                this._pullDown["_set"](Math.max(offset, 0), offset > 0);
            }
            if (this.bottom > 0) {
                this._pullUp["_set"](Math.max(-offset, 0), offset < 0);
            }
        }
    };
    ReleaseManager.Event = Event;
    __decorate([
        property()
    ], ReleaseManager.prototype, "_enabled", void 0);
    __decorate([
        property()
    ], ReleaseManager.prototype, "enabled", null);
    __decorate([
        property({
            range: [0, 1],
            slide: true,
            step: 0.01,
            visible: function () { return this.enabled; },
            tooltip: "根据此阈值来切换state状态"
        })
    ], ReleaseManager.prototype, "left", void 0);
    __decorate([
        property({
            range: [0, 1],
            slide: true,
            step: 0.01,
            visible: function () { return this.enabled; },
            tooltip: "根据此阈值来切换state状态"
        })
    ], ReleaseManager.prototype, "right", void 0);
    __decorate([
        property({
            range: [0, 1],
            slide: true,
            step: 0.01,
            visible: function () { return this.enabled; },
            tooltip: "根据此阈值来切换state状态"
        })
    ], ReleaseManager.prototype, "top", void 0);
    __decorate([
        property({
            range: [0, 1],
            slide: true,
            step: 0.01,
            visible: function () { return this.enabled; },
            tooltip: "根据此阈值来切换state状态"
        })
    ], ReleaseManager.prototype, "bottom", void 0);
    ReleaseManager = __decorate([
        ccclass('ReleaseManager')
    ], ReleaseManager);
    return ReleaseManager;
}(Manager_1.Manager));
exports.ReleaseManager = ReleaseManager;
/** 事件参数 */
var ReleaseEvent = /** @class */ (function () {
    function ReleaseEvent(manager, event, defaultPercentage) {
        this._expand = 0;
        this._progress = 0;
        this._offset = 0;
        this._defaultPercentage = defaultPercentage;
        this._manager = manager;
        this._event = event;
    }
    Object.defineProperty(ReleaseEvent.prototype, "expand", {
        get: function () { return this._expand; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReleaseEvent.prototype, "progress", {
        get: function () { return this._progress; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReleaseEvent.prototype, "offset", {
        get: function () { return this._offset; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReleaseEvent.prototype, "state", {
        get: function () { return this._state; },
        enumerable: false,
        configurable: true
    });
    ReleaseEvent.prototype._set = function (offset, isContinue) {
        if (isContinue) {
            this._stop = false;
        }
        if (this._stop)
            return;
        this._offset = offset;
        this._progress = offset / (this._defaultPercentage * this._manager.adapter.mainAxisSize);
        this._stop = this._offset <= 0.1;
        this._setState(enum_1.ReleaseState.PULL);
        this._manager.emit(this._event, this);
    };
    ReleaseEvent.prototype._setState = function (value) {
        if (this._state == enum_1.ReleaseState.WAIT) {
            return;
        }
        if (value == enum_1.ReleaseState.PULL && this._state == enum_1.ReleaseState.RELEASE) {
            return;
        }
        this._state = value;
    };
    /**
     * 等待
     * @param expandSize 扩展尺寸
     */
    ReleaseEvent.prototype.wait = function (expandSize) {
        if (expandSize === void 0) { expandSize = this._defaultPercentage * this._manager.adapter.mainAxisSize; }
        this._expand = expandSize;
        this._state = enum_1.ReleaseState.WAIT;
    };
    /**
     * 释放
     */
    ReleaseEvent.prototype.release = function () {
        this._expand = 0;
        this._state = enum_1.ReleaseState.IDLE;
        if (this.offset <= 0.1) {
            this._offset = 0;
            this._progress = 0;
            this._manager.emit(this._event, this);
        }
    };
    return ReleaseEvent;
}());
exports.ReleaseEvent = ReleaseEvent;

cc._RF.pop();