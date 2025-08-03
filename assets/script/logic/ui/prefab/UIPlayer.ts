import auto_player from "../../../data/autoui/prefab/auto_player";
import UIBase from "../../../framework/ui/UIBase";
import UIHelp from "../../../framework/ui/UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/prefab/UIPlayer")
export default class UIPlayer extends UIBase {
	ui: auto_player = null;

	protected static prefabUrl = "player";
	protected static className = "UIPlayer";

	public static instance: UIPlayer = null;

	@property({ type: cc.SpriteAtlas })
	playerAtlas: cc.SpriteAtlas = null;

	@property({ type: [cc.Sprite] })
	iconsSpr: cc.Sprite[] = [];
	private speed: number = 200;
	private speed1: number = 200;
	private speed2: number = 300;
	private animation: cc.Animation;
	private isMoving: boolean = false;
	private bettingCoin: number = 0;

	onUILoad() {
		this.ui = this.node.addComponent(auto_player);
		UIPlayer.instance = this;
	}

	onShow() {
		this.bettingCoin = 0;
	}

	onHide() {

	}

	onStart() {
	}

	initAni(rankNo: number) {

		this.ui = this.node.addComponent(auto_player);
		UIPlayer.instance = this;
		this.animation = this.ui.img_cat.getComponent(cc.Animation);
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

	/**
	 * 创建动画帧
	 * @param {*} name 动画名字
	 * @param {*} WrapMode 动画循环模式（单次循环）
	 */
	creatorAnimation(picName: string, length: number, name: string, WrapMode = cc.WrapMode.Loop) {
		let showTip = [];
		for (let i = 0; i <= length; i++) {
			//获取动画集合下的第一个动画plist文件，并以动画名称依次播放
			let frame = this.playerAtlas.getSpriteFrame(`${picName}_${i}`);
			if (frame) {
				showTip.push(frame); //添加动画帧到数组
			}
		}
		//创建一组动画剪辑
		let clip = cc.AnimationClip.createWithSpriteFrames(showTip, showTip.length);
		clip.wrapMode = WrapMode;//设置播放模式
		clip.name = name;//设置名字
		this.animation.addClip(clip);//添加动画帧到动画组件中
	}

	showBetting(bettingCoin: number) {
		this.bettingCoin = bettingCoin;
		if (this.isMoving) {
			return
		}

		this.ui.img_bubble.active = bettingCoin > 0;
		UIHelp.SetLabel(this.ui.lab_coin, bettingCoin);
	}

	hideBetting() {
		this.ui.img_bubble.active = false;
	}

	playWalk() {
		this.isMoving = true;
		this.animation.play("walk");
		this.hideBetting();
	}

	playWait() {
		this.isMoving = false;
		this.animation.play("wait");
		this.showBetting(this.bettingCoin);
	}

	flashToRoomById(pos: any) {
		this.node.stopAllActions();
		this.node.setPosition(pos);
	}

	move(list: any[], isBack: boolean) {
		if (list.length <= 0) {
			if (isBack) {
				this.bettingCoin = 0;
			}
			this.playWait();
			return
		}

		this.speed = isBack ? this.speed2 : this.speed1;
		this.ui.img_cat.scaleX = this.node.x > list[0].x ? -1 : 1;
		var dis = this.getDistance(this.node.position, list[0]);
		var t = dis / this.speed;
		cc.tween(this.node)
			.to(t, { position: list[0] })
			.call(() => {
				list.splice(0, 1);
				this.move(list, isBack);
			})
			.start();
	}

	// 距离
	getDistance(start, end) {
		var pos = cc.v2(start.x - end.x, start.y - end.y);
		var dis = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
		return dis;
	}

	onClose() {
		UIHelp.CloseUI(UIPlayer);
	}
}
