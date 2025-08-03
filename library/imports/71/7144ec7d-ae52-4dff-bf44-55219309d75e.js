"use strict";
cc._RF.push(module, '7144ex9rlJN/79EVSGTCdde', 'VirtualList');
// script/framework/virtualList/VirtualList.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualLayoutData = exports.TemplateType = void 0;
var VirtualLayout_1 = require("./VirtualLayout");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode, disallowMultiple = _a.disallowMultiple, menu = _a.menu;
/**
 * 列表元素模板类型
 */
var TemplateType;
(function (TemplateType) {
    TemplateType[TemplateType["NODE"] = 0] = "NODE";
    TemplateType[TemplateType["PREFAB"] = 1] = "PREFAB";
})(TemplateType = exports.TemplateType || (exports.TemplateType = {}));
/**
 * 虚拟列表容器以及容器内元素的模板数据
 */
var VirtualLayoutData = /** @class */ (function () {
    function VirtualLayoutData() {
        this.Content = null;
        this.TemplateType = TemplateType.PREFAB;
        this.TemplatePrefab = null;
        this.TemplateNode = null;
        this._isMain = false;
    }
    __decorate([
        property({
            type: cc.Node,
            tooltip: CC_DEV && '列表容器节点',
            visible: function () { return !this._isMain; }
        })
    ], VirtualLayoutData.prototype, "Content", void 0);
    __decorate([
        property({
            type: cc.Enum(TemplateType),
            tooltip: CC_DEV && '列表元素模板类型'
        })
    ], VirtualLayoutData.prototype, "TemplateType", void 0);
    __decorate([
        property({
            type: cc.Prefab,
            tooltip: CC_DEV && '列表元素模板预制体',
            visible: function () { return this.TemplateType === TemplateType.PREFAB; }
        })
    ], VirtualLayoutData.prototype, "TemplatePrefab", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: CC_DEV && '列表元素模板节点',
            visible: function () { return this.TemplateType === TemplateType.NODE; }
        })
    ], VirtualLayoutData.prototype, "TemplateNode", void 0);
    __decorate([
        property(cc.Boolean)
    ], VirtualLayoutData.prototype, "_isMain", void 0);
    VirtualLayoutData = __decorate([
        ccclass('VirtualLayoutData')
    ], VirtualLayoutData);
    return VirtualLayoutData;
}());
exports.VirtualLayoutData = VirtualLayoutData;
/**
 * 虚拟列表
 */
var VirtualList = /** @class */ (function (_super) {
    __extends(VirtualList, _super);
    function VirtualList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Main = new VirtualLayoutData();
        _this.Others = [];
        _this.IsFixedSize = true;
        _this._scrollView = null;
        _this._layout = null;
        return _this;
    }
    VirtualList.prototype.onLoad = function () {
        if (CC_EDITOR) {
            this._runEditor();
            return;
        }
        this._scrollView = this.getComponent(cc.ScrollView);
        this._layout = this._scrollView.content.getComponent(VirtualLayout_1.default);
        if (this._layout) {
            this._layout.list = this;
            this._layout.onInit();
        }
    };
    VirtualList.prototype.resetInEditor = function () {
        if (CC_EDITOR) {
            this._runEditor();
            return;
        }
    };
    /**
     * 编辑器模式下的一些设置
     */
    VirtualList.prototype._runEditor = function () {
        var scrollView = this.getComponent(cc.ScrollView);
        var layout = scrollView.content.getComponent(VirtualLayout_1.default);
        if (!this.Main.Content) {
            this.Main.Content = scrollView.content;
            this.Main._isMain = true;
        }
        if (!layout) {
            scrollView.content.addComponent(VirtualLayout_1.default);
        }
    };
    /**
     * 滚动元素节点到view的指定位置
     * @param idx 元素下标
     * @param itemAnchor 元素的锚点位置（左下角为0点）
     * @param viewAnchor view的锚点位置（左下角为0点）
     * @param t 时间 s
     * @param a 加速度是否衰减，为true且滚动距离大时滚动会不准确
     */
    VirtualList.prototype.scrollItemToView = function (idx, itemAnchor, viewAnchor, t, a) {
        if (itemAnchor === void 0) { itemAnchor = cc.v2(); }
        if (viewAnchor === void 0) { viewAnchor = cc.v2(); }
        if (t === void 0) { t = 0; }
        if (a === void 0) { a = true; }
        this._scrollView.scrollToOffset(this._layout.getScrollOffset(idx, itemAnchor, viewAnchor), t, a);
    };
    /**
     * 获取列表数据
     */
    VirtualList.prototype.getDataArr = function () {
        return this._layout.dataArr;
    };
    /**
     * 重置某个元素数据
     * @param index
     * @param args 元素所需参数
     */
    VirtualList.prototype.reset = function (index) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (_a = this._layout).reset.apply(_a, __spreadArrays([index], args));
    };
    /**
     * 添加元素数据到尾部
     * @param args 元素所需参数
     */
    VirtualList.prototype.push = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this._layout).push.apply(_a, args);
    };
    /**
     * 删除尾部元素数据
     */
    VirtualList.prototype.pop = function () {
        this._layout.pop();
    };
    VirtualList.prototype.clearAll = function () {
        this._layout.clearAll();
    };
    /**
     * 添加元素数据到头部
     * @param args
     */
    VirtualList.prototype.unshift = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this._layout).unshift.apply(_a, args);
    };
    /**
     * 删除头部元素数据
     */
    VirtualList.prototype.shift = function () {
        this._layout.shift();
    };
    /**
     * 插入或删除元素 用法同数组splice
     */
    VirtualList.prototype.splice = function (start, deleteCount) {
        var _a;
        var argsArr = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            argsArr[_i - 2] = arguments[_i];
        }
        (_a = this._layout).splice.apply(_a, __spreadArrays([start, deleteCount], argsArr));
    };
    /**
     * 数据排序
     * @param call
     */
    VirtualList.prototype.sort = function (call) {
        this._layout.sort(call);
    };
    __decorate([
        property({ type: VirtualLayoutData, tooltip: CC_DEV && '列表主容器' })
    ], VirtualList.prototype, "Main", void 0);
    __decorate([
        property({ type: VirtualLayoutData, tooltip: CC_DEV && '列表除主容器外的其他容器\n需要分层显示时使用，一般用于降低draw call' })
    ], VirtualList.prototype, "Others", void 0);
    __decorate([
        property({
            visible: false,
            tooltip: CC_DEV && '元素节点大小是否一致且固定不变，大小不定时更耗性能（目前不支持此选项，必须为true）'
        })
    ], VirtualList.prototype, "IsFixedSize", void 0);
    VirtualList = __decorate([
        ccclass,
        disallowMultiple,
        executeInEditMode,
        requireComponent(cc.ScrollView),
        menu('Framework/UI组件/VirtualList')
    ], VirtualList);
    return VirtualList;
}(cc.Component));
exports.default = VirtualList;

cc._RF.pop();