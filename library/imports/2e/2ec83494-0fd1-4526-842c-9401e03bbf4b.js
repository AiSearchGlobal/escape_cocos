"use strict";
cc._RF.push(module, '2ec83SUD9FFJoQslAHgO79L', 'VirtualLayout');
// script/framework/virtualList/VirtualLayout.ts

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
var VirtualItem_1 = require("./VirtualItem");
var VirtualList_1 = require("./VirtualList");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, disallowMultiple = _a.disallowMultiple, menu = _a.menu;
/**
 * 布局模式
 */
var LayoutType;
(function (LayoutType) {
    /** 横向 */
    LayoutType[LayoutType["HORIZONTAL"] = 0] = "HORIZONTAL";
    /** 纵向 */
    LayoutType[LayoutType["VERTICAL"] = 1] = "VERTICAL";
    /** 网格 */
    LayoutType[LayoutType["GRID"] = 2] = "GRID";
})(LayoutType || (LayoutType = {}));
/**
 * 布局轴向，只用于GRID布局。
 */
var AxisDirection;
(function (AxisDirection) {
    AxisDirection[AxisDirection["HORIZONTAL"] = 0] = "HORIZONTAL";
    AxisDirection[AxisDirection["VERTICAL"] = 1] = "VERTICAL";
})(AxisDirection || (AxisDirection = {}));
/**
 * 横向排列方向
 */
var HorizontalDirection;
(function (HorizontalDirection) {
    HorizontalDirection[HorizontalDirection["LEFT_TO_RIGHT"] = 0] = "LEFT_TO_RIGHT";
    HorizontalDirection[HorizontalDirection["RIGHT_TO_LEFT"] = 1] = "RIGHT_TO_LEFT";
})(HorizontalDirection || (HorizontalDirection = {}));
/**
 * 纵向排列方向
 */
var VerticalDirection;
(function (VerticalDirection) {
    VerticalDirection[VerticalDirection["TOP_TO_BOTTOM"] = 0] = "TOP_TO_BOTTOM";
    VerticalDirection[VerticalDirection["BOTTOM_TO_TOP"] = 1] = "BOTTOM_TO_TOP";
})(VerticalDirection || (VerticalDirection = {}));
/**
 * 虚拟列表所需的布局组件
 */
