"use strict";
cc._RF.push(module, 'fa024bPdTVAg4B0i4Y3elK9', 'helper');
// script/framework/adapter/help/helper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.smoothStep = function (from, to, t) {
        t = this.clamp01(t);
        t = -2 * t * t * t + 3 * t * t;
        return to * t + from * (1 - t);
    };
    Helper.smoothDamp = function (current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
        smoothTime = Math.max(0.0001, smoothTime);
        var num = 2 / smoothTime;
        var num2 = num * deltaTime;
        var num3 = 1 / (1 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
        var value = current - target;
        var num4 = target;
        var num5 = maxSpeed * smoothTime;
        value = this.clamp(value, 0 - num5, num5);
        target = current - value;
        var num6 = (currentVelocity + num * value) * deltaTime;
        currentVelocity = (currentVelocity - num * num6) * num3;
        var num7 = target + (value + num6) * num3;
        if (num4 - current > 0 == num7 > num4) {
            num7 = num4;
            currentVelocity = (num7 - num4) / deltaTime;
        }
        return { velocity: currentVelocity, position: num7 };
    };
    Helper.clamp01 = function (value) {
        return this.clamp(value, 0, 1);
    };
    Helper.clamp = function (num, min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        return Math.min(Math.max(num, min), max);
    };
    Helper.sign = function (f) {
        return (f >= 0) ? 1 : (-1);
    };
    Helper.lerp = function (a, b, t) {
        return a + (b - a) * this.clamp01(t);
    };
    Helper.approximately = function (a, b) {
        return Math.abs(b - a) < Math.max(100E-6 * Math.max(Math.abs(a), Math.abs(b)), this.Epsilon * 8);
    };
    Helper.round = function (value, n) {
        return Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
    };
    Helper.pingpang = function (v) {
        var value = v;
        value = Math.abs(v);
        var integer = Math.trunc(value);
        if (integer % 2 == 0) {
            value = value - integer;
        }
        else {
            value = (1 - (value - integer));
        }
        return value;
    };
    Helper.isNumber = function (value) {
        return typeof value == "number" && !isNaN(value);
    };
    Helper.progress = function (start, end, current, t) {
        return current = start + (end - start) * t;
    };
    Helper.sizeToVec = function (size) {
        if (!size)
            return { x: 0, y: 0 };
        return { x: size.width, y: size.height };
    };
    Helper.Epsilon = 1.401298E-45;
    Helper.Infinity = 1 / 0;
    return Helper;
}());
exports.Helper = Helper;

cc._RF.pop();