import GameController from "../../../GameController";
import auto_game from "../../../data/autoui/scene/auto_game";
import { AudioMng } from "../../../framework/manager/AudioMng";
import UIBase from "../../../framework/ui/UIBase";
import UIHelp from "../../../framework/ui/UIHelp";
import { ConfigModule } from "../../../userData/ConfigModule";
import GameDataCenter from "../../../userData/GameDataCenter";
import { Utils } from "../../../utils/Utils";
import UIGameLayer from "../prefab/UIGameLayer";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/scene/UIGame")
export default class UIGame extends UIBase {
	ui: auto_game = null;

	protected static prefabUrl = "";
	protected static className = "UIGame";

	public static instance: UIGame = null;

	@property({ type: [cc.Sprite] })
	iconsSpr: cc.Sprite[] = [];

	@property({ type: [cc.Label] })
	currencysName: cc.Label[] = [];
	onUILoad() {
		this.ui = this.node.addComponent(auto_game);
		UIGame.instance = this;
		GameController.init();
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
				this.currencysName.forEach(item => {
					item.string = (window as any).currencyName;
				})
			}

		})
		.catch(err => {
			console.log(err, '获取游戏信息失败')
		})
	}

	onShow() {
	}

	onHide() {

	}

	async onStart() {
		AudioMng.getInstance().initBgm()
		try {
			await GameDataCenter.accountModel.login(Utils.getQueryString("token") || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjI0NTkzNSIsImV4cCI6MTc5MzUzODY3OSwiYWNjb3VudCI6IlRQSHlYY2hkcVFaaHhYSlVSZXk2d0J5UUdKd282RWVpMlgifQ.wGadx9NSFnQ7beVEYK3Za-oBV5tEbCy6pdXVTSrNdQM', Utils.getQueryString("company-code") || 'null');
			window.history.pushState({}, 'Treasure Guard', '/');
			//await GameDataCenter.accountModel.login(Utils.getQueryString("token"));
			GameController.socket.connect();
		} catch (error) {

		}

	}

	showStage3Ani() {
		this.playShashouChuxian();
	}
	showStage5Ani() {
		UIGameLayer.instance.openAllDoors();
		this.ui.stage_5.active = true;
		this.ui.VM_result.active = true;
		var resultType = GameDataCenter.roomInfoModel.resultType;
		// if(resultType == 3 || resultType == 4){
		// 	this.ui.caidai.active = true;
		// 	this.ui.caidai.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
		// 	this.ui.caidai.getComponent(sp.Skeleton).setCompleteListener(()=>{
		// 		this.ui.caidai.active = false;
		// 	})
		// }
		this.scheduleOnce(() => {
			this.ui.VM_result.active = false;
			this.ui.stage_5.active = false;
		}, 5);
	}

	playShashouChuxian() {
		this.ui.stage_3.getComponent(cc.Animation).play();
	}

	onClose() {
		UIHelp.CloseUI(UIGame);
	}
}