var VirtualLayout = /** @class */ (function (_super) {
    __extends(VirtualLayout, _super);
    function VirtualLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Type = LayoutType.VERTICAL;
        _this.StartAxis = AxisDirection.HORIZONTAL;
        _this.Left = 0;
        _this.Right = 0;
        _this.Top = 0;
        _this.Bottom = 0;
        _this.SpacingX = 0;
        _this.SpacingY = 0;
        _this.VerticalDirection = VerticalDirection.TOP_TO_BOTTOM;
        _this.HorizontalDirection = HorizontalDirection.LEFT_TO_RIGHT;
        /** mask节点（content父节点） */
        _this._view = null;
        /** view坐标系下view的边界矩形 */
        _this._viewEdge = null;
        /** 元素节点大小固定时的size */
        _this._fixedSize = null;
        /** 标记当前帧是否需要更新content size */
        _this._sizeDirty = false;
        /** 标记当前帧是否需要更新view区域数据显示 */
        _this._viewDirty = false;
        /** main content激活状态的item */
        _this._items = [];
        /** main content被回收的item池（不移出节点树，只设置active） */
        _this._itemPool = [];
        /** others content激活状态的item，下标顺序与this.list.Others数组一致 */
        _this._otherItemsArr = [];
        /** others content被回收的item池（不移出节点树，只设置active），下标顺序与this.list.Others数组一致 */
        _this._otherItemPoolArr = [];
        /** 所属虚拟列表 */
        _this.list = null;
        /** 列表缓存的所有数据 */
        _this.dataArr = [];
        return _this;
    }
    VirtualLayout.prototype.onInit = function () {
        var _this = this;
        this._view = this.node.parent;
        this._viewEdge = this.getNodeEdgeRect(this._view);
        // 初始化分层相关数据
        this._otherItemsArr = [];
        this._otherItemPoolArr = [];
        this.list.Others.forEach(function (e) {
            _this._otherItemsArr.push([]);
            _this._otherItemPoolArr.push([]);
        });
        // 元素大小固定时初始化fixedSize
        if (this.list.IsFixedSize && this._fixedSize === null) {
            this.addItemNode(false);
            this._fixedSize = this._itemPool[0].getContentSize();
        }
        // 注册事件
        this.node.on(cc.Node.EventType.POSITION_CHANGED, this.onPositionChanged, this);
    };
    VirtualLayout.prototype.onDestroy = function () {
        // 注销事件
        this.node.off(cc.Node.EventType.POSITION_CHANGED, this.onPositionChanged, this);
    };
    VirtualLayout.prototype.lateUpdate = function () {
        this.updateSize();
        this.updateView();
    };
    /**
     * 更新content size
     */
    VirtualLayout.prototype.updateSize = function () {
        if (!this._sizeDirty) {
            return;
        }
        this._sizeDirty = false;
        if (this.list.IsFixedSize) {
            this.updateSizeFixed();
        }
        else {
            this.updateSizeUnfixed();
        }
    };
    VirtualLayout.prototype.updateSizeFixed = function () {
        if (this.Type === LayoutType.VERTICAL) {
            if (this.dataArr.length <= 0) {
                this.node.height = 0;
                return;
            }
            this.node.height = this.Top + this.Bottom + (this.dataArr.length - 1) * this.SpacingY + this._fixedSize.height * this.dataArr.length;
        }
        else if (this.Type === LayoutType.HORIZONTAL) {
            if (this.dataArr.length <= 0) {
                this.node.width = 0;
                return;
            }
            this.node.width = this.Left + this.Right + (this.dataArr.length - 1) * this.SpacingX + this._fixedSize.width * this.dataArr.length;
        }
        else {
            if (this.StartAxis === AxisDirection.HORIZONTAL) {
                if (this.dataArr.length <= 0) {
                    this.node.height = 0;
                    return;
                }
                // 计算一行可以排列几个，至少1个
                var num = Math.floor((this.node.width - this.Left - this.Right + this.SpacingX) / (this._fixedSize.width + this.SpacingX));
                num = Math.max(num, 1);
                // 计算可以排列几行
                var row = Math.ceil(this.dataArr.length / num);
                // 高度
                this.node.height = this.Top + this.Bottom + (row - 1) * this.SpacingY + this._fixedSize.height * row;
            }
            else {
                if (this.dataArr.length <= 0) {
                    this.node.width = 0;
                    return;
                }
                // 计算一列可以排列几个，至少1个
                var num = Math.floor((this.node.height - this.Top - this.Bottom + this.SpacingY) / (this._fixedSize.height + this.SpacingY));
                num = Math.max(num, 1);
                // 计算可以排列几列
                var column = Math.ceil(this.dataArr.length / num);
                // 宽度
                this.node.width = this.Left + this.Right + (column - 1) * this.SpacingX + this._fixedSize.width * column;
            }
        }
    };
    VirtualLayout.prototype.updateSizeUnfixed = function () {
        // if (this.Type === LayoutType.VERTICAL) {
        //   if (this._dataArr.length <= 0) {
        //     this.node.height = 0;
        //     return;
        //   }
        //   let height = this.Top + this.Bottom + (this._dataArr.length - 1) * this.SpacingY;
        //   this._dataArr.forEach((e) => {
        //     height += e.size.height;
        //   });
        //   this.node.height = height;
        // } else if (this.Type === LayoutType.HORIZONTAL) {
        //   if (this._dataArr.length <= 0) {
        //     this.node.width = 0;
        //     return;
        //   }
        //   let width = this.Left + this.Right + (this._dataArr.length - 1) * this.SpacingX;
        //   this._dataArr.forEach((e) => {
        //     width += e.size.width;
        //   });
        //   this.node.width = width;
        // } else {
        // }
    };
    /**
     * 更新view区域数据显示
     */
    VirtualLayout.prototype.updateView = function () {
        if (!this._viewDirty || this.dataArr.length <= 0) {
            return;
        }
        this._viewDirty = false;
        if (this.list.IsFixedSize) {
            this.updateViewFixed();
        }
        else {
            this.updateViewUnfixed();
        }
    };
    VirtualLayout.prototype.updateViewFixed = function () {
        var _this = this;
        var viewResult = this.checkViewItem();
        var inView = viewResult.inView;
        var outView = viewResult.outView;
        var contentEdge = this.getNodeEdgeRect(this.node);
        var xMax, xMin, yMax, yMin;
        if (this.Type === LayoutType.VERTICAL) {
            var _loop_1 = function (i) {
                if (this_1.VerticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                    yMax = contentEdge.yMax - (this_1.Top + i * this_1.SpacingY + this_1._fixedSize.height * i);
                    yMin = yMax - this_1._fixedSize.height;
                    if (yMax + this_1.node.y < this_1._viewEdge.yMin) {
                        return { value: void 0 };
                    }
                    if (yMin + this_1.node.y > this_1._viewEdge.yMax) {
                        return "continue";
                    }
                }
                else {
                    yMin = contentEdge.yMin + this_1.Bottom + i * this_1.SpacingY + this_1._fixedSize.height * i;
                    yMax = yMin + this_1._fixedSize.height;
                    if (yMin + this_1.node.y > this_1._viewEdge.yMax) {
                        return { value: void 0 };
                    }
                    if (yMax + this_1.node.y < this_1._viewEdge.yMin) {
                        return "continue";
                    }
                }
                // 判断显示区域内部是否有节点显示此条数据
                var found = inView.findIndex(function (e) { return _this._items[e].getComponent(VirtualItem_1.default).DataIdx === i; });
                if (found !== -1) {
                    return "continue";
                }
                // 没有节点显示此条数据，需使用显示区域外的节点显示此条数据
                var itemIdx = outView.length === 0 ? this_1.addItemNode() : outView.shift();
                var item = this_1._items[itemIdx];
                this_1.setItem(cc.v3(0, yMin + item.anchorY * item.height), i, itemIdx);
            };
            var this_1 = this;
            for (var i = 0; i < this.dataArr.length; i++) {
                var state_1 = _loop_1(i);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        else if (this.Type === LayoutType.HORIZONTAL) {
            var _loop_2 = function (i) {
                if (this_2.HorizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
                    xMax = contentEdge.xMax - (this_2.Right + i * this_2.SpacingX + this_2._fixedSize.width * i);
                    xMin = xMax - this_2._fixedSize.width;
                    if (xMax + this_2.node.x < this_2._viewEdge.xMin) {
                        return { value: void 0 };
                    }
                    if (xMin + this_2.node.x > this_2._viewEdge.xMax) {
                        return "continue";
                    }
                }
                else {
                    xMin = contentEdge.xMin + this_2.Left + i * this_2.SpacingX + this_2._fixedSize.width * i;
                    xMax = xMin + this_2._fixedSize.width;
                    if (xMin + this_2.node.x > this_2._viewEdge.xMax) {
                        return { value: void 0 };
                    }
                    if (xMax + this_2.node.x < this_2._viewEdge.xMin) {
                        return "continue";
                    }
                }
                // 判断显示区域内部是否有节点显示此条数据
                var found = inView.findIndex(function (e) { return _this._items[e].getComponent(VirtualItem_1.default).DataIdx === i; });
                if (found !== -1) {
                    return "continue";
                }
                // 没有节点显示此条数据，需使用显示区域外的节点显示此条数据
                var itemIdx = outView.length === 0 ? this_2.addItemNode() : outView.shift();
                var item = this_2._items[itemIdx];
                this_2.setItem(cc.v3(xMin + item.anchorX * item.width, 0), i, itemIdx);
            };
            var this_2 = this;
            for (var i = 0; i < this.dataArr.length; i++) {
                var state_2 = _loop_2(i);
                if (typeof state_2 === "object")
                    return state_2.value;
            }
        }
        else {
            var _loop_3 = function (i) {
                // 计算当前元素排在第几行第几列，从0开始
                var rowIndex = 0;
                var columnIndex = 0;
                if (this_3.StartAxis === AxisDirection.HORIZONTAL) {
                    var num = Math.floor((this_3.node.width - this_3.Left - this_3.Right + this_3.SpacingX) / (this_3._fixedSize.width + this_3.SpacingX));
                    num = Math.max(num, 1);
                    rowIndex = Math.floor(i / num);
                    columnIndex = i % num;
                    if (this_3.VerticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                        yMax = contentEdge.yMax - (this_3.Top + rowIndex * this_3.SpacingY + this_3._fixedSize.height * rowIndex);
                        yMin = yMax - this_3._fixedSize.height;
                        if (yMax + this_3.node.y < this_3._viewEdge.yMin) {
                            return { value: void 0 };
                        }
                        if (yMin + this_3.node.y > this_3._viewEdge.yMax) {
                            return "continue";
                        }
                    }
                    else {
                        yMin = contentEdge.yMin + this_3.Bottom + rowIndex * this_3.SpacingY + this_3._fixedSize.height * rowIndex;
                        yMax = yMin + this_3._fixedSize.height;
                        if (yMin + this_3.node.y > this_3._viewEdge.yMax) {
                            return { value: void 0 };
                        }
                        if (yMax + this_3.node.y < this_3._viewEdge.yMin) {
                            return "continue";
                        }
                    }
                    if (this_3.HorizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
                        xMax = contentEdge.xMax - (this_3.Right + columnIndex * this_3.SpacingX + this_3._fixedSize.width * columnIndex);
                        xMin = xMax - this_3._fixedSize.width;
                        if (xMax + this_3.node.x < this_3._viewEdge.xMin) {
                            return "continue";
                        }
                        if (xMin + this_3.node.x > this_3._viewEdge.xMax) {
                            return "continue";
                        }
                    }
                    else {
                        xMin = contentEdge.xMin + this_3.Left + columnIndex * this_3.SpacingX + this_3._fixedSize.width * columnIndex;
                        xMax = xMin + this_3._fixedSize.width;
                        if (xMin + this_3.node.x > this_3._viewEdge.xMax) {
                            return "continue";
                        }
                        if (xMax + this_3.node.x < this_3._viewEdge.xMin) {
                            return "continue";
                        }
                    }
                }
                else {
                    var num = Math.floor((this_3.node.height - this_3.Top - this_3.Bottom + this_3.SpacingY) / (this_3._fixedSize.height + this_3.SpacingY));
                    num = Math.max(num, 1);
                    rowIndex = i % num;
                    columnIndex = Math.floor(i / num);
                    if (this_3.HorizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
                        xMax = contentEdge.xMax - (this_3.Right + columnIndex * this_3.SpacingX + this_3._fixedSize.width * columnIndex);
                        xMin = xMax - this_3._fixedSize.width;
                        if (xMax + this_3.node.x < this_3._viewEdge.xMin) {
                            return { value: void 0 };
                        }
                        if (xMin + this_3.node.x > this_3._viewEdge.xMax) {
                            return "continue";
                        }
                    }
                    else {
                        xMin = contentEdge.xMin + this_3.Left + columnIndex * this_3.SpacingX + this_3._fixedSize.width * columnIndex;
                        xMax = xMin + this_3._fixedSize.width;
                        if (xMin + this_3.node.x > this_3._viewEdge.xMax) {
                            return { value: void 0 };
                        }
                        if (xMax + this_3.node.x < this_3._viewEdge.xMin) {
                            return "continue";
                        }
                    }
                    if (this_3.VerticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                        yMax = contentEdge.yMax - (this_3.Top + rowIndex * this_3.SpacingY + this_3._fixedSize.height * rowIndex);
                        yMin = yMax - this_3._fixedSize.height;
                        if (yMax + this_3.node.y < this_3._viewEdge.yMin) {
                            return "continue";
                        }
                        if (yMin + this_3.node.y > this_3._viewEdge.yMax) {
                            return "continue";
                        }
                    }
                    else {
                        yMin = contentEdge.yMin + this_3.Bottom + rowIndex * this_3.SpacingY + this_3._fixedSize.height * rowIndex;
                        yMax = yMin + this_3._fixedSize.height;
                        if (yMin + this_3.node.y > this_3._viewEdge.yMax) {
                            return "continue";
                        }
                        if (yMax + this_3.node.y < this_3._viewEdge.yMin) {
                            return "continue";
                        }
                    }
                }
                // 判断显示区域内部是否有节点显示此条数据
                var found = inView.findIndex(function (e) { return _this._items[e].getComponent(VirtualItem_1.default).DataIdx === i; });
                if (found !== -1) {
                    return "continue";
                }
                // 没有节点显示此条数据，需使用显示区域外的节点显示此条数据
                var itemIdx = outView.length === 0 ? this_3.addItemNode() : outView.shift();
                var item = this_3._items[itemIdx];
                this_3.setItem(cc.v3(xMin + item.anchorX * item.width, yMin + item.anchorY * item.height), i, itemIdx);
            };
            var this_3 = this;
            for (var i = 0; i < this.dataArr.length; i++) {
                var state_3 = _loop_3(i);
                if (typeof state_3 === "object")
                    return state_3.value;
            }
        }
    };
    VirtualLayout.prototype.updateViewUnfixed = function () {
    };
    /**
     * 区分在view内部与外部的items数组下标
     */
    VirtualLayout.prototype.checkViewItem = function () {
        return this.list.IsFixedSize ? this.checkViewItemFixed() : this.checkViewItemUnfixed();
    };
    VirtualLayout.prototype.checkViewItemFixed = function () {
        // 显示区域内部的下标
        var inView = [];
        // 显示区域外部的下标
        var outView = [];
        if (this.Type === LayoutType.VERTICAL) {
            for (var i = 0; i < this._items.length; i++) {
                var item = this._items[i];
                var box = item.getBoundingBox();
                if (box.yMin + this.node.y <= this._viewEdge.yMax && box.yMax + this.node.y >= this._viewEdge.yMin) {
                    inView.push(i);
                }
                else {
                    outView.push(i);
                }
            }
        }
        else if (this.Type === LayoutType.HORIZONTAL) {
            for (var i = 0; i < this._items.length; i++) {
                var item = this._items[i];
                var box = item.getBoundingBox();
                if (box.xMin + this.node.x <= this._viewEdge.xMax && box.xMax + this.node.x >= this._viewEdge.xMin) {
                    inView.push(i);
                }
                else {
                    outView.push(i);
                }
            }
        }
        else {
            for (var i = 0; i < this._items.length; i++) {
                var item = this._items[i];
                var box = item.getBoundingBox();
                if (box.xMin + this.node.x <= this._viewEdge.xMax && box.xMax + this.node.x >= this._viewEdge.xMin
                    && box.yMin + this.node.y <= this._viewEdge.yMax && box.yMax + this.node.y >= this._viewEdge.yMin) {
                    inView.push(i);
                }
                else {
                    outView.push(i);
                }
            }
        }
        return { inView: inView, outView: outView };
    };
    VirtualLayout.prototype.checkViewItemUnfixed = function () {
        // 显示区域内部的下标
        var inView = [];
        // 显示区域外部的下标
        var outView = [];
        return { inView: inView, outView: outView };
    };
    /**
     * 设置item数据与坐标
     * @param p 节点坐标
     * @param dataIdx this._dataArr的下标
     * @param itemIdx this._items的下标
     */
    VirtualLayout.prototype.setItem = function (p, dataIdx, itemIdx) {
        var item = this._items[itemIdx];
        item.position = p;
        var vi = item.getComponent(VirtualItem_1.default);
        vi.DataIdx = dataIdx;
        vi.onInitItem.apply(vi, this.dataArr[dataIdx]);
        if (this.list.Others.length > 0) {
            var nodes_1 = [];
            this._otherItemsArr.forEach(function (e) {
                e[itemIdx].position = p;
                nodes_1.push(e[itemIdx]);
            });
            vi.setOtherNode.apply(vi, nodes_1);
        }
    };
    /**
     * 激活新的节点，并添加到content下
     * @param active 默认为true，false时不激活节点并添加进节点池中(仅在onInit中使用)
     * @returns 激活的节点在this._items中的下标
     */
    VirtualLayout.prototype.addItemNode = function (active) {
        var _this = this;
        if (active === void 0) { active = true; }
        var node = null;
        if (this._itemPool.length > 0) {
            node = this._itemPool.pop();
            node.active = true;
            this._items.push(node);
            this._otherItemPoolArr.forEach(function (e, i) {
                var otherNode = e.pop();
                otherNode.active = true;
                _this._otherItemsArr[i].push(otherNode);
            });
        }
        else {
            var tmp = this.list.Main.TemplateType === VirtualList_1.TemplateType.PREFAB ? this.list.Main.TemplatePrefab : this.list.Main.TemplateNode;
            node = cc.instantiate(tmp);
            node.getComponent(VirtualItem_1.default) || node.addComponent(VirtualItem_1.default);
            this.node.addChild(node);
            if (active) {
                node.active = true;
                this._items.push(node);
            }
            else {
                node.active = false;
                this.putItemNode(node);
            }
            this.list.Others.forEach(function (e, i) {
                var otherTmp = e.TemplateType === VirtualList_1.TemplateType.PREFAB ? e.TemplatePrefab : e.TemplateNode;
                var otherNode = cc.instantiate(otherTmp);
                e.Content.addChild(otherNode);
                if (active) {
                    otherNode.active = true;
                    _this._otherItemsArr[i].push(otherNode);
                }
                else {
                    otherNode.active = false;
                    _this.putItemNode(otherNode, true, i);
                }
            });
        }
        return this._items.length - 1;
    };
    /**
     * 回收item节点
     * @param node
     * @param isOther 是否为Others下的节点
     * @param otherIdx Others的下标
     */
    VirtualLayout.prototype.putItemNode = function (node, isOther, otherIdx) {
        if (isOther === void 0) { isOther = false; }
        if (otherIdx === void 0) { otherIdx = 0; }
        node.active = false;
        if (isOther) {
            this._otherItemPoolArr[otherIdx].push(node);
        }
        else {
            var vi = node.getComponent(VirtualItem_1.default);
            vi.onReset();
            this._itemPool.push(node);
        }
    };
    /**
     * 子节点坐标系下坐标转换为父节点坐标系下坐标
     */
    VirtualLayout.prototype.convertToParentPos = function (pos, child) {
        return pos.add(child.position);
    };
    /**
     * 父节点坐标系下坐标转换为子节点坐标系下坐标
     */
    VirtualLayout.prototype.convertToChildPos = function (pos, child) {
        return pos.sub(child.position);
    };
    /**
     * 获取节点自身坐标系下的节点边界矩形
     */
    VirtualLayout.prototype.getNodeEdgeRect = function (node) {
        return cc.rect(-node.width * node.anchorX, -node.height * node.anchorY, node.width, node.height);
    };
    /**
     * content位移监听回调
     */
    VirtualLayout.prototype.onPositionChanged = function () {
        var _this = this;
        this._viewDirty = true;
        this.list.Others.forEach(function (e) {
            e.Content.position = _this.node.position;
        });
    };
    /**
     * 清空节点重新排列
     */
    VirtualLayout.prototype.clearAllItem = function () {
        var _this = this;
        this._items.forEach(function (e, i) {
            _this.putItemNode(e);
            _this._otherItemsArr.forEach(function (arr, otherIdx) {
                _this.putItemNode(arr[i], true, otherIdx);
            });
        });
        this._items.length = 0;
        this._otherItemsArr.forEach(function (arr) {
            arr.length = 0;
        });
    };
    /**
     * 获取content相对view左上角原点位置的偏移值
     * @param idx 元素下标
     * @param itemAnchor 元素的锚点位置（左下角为0点）
     * @param viewAnchor view的锚点位置（左下角为0点）
     */
    VirtualLayout.prototype.getScrollOffset = function (idx, itemAnchor, viewAnchor) {
        idx = Math.min(idx, this.dataArr.length - 1);
        return this.list.IsFixedSize ? this.getScrollOffsetFixed(idx, itemAnchor, viewAnchor) : this.getScrollOffsetUnfixed(idx, itemAnchor, viewAnchor);
    };
    VirtualLayout.prototype.getScrollOffsetFixed = function (idx, itemAnchor, viewAnchor) {
        var contentEdge = this.getNodeEdgeRect(this.node);
        var xMax, xMin, yMax, yMin;
        if (this.Type === LayoutType.VERTICAL) {
            if (this.VerticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                yMax = contentEdge.yMax - (this.Top + idx * this.SpacingY + this._fixedSize.height * idx);
                yMin = yMax - this._fixedSize.height;
            }
            else {
                yMin = contentEdge.yMin + this.Bottom + idx * this.SpacingY + this._fixedSize.height * idx;
                yMax = yMin + this._fixedSize.height;
            }
            var x = this._viewEdge.xMin - (contentEdge.xMin + this.node.x);
            var y = contentEdge.yMax - (this._fixedSize.height * itemAnchor.y + yMin) - (1 - viewAnchor.y) * this._viewEdge.height;
            return cc.v2(x, y);
        }
        else if (this.Type === LayoutType.HORIZONTAL) {
            if (this.HorizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
                xMax = contentEdge.xMax - (this.Right + idx * this.SpacingX + this._fixedSize.width * idx);
                xMin = xMax - this._fixedSize.width;
            }
            else {
                xMin = contentEdge.xMin + this.Left + idx * this.SpacingX + this._fixedSize.width * idx;
                xMax = xMin + this._fixedSize.width;
            }
            var x = this._fixedSize.width * itemAnchor.x + xMin - contentEdge.xMin - viewAnchor.x * this._viewEdge.width;
            var y = contentEdge.yMax - (this._viewEdge.yMax - this.node.y);
            return cc.v2(x, y);
        }
        else {
            // 计算当前元素排在第几行第几列，从0开始
            var rowIndex = 0;
            var columnIndex = 0;
            if (this.StartAxis === AxisDirection.HORIZONTAL) {
                var num = Math.floor((this.node.width - this.Left - this.Right + this.SpacingX) / (this._fixedSize.width + this.SpacingX));
                num = Math.max(num, 1);
                rowIndex = Math.floor(idx / num);
                columnIndex = idx % num;
            }
            else {
                var num = Math.floor((this.node.height - this.Top - this.Bottom + this.SpacingY) / (this._fixedSize.height + this.SpacingY));
                num = Math.max(num, 1);
                rowIndex = idx % num;
                columnIndex = Math.floor(idx / num);
            }
            if (this.VerticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                yMax = contentEdge.yMax - (this.Top + rowIndex * this.SpacingY + this._fixedSize.height * rowIndex);
                yMin = yMax - this._fixedSize.height;
            }
            else {
                yMin = contentEdge.yMin + this.Bottom + rowIndex * this.SpacingY + this._fixedSize.height * rowIndex;
                yMax = yMin + this._fixedSize.height;
            }
            if (this.HorizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
                xMax = contentEdge.xMax - (this.Right + columnIndex * this.SpacingX + this._fixedSize.width * columnIndex);
                xMin = xMax - this._fixedSize.width;
            }
            else {
                xMin = contentEdge.xMin + this.Left + columnIndex * this.SpacingX + this._fixedSize.width * columnIndex;
                xMax = xMin + this._fixedSize.width;
            }
            var x = this._fixedSize.width * itemAnchor.x + xMin - contentEdge.xMin - viewAnchor.x * this._viewEdge.width;
            var y = contentEdge.yMax - (this._fixedSize.height * itemAnchor.y + yMin) - (1 - viewAnchor.y) * this._viewEdge.height;
            return cc.v2(x, y);
        }
    };
    VirtualLayout.prototype.getScrollOffsetUnfixed = function (idx, itemAnchor, viewAnchor) {
        return null;
    };
    VirtualLayout.prototype.reset = function (index) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (index >= 0 && index < this.dataArr.length) {
            this.dataArr[index] = args;
            this.clearAllItem();
            this._sizeDirty = true;
            this._viewDirty = true;
        }
    };
    VirtualLayout.prototype.push = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.dataArr.push(args);
        this._sizeDirty = true;
        this._viewDirty = true;
    };
    VirtualLayout.prototype.pop = function () {
        this.dataArr.pop();
        this.clearAllItem();
        this._sizeDirty = true;
        this._viewDirty = true;
    };
    VirtualLayout.prototype.clearAll = function () {
        this.dataArr = [];
        this.clearAllItem();
        this._sizeDirty = true;
        this._viewDirty = true;
    };
    VirtualLayout.prototype.unshift = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.dataArr.unshift(args);
        this.clearAllItem();
        this._sizeDirty = true;
        this._viewDirty = true;
    };
    VirtualLayout.prototype.shift = function () {
        this.dataArr.shift();
        this.clearAllItem();
        this._sizeDirty = true;
        this._viewDirty = true;
    };
    VirtualLayout.prototype.splice = function (start, deleteCount) {
        var _a;
        var argsArr = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            argsArr[_i - 2] = arguments[_i];
        }
        if (deleteCount === undefined) {
            this.dataArr.splice(start);
        }
        else {
            if (argsArr === undefined || argsArr.length === 0) {
                this.dataArr.splice(start, deleteCount);
            }
            else {
                (_a = this.dataArr).splice.apply(_a, __spreadArrays([start, deleteCount], argsArr));
            }
        }
        this.clearAllItem();
        this._sizeDirty = true;
        this._viewDirty = true;
    };
    VirtualLayout.prototype.sort = function (call) {
        this.dataArr.sort(call);
        this.clearAllItem();
        this._sizeDirty = true;
        this._viewDirty = true;
    };
    __decorate([
        property({ type: cc.Enum(LayoutType), tooltip: CC_DEV && '布局模式' })
    ], VirtualLayout.prototype, "Type", void 0);
    __decorate([
        property({
            type: cc.Enum(AxisDirection),
            tooltip: CC_DEV && 'GRID布局的起始轴方向\nHORIZONTAL：固定宽度，动态改变高度\nVERTICAL：固定高度，动态改变宽度',
            visible: function () { return this.Type === LayoutType.GRID; }
        })
    ], VirtualLayout.prototype, "StartAxis", void 0);
    __decorate([
        property({ visible: function () { return this.Type === LayoutType.HORIZONTAL || this.Type === LayoutType.GRID; } })
    ], VirtualLayout.prototype, "Left", void 0);
    __decorate([
        property({ visible: function () { return this.Type === LayoutType.HORIZONTAL || this.Type === LayoutType.GRID; } })
    ], VirtualLayout.prototype, "Right", void 0);
    __decorate([
        property({ visible: function () { return this.Type === LayoutType.VERTICAL || this.Type === LayoutType.GRID; } })
    ], VirtualLayout.prototype, "Top", void 0);
    __decorate([
        property({ visible: function () { return this.Type === LayoutType.VERTICAL || this.Type === LayoutType.GRID; } })
    ], VirtualLayout.prototype, "Bottom", void 0);
    __decorate([
        property({ visible: function () { return this.Type === LayoutType.HORIZONTAL || this.Type === LayoutType.GRID; } })
    ], VirtualLayout.prototype, "SpacingX", void 0);
    __decorate([
        property({ visible: function () { return this.Type === LayoutType.VERTICAL || this.Type === LayoutType.GRID; } })
    ], VirtualLayout.prototype, "SpacingY", void 0);
    __decorate([
        property({
            type: cc.Enum(VerticalDirection),
            visible: function () { return this.Type === LayoutType.VERTICAL || this.Type === LayoutType.GRID; }
        })
    ], VirtualLayout.prototype, "VerticalDirection", void 0);
    __decorate([
        property({
            type: cc.Enum(HorizontalDirection),
            visible: function () { return this.Type === LayoutType.HORIZONTAL || this.Type === LayoutType.GRID; }
        })
    ], VirtualLayout.prototype, "HorizontalDirection", void 0);
    VirtualLayout = __decorate([
        ccclass,
        disallowMultiple
    ], VirtualLayout);
    return VirtualLayout;
}(cc.Component));
exports.default = VirtualLayout;

cc._RF.pop();