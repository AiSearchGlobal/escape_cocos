"use strict";
cc._RF.push(module, '48757UrRxBBIYVG24rV4zSe', 'Group');
// script/framework/adapter/abstract/Group.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
var enum_1 = require("../define/enum");
var Group = /** @class */ (function () {
    function Group(adapter) {
        this._index = -1;
        this._models = [];
        this._size = { x: 0, y: 0 };
        this._oldSize = { x: 0, y: 0 };
        this._anchorPoint = { x: 0.5, y: 0.5 };
        this._position = { x: 0, y: 0 };
        this._oldPosition = { x: 0, y: 0 };
        this._totalMinSize = { x: 0, y: 0 };
        this._totalPreferredSize = { x: 0, y: 0 };
        this._totalFlexibleSize = { x: 0, y: 0 };
        this._isFixed = false;
        this._fixedIndex = -1;
        this._adapter = adapter;
        this.internal_reset();
    }
    Object.defineProperty(Group.prototype, "adapter", {
        get: function () { return this._adapter; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "index", {
        get: function () { return this._index; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "models", {
        get: function () { return this._models; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "size", {
        get: function () { return this._size; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "oldSize", {
        get: function () { return this._oldSize; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "anchorPoint", {
        get: function () { return this._anchorPoint; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "position", {
        get: function () { return this._position; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "oldPosition", {
        get: function () { return this._oldPosition; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "totalMinSize", {
        get: function () { return this._totalMinSize; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "totalPreferredSize", {
        get: function () { return this._totalPreferredSize; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "totalFlexibleSize", {
        get: function () { return this._totalFlexibleSize; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "isFixed", {
        get: function () { return this._isFixed; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "fixedIndex", {
        get: function () { return this._fixedIndex; },
        enumerable: false,
        configurable: true
    });
    Group.prototype.findModelIndex = function (modelIndex) {
        return this.models.findIndex(function (item) { return item.index == modelIndex; });
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    Group.prototype.internal_reset = function () {
        this._models = [];
        this._size = { x: 0, y: 0 };
        this._oldSize = { x: 0, y: 0 };
        this._anchorPoint = { x: 0.5, y: 0.5 };
        this._position = { x: 0, y: 0 };
        this._oldPosition = { x: 0, y: 0 };
        this._totalMinSize = { x: 0, y: 0 };
        this._totalPreferredSize = { x: 0, y: 0 };
        this._totalFlexibleSize = { x: 0, y: 0 };
        this._isFixed = false;
        this._fixedIndex = -1;
        this._setAnchorPoint();
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    Group.prototype.internal_setPosition = function (position) {
        var mainAxis = this.adapter.mainAxis;
        this.oldPosition[mainAxis] = this.position[mainAxis];
        this.position[mainAxis] = position;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    Group.prototype.internal_setIndex = function (index) {
        this._index = index;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    Group.prototype.internal_insert = function (options, view, clear) {
        view.internal_reset();
        var caches = this.models;
        this.internal_reset();
        this._fixedIndex = options.fixedIndex;
        if (!clear) {
            for (var i = 0; i < caches.length; i++) {
                var model = caches[i];
                if (model.index < options.modelIndex) {
                    var ok = this._insertHandler(model, view);
                    if (!ok) {
                        options.modelIndex = model.index;
                        options.fixedIndex = this.isFixed ? this.index : options.fixedIndex;
                        return true;
                    }
                }
                else {
                    break;
                }
            }
        }
        for (var i = options.modelIndex; i < this.adapter.modelManager.length; i++) {
            var model = this.adapter.modelManager.get(i);
            var ok = this._insertHandler(model, view);
            if (!ok) {
                options.modelIndex = model.index;
                options.fixedIndex = this.isFixed ? this.index : options.fixedIndex;
                return model.index;
            }
        }
        return false;
    };
    /** @deprecated 内部方法，调用会爆炸💥 */
    Group.prototype.internal_includes = function (dataList) {
        var _loop_1 = function (i) {
            var data = dataList[i];
            index = this_1.models.findIndex(function (item) { return item.data == data; });
            if (-1 != index)
                return { value: true };
        };
        var this_1 = this, index;
        for (var i = 0; i < dataList.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return false;
    };
    Group.prototype._insertHandler = function (model, view) {
        var wrap = view.internal_isWrap(model, this);
        if (wrap) {
            view.internal_reset();
            return false;
        }
        view.internal_push(model);
        if (model.element.fixed) {
            this._isFixed = true;
            this._fixedIndex = -1;
        }
        var mainAxis = this.adapter.mainAxis;
        var crossAxis = this.adapter.crossAxis;
        if (!model.element.ignoreLayout || model.element.ignoreLayout && model.element.placeholder) {
            this.size[mainAxis] = Math.max(this.size[mainAxis], model.size[mainAxis] * model.scale[mainAxis]);
        }
        this.size[crossAxis] = this.adapter.crossAxisSize;
        this.oldSize[mainAxis] = this.size[mainAxis];
        this.oldSize[crossAxis] = this.size[crossAxis];
        this.models.push(model);
        return true;
    };
    Group.prototype._setAnchorPoint = function () {
        switch (this.adapter.viewManager.stretchDirection) {
            case enum_1.StretchDirection.Center:
                this.anchorPoint[this.adapter.mainAxis] = 0.5;
                break;
            case enum_1.StretchDirection.Header:
                this.anchorPoint[this.adapter.mainAxis] = 1 - this.adapter.mainAxisAnchorPoint;
                break;
            default:
                this.anchorPoint[this.adapter.mainAxis] = this.adapter.mainAxisAnchorPoint;
                break;
        }
    };
    return Group;
}());
exports.Group = Group;

cc._RF.pop();