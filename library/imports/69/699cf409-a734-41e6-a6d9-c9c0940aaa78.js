"use strict";
cc._RF.push(module, '699cfQJpzRB5qbZycCUCqp4', 'UIGameLayer');
// script/logic/ui/prefab/UIGameLayer.ts

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
var Utils_1 = require("./../../../utils/Utils");
var auto_gameLayer_1 = require("../../../data/autoui/prefab/auto_gameLayer");
var AudioMng_1 = require("../../../framework/manager/AudioMng");
var UIBase_1 = require("../../../framework/ui/UIBase");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var EventConst_1 = require("../../../userData/EventConst");
var GameDataCenter_1 = require("../../../userData/GameDataCenter");
var UIJiluLayer_1 = require("./UIJiluLayer");
var UIRankLayer_1 = require("./UIRankLayer");
var UIWeihuLayer_1 = require("./UIWeihuLayer");
var i18nMgr_1 = require("../../../framework/i18n/i18nMgr");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var UIGameLayer = /** @class */ (function (_super) {
    __extends(UIGameLayer, _super);
    function UIGameLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.playerPrefab = null;
        _this.playerNamePrefab = null;
        _this.coinPrefab = null;
        _this.iconsSpr = [];
        _this.tipsIndex = 0;
        _this.tipsTween = null;
        _this.tipsList = [];
        return _this;
    }
    UIGameLayer_1 = UIGameLayer;
    UIGameLayer.prototype.onUILoad = function () {
        this.ui = this.node.addComponent(auto_gameLayer_1.default);
        UIGameLayer_1.instance = this;
    };
    UIGameLayer.prototype.onShow = function () {
        var _this = this;
        this.onRegisterEvent(this.ui.outGame, this.outGame);
        this.onRegisterEvent(this.ui.btn_room1, this.onRoom1Click);
        this.onRegisterEvent(this.ui.btn_room2, this.onRoom2Click);
        this.onRegisterEvent(this.ui.btn_room3, this.onRoom3Click);
        this.onRegisterEvent(this.ui.btn_room4, this.onRoom4Click);
        this.onRegisterEvent(this.ui.btn_room5, this.onRoom5Click);
        this.onRegisterEvent(this.ui.btn_room6, this.onRoom6Click);
        this.onRegisterEvent(this.ui.btn_room7, this.onRoom7Click);
        this.onRegisterEvent(this.ui.btn_room8, this.onRoom8Click);
        this.onRegisterEvent(this.ui.btn_chose_room, this.onChoseRoomClick);
        this.onRegisterEvent(this.ui.btn_chose_betting_num, this.onChoseBettingNumClick);
        this.onRegisterEvent(this.ui.toggle1, this.onBettingNum1Click);
        this.onRegisterEvent(this.ui.toggle2, this.onBettingNum2Click);
        this.onRegisterEvent(this.ui.toggle3, this.onBettingNum3Click);
        this.onRegisterEvent(this.ui.btn_betting, this.onBettingClick);
        this.onRegisterEvent(this.ui.btn_rank, this.onRankClick);
        this.onRegisterEvent(this.ui.btn_jilu, this.onJiluClick);
        this.initEvent(EventConst_1.GameEvent.SET_DOORS, this.onStageChange);
        this.initEvent(EventConst_1.GameEvent.CLOSE_GAME, this.onCloseGame);
        this.initEvent(EventConst_1.GameEvent.OPEN_GAME, this.onOpenGame);
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
            }
        })
            .catch(function (err) {
            console.log(err, '获取游戏信息失败');
        });
    };
    UIGameLayer.prototype.onHide = function () {
    };
    UIGameLayer.prototype.onStart = function () {
    };
    UIGameLayer.prototype.onCloseGame = function () {
        UIHelp_1.default.ShowUI(UIWeihuLayer_1.default);
    };
    UIGameLayer.prototype.onOpenGame = function () {
        UIHelp_1.default.CloseUI(UIWeihuLayer_1.default);
    };
    /** 切换房间类型，刷新页面 */
    UIGameLayer.prototype.resetRoomChose = function () {
        this.ui.toggle1.getComponent(cc.Toggle).isChecked = true;
        this.unscheduleAllCallbacks();
        this.showLastKillerAni();
    };
    UIGameLayer.prototype.showLastKillerAni = function () {
        var _this = this;
        var coinName = {
            zh: '金币',
            en: 'Coin'
        };
        var language = [
            {
                'zh': "選擇房间，守護寶藏",
                'en': "Choose a Tribe, Guard the Treasure"
            },
            {
                'zh': "成功躲避杀手獲得GSP獎勵",
                'en': "Successful escape the slayer GSP reward oh"
            },
            {
                'zh': "上期杀手去了「XXX」",
                'en': "It just went「XXX」"
            }
        ];
        this.tipsList = [
            "\u5FEB\u9009\u4E2A\u623F\u95F4\u8EB2\u8D77\u6765\uFF0C\u6740\u624B\u8981\u6765\u4E86",
            "\u6210\u529F\u8EB2\u907F\u6740\u624B\u83B7\u5F97" + GameDataCenter_1.default.roomInfoModel.coinName + "\u5956\u52B1\u54E6",
            "\u4E0A\u671F\u6740\u624B\u53BB\u4E86\u300C" + GameDataCenter_1.default.roomInfoModel.lastShaRoomName + "\u300D"
        ];
        if (GameDataCenter_1.default.roomInfoModel.gameStage <= 2) {
            this.tipsIndex = 0;
        }
        else {
            this.tipsIndex = 2;
        }
        UIHelp_1.default.SetLabel(this.ui.lab_shangqi, language[this.tipsIndex][i18nMgr_1.i18nMgr.getlanguage()].replace("XXX", GameDataCenter_1.default.roomInfoModel.lastShaRoomName));
        if (!this.tipsTween) {
            this.tipsTween = cc.tween(this.ui.lab_shangqi);
            this.tipsTween.repeatForever(cc.tween()
                .delay(2)
                .call(function () {
                UIHelp_1.default.SetLabel(_this.ui.lab_shangqi, language[_this.tipsIndex][i18nMgr_1.i18nMgr.getlanguage()].replace("XXX", GameDataCenter_1.default.roomInfoModel.lastShaRoomName));
                if (GameDataCenter_1.default.roomInfoModel.gameStage <= 2) {
                    _this.tipsIndex += 1;
                    if (_this.tipsIndex > 2) {
                        _this.tipsIndex = 0;
                    }
                }
            })).start();
        }
    };
    UIGameLayer.prototype.outGame = function () {
        this.node.getChildByName('nodeSetting').active = true;
        // const typeDvice = Utils.getQueryString("typeDvice");
        // console.log(typeDvice, '链接有"typeDvice"参数,此值不为空;');
        // if (typeDvice == "h5") {
        //   window.history.back();
        // } else {
        //   const dataTemp = {
        // 	name: "back",
        //   };
        //   const dataJson = JSON.stringify(dataTemp);
        //   uni.postMessage({
        // 	data: dataJson,
        //   });
        // }
    };
    UIGameLayer.prototype.onStageChange = function (stage) {
        switch (stage) {
            case 1:
                this.setDoors(1);
                break;
            case 2:
                this.setDoors(1);
                break;
            case 3:
                this.setDoors(2);
                break;
            case 4:
                this.setDoors(2);
                break;
            case 5:
                this.setDoors(2);
                break;
            default:
                break;
        }
    };
    /**
     * 设置所有门的显示状态
     * @param type 1: 开，2:关
     */
    UIGameLayer.prototype.setDoors = function (type) {
        for (var i = 1; i <= 9; i++) {
            var aniName = type == 1 ? "open" : "guan" + i;
            var spine = this.ui["men" + i].getComponent(sp.Skeleton);
            spine.setAnimation(0, aniName, false);
        }
    };
    UIGameLayer.prototype.openAllDoors = function () {
        var _this = this;
        console.warn("打开所有门");
        this.scheduleOnce(function () {
            for (var i = 1; i <= 9; i++) {
                var spine = _this.ui["men" + i].getComponent(sp.Skeleton);
                if (spine.animation.indexOf("open") == -1) {
                    spine.setAnimation(0, "open" + i, false);
                }
            }
        }, 2);
        this.scheduleOnce(function () {
            GameDataCenter_1.default.accountModel.players.forEach(function (element) {
                element.moveBack();
            });
        }, 2.5);
    };
    UIGameLayer.prototype.closeAllDoors = function () {
        for (var i = 1; i <= 9; i++) {
            var spine = this.ui["men" + i].getComponent(sp.Skeleton);
            spine.setAnimation(0, "close" + i, false);
        }
        this.scheduleOnce(function () {
            AudioMng_1.AudioMng.getInstance().playSFX("guanmen");
        }, 0.3);
    };
    UIGameLayer.prototype.showStage3Ani = function () {
        this.scheduleOnce(this.closeAllDoors, GameDataCenter_1.default.roomInfoModel.waitTime - 1);
    };
    UIGameLayer.prototype.openDoor = function (id) {
        var spine = this.ui["men" + id].getComponent(sp.Skeleton);
        spine.setAnimation(0, "open" + id, false);
    };
    UIGameLayer.prototype.resetRoomId = function () {
        this.data.roomId = 0;
    };
    UIGameLayer.prototype.onBettingNumClick = function (id) {
        var _this = this;
        this.scheduleOnce(function () {
            _this.ui.node_chose_coin.active = false;
        });
        GameDataCenter_1.default.roomInfoModel.bettingId = id;
        GameDataCenter_1.default.roomInfoModel.bettingNum = GameDataCenter_1.default.roomInfoModel["bettingConfig" + id];
    };
    UIGameLayer.prototype.onChoseBettingNumClick = function () {
        this.ui.node_chose_coin.active = !this.ui.node_chose_coin.active;
    };
    UIGameLayer.prototype.onChoseRoomClick = function () {
    };
    UIGameLayer.prototype.onRoomClick = function (id) {
        if (GameDataCenter_1.default.roomInfoModel.roomId == id) {
            return;
        }
        GameDataCenter_1.default.roomInfoModel.roomId = id;
        GameDataCenter_1.default.socketModel.move(id);
        GameDataCenter_1.default.accountModel.myPlayer.moveToRoomById(id);
    };
    UIGameLayer.prototype.onBettingClick = function () {
        if (!GameDataCenter_1.default.roomInfoModel.roomId) {
            var language = {
                en: 'Choose tribe before invest',
                zh: '選擇房间後投入'
            };
            UIHelp_1.default.ShowTips(language[i18nMgr_1.i18nMgr.getlanguage()]);
            return;
        }
        GameDataCenter_1.default.socketModel.betting(GameDataCenter_1.default.roomInfoModel.roomId, GameDataCenter_1.default.roomInfoModel.bettingId);
    };
    UIGameLayer.prototype.onRankClick = function () {
        UIHelp_1.default.ShowUI(UIRankLayer_1.default);
    };
    UIGameLayer.prototype.onJiluClick = function () {
        UIHelp_1.default.ShowUI(UIJiluLayer_1.default);
    };
    UIGameLayer.prototype.onBettingNum1Click = function () {
        this.onBettingNumClick(1);
    };
    UIGameLayer.prototype.onBettingNum2Click = function () {
        this.onBettingNumClick(2);
    };
    UIGameLayer.prototype.onBettingNum3Click = function () {
        this.onBettingNumClick(3);
    };
    UIGameLayer.prototype.onRoom1Click = function () {
        this.onRoomClick(1);
    };
    UIGameLayer.prototype.onRoom2Click = function () {
        this.onRoomClick(2);
    };
    UIGameLayer.prototype.onRoom3Click = function () {
        this.onRoomClick(3);
    };
    UIGameLayer.prototype.onRoom4Click = function () {
        this.onRoomClick(4);
    };
    UIGameLayer.prototype.onRoom5Click = function () {
        this.onRoomClick(5);
    };
    UIGameLayer.prototype.onRoom6Click = function () {
        this.onRoomClick(6);
    };
    UIGameLayer.prototype.onRoom7Click = function () {
        this.onRoomClick(7);
    };
    UIGameLayer.prototype.onRoom8Click = function () {
        this.onRoomClick(8);
    };
    UIGameLayer.prototype.dropCoins = function (roomId) {
        var _this = this;
        var numCoins = 35;
        var startDelay = 0.01;
        var startPosition = this.ui["btn_room" + roomId].position;
        var endPosList = [];
        for (var i = 1; i <= 8; i++) {
            if (i != roomId) {
                endPosList.push(this.ui["btn_room" + i].position);
            }
        }
        var _loop_1 = function (i) {
            this_1.scheduleOnce(function () {
                var coin = cc.instantiate(_this.coinPrefab);
                coin.setPosition(startPosition);
                _this.node.addChild(coin);
                // 初始隐藏状态
                coin.opacity = 0;
                coin.scale = 0;
                var randomX = Utils_1.Utils.random(-65, 65); // 随机生成 x 坐标偏移量
                var randomY = Utils_1.Utils.random(80, 120); // 随机生成 y 坐标偏移量
                var randomY2 = Utils_1.Utils.random(-150, -100);
                var endX = endPosList[Math.floor(i / 5)].x;
                var endY = endPosList[Math.floor(i / 5)].y;
                // 动画序列
                var delayTime = cc.delayTime(i * startDelay);
                var showAction = cc.spawn(cc.fadeIn(0.3), cc.scaleTo(0.3, 1).easing(cc.easeBackOut()));
                var riseAction = cc.moveBy(0.5, cc.v2(randomX, randomY)).easing(cc.easeCircleActionOut());
                var fallAction = cc.moveBy(0.5, cc.v2(0, randomY2)).easing(cc.easeQuadraticActionIn());
                var rotateAction = cc.repeatForever(cc.rotateBy(1, 360)); // 持续旋转
                var delayTime2 = cc.delayTime(1 + numCoins * startDelay - i * startDelay);
                var endAction = cc.moveTo(0.5, cc.v2(endX, endY)).easing(cc.easeQuadraticActionIn());
                var removeAction = cc.removeSelf();
                var sequence = cc.sequence(delayTime, showAction, riseAction, fallAction, delayTime2, endAction, removeAction);
                coin.runAction(sequence);
                coin.runAction(rotateAction); // 添加持续旋转动作
            }, i * startDelay);
        };
        var this_1 = this;
        for (var i = 0; i < numCoins; i++) {
            _loop_1(i);
        }
    };
    UIGameLayer.prototype.onClose = function () {
        UIHelp_1.default.CloseUI(UIGameLayer_1);
    };
    var UIGameLayer_1;
    UIGameLayer.prefabUrl = "gameLayer";
    UIGameLayer.className = "UIGameLayer";
    UIGameLayer.instance = null;
    __decorate([
        property({ type: cc.Prefab })
    ], UIGameLayer.prototype, "playerPrefab", void 0);
    __decorate([
        property({ type: cc.Prefab })
    ], UIGameLayer.prototype, "playerNamePrefab", void 0);
    __decorate([
        property({ type: cc.Prefab })
    ], UIGameLayer.prototype, "coinPrefab", void 0);
    __decorate([
        property({ type: [cc.Sprite] })
    ], UIGameLayer.prototype, "iconsSpr", void 0);
    UIGameLayer = UIGameLayer_1 = __decorate([
        ccclass,
        menu("UI/prefab/UIGameLayer")
    ], UIGameLayer);
    return UIGameLayer;
}(UIBase_1.default));
exports.default = UIGameLayer;

cc._RF.pop();