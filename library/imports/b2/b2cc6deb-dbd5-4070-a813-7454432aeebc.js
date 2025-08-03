"use strict";
cc._RF.push(module, 'b2cc63r29VAcKgTdFRDKu68', 'DrawBorad');
// script/framework/component/drawBorad/DrawBorad.ts

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
var DrawingBoard_1 = require("./DrawingBoard");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var DrawBorad = /** @class */ (function (_super) {
    __extends(DrawBorad, _super);
    function DrawBorad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ndBroad = null;
        _this.penWidth = 5;
        _this.reaserWidth = 20;
        _this._drawingBroad = null;
        _this._texture = new cc.Texture2D();
        _this._sprite = null;
        _this.broadYMax = -1; // 画板上边界最大值
        _this.broadXMin = -1; // 画板左边界最小值
        _this._touching = false;
        return _this;
    }
    DrawBorad.prototype.onLoad = function () {
        if (!this.ndBroad) {
            this.ndBroad = this.node;
        }
        this._sprite = this.ndBroad.getComponent(cc.Sprite);
        if (!this._sprite) {
            this._sprite = this.ndBroad.addComponent(cc.Sprite);
        }
        this._drawingBroad = new DrawingBoard_1.default(this.ndBroad.width, this.ndBroad.height);
        this._drawingBroad.setColor(0, 0, 0, 255);
        this._drawingBroad.setLineWidth(this.penWidth);
        this._touching = false;
        var worldPos = this.ndBroad.convertToWorldSpaceAR(cc.v2(0, 0));
        this.broadYMax = worldPos.y + this.ndBroad.height / 2;
        this.broadXMin = worldPos.x - this.ndBroad.width / 2;
        this.ndBroad.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.ndBroad.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.ndBroad.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        this.ndBroad.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    };
    DrawBorad.prototype.start = function () {
    };
    DrawBorad.prototype.setData = function (data) {
        this._drawingBroad.setData(data);
        this.updateTexture(this._drawingBroad.getData(), this.ndBroad.width, this.ndBroad.height);
    };
    DrawBorad.prototype.touchStart = function (e) {
        if (this._touching)
            return;
        this._touching = true;
        var worldPos = e.getLocation();
        this._drawingBroad.moveTo(worldPos.x - this.broadXMin, this.getRealY(worldPos.y));
    };
    DrawBorad.prototype.touchMove = function (e) {
        if (!this._touching)
            return;
        var worldPos = e.getLocation();
        this._drawingBroad.lineTo(worldPos.x - this.broadXMin, this.getRealY(worldPos.y));
        this.updateTexture(this._drawingBroad.getData(), this.ndBroad.width, this.ndBroad.height);
    };
    DrawBorad.prototype.touchCancel = function (e) {
        this._touching = false;
    };
    DrawBorad.prototype.touchEnd = function (e) {
        this._touching = false;
    };
    DrawBorad.prototype.onDestroy = function () {
        this.ndBroad.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.ndBroad.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.ndBroad.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        this.ndBroad.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    };
    DrawBorad.prototype.setColor = function (r, g, b, a) {
        this._drawingBroad.setColor(r, g, b, a);
    };
    DrawBorad.prototype.setLineWidth = function (width) {
        this._drawingBroad.setLineWidth(width);
    };
    DrawBorad.prototype.setPen = function () {
        this.setColor(0, 0, 0, 255);
        this.setLineWidth(this.penWidth);
    };
    DrawBorad.prototype.setReaser = function () {
        this.setColor(0, 0, 0, 0);
        this.setLineWidth(this.reaserWidth);
    };
    DrawBorad.prototype.getTexture = function () {
        return this._texture;
    };
    DrawBorad.prototype.updateTexture = function (data, width, height) {
        this._texture.initWithData(data, cc.Texture2D.PixelFormat.RGBA8888, width, height);
        this._sprite.spriteFrame.setTexture(this._texture);
        this._sprite.markForRender(true);
    };
    DrawBorad.prototype.getRealY = function (y) {
        if (this._sprite.spriteFrame['_flipY']) {
            return this.broadYMax - (cc.visibleRect.height - y);
        }
        return this.broadYMax - y;
    };
    __decorate([
        property(cc.Node)
    ], DrawBorad.prototype, "ndBroad", void 0);
    __decorate([
        property({ type: cc.Integer, displayName: "画笔粗细" })
    ], DrawBorad.prototype, "penWidth", void 0);
    __decorate([
        property({ type: cc.Integer, displayName: "橡皮粗细" })
    ], DrawBorad.prototype, "reaserWidth", void 0);
    DrawBorad = __decorate([
        ccclass,
        menu("画板/DrawBorad")
    ], DrawBorad);
    return DrawBorad;
}(cc.Component));
exports.default = DrawBorad;

cc._RF.pop();