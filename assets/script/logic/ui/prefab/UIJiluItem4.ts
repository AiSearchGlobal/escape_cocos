import auto_jiluItem4 from "../../../data/autoui/prefab/auto_jiluItem4";
import { Holder } from "../../../framework/adapter/abstract/Holder";
import { replaceMatchingCharacters } from "../../../framework/i18n/i18nLabel";
import { i18nMgr } from "../../../framework/i18n/i18nMgr";
import UIBase from "../../../framework/ui/UIBase";
import UIHelp from "../../../framework/ui/UIHelp";
import { ROAD_NAME, ROOM_NAME } from "../../../userData/RoomInfoModel";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/prefab/UIJiluItem4")
export default class UIJiluItem4 extends UIBase {
	ui: auto_jiluItem4 = null;

	protected static prefabUrl = "jiluItem4";
	protected static className = "UIJiluItem4";

	public static instance: UIJiluItem4 = null;

	onUILoad() {
		this.ui = this.node.addComponent(auto_jiluItem4);
		UIJiluItem4.instance = this;
	}

	onShow() {

	}

	onHide() {

	}

	onStart() {

	}

	show(holder: Holder) {
		const language = {
			Round: {
				en: 'Round',
				zh: '期數'
			},
			Stake: {
				en: 'Stake',
				zh: '投入'
			},
			Obtain: {
				en: 'Obtain',
				zh: '獲得'
			},
			Loss: {
				en: 'Loss',
				zh: '損失'
			}
		}

		var user = holder.data.user;
		var isWin = user.result_type == "win";
		UIHelp.SetLabel(this.ui.lab_qi, language.Round[i18nMgr.getlanguage()] + `${user.game_no}  ${user.created_at}`);
		UIHelp.SetLabel(this.ui.lab_choose_room, `「${ROAD_NAME[user.roomid][i18nMgr.getlanguage()]}」`);
		UIHelp.SetLabel(this.ui.lba_kill_room, `「${ROAD_NAME[user.shaid][i18nMgr.getlanguage()]}」`);
		UIHelp.SetLabel(this.ui.lab_touru_num, user.betting_coin);
		UIHelp.SetLabel(this.ui.lab_huode_num, user.result_coin);
		UIHelp.SetLabel(this.ui.lab_touru_name, language.Stake[i18nMgr.getlanguage()] + `${replaceMatchingCharacters(ROOM_NAME[user.room_type][i18nMgr.getlanguage()], 'GSP', (window as any).currencyName)}`);
		UIHelp.SetLabel(this.ui.lab_huode_name, isWin ? language.Obtain[i18nMgr.getlanguage()] + `${replaceMatchingCharacters(ROOM_NAME[user.room_type][i18nMgr.getlanguage()], 'GSP', (window as any).currencyName)}` : language.Loss[i18nMgr.getlanguage()] + `${replaceMatchingCharacters(ROOM_NAME[user.room_type][i18nMgr.getlanguage()], 'GSP', (window as any).currencyName)}`);
		this.ui.lab_win.active = isWin ? true : false;
		this.ui.lab_lose.active = isWin ? false : true;
	}
	hide() {
	}

	onClose() {
		UIHelp.CloseUI(UIJiluItem4);
	}
}