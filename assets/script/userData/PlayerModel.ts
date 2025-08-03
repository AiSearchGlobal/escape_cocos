import { i18nMgr } from "../framework/i18n/i18nMgr";
import { PoolMng } from "../framework/manager/PoolMng";
import IDataModel from "../framework/model/IDataModel";
import UIHelp from "../framework/ui/UIHelp";
import UIGameLayer from "../logic/ui/prefab/UIGameLayer";
import UIPlayer from "../logic/ui/prefab/UIPlayer";
import UIPlayerName from "../logic/ui/prefab/UIPlayerName";
import GameDataCenter from "./GameDataCenter";
export var ROADS = {
    1: [1, 3, 4, 1111],
    2: [1, 3, 9, 2222],
    3: [1, 3, 3333],
    4: [1, 3, 4, 4444],
    5: [1, 2, 5, 5555],
    6: [1, 2, 6666],
    7: [1, 2, 6, 7777],
    8: [1, 2, 7, 8888],
}

export var KILLER_ROADS = {
    1: [12, 11, 3, 4],
    2: [12, 11, 3, 9],
    3: [12, 11, 2, 3],
    4: [12, 11, 3, 4],
    5: [12, 11, 2, 5],
    6: [12, 11, 10, 2],
    7: [12, 11, 2, 6],
    8: [12, 11, 2, 7],
}
export default class PlayerModel extends IDataModel {
    public avatar: string = "";
    public coin: number = 0;
    public nickname: string = "";
    public uid: number = 0;
    public node: cc.Node = null;
    public nodeName: cc.Node = null;
    public roomId: number = 0;
    public rankNo: number = 0;
    public isMySelf: boolean = false;

    constructor() {
        super('player');
    }

    destroy(){
        if(this.node){
            this.node.stopAllActions();
            PoolMng.instance.putNode(this.node);
            this.nodeName.stopAllActions();
            PoolMng.instance.putNode(this.nodeName);
        }
        GameDataCenter.accountModel.players.delete(this.uid);
    }

    initData(res){
        const language = {
            zh: '自己',
            en: 'Myself'
        }

        this.avatar = res.avatar;
        this.coin = res.coin;
        this.isMySelf = res.uid == GameDataCenter.accountModel.uid ? true : false;
        this.nickname = this.isMySelf ? language[i18nMgr.getlanguage()] : res.nickname;
        this.uid = res.uid;
        if(this.isMySelf){
            if(res.rank_no == 0){
                this.rankNo = -1;
            }else{
                this.rankNo = res.rank_no;
            }
        }else{
            this.rankNo = res.rank_no;
        }
    }

    showBetting(bettingCoin: number){
        if(!this.node){
            return
        }
        this.node.getComponent(UIPlayer)?.showBetting(bettingCoin);
    }

    /** 加载并显示人物 */
    loadPlayerAni(roomId: number){
        this.roomId = roomId;
		var nodePlayer = this.node = PoolMng.instance.getNode(UIGameLayer.instance.playerPrefab, this.isMySelf ? UIGameLayer.instance.ui.node_player_my : UIGameLayer.instance.ui.node_player);
        var nodePlayerName = this.nodeName = PoolMng.instance.getNode(UIGameLayer.instance.playerNamePrefab, this.isMySelf ? UIGameLayer.instance.ui.node_player_name_my : UIGameLayer.instance.ui.node_player_name);
		var pos = this.isMySelf ? UIHelp.getRadomPos(UIGameLayer.instance.ui[`room${roomId * 100}`]) : UIHelp.getRadomPos(UIGameLayer.instance.ui[`room${roomId}`]);
        nodePlayer.setPosition(pos);
        nodePlayer.getComponent(UIPlayer)?.initAni(this.rankNo);
        nodePlayerName.setPosition(pos);
        nodePlayerName.getComponent(UIPlayerName)?.setName(this.nickname);
	}

    /** 移动到某一房间 */
    moveToRoomById(roomId: number){
        if(!this.node){
            return
        }
        if(this.roomId == 0){
            this.roomId = roomId;

            var list = [];
            for(let index of ROADS[roomId]){
                let node: cc.Node = UIGameLayer.instance.ui[`pos${index}`];
                list.push(node.position);
            }

            if(this.isMySelf){
                list.push(UIHelp.getRadomPos(UIGameLayer.instance.ui[`room${roomId * 100}`]));
            }else{
                list.push(UIHelp.getRadomPos(UIGameLayer.instance.ui[`room${roomId}`]));
            }

            this.node.getComponent(UIPlayer)?.playWalk();
            this.node.getComponent(UIPlayer)?.move([].concat(list), false);
            this.nodeName.getComponent(UIPlayerName)?.move([].concat(list), false);
        }else{
            this.roomId = roomId;
            this.node.getComponent(UIPlayer)?.playWait();
            var pos = UIHelp.getRadomPos(UIGameLayer.instance.ui[`room${roomId * 100}`]);
            this.node.getComponent(UIPlayer)?.flashToRoomById(pos);
            this.nodeName.getComponent(UIPlayerName)?.flashToRoomById(pos);
        }
    }

    /** 从某一房间回到初始位置 */
    moveBack(){
        if(!this.node){
            return
        }
        if(this.roomId == 0){
			return
		}

		var list = [];
		for(let index of ROADS[this.roomId]){
			let node: cc.Node = UIGameLayer.instance.ui[`pos${index}`];
			list.push(node.position);
		}
		list.reverse();
		list.push(UIHelp.getRadomPos(UIGameLayer.instance.ui[`room0`]));
        this.node.getComponent(UIPlayer)?.playWalk();
        this.node.getComponent(UIPlayer)?.move([].concat(list), true);
        this.nodeName.getComponent(UIPlayerName)?.move([].concat(list), true);
        this.roomId = 0;
        UIGameLayer.instance.resetRoomId();
    }

    //同步
    demoXXX1(): Promise<any> {
        var params = {
        }

        return new Promise((resolve, reject) => {
            this.sendHttpMsg("index", params, function (res) {
                let data = res.data;
                resolve(data);
            }.bind(this))
        });
    }
}