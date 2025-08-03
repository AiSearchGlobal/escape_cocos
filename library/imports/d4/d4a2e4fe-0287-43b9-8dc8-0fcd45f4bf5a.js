"use strict";
cc._RF.push(module, 'd4a2eT+AodDuY3ID81F9L9a', 'RankAdapter');
// script/logic/ui/prefab/RankAdapter.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankAdapter = void 0;
var Holder_1 = require("../../../framework/adapter/abstract/Holder");
var ScrollAdapter_1 = require("../../../framework/adapter/abstract/ScrollAdapter");
var View_1 = require("../../../framework/adapter/abstract/View");
var GameDataCenter_1 = require("../../../userData/GameDataCenter");
var RankPart1_1 = require("./RankPart1");
var RankPart2_1 = require("./RankPart2");
var RankPart3_1 = require("./RankPart3");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var RankAdapter = /** @class */ (function (_super) {
    __extends(RankAdapter, _super);
    function RankAdapter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab1 = null;
        _this.prefab2 = null;
        _this.prefab3 = null;
        return _this;
    }
    RankAdapter.prototype.getPrefab = function (data) {
        if (data.type == 1) {
            return this.prefab1;
        }
        else if (data.type == 2) {
            return this.prefab2;
        }
        else {
            return this.prefab3;
        }
    };
    RankAdapter.prototype.getHolder = function (node, code) {
        return new myHolder(node, code, this);
    };
    RankAdapter.prototype.getView = function () {
        return new myView(this);
    };
    RankAdapter.prototype.initElement = function (element, data) {
    };
    RankAdapter.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, GameDataCenter_1.default.accountModel.getRank()];
                    case 1:
                        data = _a.sent();
                        list = [
                            { type: 1, data: data.mian },
                            { type: 2, data: { lastWeekRank: data.last_week_rank, thisWeekRank: data.this_week_rank } },
                            { type: 3, data: data.mian }
                        ];
                        this.modelManager.insert(list);
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.Node)
    ], RankAdapter.prototype, "prefab1", void 0);
    __decorate([
        property(cc.Node)
    ], RankAdapter.prototype, "prefab2", void 0);
    __decorate([
        property(cc.Node)
    ], RankAdapter.prototype, "prefab3", void 0);
    RankAdapter = __decorate([
        ccclass,
        menu("UI/prefab/RankAdapter")
    ], RankAdapter);
    return RankAdapter;
}(ScrollAdapter_1.ScrollAdapter));
exports.RankAdapter = RankAdapter;
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
        this._chatItem = this.node.getComponent(RankPart1_1.RankPart1) || this.node.getComponent(RankPart2_1.RankPart2) || this.node.getComponent(RankPart3_1.RankPart3);
    };
    myHolder.prototype.onVisible = function () {
        this._chatItem.show(this);
    };
    myHolder.prototype.onDisable = function () {
        this._chatItem.hide();
    };
    return myHolder;
}(Holder_1.Holder));

cc._RF.pop();