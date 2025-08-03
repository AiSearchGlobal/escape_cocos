"use strict";
cc._RF.push(module, '39c87s2NPpPz4zl0In9zuDJ', 'BhvRollNumber');
// script/framework/behavior/BhvRollNumber.ts

"use strict";
/*
 * @Author: wss
 * @Date: 2019-04-17 16:33:34
 * @Last Modified by: wss
 * @Last Modified time: 2019-04-23 00:24:50
 */
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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var VALUE_TYPE;
(function (VALUE_TYPE) {
    /**整数模式,只会以整数处理 */
    VALUE_TYPE[VALUE_TYPE["INTEGER"] = 0] = "INTEGER";
    /**两位小数模式,最终结果保留两位小数 0.00 */
    VALUE_TYPE[VALUE_TYPE["FIXED_2"] = 1] = "FIXED_2";
    /**计时器模式,以计时器格式变动 00:00 */
    VALUE_TYPE[VALUE_TYPE["TIMER"] = 2] = "TIMER";
    /**百分比模式 (百分比结果 基于小数,因此初始值必须为小数)*/
    VALUE_TYPE[VALUE_TYPE["PERCENTAGE"] = 3] = "PERCENTAGE";
    /*缩写单位模式KMBT */
    VALUE_TYPE[VALUE_TYPE["KMBT_FIXED2"] = 4] = "KMBT_FIXED2";
    /**自定义模式 (通过传入的函数,进行自定义) */
    VALUE_TYPE[VALUE_TYPE["CUSTOMER"] = 5] = "CUSTOMER";
})(VALUE_TYPE || (VALUE_TYPE = {}));
/**
 * [滚动数字] ver 0.5.0
 * 将会使用 lerp 自动滚动数字到目标数值
 */
