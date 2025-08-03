"use strict";
cc._RF.push(module, 'ee55ezOwmVL7Kvmo2s5Eh7p', 'JiluAdapter');
// script/logic/ui/prefab/JiluAdapter.ts

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
exports.JiluAdapter = void 0;
var Holder_1 = require("../../../framework/adapter/abstract/Holder");
var ScrollAdapter_1 = require("../../../framework/adapter/abstract/ScrollAdapter");
var View_1 = require("../../../framework/adapter/abstract/View");
var enum_1 = require("../../../framework/adapter/define/enum");
var ReleaseManager_1 = require("../../../framework/adapter/manager/ReleaseManager");
var GameDataCenter_1 = require("../../../userData/GameDataCenter");
var UIJiluItem1_1 = require("./UIJiluItem1");
var UIJiluItem2_1 = require("./UIJiluItem2");
var UIJiluItem3_1 = require("./UIJiluItem3");
var UIJiluItem4_1 = require("./UIJiluItem4");
var UIJiluItem5_1 = require("./UIJiluItem5");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var JiluAdapter = /** @class */ (function (_super) {
    __extends(JiluAdapter, _super);
    function JiluAdapter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab1 = null;
        _this.prefab2 = null;
        _this.prefab3 = null;
        _this.prefab4 = null;
        _this.prefab5 = null;
        _this.header = null;
        _this.loading = null;
        _this._isHeaderPlay = false;
        _this.page = 1;
        return _this;
    }
    JiluAdapter.prototype.getPrefab = function (data) {
        if (data.type == 1) {
            return this.prefab1;
        }
        else if (data.type == 2) {
            return this.prefab2;
        }
        else if (data.type == 3) {
            return this.prefab3;
        }
        else if (data.type == 4) {
            return this.prefab4;
        }
        else {
            return this.prefab5;
        }
    };
    JiluAdapter.prototype.getHolder = function (node, code) {
        return new myHolder(node, code, this);
    };
    JiluAdapter.prototype.getView = function () {
        return new myView(this);
    };
    JiluAdapter.prototype.initElement = function (element, data) {
    };
    JiluAdapter.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list1, list2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.releaseManager.on(ReleaseManager_1.ReleaseManager.Event.ON_PULL_UP, this.onPullDown, this);
                        this._headerTween = new cc.Tween(this.header).to(0.518, {
                            height: this.releaseManager.bottom * this.mainAxisSize
                        }, { easing: "elasticOut" });
                        this._loadTween = new cc.Tween(this.loading).by(1, {
                            angle: -360
                        }).union().repeatForever();
                        GameDataCenter_1.default.accountModel.noMoreJilu = false;
                        return [4 /*yield*/, GameDataCenter_1.default.accountModel.getGameLog()];
                    case 1:
                        list1 = _a.sent();
                        this.modelManager.insert(list1);
                        return [4 /*yield*/, GameDataCenter_1.default.accountModel.getBettingLog(1)];
                    case 2:
                        list2 = _a.sent();
                        this.modelManager.insert(list2);
                        return [2 /*return*/];
                }
            });
        });
    };
    JiluAdapter.prototype.onPullDown = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var list, progress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(event.state == enum_1.ReleaseState.RELEASE)) return [3 /*break*/, 2];
                        if (!this._isHeaderPlay) return [3 /*break*/, 2];
                        this._loadTween.start();
                        // 等待并锁定头部
                        event.wait();
                        // 加载历史记录
                        this.page += 1;
                        return [4 /*yield*/, GameDataCenter_1.default.accountModel.getBettingLog(this.page)];
                    case 1:
                        list = _a.sent();
                        // 插入数据
                        this.modelManager.insert(list);
                        // 释放解锁头部
                        this.scheduleOnce(function () {
                            event.release();
                        });
                        this._loadTween.stop();
                        _a.label = 2;
                    case 2:
                        progress = event.progress;
                        if (event.state == enum_1.ReleaseState.WAIT) {
                            progress = 0.1;
                        }
                        if (progress >= 0.1) {
                            if (!this._isHeaderPlay) {
                                // this._headerTween = new cc.Tween(this.header).to(0.518, {
                                //     height: this.releaseManager.bottom * this.mainAxisSize
                                // }, { easing: "elasticOut" })
                                this._headerTween.start();
                                this._isHeaderPlay = true;
                            }
                        }
                        else {
                            this._headerTween.stop();
                            this._isHeaderPlay = false;
                            // this.header.height = event.offset
                            // var opacity = 255 * Math.min(progress, 1)
                            // this.loading.opacity = opacity;
                            this.loading.opacity = 0;
                        }
                        this.loading.angle = -360 * event.progress;
                        return [2 /*return*/];
                }
            });
        });
    };
    JiluAdapter.prototype.scrollToHeader = function () {
        this.scrollManager.scrollToHeader(1);
    };
    __decorate([
        property(cc.Prefab)
    ], JiluAdapter.prototype, "prefab1", void 0);
    __decorate([
        property(cc.Prefab)
    ], JiluAdapter.prototype, "prefab2", void 0);
    __decorate([
        property(cc.Prefab)
    ], JiluAdapter.prototype, "prefab3", void 0);
    __decorate([
        property(cc.Prefab)
    ], JiluAdapter.prototype, "prefab4", void 0);
    __decorate([
        property(cc.Prefab)
    ], JiluAdapter.prototype, "prefab5", void 0);
    __decorate([
        property(cc.Node)
    ], JiluAdapter.prototype, "header", void 0);
    __decorate([
        property(cc.Node)
    ], JiluAdapter.prototype, "loading", void 0);
    JiluAdapter = __decorate([
        ccclass,
        menu("UI/prefab/JiluAdapter")
    ], JiluAdapter);
    return JiluAdapter;
}(ScrollAdapter_1.ScrollAdapter));
exports.JiluAdapter = JiluAdapter;
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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._chatItem = null;
        return _this;
    }
    myHolder.prototype.onCreated = function () {
        this._chatItem = this.node.getComponent(UIJiluItem5_1.default) || this.node.getComponent(UIJiluItem4_1.default) || this.node.getComponent(UIJiluItem3_1.default) || this.node.getComponent(UIJiluItem2_1.default) || this.node.getComponent(UIJiluItem1_1.default);
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