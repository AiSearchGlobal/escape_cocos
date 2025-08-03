import auto_jiluItem3 from "../../../data/autoui/prefab/auto_jiluItem3";
import { Holder } from "../../../framework/adapter/abstract/Holder";
import UIBase from "../../../framework/ui/UIBase";
import UIHelp from "../../../framework/ui/UIHelp";
import GameDataCenter from "../../../userData/GameDataCenter";
import { IChatModel } from "./JiluAdapter";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/prefab/UIJiluItem3")
export default class UIJiluItem3 extends UIBase {
	ui: auto_jiluItem3 = null;

	protected static prefabUrl = "jiluItem3";
	protected static className = "UIJiluItem3";

	public static instance: UIJiluItem3 = null;
	@property({ type: [cc.Sprite] })
	iconsSpr: cc.Sprite[] = [];
	onUILoad() {
		this.ui = this.node.addComponent(auto_jiluItem3);
		UIJiluItem3.instance = this;
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

	}

	onHide() {

	}

	onStart() {

	}

	show(holder: Holder) {
		var roomType = GameDataCenter.roomInfoModel.roomType;
		// this.ui.coin_1_1.active = roomType == 1;
		// this.ui.coin_1_2.active = roomType == 2;
		// this.ui.coin_1_3.active = roomType == 3;
		// this.ui.coin_2_1.active = roomType == 1;
		// this.ui.coin_2_2.active = roomType == 2;
		// this.ui.coin_2_3.active = roomType == 3;
		UIHelp.SetLabel(this.ui.lab_touru_num, holder.data.betting_total);
		UIHelp.SetLabel(this.ui.lab_huode_num, holder.data.result_total);
    }
    hide() {
    }

	onClose() {
		UIHelp.CloseUI(UIJiluItem3);
	}
}