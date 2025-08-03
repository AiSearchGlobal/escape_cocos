import { Utils } from './../../../utils/Utils';
import auto_gameLayer from "../../../data/autoui/prefab/auto_gameLayer";
import { AudioMng } from "../../../framework/manager/AudioMng";
import UIBase from "../../../framework/ui/UIBase";
import UIHelp from "../../../framework/ui/UIHelp";
import { GameEvent } from "../../../userData/EventConst";
import GameDataCenter from "../../../userData/GameDataCenter";
import UIJiluLayer from "./UIJiluLayer";
import UIRankLayer from "./UIRankLayer";
import UIWeihuLayer from "./UIWeihuLayer";
import { i18nMgr } from '../../../framework/i18n/i18nMgr';

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/prefab/UIGameLayer")
export default class UIGameLayer extends UIBase {
	ui: auto_gameLayer = null;

	protected static prefabUrl = "gameLayer";
	protected static className = "UIGameLayer";

	public static instance: UIGameLayer = null;

	@property({ type: cc.Prefab })
	playerPrefab: cc.Prefab = null;
	@property({ type: cc.Prefab })
	playerNamePrefab: cc.Prefab = null;
	@property({ type: cc.Prefab })
	coinPrefab: cc.Prefab = null;

	@property({ type: [cc.Sprite] })
	iconsSpr: cc.Sprite[] = [];
	private tipsIndex: number = 0;
	private tipsTween: cc.Tween = null;
	private tipsList: string[] = [];

	onUILoad() {
		this.ui = this.node.addComponent(auto_gameLayer);
		UIGameLayer.instance = this;
	}

	onShow() {

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

		this.initEvent(GameEvent.SET_DOORS, this.onStageChange);
		this.initEvent(GameEvent.CLOSE_GAME, this.onCloseGame);
		this.initEvent(GameEvent.OPEN_GAME, this.onOpenGame);
		(window as any).GetGameInfo()
			.then(res => {
				console.log(res, '获取游戏信息成功')
				if (res.code == 0) {
					(window as any).currencyIcon = res.data.icon;
					(window as any).currencyName = res.data.coin;

					cc.assetManager.loadRemote((window as any).currencyIcon, (err, texture) => {
						if (err) {
							console.log(err)
							return;
						}
						console.log(texture, 'texture')
						const spriteFrame = new cc.SpriteFrame(texture as cc.Texture2D);
						spriteFrame.addRef();
						this.iconsSpr.forEach(item => {
							item.spriteFrame = spriteFrame;
						})
					});
				}

			})
			.catch(err => {
				console.log(err, '获取游戏信息失败')
			})


	}

	onHide() {

	}

	onStart() {
	}

	onCloseGame() {
		UIHelp.ShowUI(UIWeihuLayer);
	}

	onOpenGame() {
		UIHelp.CloseUI(UIWeihuLayer);
	}

	/** 切换房间类型，刷新页面 */
	resetRoomChose() {
		this.ui.toggle1.getComponent(cc.Toggle).isChecked = true;
		this.unscheduleAllCallbacks();
		this.showLastKillerAni();
	}

	showLastKillerAni() {
		const coinName = {
			zh: '金币',
			en: 'Coin'
		}
		const language = [
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
		]

		this.tipsList = [
			`快选个房间躲起来，杀手要来了`,
			`成功躲避杀手获得${GameDataCenter.roomInfoModel.coinName}奖励哦`,
			`上期杀手去了「${GameDataCenter.roomInfoModel.lastShaRoomName}」`
		];
		if (GameDataCenter.roomInfoModel.gameStage <= 2) {
			this.tipsIndex = 0;
		} else {
			this.tipsIndex = 2;
		}
		UIHelp.SetLabel(this.ui.lab_shangqi, language[this.tipsIndex][i18nMgr.getlanguage()].replace("XXX", GameDataCenter.roomInfoModel.lastShaRoomName));
		if (!this.tipsTween) {
			this.tipsTween = cc.tween(this.ui.lab_shangqi)
			this.tipsTween.repeatForever(
				cc.tween()
					.delay(2)
					.call(() => {
						UIHelp.SetLabel(this.ui.lab_shangqi, language[this.tipsIndex][i18nMgr.getlanguage()].replace("XXX", GameDataCenter.roomInfoModel.lastShaRoomName));
						if (GameDataCenter.roomInfoModel.gameStage <= 2) {
							this.tipsIndex += 1;
							if (this.tipsIndex > 2) {
								this.tipsIndex = 0;
							}
						}
					})
			).start();
		}
	}

	outGame() {
		this.node.getChildByName('nodeSetting').active = true

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
	}


	onStageChange(stage: number) {
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
	}

	/**
	 * 设置所有门的显示状态
	 * @param type 1: 开，2:关
	 */
	setDoors(type: number) {
		for (let i = 1; i <= 9; i++) {
			let aniName = type == 1 ? "open" : `guan${i}`;
			let spine: sp.Skeleton = this.ui[`men${i}`].getComponent(sp.Skeleton);
			spine.setAnimation(0, aniName, false);
		}
	}

	openAllDoors() {
		console.warn("打开所有门")
		this.scheduleOnce(() => {
			for (let i = 1; i <= 9; i++) {
				let spine: sp.Skeleton = this.ui[`men${i}`].getComponent(sp.Skeleton);
				if (spine.animation.indexOf("open") == -1) {
					spine.setAnimation(0, `open${i}`, false);
				}
			}
		}, 2);

		this.scheduleOnce(() => {
			GameDataCenter.accountModel.players.forEach(element => {
				element.moveBack();
			});
		}, 2.5);
	}

