"use strict";
cc._RF.push(module, 'e5254b495BMIb5ZD5AQZcBi', 'BhvSwitchPage');
// script/framework/behavior/BhvSwitchPage.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, menu = _a.menu;
var BhvSwitchPage = /** @class */ (function (_super) {
    __extends(BhvSwitchPage, _super);
    function BhvSwitchPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isLoopPage = false;
        _this._index = 0;
        _this.preIndex = 0;
        //判断是否在 changing 页面状态
        _this._isChanging = false;
        return _this;
    }
    Object.defineProperty(BhvSwitchPage.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (v) {
            if (this.isChanging)
                return;
            v = Math.round(v);
            var count = this.node.childrenCount - 1;
            if (this.isLoopPage) {
                if (v > count)
                    v = 0;
                if (v < 0)
                    v = count;
            }
            else {
                if (v > count)
                    v = count;
                if (v < 0)
                    v = 0;
            }
            this.preIndex = this._index; //标记之前的页面
            this._index = v;
            if (CC_EDITOR) {
                this._updateEditorPage(v);
            }
            else {
                this._updatePage(v);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BhvSwitchPage.prototype, "isChanging", {
        /**只读，是否在changing 的状态 */
        get: function () {
            return this._isChanging;
        },
        enumerable: false,
        configurable: true
    });
    // LIFE-CYCLE CALLBACKS:
    BhvSwitchPage.prototype.onLoad = function () {
        this.preIndex = this.index;
    };
    BhvSwitchPage.prototype._updateEditorPage = function (page) {
        if (!CC_EDITOR)
            return;
        var children = this.node.children;
        for (var i = 0; i < children.length; i++) {
            var node = children[i];
            if (i == page) {
                node.active = true;
            }
            else {
                node.active = false;
            }
        }
    };
    BhvSwitchPage.prototype._updatePage = function (page) {
        var children = this.node.children;
        var preIndex = this.preIndex;
        var curIndex = this.index;
        if (preIndex === curIndex)
            return; //没有改变就不进行操作
        var preNode = children[preIndex]; //旧节点
        var showNode = children[curIndex]; //新节点
        preNode.active = false;
        showNode.active = true;
    };
    BhvSwitchPage.prototype.next = function () {
        if (this.isChanging) {
            return false;
        }
        else {
            this.index++;
            return true;
        }
    };
    BhvSwitchPage.prototype.previous = function () {
        if (this.isChanging) {
            return false;
        }
        else {
            this.index--;
            return true;
        }
    };
    BhvSwitchPage.prototype.setEventIndex = function (e, index) {
        if (this.index >= 0 && this.index != null && this.isChanging === false) {
            this.index = index;
            return true;
        }
        else {
            return false;
        }
    };
    __decorate([
        property
    ], BhvSwitchPage.prototype, "isLoopPage", void 0);
    __decorate([
        property
    ], BhvSwitchPage.prototype, "_index", void 0);
    __decorate([
        property({
            type: cc.Integer
        })
    ], BhvSwitchPage.prototype, "index", null);
    BhvSwitchPage = __decorate([
        ccclass,
        executeInEditMode,
        menu("添加特殊行为/UI/Switch Page (切换页面)")
    ], BhvSwitchPage);
    return BhvSwitchPage;
}(cc.Component));
exports.default = BhvSwitchPage;

cc._RF.pop();