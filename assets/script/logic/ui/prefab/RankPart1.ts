import { Holder } from "../../../framework/adapter/abstract/Holder";
import { i18nMgr } from "../../../framework/i18n/i18nMgr";

const { ccclass, menu, property } = cc._decorator;
@ccclass
@menu("UI/prefab/RankPart1")
export class RankPart1 extends cc.Component{
    @property(cc.Label) labMian1: cc.Label = null;
    @property(cc.Label) labMian2: cc.Label = null;
    @property(cc.Label) labMian3: cc.Label = null;
    @property(cc.Label) labDes: cc.Label = null;

    show(holder: Holder) {
        const language = {
            mianshang: {
                en: 'Loss Reduction ',
                zh: '減損'
            },
            desc: {
                en: 'Reward outfits with Up to Loss Reduction',
                zh: '獎勵減損裝扮，最高減損'
            }
        }
        var mian = holder.data.data;
        this.labMian1.string = language.mianshang[i18nMgr.getlanguage()] + `${mian.mian_top1}`;
        this.labMian2.string = language.mianshang[i18nMgr.getlanguage()] + `${mian.mian_top2}`;
        this.labMian3.string = language.mianshang[i18nMgr.getlanguage()] + `${mian.mian_top3}`;
        this.labDes.string = language.desc[i18nMgr.getlanguage()] + `${mian.mian_top1}`;
    }

    hide() {
    }
}