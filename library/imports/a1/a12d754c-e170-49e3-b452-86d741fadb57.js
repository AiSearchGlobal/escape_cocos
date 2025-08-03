"use strict";
cc._RF.push(module, 'a12d7VM4XBJ47RShtdB+ttX', 'UIPlayer');
// script/logic/ui/prefab/UIPlayer.ts

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
var auto_player_1 = require("../../../data/autoui/prefab/auto_player");
var UIBase_1 = require("../../../framework/ui/UIBase");
var UIHelp_1 = require("../../../framework/ui/UIHelp");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
var UIPlayer = /** @class */ (function (_super) {
    __extends(UIPlayer, _super);
    function UIPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.playerAtlas = null;
        _this.iconsSpr = [];
        _this.speed = 200;
        _this.speed1 = 200;
        _this.speed2 = 300;
        _this.isMoving = false;
        _this.bettingCoin = 0;
        return _this;
    }
    UIPlayer_1 = UIPlayer;
    UIPlayer.prototype.onUILoad = function () {
        this.ui = this.node.addComponent(auto_player_1.default);
        UIPlayer_1.instance = this;
    };
    UIPlayer.prototype.onShow = function () {
        this.bettingCoin = 0;
    };
    UIPlayer.prototype.onHide = function () {
    };
    UIPlayer.prototype.onStart = function () {
    };
    UIPlayer.prototype.initAni = function (rankNo) {
        var _this = this;
        this.ui = this.node.addComponent(auto_player_1.default);
        UIPlayer_1.instance = this;
        this.animation = this.ui.img_cat.getComponent(cc.Animation);
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
    /**
     * 创建动画帧
     * @param {*} name 动画名字
     * @param {*} WrapMode 动画循环模式（单次循环）
     */
    UIPlayer.prototype.creatorAnimation = function (picName, length, name, WrapMode) {
        if (WrapMode === void 0) { WrapMode = cc.WrapMode.Loop; }
        var showTip = [];
        for (var i = 0; i <= length; i++) {
            //获取动画集合下的第一个动画plist文件，并以动画名称依次播放
            var frame = this.playerAtlas.getSpriteFrame(picName + "_" + i);
            if (frame) {
                showTip.push(frame); //添加动画帧到数组
            }
        }
        //创建一组动画剪辑
        var clip = cc.AnimationClip.createWithSpriteFrames(showTip, showTip.length);
        clip.wrapMode = WrapMode; //设置播放模式
        clip.name = name; //设置名字
        this.animation.addClip(clip); //添加动画帧到动画组件中
    };
    UIPlayer.prototype.showBetting = function (bettingCoin) {
        this.bettingCoin = bettingCoin;
        if (this.isMoving) {
            return;
        }
        this.ui.img_bubble.active = bettingCoin > 0;
        UIHelp_1.default.SetLabel(this.ui.lab_coin, bettingCoin);
    };
    UIPlayer.prototype.hideBetting = function () {
        this.ui.img_bubble.active = false;
    };
    UIPlayer.prototype.playWalk = function () {
        this.isMoving = true;
        this.animation.play("walk");
        this.hideBetting();
    };
    UIPlayer.prototype.playWait = function () {
        this.isMoving = false;
        this.animation.play("wait");
        this.showBetting(this.bettingCoin);
    };
    UIPlayer.prototype.flashToRoomById = function (pos) {
        this.node.stopAllActions();
        this.node.setPosition(pos);
    };
    UIPlayer.prototype.move = function (list, isBack) {
        var _this = this;
        if (list.length <= 0) {
            if (isBack) {
                this.bettingCoin = 0;
            }
            this.playWait();
            return;
        }
        this.speed = isBack ? this.speed2 : this.speed1;
        this.ui.img_cat.scaleX = this.node.x > list[0].x ? -1 : 1;
        var dis = this.getDistance(this.node.position, list[0]);
        var t = dis / this.speed;
        cc.tween(this.node)
            .to(t, { position: list[0] })
            .call(function () {
            list.splice(0, 1);
            _this.move(list, isBack);
        })
            .start();
    };
    // 距离
    UIPlayer.prototype.getDistance = function (start, end) {
        var pos = cc.v2(start.x - end.x, start.y - end.y);
        var dis = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
        return dis;
    };
    UIPlayer.prototype.onClose = function () {
        UIHelp_1.default.CloseUI(UIPlayer_1);
    };
    var UIPlayer_1;
    UIPlayer.prefabUrl = "player";
    UIPlayer.className = "UIPlayer";
    UIPlayer.instance = null;
    __decorate([
        property({ type: cc.SpriteAtlas })
    ], UIPlayer.prototype, "playerAtlas", void 0);
    __decorate([
        property({ type: [cc.Sprite] })
    ], UIPlayer.prototype, "iconsSpr", void 0);
    UIPlayer = UIPlayer_1 = __decorate([
        ccclass,
        menu("UI/prefab/UIPlayer")
    ], UIPlayer);
    return UIPlayer;
}(UIBase_1.default));
exports.default = UIPlayer;

cc._RF.pop();