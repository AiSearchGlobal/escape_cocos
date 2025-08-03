import EventMng from "../framework/manager/EventMng";
import IDataModel from "../framework/model/IDataModel";
import UIHelp from "../framework/ui/UIHelp";
import UIGameLayer from "../logic/ui/prefab/UIGameLayer";
import UIKiller from "../logic/ui/prefab/UIKiller";
import UIGame from "../logic/ui/scene/UIGame";
import { Log } from "../utils/Log";
import { GameEvent } from "./EventConst";
import GameDataCenter from "./GameDataCenter";
import PlayerModel from "./PlayerModel";

export default class SocketModel extends IDataModel {
    constructor() {
        super('SocketModel');
    }

    /**需要重写 */
    getMessageListeners() {
        return {
            // key为消息名，value为触发函数
            ['game_login']: (msg) => { this.socket_login(msg) },
            ['game_move']: (msg) => { this.socket_move(msg) },
            ['game_roominfo']: (msg) => { this.socket_roominfo(msg) },
            ['game_stage']: (msg) => { this.socket_stage(msg) },
            ['game_betting']: (msg) => { this.socket_betting(msg) },
            ['game_leave']: (msg) => { this.socket_leave(msg) },
            ['game_join']: (msg) => { this.socket_join(msg) },
            ['game_userlist']: (msg) => { this.socket_userlist(msg) },
            ['game_bettinglist']: (msg) => { this.socket_bettinglist(msg) },
            ['game_sync_status']: (msg) => { this.socket_sync_status(msg) },
            ['game_close']: (msg) => { this.socket_close(msg) },

        }
    }

    //登录
    login(){
        this.sendSocketMsg("game", "login", {jwt: GameDataCenter.accountModel.jwt})
    }

    /** 加入房间 */
    joinRoom(room_type: number){
        this.sendSocketMsg("game", "joinroom", {room_type: room_type});
    }

    /**
     * 移动到某一房间
     * @param roomId
     */
    move(roomId: number){
        this.sendSocketMsg("game", "move", {roomid: roomId})
    }

    /**
     * 下注
     * @param roomId 房间id
     * @param id 下注id
     */
    betting(roomId: number, id: number){
        this.sendSocketMsg("game", "betting", {roomid: roomId, id: id})
    }

    socket_login(msg){
        Log.warn("长链接登录成功");
        var accountModel = GameDataCenter.accountModel;
        var data = msg.data.user;
        accountModel.avatar = data.avatar;
        accountModel.nickName = data.nickname;
        accountModel.uid = data.id;
        accountModel.status = data.status;
        this.joinRoom(1);
    }

    //进入游戏会执行一次
    socket_roominfo(msg){
        GameDataCenter.accountModel.players.forEach(player => {
            player.destroy();
        });
        
        var data = msg.data;
        GameDataCenter.roomInfoModel.roomId = data.betting_roomid;
        GameDataCenter.roomInfoModel.initData(data.roominfo);
        GameDataCenter.roomInfoModel.initRoomsCoin(data.rooms, false);
        GameDataCenter.roomInfoModel.initBettingConf(data.betting_config);
        GameDataCenter.roomInfoModel.setCoin(msg.data.user);
        EventMng.emit(GameEvent.SET_DOORS, data.roominfo.game_stage);
        UIGameLayer.instance.showLastKillerAni();
    }

    socket_move(msg){
        var data = msg.data;
        GameDataCenter.roomInfoModel.initRoomsCoin(data.rooms, true);

        if(data.betting.uid != GameDataCenter.accountModel.uid){
            GameDataCenter.accountModel.players.get(data.betting.uid).moveToRoomById(data.betting.roomid);
        }
    }

    socket_stage(msg){
        var data = msg.data;

        var game_stage: number = data.game_stage;

        GameDataCenter.roomInfoModel.changeRoomStage(data);
        UIGameLayer.instance.showLastKillerAni();

        switch (game_stage) {
            case 1:
                EventMng.emit(GameEvent.OPEN_GAME);
                GameDataCenter.roomInfoModel.roomId = data.betting_roomid;
                GameDataCenter.roomInfoModel.initData(data.roominfo);
                GameDataCenter.roomInfoModel.initRoomsCoin(data.rooms, false);
                GameDataCenter.roomInfoModel.initBettingConf(data.betting_config);
                break;
            case 3:
                UIGame.instance.showStage3Ani();
                UIGameLayer.instance.showStage3Ani();
                break;
            case 4:
                UIKiller.instance.kill(data.shaid);
                break;
            case 5:
                GameDataCenter.roomInfoModel.setKillResult(data);
                GameDataCenter.roomInfoModel.setCoin(data.user);
                UIGame.instance.showStage5Ani();
                break;
            default:
                break;
        }
    }

    socket_betting(msg){
        var data = msg.data;
        var betting = data.betting;
        var player = GameDataCenter.accountModel.players.get(betting.uid);

        if(betting.uid != GameDataCenter.accountModel.uid){
            player.moveToRoomById(betting.roomid);
        }else{
            player.showBetting(betting.coin);
        }

        GameDataCenter.roomInfoModel.minPlayerNum = data.betting_num;
        GameDataCenter.roomInfoModel.maxPlayerNum = data.total_num;

        GameDataCenter.roomInfoModel.initRoomsCoin(data.rooms, true);
        GameDataCenter.roomInfoModel.setCoin(msg.data.user);
    }

    socket_leave(msg){
        var data = msg.data;
        var player = GameDataCenter.accountModel.players.get(data.uid);
        player?.destroy();
    }

    socket_join(msg){
        var data = msg.data;
        if(data.is_betting){
            return
        }

        this.createPlayer(data.user, 0);
    }

    //没选择房间的玩家
    socket_userlist(msg){
        var data = msg.data;
        var userlist = data.userlist;

        for(let index of userlist){
            this.createPlayer(index, 0);
        }
    }

    //选择房间的玩家
    socket_bettinglist(msg){
        var data = msg.data;
        var bettinglist = data.bettinglist;

        for(let i in bettinglist){
            let index = bettinglist[i];
            this.createPlayer(index, index.roomid);
            if(index.uid == GameDataCenter.accountModel.uid){
                GameDataCenter.roomInfoModel.roomId = index.roomid;
                var player = GameDataCenter.accountModel.players.get(index.uid);
                player.showBetting(index.coin);//
            }
        }
    }

    socket_sync_status(msg){
        var data = msg.data;
        GameDataCenter.roomChoseModel.initData(data.room_status);
    }

    socket_close(msg){
        EventMng.emit(GameEvent.CLOSE_GAME);
    }

    private createPlayer(user: any, roomId: number){
        if(GameDataCenter.accountModel.players.get(user.uid)){
            return
        }

        let player = new PlayerModel();
        player.initData(user);
        if(GameDataCenter.accountModel.players.size <= 60){
            player.loadPlayerAni(roomId);
        }
        GameDataCenter.accountModel.players.set(user.uid, player);
    }
}