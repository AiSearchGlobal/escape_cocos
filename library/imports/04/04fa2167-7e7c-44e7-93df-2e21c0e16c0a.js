"use strict";
cc._RF.push(module, '04fa2FnfnxE55PfLiHA4WwK', 'ModelManager');
// script/framework/adapter/manager/ModelManager.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelManager = void 0;
// import { _decorator, Component, Node } from 'cc';
var Manager_1 = require("../abstract/Manager");
var enum_1 = require("../define/enum");
var helper_1 = require("../help/helper");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Event;
(function (Event) {
    /** 当数据被清空时 */
    Event[Event["ON_CLEAR"] = 0] = "ON_CLEAR";
    /** 当添加数据时 */
    Event[Event["ON_INSERT"] = 1] = "ON_INSERT";
    /** 当删除数据时 */
    Event[Event["ON_REMOVE"] = 2] = "ON_REMOVE";
    /** 当移动数据时 */
    Event[Event["ON_MOVE"] = 3] = "ON_MOVE";
    /** 用户数据发生了改变 */
    Event[Event["ON_UPDATE"] = 4] = "ON_UPDATE";
    /** 当用户数据列表变化之前 */
    Event[Event["ON_CHANGE_BEFORE"] = 5] = "ON_CHANGE_BEFORE";
})(Event || (Event = {}));
var ModelManager = /** @class */ (function (_super) {
    __extends(ModelManager, _super);
    function ModelManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._modelList = [];
        _this._length = 0;
        return _this;
    }
    Object.defineProperty(ModelManager.prototype, "length", {
        get: function () { return this._length; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModelManager.prototype, "modelList", {
        get: function () { return this._modelList; },
        enumerable: false,
        configurable: true
    });
    ModelManager.prototype.onInit = function () {
    };
    ModelManager.prototype.insert = function (data, insertIndex) {
        if (insertIndex === void 0) { insertIndex = this.length; }
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                list = this._toArray(data);
                insertIndex = helper_1.Helper.clamp(insertIndex, 0, this.length);
                this.emit(Event.ON_CHANGE_BEFORE);
                this._insertHandler(list, insertIndex);
                this._length = this._modelList.length;
                // console.log("插入完成", this._modelList)
                if (list.length > 0) {
                    this.emit(Event.ON_INSERT, insertIndex);
                }
                return [2 /*return*/];
            });
        });
    };
    ModelManager.prototype._insertHandler = function (list, insertIndex) {
        var _this = this;
        var index = insertIndex;
        this._length = this._modelList.length;
        var cacheList = [];
        var newModel = function (data, index) {
            model = _this._getNewModel(data);
            model.index = index;
            _this._modelList.push(model);
            return model;
        };
        var action = function (data) {
            var model = _this.get(index);
            if (model) {
                cacheList.push(_this._copyModel(model, {}));
                model.data = data;
                model.index = index;
                _this._initModel(model);
            }
            else {
                var curr = newModel(data, index);
                _this._initModel(curr);
            }
            index++;
        };
        for (var i = 0, len = list.length; i < len; i++) {
            action(list[i]);
        }
        for (var i = 0; i < cacheList.length; i++) {
            var cache = cacheList[i];
            var idx = index + i;
            if (this.get(idx)) {
                var model = this.get(idx);
                cacheList.push(this._copyModel(model, {}));
                this._copyModel(cache, model);
            }
            else {
                var curr = newModel(cache.data, idx);
                this._copyModel(cache, curr);
            }
        }
    };
    ModelManager.prototype.remove = function (index, count) {
        if (count === void 0) { count = 1; }
        if (count == 0)
            return;
        if (index < 0 || index >= this.length)
            return;
        var removeIndex = this.length;
        this.emit(Event.ON_CHANGE_BEFORE);
        for (var i = index; i < this.length; i++) {
            var model = this.get(i);
            var next = this.get(i + count);
            if (next) {
                this._copyModel(next, model);
                model.index = i;
            }
            else {
                removeIndex = i;
                break;
            }
        }
        this._modelList.splice(removeIndex, this.length);
        this._length = this._modelList.length;
        console.log(this._modelList);
        this.emit(Event.ON_REMOVE, index);
    };
    ModelManager.prototype.move = function (startIndex, count, newIndex) {
        var _this = this;
        if (startIndex < 0 || count <= 0)
            return;
        this.emit(Event.ON_CHANGE_BEFORE);
        var temp = this._modelList.map(function (item) { return _this._copyModel(item, {}); });
        var moveList = temp.splice(startIndex, count);
        temp.splice.apply(temp, __spreadArrays([newIndex, 0], moveList));
        for (var i = 0; i < temp.length; i++) {
            this._copyModel(temp[i], this._modelList[i]);
        }
        var index = Math.min(startIndex, newIndex);
        this.emit(Event.ON_MOVE, index);
        console.log("移动后的数据", this._modelList);
    };
    /**
     * 更新所有数据
     */
    ModelManager.prototype.update = function () {
        this.emit(Event.ON_UPDATE);
    };
    ModelManager.prototype.clear = function () {
        this._modelList.length = 0;
        this._length = 0;
        this.emit(Event.ON_CLEAR);
    };
    ModelManager.prototype.has = function (index) {
        return !!this._modelList[index];
    };
    ModelManager.prototype.get = function (index) {
        if (isNaN(index))
            return null;
        return this._modelList[index];
    };
    ModelManager.prototype.slice = function (start, end) {
        if (this.length == 0)
            return [];
        return this._modelList.slice(start, end);
    };
    ModelManager.prototype._toArray = function (data) {
        if (!data)
            return [];
        if (data instanceof Array) {
            return data;
        }
        else {
            return [data];
        }
    };
    ModelManager.prototype._getNewModel = function (data) {
        var model = {
            data: data,
            index: -1,
            code: null,
            size: { x: 0, y: 0 },
            layoutSize: { x: 0, y: 0 },
            scale: { x: 0, y: 0 },
            position: { x: 0, y: 0 },
            anchorPoint: { x: 0, y: 0 },
            element: {
                wrapBeforeMode: enum_1.WrapMode.Wrap,
                wrapAfterMode: enum_1.WrapMode.Nowrap,
                ignoreLayout: false,
                placeholder: false,
                minSize: { x: 0, y: 0 },
                preferredSize: { x: 0, y: 0 },
                flexibleSize: { x: 0, y: 0 },
                layer: enum_1.Layer.Lowest,
                fixed: false,
                fixedOffset: 0,
                fixedSpacing: null,
                update: function () { }
            },
            isValid: true,
            update: function () { }
        };
        return model;
    };
    ModelManager.prototype._initModel = function (model) {
        var prefab = this.adapter.getPrefab(model.data);
        if (!prefab) {
            throw Error("预制体不能为空");
        }
        var prefab = this.adapter.getPrefab(model.data);
        if (!prefab) {
            throw Error("预制体不能为空");
        }
        if (prefab instanceof cc.Node) {
            var transform = prefab;
            model.code = prefab.uuid;
            model.size = { x: transform.width, y: transform.height };
            model.scale = { x: transform.scaleX, y: transform.scaleY };
            model.anchorPoint = { x: transform.anchorX, y: transform.anchorY };
        }
        else {
            var transform = prefab.data;
            model.code = prefab.data.uuid;
            model.size = { x: transform.width, y: transform.height };
            model.scale = { x: transform.scaleX, y: transform.scaleY };
            model.anchorPoint = { x: transform.anchorX, y: transform.anchorY };
        }
        model.layoutSize = { x: 0, y: 0 };
        model.position = { x: 0, y: 0 };
        model.element = {
            wrapBeforeMode: enum_1.WrapMode.Wrap,
            wrapAfterMode: enum_1.WrapMode.Nowrap,
            ignoreLayout: false,
            placeholder: false,
            minSize: { x: 0, y: 0 },
            preferredSize: { x: 0, y: 0 },
            flexibleSize: { x: 0, y: 0 },
            layer: enum_1.Layer.Lowest,
            fixed: false,
            fixedOffset: 0,
            fixedSpacing: null,
            update: function () { }
        };
        this.adapter.initElement(model.element, model.data);
    };
    ModelManager.prototype._copyModel = function (source, target) {
        source.element.update = function () { };
        var deep = function (obj, cacheObj) {
            for (var key in obj) {
                var value = obj[key];
                if (key == "data") {
                    cacheObj[key] = value;
                    continue;
                }
                if (key == "index")
                    continue;
                if (value != null && typeof value == "object") {
                    cacheObj[key] = {};
                    deep(value, cacheObj[key]);
                }
                else {
                    cacheObj[key] = value;
                }
            }
        };
        deep(source, target);
        return target;
    };
    ModelManager.Event = Event;
    ModelManager = __decorate([
        ccclass('ModelManager')
    ], ModelManager);
    return ModelManager;
}(Manager_1.Manager));
exports.ModelManager = ModelManager;

cc._RF.pop();