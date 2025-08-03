// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    labelPercent: cc.Label = null;

    @property(cc.ProgressBar)
    progPercent: cc.ProgressBar = null

    start () {
        cc.view.enableAutoFullScreen(false)
        this.labelPercent.string = '0%'
        this.progPercent.progress = 0;
        (window as any).GetGameInfo()
		.then(res => {
			console.log(res, '获取游戏信息成功')
			if (res.code == 0) {
				(window as any).currencyIcon = res.data.icon;
				(window as any).currencyName = res.data.coin;

				cc.director.preloadScene("game", (completeNum: number, totalNum: number) => {
                    const percent = completeNum / totalNum * 80
                    const progress = Math.ceil(Math.max(this.progPercent.progress * 100, percent))
                    this.labelPercent.string = progress + '%'
                    this.progPercent.progress = progress / 100
                }, () => {
                    cc.tween({num: 80})
                    .to(0.5, {num: 100}, {
                        progress: (parm1, parm2, param3, t) => {
                            this.labelPercent.string = Math.ceil(param3) + '%'
                            this.progPercent.progress = param3 / 100
                            return (parm2 - parm1) * t + parm1
                        }
                    }).call(() => {
                        cc.director.loadScene('game', (err, scene) => {
                            // cc.director.runScene(scene)
                        })
                    })
                    .start()
                })
			}

		})
		.catch(err => {
			console.log(err, '获取游戏信息失败')
		})
        

        // cc.loader.loadResDir('sounds', cc.AudioClip, (err) => {
        //     if (!err) {
        //         cc.tween({num: 0})
        //         .to(1.0, {
        //             num: 30
        //         }, {
                    
        //         })
        //     }
        // })
    }

    // update (dt) {}
}
