"use strict";
cc._RF.push(module, 'f0adbBs8jxLTZq9C/Qbsw08', 'BhvFrameIndex');
// script/framework/behavior/BhvFrameIndex.ts

"use strict";
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, requireComponent = _a.requireComponent, menu = _a.menu;
var BhvFrameIndex = /** @class */ (function (_super) {
    __extends(BhvFrameIndex, _super);
    function BhvFrameIndex() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spriteFrames = [null];
        _this._index = 0;
        return _this;
        // update (dt) {}
    }
    Object.defineProperty(BhvFrameIndex.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (value) {
            if (value < 0)
                return;
            this._index = value % this.spriteFrames.length;
            var sprite = this.node.getComponent(cc.Sprite);
            //设置 Sprite 组件的spriteFrame属性，变换图片               
            sprite.spriteFrame = this.spriteFrames[this._index];
        },
        enumerable: false,
        configurable: true
    });
    // LIFE-CYCLE CALLBACKS:
    /**通过设置帧名字来设置对象 */
    BhvFrameIndex.prototype.setName = function (name) {
        var index = this.spriteFrames.findIndex(function (v) { return v.name == name; });
        if (index < 0) {
            cc.error('frameIndex 设置了不存在的name:', name);
        }
        this.index = index || 0;
    };
    /**随机范围设置帧图片 */
    BhvFrameIndex.prototype.random = function (min, max) {
        if (!this.spriteFrames)
            return;
        var frameMax = this.spriteFrames.length;
        if (min == null || min < 0)
            min = 0;
        if (max == null || max > frameMax)
            max = frameMax;
        this.index = Math.floor(Math.random() * (max - min) + min);
    };
    BhvFrameIndex.prototype.next = function () {
        this.index++;
    };
    BhvFrameIndex.prototype.previous = function () {
        this.index--;
    };
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: 'sprite将会用到帧图片'
        })
    ], BhvFrameIndex.prototype, "spriteFrames", void 0);
    __decorate([
        property({
            tooltip: '当前显示的帧图',
            type: cc.Integer
        })
    ], BhvFrameIndex.prototype, "index", null);
    __decorate([
        property
    ], BhvFrameIndex.prototype, "_index", void 0);
    BhvFrameIndex = __decorate([
        ccclass,
        executeInEditMode,
        requireComponent(cc.Sprite),
        menu("添加特殊行为/UI/Frame Index(帧图改变)")
    ], BhvFrameIndex);
    return BhvFrameIndex;
}(cc.Component));
exports.default = BhvFrameIndex;

cc._RF.pop();