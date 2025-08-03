import auto_rankLayer from "../../../data/autoui/prefab/auto_rankLayer";
import UIBase from "../../../framework/ui/UIBase";
import UIHelp from "../../../framework/ui/UIHelp";
import GameDataCenter from "../../../userData/GameDataCenter";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/prefab/UIRankLayer")
export default class UIRankLayer extends UIBase {
	ui: auto_rankLayer = null;

	protected static prefabUrl = "rankLayer";
	protected static className = "UIRankLayer";

	public static instance: UIRankLayer = null;
	@property({ type: [cc.Sprite] })
	iconsSpr: cc.Sprite[] = [];
	onUILoad() {
		this.ui = this.node.addComponent(auto_rankLayer);
		UIRankLayer.instance = this;
		UIHelp.SetSpriteFrame(this.ui.touxiangshiyi, GameDataCenter.accountModel.avatar);
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

	onShow() {
		this.onRegisterEvent(this.ui.btn_back, this.onClose);
	}

	onHide() {

	}

	onStart() {

	}

	onClose() {
		UIHelp.CloseUI(UIRankLayer);
	}
}