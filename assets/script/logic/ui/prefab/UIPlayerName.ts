import auto_playerName from "../../../data/autoui/prefab/auto_playerName";
import { i18nMgr } from "../../../framework/i18n/i18nMgr";
import UIBase from "../../../framework/ui/UIBase";
import UIHelp from "../../../framework/ui/UIHelp";
import UIGameLayer from "./UIGameLayer";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/prefab/UIPlayerName")
export default class UIPlayerName extends UIBase {
	ui: auto_playerName = null;

	protected static prefabUrl = "playerName";
	protected static className = "UIPlayerName";

	public static instance: UIPlayerName = null;

	private speed: number = 200;
	private speed1: number = 200;
	private speed2: number = 300;

	onUILoad() {
		this.ui = this.node.addComponent(auto_playerName);
		UIPlayerName.instance = this;
	}

	onShow() {

	}

	onHide() {

	}

	onStart() {

	}

	setName(nickname: string){
		const language = {
            zh: '自己',
            en: 'Myself'
        }

		this.ui.label_name_bg.active = nickname == language[i18nMgr.getlanguage()] ? true : false;
		//this.ui.lan_name.active = nickname == "自己" ? false : true;

		this.ui.lan_name.active =  false;
		UIHelp.SetLabel(this.ui.lan_name, nickname);
	}

	flashToRoomById(pos: any){
		this.node.stopAllActions();
		this.node.setPosition(pos);
	}

	move(list: any[], isBack: boolean){
		if(list.length <= 0){
			return
		}
		this.speed = isBack ? this.speed2 : this.speed1;
		var dis = this.getDistance(this.node.position, list[0]);
		var t = dis / this.speed;
		cc.tween(this.node)
		.to(t, {position: list[0]})
		.call(()=>{
			list.splice(0,1);
			this.move(list, isBack);
		})
		.start();
	}

	// 距离
	getDistance(start, end){
		var pos = cc.v2(start.x - end.x, start.y - end.y);
		var dis = Math.sqrt(pos.x*pos.x + pos.y*pos.y);
		return dis;
	}

	onClose() {
		UIHelp.CloseUI(UIPlayerName);
	}
}