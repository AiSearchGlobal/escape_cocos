import { Holder } from "../../../framework/adapter/abstract/Holder";
import { i18nMgr } from "../../../framework/i18n/i18nMgr";
import EventMng from "../../../framework/manager/EventMng";
import UIHelp from "../../../framework/ui/UIHelp";
import { GameEvent } from "../../../userData/EventConst";
import GameDataCenter from "../../../userData/GameDataCenter";
import RoomInfoModel from "../../../userData/RoomInfoModel";

const { ccclass, menu, property } = cc._decorator;
@ccclass
@menu("UI/prefab/RankPart2")
export class RankPart2 extends cc.Component{
    @property(cc.Node) labCoinName: cc.Node = null;
    show(holder: Holder) {
        EventMng.emit(GameEvent.RANK_PAGE_1, holder.data.data.thisWeekRank);
        EventMng.emit(GameEvent.RANK_PAGE_2, holder.data.data.lastWeekRank);
    }

    hide() {
    }

    protected start(): void {
        // const coinName = {
		// 	zh: '金幣',
		// 	en: 'Coin'
		// }
        // const language = {
        //     en: 'Bonus' + GameDataCenter.roomInfoModel.coinName,
        //     zh: '獎勵' + GameDataCenter.roomInfoModel.coinName
        // }
        // UIHelp.SetLabel(this.labCoinName,  language[i18nMgr.getlanguage()]);
    }
}