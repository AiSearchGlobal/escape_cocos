// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

 

    @property({ type: [cc.Sprite] })
	iconsSpr: cc.Sprite[] = [];
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
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

    // update (dt) {}
}
