"use strict";
cc._RF.push(module, '8eaaaEkOotGj4EDXygTBiJF', 'Indicator');
// script/framework/adapter/component/Indicator.ts

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
exports.Indicator = void 0;
var EventConst_1 = require("../../../userData/EventConst");
var GameDataCenter_1 = require("../../../userData/GameDataCenter");
var EventMng_1 = require("../../manager/EventMng");
var ScrollAdapter_1 = require("../abstract/ScrollAdapter");
var enum_1 = require("../define/enum");
var PageViewManager_1 = require("../manager/PageViewManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 简单Indicator示例
 * 如果你想要更多效果，请自行编写或扩展 Indicator
 */
var Indicator = /** @class */ (function (_super) {
    __extends(Indicator, _super);
    function Indicator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.adapterNode = null;
        _this.tabNode = null;
        _this.spriteNode = [];
        _this.indicatorMode = enum_1.IndicatorMode.Normal;
        _this.cellSize = new cc.Size(10, 10);
        _this.spacing = 10;
        _this._indicators = [];
        _this._layout = null;
        _this._color = new cc.Color();
        _this.adapter = null;
        return _this;
    }
    Object.defineProperty(Indicator.prototype, "layout", {
        get: function () {
            if (this._layout == null) {
                this._layout = this.getComponent(cc.Layout) || this.addComponent(cc.Layout);
                if (this.adapter.isHorizontal) {
                    this._layout.type = cc.Layout.Type.HORIZONTAL;
                    this._layout.spacingX = this.spacing;
                }
                else {
                    this._layout.type = cc.Layout.Type.VERTICAL;
                    this._layout.spacingY = this.spacing;
                }
                this._layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
            }
            return this._layout;
        },
        enumerable: false,
        configurable: true
    });
    Indicator.prototype.__preload = function () {
        this.adapter = this.adapterNode.getComponent(ScrollAdapter_1.ScrollAdapter);
        if (this.adapter) {
            this.adapter.pageViewManager.on(PageViewManager_1.PageViewManager.Event.ON_PAGE_LENGTH_CHANGED, this._onPageLengthChanged, this);
            this.adapter.pageViewManager.on(PageViewManager_1.PageViewManager.Event.ON_SCROLL_PAGE_END, this._onScrollPageEnd, this);
        }
    };
    Indicator.prototype._onScrollPageEnd = function () {
        this.changedState();
    };
    Indicator.prototype._onPageLengthChanged = function () {
        if (!this.adapter)
            return;
        var indicators = this._indicators;
        var length = this.adapter.viewManager.groupLength;
        if (length === indicators.length) {
            return;
        }
        var i = 0;
        if (length > indicators.length) {
            for (i = 0; i < length; ++i) {
                if (!indicators[i]) {
                    indicators[i] = this._createIndicator(i);
                }
            }
        }
        else {
            var count = indicators.length - length;
            for (i = count; i > 0; --i) {
                var transform = indicators[i - 1];
                this.node.removeChild(transform);
                indicators.splice(i - 1, 1);
            }
        }
        if (this.layout && this.layout.enabledInHierarchy) {
            this.layout.updateLayout();
        }
        this.changedState();
    };
    Indicator.prototype._createIndicator = function (index) {
        var node = this.spriteNode[index];
        // node.layer = this.node.layer
        node.parent = this.node;
        if (this.indicatorMode == enum_1.IndicatorMode.Button) {
            var button = node.getComponent(cc.Button) || node.addComponent(cc.Button);
            var event = new cc.Component.EventHandler();
            event.component = "Indicator";
            event.handler = "_click";
            event.target = this.node;
            event.customEventData = index;
            button.clickEvents.push(event);
        }
        return node;
    };
    Indicator.prototype._click = function (event, data) {
        this.adapter.pageViewManager.scrollToPage(this.adapter.pageViewManager.pageTurningSpeed, data);
    };
    Indicator.prototype.changedState = function () {
        var indicators = this._indicators;
        if (indicators.length === 0 || !this.adapter)
            return;
        var idx = this.adapter.pageViewManager.currentIndex;
        EventMng_1.default.emit(EventConst_1.GameEvent.RANK_TAB_CHANGE, idx);
        if (idx >= indicators.length)
            return;
        this.tabNode.stopAllActions();
        this.tabNode.runAction(cc.moveTo(0.1, cc.v2(indicators[idx].position.x, indicators[idx].position.y)));
        var account = GameDataCenter_1.default.accountModel;
        account.myRankNum = idx == 0 ? account.thisRankNum : account.lastRankNum;
        account.myRankNo = idx == 0 ? account.thisRankNo : account.lastRankNo;
        for (var i = 0; i < indicators.length; ++i) {
            var transform = indicators[i];
            transform.getChildByName("font").color = cc.color(255, 255, 255);
            //// const comp = transform.getComponent(cc.Sprite)
            //// this._color.set(comp.color)
            //// this._color.a = 255 / 2
            //// comp.color = this._color
            // transform.opacity = 255 / 2
        }
        if (indicators[idx]) {
            var transform = indicators[idx];
            transform.getChildByName("font").color = cc.color(146, 151, 157);
            // // const comp = indicators[idx].getComponent(Sprite)
            // // this._color.set(comp.color)
            // // this._color.a = 255
            // // comp.color = this._color
            // indicators[idx].opacity = 255
        }
    };
    __decorate([
        property(cc.Node)
    ], Indicator.prototype, "adapterNode", void 0);
    __decorate([
        property(cc.Node)
    ], Indicator.prototype, "tabNode", void 0);
    __decorate([
        property({
            type: [cc.Node],
        })
    ], Indicator.prototype, "spriteNode", void 0);
    __decorate([
        property({ type: enum_1.IndicatorMode })
    ], Indicator.prototype, "indicatorMode", void 0);
    __decorate([
        property
    ], Indicator.prototype, "cellSize", void 0);
    __decorate([
        property
    ], Indicator.prototype, "spacing", void 0);
    Indicator = __decorate([
        ccclass
    ], Indicator);
    return Indicator;
}(cc.Component));
exports.Indicator = Indicator;

cc._RF.pop();