	closeAllDoors() {
		for (let i = 1; i <= 9; i++) {
			let spine: sp.Skeleton = this.ui[`men${i}`].getComponent(sp.Skeleton);
			spine.setAnimation(0, `close${i}`, false);
		}
		this.scheduleOnce(() => {
			AudioMng.getInstance().playSFX("guanmen");
		}, 0.3)
	}

	showStage3Ani() {
		this.scheduleOnce(this.closeAllDoors, GameDataCenter.roomInfoModel.waitTime - 1);
	}

	openDoor(id: number) {
		let spine: sp.Skeleton = this.ui[`men${id}`].getComponent(sp.Skeleton);
		spine.setAnimation(0, `open${id}`, false);
	}

	resetRoomId() {
		this.data.roomId = 0;
	}

	onBettingNumClick(id: number) {
		this.scheduleOnce(() => {
			this.ui.node_chose_coin.active = false;
		})
		GameDataCenter.roomInfoModel.bettingId = id;
		GameDataCenter.roomInfoModel.bettingNum = GameDataCenter.roomInfoModel[`bettingConfig${id}`];
	}

	onChoseBettingNumClick() {
		this.ui.node_chose_coin.active = !this.ui.node_chose_coin.active;
	}

	onChoseRoomClick() {
	}

	onRoomClick(id: number) {
		if (GameDataCenter.roomInfoModel.roomId == id) {
			return
		}
		GameDataCenter.roomInfoModel.roomId = id;
		GameDataCenter.socketModel.move(id);
		GameDataCenter.accountModel.myPlayer.moveToRoomById(id);
	}

	onBettingClick() {
		if (!GameDataCenter.roomInfoModel.roomId) {
			const language = {
				en: 'Choose tribe before invest',
				zh: '選擇房间後投入'
			}

			UIHelp.ShowTips(language[i18nMgr.getlanguage()]);
			return
		}
		GameDataCenter.socketModel.betting(GameDataCenter.roomInfoModel.roomId, GameDataCenter.roomInfoModel.bettingId);
	}

	onRankClick() {
		UIHelp.ShowUI(UIRankLayer);
	}

	onJiluClick() {
		UIHelp.ShowUI(UIJiluLayer);
	}

	onBettingNum1Click() {
		this.onBettingNumClick(1);
	}

	onBettingNum2Click() {
		this.onBettingNumClick(2);
	}

	onBettingNum3Click() {
		this.onBettingNumClick(3);
	}

	onRoom1Click() {
		this.onRoomClick(1);
	}
	onRoom2Click() {
		this.onRoomClick(2);
	}
	onRoom3Click() {
		this.onRoomClick(3);
	}
	onRoom4Click() {
		this.onRoomClick(4);
	}
	onRoom5Click() {
		this.onRoomClick(5);
	}
	onRoom6Click() {
		this.onRoomClick(6);
	}
	onRoom7Click() {
		this.onRoomClick(7);
	}
	onRoom8Click() {
		this.onRoomClick(8);
	}

	dropCoins(roomId: number) {
		const numCoins = 35;
		const startDelay = 0.01;
		var startPosition = this.ui[`btn_room${roomId}`].position;
		var endPosList = [];

		for (let i = 1; i <= 8; i++) {
			if (i != roomId) {
				endPosList.push(this.ui[`btn_room${i}`].position);
			}
		}

		for (let i = 0; i < numCoins; i++) {
			this.scheduleOnce(() => {
				let coin = cc.instantiate(this.coinPrefab);
				coin.setPosition(startPosition);
				this.node.addChild(coin);

				// 初始隐藏状态
				coin.opacity = 0;
				coin.scale = 0;
				let randomX = Utils.random(-65, 65); // 随机生成 x 坐标偏移量
				let randomY = Utils.random(80, 120); // 随机生成 y 坐标偏移量
				let randomY2 = Utils.random(-150, -100);
				let endX = endPosList[Math.floor(i / 5)].x;
				let endY = endPosList[Math.floor(i / 5)].y;

				// 动画序列
				let delayTime = cc.delayTime(i * startDelay);
				let showAction = cc.spawn(cc.fadeIn(0.3), cc.scaleTo(0.3, 1).easing(cc.easeBackOut()));
				let riseAction = cc.moveBy(0.5, cc.v2(randomX, randomY)).easing(cc.easeCircleActionOut());
				let fallAction = cc.moveBy(0.5, cc.v2(0, randomY2)).easing(cc.easeQuadraticActionIn());
				let rotateAction = cc.repeatForever(cc.rotateBy(1, 360)); // 持续旋转
				let delayTime2 = cc.delayTime(1 + numCoins * startDelay - i * startDelay);
				let endAction = cc.moveTo(0.5, cc.v2(endX, endY)).easing(cc.easeQuadraticActionIn());
				let removeAction = cc.removeSelf();
				let sequence = cc.sequence(delayTime, showAction, riseAction, fallAction, delayTime2, endAction, removeAction);
				coin.runAction(sequence);

				coin.runAction(rotateAction); // 添加持续旋转动作
			}, i * startDelay);
		}
	}

	onClose() {
		UIHelp.CloseUI(UIGameLayer);
	}
}