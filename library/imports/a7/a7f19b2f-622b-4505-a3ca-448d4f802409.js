"use strict";
cc._RF.push(module, 'a7f19svYitFBaPKRI1PgCQJ', 'ScrollAdapter');
// script/framework/adapter/abstract/ScrollAdapter.ts

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
exports.DefaultHolder = exports.DefaultView = exports.ScrollAdapter = void 0;
var enum_1 = require("../define/enum");
var helper_1 = require("../help/helper");
var CenterManager_1 = require("../manager/CenterManager");
var LayoutManager_1 = require("../manager/LayoutManager");
var ModelManager_1 = require("../manager/ModelManager");
var PageViewManager_1 = require("../manager/PageViewManager");
var ReleaseManager_1 = require("../manager/ReleaseManager");
var ScrollManager_1 = require("../manager/ScrollManager");
var ViewManager_1 = require("../manager/ViewManager");
var Holder_1 = require("./Holder");
var View_1 = require("./View");
// import { _decorator, Component, Node, Size, Prefab, Color, } from 'cc';
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ScrollAdapter = /** @class */ (function (_super) {
    __extends(ScrollAdapter, _super);
    function ScrollAdapter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 滚动管理器
         * 负责滚动的逻辑，类似于ScrollView
         */
        _this.scrollManager = new ScrollManager_1.ScrollManager();
        /**
         * 视图管理器
         * 负责管理可视区域item的创建、回收、主轴方向布局等逻辑
         */
        _this.viewManager = new ViewManager_1.ViewManager();
        /**
         * 布局管理器
         * 负责交叉轴方向的布局逻辑
         */
        _this.layoutManager = new LayoutManager_1.LayoutManager();
        /**
         * 分页管理器
         * 负责处理分页逻辑
         */
        _this.pageViewManager = new PageViewManager_1.PageViewManager();
        /**
         * 释放管理器
         * 负责处理4个方向的 ”拉“ ”释放“ 等逻辑
         */
        _this.releaseManager = new ReleaseManager_1.ReleaseManager();
        /**
         * 居中管理器
         * 除了负责自动居中以外，还负责通过索引计算滚动的具体位置
         */
        _this.centerManager = new CenterManager_1.CenterManager();
        /**
         * 数据管理器
         * 负责数据的增删改查，对用户数据进行二次封装
         */
        _this.modelManager = new ModelManager_1.ModelManager();
        return _this;
    }
    /**
     * 初始化元素布局属性，子类可重写，默认为单列
     * 例如你想实现表格布局，你可以通过设置 element.wrapAfterMode、element.wrapBeforeMode来控制
    */
    ScrollAdapter.prototype.initElement = function (element, data) { };
    /**
     * 返回一个View实例
     * 子类可重写
     */
    ScrollAdapter.prototype.getView = function () {
        return new DefaultView(this);
    };
    /**
     * 返回一个Holder实例
     * 子类可重写
     */
    ScrollAdapter.prototype.getHolder = function (node, code) {
        return new DefaultHolder(node, code, this);
    };
    Object.defineProperty(ScrollAdapter.prototype, "isVertical", {
        /** 是否垂直滚动 */
        get: function () {
            return this.scrollManager.orientation == enum_1.Orientation.Vertical;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollAdapter.prototype, "isHorizontal", {
        /** 是否水平滚动 */
        get: function () {
            return this.scrollManager.orientation == enum_1.Orientation.Horizontal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollAdapter.prototype, "isArrangeAxisStart", {
        /** 主轴排列方向 */
        get: function () {
            return this.viewManager.arrangeAxis == enum_1.ArrangeAxis.Start;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollAdapter.prototype, "mainAxis", {
        /** 主轴方向 尺寸|坐标 key */
        get: function () {
            return this.isVertical ? "y" : "x";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollAdapter.prototype, "crossAxis", {
        /** 交叉轴方向 尺寸|坐标 key */
        get: function () {
            return this.isVertical ? "x" : "y";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollAdapter.prototype, "mainAxisAnchorPoint", {
        /** 主轴方向锚点 */
        get: function () {
            var point = this.isVertical ? 1 : 0;
            return this.isArrangeAxisStart ? point : 1 - point;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollAdapter.prototype, "mainAxisSize", {
        /** 主轴方向可视区域尺寸 */
        get: function () {
            return helper_1.Helper.sizeToVec(this.scrollManager.view.getContentSize())[this.mainAxis];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollAdapter.prototype, "crossAxisSize", {
        /** 交叉轴方向可视区域尺寸 */
        get: function () {
            return helper_1.Helper.sizeToVec(this.scrollManager.view.getContentSize())[this.crossAxis];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollAdapter.prototype, "multiplier", {
        /** 根据滑动方向和排列方向决定的乘积 */
        get: function () {
            var multiplier = this.isVertical ? -1 : 1;
            return this.isArrangeAxisStart ? -multiplier : multiplier;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollAdapter.prototype, "paddingHeader", {
        /** 主轴方向 Header 的 padding */
        get: function () {
            if (this.isHorizontal) {
                return this.isArrangeAxisStart ? this.viewManager.left : this.viewManager.right;
            }
            else {
                return this.isArrangeAxisStart ? this.viewManager.top : this.viewManager.bottom;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollAdapter.prototype, "paddingFooter", {
        /** 主轴方向 Footer 的 padding */
        get: function () {
            if (this.isHorizontal) {
                return this.isArrangeAxisStart ? this.viewManager.right : this.viewManager.left;
            }
            else {
                return this.isArrangeAxisStart ? this.viewManager.bottom : this.viewManager.top;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollAdapter.prototype, "mainAxisPadding", {
        /** 主轴方向 padding 总和 */
        get: function () {
            if (this.isHorizontal) {
                return this.viewManager.left + this.viewManager.right;
            }
            else {
                return this.viewManager.top + this.viewManager.bottom;
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 从父节点中递归获取 ScrollAdapter
     * @param node 第一个获取ScrollAdapter的node
     * @return 返回父节点中第一个找到的 ScrollAdapter
     */
    ScrollAdapter.prototype.getParentAdapter = function (node) {
        if (node == null)
            return;
        if (node instanceof cc.Scene)
            return;
        var adapter = node.getComponent("ScrollAdapter");
        if (adapter) {
            return adapter;
        }
        return this.getParentAdapter(node.parent);
    };
    ScrollAdapter.prototype.__preload = function () {
        this.scrollManager.internal_create(this);
        this.viewManager.internal_create(this);
        this.modelManager.internal_create(this);
        this.releaseManager.internal_create(this);
        this.layoutManager.internal_create(this);
        this.pageViewManager.internal_create(this);
        this.centerManager.internal_create(this);
        this.viewManager.internal_init();
        this.releaseManager.internal_init();
        this.layoutManager.internal_init();
        this.pageViewManager.internal_init();
        this.centerManager.internal_init();
        this.scrollManager.internal_init();
        this.modelManager.internal_init();
    };
    ScrollAdapter.prototype.update = function (deltaTime) {
        this.scrollManager.internal_lateUpdate(deltaTime);
        this.viewManager.internal_lateUpdate(deltaTime);
        this.layoutManager.internal_lateUpdate(deltaTime);
        this.releaseManager.internal_lateUpdate(deltaTime);
    };
    __decorate([
        property(ScrollManager_1.ScrollManager)
    ], ScrollAdapter.prototype, "scrollManager", void 0);
    __decorate([
        property(ViewManager_1.ViewManager)
    ], ScrollAdapter.prototype, "viewManager", void 0);
    __decorate([
        property(LayoutManager_1.LayoutManager)
    ], ScrollAdapter.prototype, "layoutManager", void 0);
    __decorate([
        property(PageViewManager_1.PageViewManager)
    ], ScrollAdapter.prototype, "pageViewManager", void 0);
    __decorate([
        property(ReleaseManager_1.ReleaseManager)
    ], ScrollAdapter.prototype, "releaseManager", void 0);
    __decorate([
        property(CenterManager_1.CenterManager)
    ], ScrollAdapter.prototype, "centerManager", void 0);
    ScrollAdapter = __decorate([
        ccclass
    ], ScrollAdapter);
    return ScrollAdapter;
}(cc.Component));
exports.ScrollAdapter = ScrollAdapter;
/**
 * 默认View 如有特殊需求可重写
 * 可在任何地方通过this.adapter.node 来监听对应的事件
 * 一个 view 可以理解为单行容器，每个view容器内可包含多个 holder（例如表格布局）
 * 每个 view 所包含的 holder 个数是由用户逻辑来确定的，可通过 IElement里的换行来进行动态设置
 */
var DefaultView = /** @class */ (function (_super) {
    __extends(DefaultView, _super);
    function DefaultView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** 当单行view显示时 */
    DefaultView.prototype.onVisible = function () {
        this.adapter.node.emit(enum_1.ViewEvent.VISIBLE, this);
    };
    /** 当单行view隐藏时 */
    DefaultView.prototype.onDisable = function () {
        this.adapter.node.emit(enum_1.ViewEvent.DISABLE, this);
    };
    return DefaultView;
}(View_1.View));
exports.DefaultView = DefaultView;
/**
 * 默认Holder 如有特殊需求可重写
 * 在item的自定义脚本中，可以通过this.node来监听对应的事件
*/
var DefaultHolder = /** @class */ (function (_super) {
    __extends(DefaultHolder, _super);
    function DefaultHolder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultHolder.prototype.onCreated = function () {
        this.node.emit(enum_1.HolderEvent.CREATED, this);
    };
    DefaultHolder.prototype.onVisible = function () {
        this.node.emit(enum_1.HolderEvent.VISIBLE, this);
    };
    DefaultHolder.prototype.onDisable = function () {
        this.node.emit(enum_1.HolderEvent.DISABLE, this);
    };
    return DefaultHolder;
}(Holder_1.Holder));
exports.DefaultHolder = DefaultHolder;

cc._RF.pop();