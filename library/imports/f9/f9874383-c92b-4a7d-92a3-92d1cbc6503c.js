"use strict";
cc._RF.push(module, 'f9874ODyStKfZKjktHLxlA8', 'ISerialize');
// script/framework/model/ISerialize.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//序列化类
var ISerialize = /** @class */ (function () {
    function ISerialize(modelName) {
        if (modelName === void 0) { modelName = 'default'; }
        this.modelName = 'default';
        /**
         * 本地缓存的数据
         */
        this._dLocalData = {};
        this.modelName = modelName;
        this.LoadStorage();
    }
    ISerialize.prototype.clear = function () {
    };
    ISerialize.prototype.LoadStorage = function () {
        var self = this;
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.getStorage({
                key: "model_" + this.modelName,
                success: function (res) {
                    var data = JSON.parse(res.data);
                    if (!data || data === "") {
                        self._dLocalData = {};
                        self.Save();
                    }
                    else {
                        self._dLocalData = data;
                    }
                }
            });
        }
        else {
            var data = JSON.parse(cc.sys.localStorage.getItem("model_" + this.modelName));
            if (!data || data === "") {
                this._dLocalData = {};
                this.Save();
            }
            else {
                this._dLocalData = data;
            }
        }
    };
    /**
     * protected 只让实现类操作数据  也就是model类型操作数据 对外提供别的方法
     * @param sKey
     * @param defaultValue
     */
    ISerialize.prototype.Query = function (sKey, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        if (this._dLocalData[sKey] != undefined) {
            return this._dLocalData[sKey];
        }
        return defaultValue;
    };
    /**
     * 设置成功返回 true，反之返回 false 用于是否保存数据
     * @param sKey
     * @param value
     */
    ISerialize.prototype.Set = function (sKey, value) {
        if (this._dLocalData[sKey] && this._dLocalData[sKey] == value) {
            return false; //一样就不要改了
        }
        this._dLocalData[sKey] = value;
        return true;
    };
    ISerialize.prototype.Save = function () {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.setStorage({
                key: "model_" + this.modelName,
                data: JSON.stringify(this._dLocalData)
            });
        }
        else {
            cc.sys.localStorage.setItem("model_" + this.modelName, JSON.stringify(this._dLocalData));
        }
    };
    return ISerialize;
}());
exports.default = ISerialize;

cc._RF.pop();