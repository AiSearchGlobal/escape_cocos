import auto_jiluItem2 from "../../../data/autoui/prefab/auto_jiluItem2";
import { Holder } from "../../../framework/adapter/abstract/Holder";
import { i18nMgr } from "../../../framework/i18n/i18nMgr";
import { i18nSprite } from "../../../framework/i18n/i18nSprite";
import UIBase from "../../../framework/ui/UIBase";
import UIHelp from "../../../framework/ui/UIHelp";
import { IChatModel } from "./JiluAdapter";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/prefab/UIJiluItem2")
export default class UIJiluItem2 extends UIBase {
	ui: auto_jiluItem2 = null;

	protected static prefabUrl = "jiluItem2";
	protected static className = "UIJiluItem2";

	@property({type: [cc.SpriteFrame]})
	roomNameSprList: cc.SpriteFrame[] = [];

	public static instance: UIJiluItem2 = null;

	onUILoad() {
		this.ui = this.node.addComponent(auto_jiluItem2);
		UIJiluItem2.instance = this;
	}

	onShow() {

	}

	onHide() {

	}

	onStart() {

	}

	show(holder: Holder) {
		const language = {
			en: 'Round',
			zh: '期數'
		}[i18nMgr.getlanguage()]


        for(let i = 0; i < 10; i++){
			let index = holder.data.list[i];
			let labQi = this.ui[`lab_qi_${i + 1}`];
			let spr = this.ui[`room_name_${i + 1}`];
			if(index){
				labQi.active = true;
				spr.active = true;
				UIHelp.SetLabel(labQi, language + index.game_no);
				// spr.getComponent(cc.Sprite).spriteFrame = this.roomNameSprList[Number(index.shaid) - 1];
				spr.getComponent(i18nSprite).i18n_string = 'room_name_' + Number(index.shaid);
			}else{
				labQi.active = false;
				spr.active = false;
			}
		}
    }
    hide() {
    }

	onClose() {
		UIHelp.CloseUI(UIJiluItem2);
	}
}