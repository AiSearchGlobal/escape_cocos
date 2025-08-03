"use strict";
cc._RF.push(module, '83b1cfbLrJEsrY2ny5IUZDh', 'RankPageAdapter');
// script/logic/ui/prefab/RankPageAdapter.ts

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
exports.RankPageAdapter = void 0;
var Holder_1 = require("../../../framework/adapter/abstract/Holder");
var ScrollAdapter_1 = require("../../../framework/adapter/abstract/ScrollAdapter");
var View_1 = require("../../../framework/adapter/abstract/View");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var RankPageAdapter = /** @class */ (function (_super) {
    __extends(RankPageAdapter, _super);
    function RankPageAdapter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab1 = null;
        _this.prefab2 = null;
        return _this;
    }
    RankPageAdapter.prototype.getPrefab = function (data) {
        if (data.type == 1) {
            return this.prefab1;
        }
        else {
            return this.prefab2;
        }
    };
    RankPageAdapter.prototype.getHolder = function (node, code) {
        return new myHolder(node, code, this);
    };
    RankPageAdapter.prototype.getView = function () {
        return new myView(this);
    };
    RankPageAdapter.prototype.initElement = function (element, data) {
    };
    RankPageAdapter.prototype.start = function () {
        this.modelManager.insert([{ type: 1 }, { type: 2 }]);
    };
    __decorate([
        property(cc.Node)
    ], RankPageAdapter.prototype, "prefab1", void 0);
    __decorate([
        property(cc.Node)
    ], RankPageAdapter.prototype, "prefab2", void 0);
    RankPageAdapter = __decorate([
        ccclass,
        menu("UI/prefab/RankPageAdapter")
    ], RankPageAdapter);
    return RankPageAdapter;
}(ScrollAdapter_1.ScrollAdapter));
exports.RankPageAdapter = RankPageAdapter;
var myView = /** @class */ (function (_super) {
    __extends(myView, _super);
    function myView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    myView.prototype.onVisible = function () {
    };
    myView.prototype.onDisable = function () {
    };
    return myView;
}(View_1.View));
var myHolder = /** @class */ (function (_super) {
    __extends(myHolder, _super);
    function myHolder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    myHolder.prototype.onCreated = function () {
    };
    myHolder.prototype.onVisible = function () {
    };
    myHolder.prototype.onDisable = function () {
    };
    return myHolder;
}(Holder_1.Holder));

cc._RF.pop();