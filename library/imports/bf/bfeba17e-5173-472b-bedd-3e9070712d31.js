"use strict";
cc._RF.push(module, 'bfebaF+UXNHK77dPpBwcS0x', 'UIGame');
// script/logic/ui/scene/UIGame.ts

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
var GameController_1 = require("../../../GameController");
var auto_game_1 = require("../../../data/autoui/scene/auto_game");
var AudioMng_1 = require("../../../framework/manager/AudioMng");
var UIBase_1 = require("../../../framework/ui/UIBase");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var GameDataCenter_1 = require("../../../userData/GameDataCenter");
var Utils_1 = require("../../../utils/Utils");
var UIGameLayer_1 = require("../prefab/UIGameLayer");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var UIGame = /** @class */ (function (_super) {
    __extends(UIGame, _super);
    function UIGame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.iconsSpr = [];
        _this.currencysName = [];
        return _this;
    }
    UIGame_1 = UIGame;
    UIGame.prototype.onUILoad = function () {
        var _this = this;
        this.ui = this.node.addComponent(auto_game_1.default);
        UIGame_1.instance = this;
        GameController_1.default.init();
        window.GetGameInfo()
            .then(function (res) {
            console.log(res, '获取游戏信息成功');
            if (res.code == 0) {
                window.currencyIcon = res.data.icon;
                window.currencyName = res.data.coin;
                cc.assetManager.loadRemote(window.currencyIcon, function (err, texture) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(texture, 'texture');
                    var spriteFrame = new cc.SpriteFrame(texture);
                    spriteFrame.addRef();
                    _this.iconsSpr.forEach(function (item) {
                        item.spriteFrame = spriteFrame;
                    });
                });
                _this.currencysName.forEach(function (item) {
                    item.string = window.currencyName;
                });
            }
        })
            .catch(function (err) {
            console.log(err, '获取游戏信息失败');
        });
    };
    UIGame.prototype.onShow = function () {
    };
    UIGame.prototype.onHide = function () {
    };
    UIGame.prototype.onStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        AudioMng_1.AudioMng.getInstance().initBgm();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, GameDataCenter_1.default.accountModel.login(Utils_1.Utils.getQueryString("token") || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjI0NTkzNSIsImV4cCI6MTc5MzUzODY3OSwiYWNjb3VudCI6IlRQSHlYY2hkcVFaaHhYSlVSZXk2d0J5UUdKd282RWVpMlgifQ.wGadx9NSFnQ7beVEYK3Za-oBV5tEbCy6pdXVTSrNdQM', Utils_1.Utils.getQueryString("company-code") || 'null')];
                    case 2:
                        _a.sent();
                        window.history.pushState({}, 'Treasure Guard', '/');
                        //await GameDataCenter.accountModel.login(Utils.getQueryString("token"));
                        GameController_1.default.socket.connect();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UIGame.prototype.showStage3Ani = function () {
        this.playShashouChuxian();
    };
    UIGame.prototype.showStage5Ani = function () {
        var _this = this;
        UIGameLayer_1.default.instance.openAllDoors();
        this.ui.stage_5.active = true;
        this.ui.VM_result.active = true;
        var resultType = GameDataCenter_1.default.roomInfoModel.resultType;
        // if(resultType == 3 || resultType == 4){
        // 	this.ui.caidai.active = true;
        // 	this.ui.caidai.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
        // 	this.ui.caidai.getComponent(sp.Skeleton).setCompleteListener(()=>{
        // 		this.ui.caidai.active = false;
        // 	})
        // }
        this.scheduleOnce(function () {
            _this.ui.VM_result.active = false;
            _this.ui.stage_5.active = false;
        }, 5);
    };
    UIGame.prototype.playShashouChuxian = function () {
        this.ui.stage_3.getComponent(cc.Animation).play();
    };
    UIGame.prototype.onClose = function () {
        UIHelp_1.default.CloseUI(UIGame_1);
    };
    var UIGame_1;
    UIGame.prefabUrl = "";
    UIGame.className = "UIGame";
    UIGame.instance = null;
    __decorate([
        property({ type: [cc.Sprite] })
    ], UIGame.prototype, "iconsSpr", void 0);
    __decorate([
        property({ type: [cc.Label] })
    ], UIGame.prototype, "currencysName", void 0);
    UIGame = UIGame_1 = __decorate([
        ccclass,
        menu("UI/scene/UIGame")
    ], UIGame);
    return UIGame;
}(UIBase_1.default));
exports.default = UIGame;

cc._RF.pop();