var BhvRollNumber = /** @class */ (function (_super) {
    __extends(BhvRollNumber, _super);
    function BhvRollNumber() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.value = 0;
        _this.showPlusSymbol = false;
        _this._targetValue = 100;
        /** 滚动的线性差值 0 ~ 1 */
        _this.lerp = 0.1;
        _this.playAtStart = true;
        _this.runWaitTimer = 0;
        _this.valueType = VALUE_TYPE.INTEGER;
        /**自定义string 处理函数 */
        _this._custom_callback = null;
        _this.isScrolling = false;
        _this._lastLabelText = '';
        return _this;
    }
    Object.defineProperty(BhvRollNumber.prototype, "targetValue", {
        get: function () {
            return this._targetValue;
        },
        set: function (v) {
            this._targetValue = v;
            this.scroll(); //数据变动了就开始滚动
        },
        enumerable: false,
        configurable: true
    });
    //BhvRollNumber
    // LIFE-CYCLE CALLBACKS:
    BhvRollNumber.prototype.onLoad = function () {
        if (this.label == undefined) {
            this.label = this.node.getComponent(cc.Label);
        }
        if (this.playAtStart) {
            this.updateLabel();
            this.scroll();
        }
    };
    /**开始滚动数字 */
    BhvRollNumber.prototype.scroll = function () {
        var _this = this;
        if (this.isScrolling)
            return; //已经在滚动了就返回
        if (this.runWaitTimer > 0) {
            this.scheduleOnce(function () {
                _this.isScrolling = true;
            }, this.runWaitTimer);
        }
        else {
            this.isScrolling = true;
        }
    };
    /**停止滚动数字 */
    BhvRollNumber.prototype.stop = function () {
        this.value = this.targetValue;
        this.isScrolling = false;
        this.updateLabel();
    };
    /**初始化数值,不填写则全部按默认值处理 */
    BhvRollNumber.prototype.init = function (value, target, lerp) {
        this.targetValue = target || 0;
        this.value = value || 0;
        this.lerp = lerp || 0.1;
    };
    /**滚动到指定数字 */
    BhvRollNumber.prototype.scrollTo = function (target) {
        if (target === null || target === undefined)
            return;
        this.targetValue = target;
    };
    /** 更新文本 */
    BhvRollNumber.prototype.updateLabel = function () {
        var value = this.value;
        var string = '';
        switch (this.valueType) {
            case VALUE_TYPE.INTEGER: //最终显示整数类型
                string = Math.round(value) + '';
                break;
            case VALUE_TYPE.FIXED_2: //最终显示两位小数类型
                string = value.toFixed(2);
                break;
            case VALUE_TYPE.TIMER: //最终显示 计时器类型
                string = parseTimer(value);
                break;
            case VALUE_TYPE.PERCENTAGE: //最终显示 百分比
                string = Math.round(value * 100) + '%';
                break;
            case VALUE_TYPE.KMBT_FIXED2: //长单位缩放,只计算到 KMBT
                if (value >= Number.MAX_VALUE) {
                    string = 'MAX';
                }
                else if (value > 1000000000000) {
                    string = (value / 1000000000000).toFixed(2) + 'T';
                }
                else if (value > 1000000000) {
                    string = (value / 1000000000).toFixed(2) + 'B';
                }
                else if (value > 1000000) {
                    string = (value / 1000000).toFixed(2) + 'M';
                }
                else if (value > 1000) {
                    string = (value / 1000).toFixed(2) + "K";
                }
                else {
                    string = Math.round(value).toString();
                }
                break;
            case VALUE_TYPE.CUSTOMER: //自定义设置模式 (通过给定的自定义函数..处理)
                if (this._custom_callback) {
                    string = this._custom_callback(this.value, this.targetValue);
                }
                break;
            default:
                break;
        }
        //显示正负符号
        if (this.showPlusSymbol) {
            if (value > 0) {
                string = '+' + string;
            }
            else if (value < 0) {
                string = '-' + string;
            }
        }
        if (this.label) {
            if (string === this.label.string)
                return; //保证效率,如果上次赋值过,就不重复赋值
            this.label.string = string;
        }
    };
    BhvRollNumber.prototype.update = function (dt) {
        if (this.isScrolling == false)
            return;
        this.value = cc.misc.lerp(this.value, this.targetValue, this.lerp);
        this.updateLabel();
        if (Math.abs(this.value - this.targetValue) <= 0.0001) {
            this.value = this.targetValue;
            this.isScrolling = false;
            //this.node.emit('roll-hit-target');//滚动数字击中了目标
            return;
        }
    };
    __decorate([
        property({
            type: cc.Label,
            tooltip: '需要滚动的 Label 组件,如果不进行设置，就会从自己的节点自动查找'
        })
    ], BhvRollNumber.prototype, "label", void 0);
    __decorate([
        property({
            tooltip: '当前的滚动值(开始的滚动值)'
        })
    ], BhvRollNumber.prototype, "value", void 0);
    __decorate([
        property({
            tooltip: '是否显示正负符号'
        })
    ], BhvRollNumber.prototype, "showPlusSymbol", void 0);
    __decorate([
        property({
            tooltip: '滚动的目标值'
        })
    ], BhvRollNumber.prototype, "targetValue", null);
    __decorate([
        property
    ], BhvRollNumber.prototype, "_targetValue", void 0);
    __decorate([
        property({
            tooltip: '滚动的线性差值',
            step: 0.01,
            max: 1,
            min: 0
        })
    ], BhvRollNumber.prototype, "lerp", void 0);
    __decorate([
        property({
            tooltip: '是否在开始时就播放'
        })
    ], BhvRollNumber.prototype, "playAtStart", void 0);
    __decorate([
        property({
            tooltip: '在滚动之前会等待几秒',
            step: 0.1,
            max: 1,
            min: 0
        })
    ], BhvRollNumber.prototype, "runWaitTimer", void 0);
    __decorate([
        property({
            type: cc.Enum(VALUE_TYPE),
            tooltip: '是否在开始时就播放'
        })
    ], BhvRollNumber.prototype, "valueType", void 0);
    BhvRollNumber = __decorate([
        ccclass,
        menu("添加特殊行为/UI/Roll Number (滚动数字)")
    ], BhvRollNumber);
    return BhvRollNumber;
}(cc.Component));
exports.default = BhvRollNumber;
/** 时间格式转换 */
function parseTimer(timer, isFullTimer) {
    if (timer === void 0) { timer = 0; }
    if (isFullTimer === void 0) { isFullTimer = true; }
    var t = Math.floor(timer);
    var hours = Math.floor(t / 3600);
    var mins = Math.floor((t % 3600) / 60);
    var secs = t % 60;
    var m = '' + mins;
    var s = '' + secs;
    if (secs < 10)
        s = '0' + secs;
    //full timer 按小时算,无论有没有小时
    if (isFullTimer) {
        if (mins < 10)
            m = '0' + mins;
        return hours + ':' + m + ':' + s;
    }
    else {
        m = '' + (mins + hours * 60);
        if (mins < 10)
            m = '0' + mins;
        return m + ':' + s;
    }
}

cc._RF.pop();