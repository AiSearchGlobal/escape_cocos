// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { i18nMgr } from "../../framework/i18n/i18nMgr";
import { AudioMng } from "../../framework/manager/AudioMng";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Settings extends cc.Component {

    @property(cc.Label)
    labEn: cc.Label = null;

    @property(cc.Label)
    labZh: cc.Label = null;

    @property(cc.Toggle)
    toggleEffect: cc.Toggle = null;

    @property(cc.Toggle)
    toggleSound: cc.Toggle = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    protected onEnable(): void {
        const effect = localStorage.getItem('effect') || '1'
        this.toggleEffect.isChecked = effect == '1'

        const sound = localStorage.getItem('sound') || '1'
        this.toggleSound.isChecked = sound == '1'

        const language = i18nMgr.getlanguage()
        this.labEn.node.active = language == 'en'
        this.labZh.node.active = language == 'zh'

        this.toggleSound.node.getChildByName('checkmark_2').active = !this.toggleSound.isChecked
        this.toggleEffect.node.getChildByName('checkmark_2').active = !this.toggleEffect.isChecked
    }

    onToggleEffect(toggle: cc.Toggle) {
        localStorage.setItem('effect', toggle.isChecked ? '1' : '0')
        toggle.node.getChildByName('checkmark_2').active = !toggle.isChecked
        AudioMng.getInstance().effectRatio = toggle.isChecked ? 1 : 0 
    }

    onToggleSound(toggle: cc.Toggle) {
        localStorage.setItem('sound', toggle.isChecked ? '1' : '0')
        toggle.node.getChildByName('checkmark_2').active = !toggle.isChecked
        AudioMng.getInstance().bgmRatio = toggle.isChecked ? 1 : 0
        if (toggle.isChecked) {
            AudioMng.getInstance().playBGM()
        }
        else {
            AudioMng.getInstance().stopBGM()
        }
    }

    onToggleLanguage(toggle: cc.Toggle) {
        const language = toggle.isChecked ? 'en' : 'zh'
        this.labEn.node.active = language == 'en'
        this.labZh.node.active = language == 'zh'
        i18nMgr.setLanguage(language)
    }

    onBtnClose() {
        this.node.active = false
    }
}
