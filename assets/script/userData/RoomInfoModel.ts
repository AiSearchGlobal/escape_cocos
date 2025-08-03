import { replaceMatchingCharacters } from "../framework/i18n/i18nLabel";
import { i18nMgr } from "../framework/i18n/i18nMgr";
import EventMng from "../framework/manager/EventMng";
import IDataModel from "../framework/model/IDataModel";
import { GameEvent } from "./EventConst";
import GameDataCenter from "./GameDataCenter";
export var ROAD_NAME = {
    1: { zh: "雜物間", en: 'Utility room' },
    2: { zh: "休息室", en: 'Rest room' },
    3: { zh: "廠長室", en: 'Director room' },
    4: { zh: "談話室", en: 'Conversation room' },
    5: { zh: "洗衣室", en: 'Laundry room' },
    6: { zh: "工作室", en: 'studio room' },
    7: { zh: "茶水間", en: 'Tea room' },
    8: { zh: "音樂室", en: 'Music room' },
}
export var ROOM_NAME = {
    1: { zh: "GSP", en: 'GSP' },
    2: { zh: "GSP", en: 'GSP' },
    3: { zh: "GSP", en: 'GSP' },
}
export default class RoomInfoModel extends IDataModel {
    public gameStage: number = 1;       //游戏状态
    public roomType: number = 1;        //房间类型
    public waitTime: number = 0;        //状态等待时间
    public coin: number = 0;            //拥有的coin
    public coin1: number = 0;           //房间1所有玩家下注的coin
    public coin2: number = 0;
    public coin3: number = 0;
    public coin4: number = 0;
    public coin5: number = 0;
    public coin6: number = 0;
    public coin7: number = 0;
    public coin8: number = 0;
    public coinName: string = "金币";
    public bettingConfig1: number = 0;
    public bettingConfig2: number = 0;
    public bettingConfig3: number = 0;
    public bettingNum: number = 0;
    public bettingId: number = 1;           //下注id：1-3
    public roomId: number = 0;              //房间id：1-8
    public minPlayerNum: number = 0;        //等待状态当前人数
    public maxPlayerNum: number = 0;        //等待状态所需最大人数
    // public killRoomName: string = "工具房";  //被杀房间名字
    public killRoomId: number = undefined;
    public coinGuafenNum: number = 0;       //所有人瓜分的coin数量
    public resultType: number = 0;          //游戏结束显示的类型
    public gameNo: number = 0;              //当前期数
    public lastShaRoomId: number = undefined
    // public lastShaRoomName: string = "";    //上期被杀房间名字
    public bettingCoin: number = 0;         //下注coin数量
    public winCoin: number = 0;             //获得coin数量

    public get killRoomName() {
        if (ROAD_NAME[this.killRoomId]) {
            return ROAD_NAME[this.killRoomId][i18nMgr.getlanguage()]
        }

        return ''
    }

    public get lastShaRoomName() {
        if (ROAD_NAME[this.lastShaRoomId]) {
            return ROAD_NAME[this.lastShaRoomId][i18nMgr.getlanguage()]
        }
        return ''
    }

    constructor() {
        super('roomInfo');
    }

    initData(res: any) {
        this.roomType = res.room_type;
        this.minPlayerNum = res.betting_num;
        this.maxPlayerNum = res.total_num;
        this.gameNo = res.game_no;
        // this.lastShaRoomName = ROAD_NAME[res.last_shaid][i18nMgr.getlanguage()] || "";
        this.lastShaRoomId = res.last_shaid
        this.changeRoomStage(res);
        this.setRoomName(res.room_type);
    }

    /** 改变房间状态
     * 阶段1 等待阶段 满人即开局
     * 阶段2 等待杀手阶段
     * 阶段3 杀手准备出现阶段
     * 阶段4 杀手出现阶段
     * 阶段5 游戏结果阶段
     */
    changeRoomStage(res: any) {
        this.gameStage = res.game_stage;
        this.waitTime = res.wait_time;
        console.warn("game_stage:  ", this.gameStage);
    }

    /** 初始化金币/钻石消耗数量 */
    initBettingConf(res: any) {
        this.bettingConfig1 = this.bettingNum = res[0]?.coin || 0.2;
        this.bettingConfig2 = res[1]?.coin || 0.2;
        this.bettingConfig3 = res[2]?.coin || 0.2;
        this.bettingId = 1;
    }

    /** vm刷新房间下注的金币/钻石 */
    initRoomsCoin(rooms: { roomid: number, total: number }[], isScale: boolean) {
        if (isScale) {
            EventMng.emit(GameEvent.COIN_SCALE, rooms);
        }

        for (let index of rooms) {
            this[`coin${index.roomid}`] = index.total;
        }
    }

    setCoin(user: any) {
        if (user.uid == GameDataCenter.accountModel.uid) {
            this.coin = user.coin;
        }
    }

    setKillResult(data: any) {
        // const language = i18nMgr.getlanguage()
        // this.killRoomName = ROAD_NAME[data.shaid][language];
        // this.lastShaRoomName = ROAD_NAME[data.shaid][language];
        this.lastShaRoomId = data.shaid
        this.killRoomId = data.shaid
        this.coinGuafenNum = data.sha_total;
        this.bettingCoin = data.betting_coin;
        this.winCoin = data.win_coin;
        if (data.tp == "over") {
            //没下注
            if (this.roomId == 0) {
                //没进房间
                this.resultType = 2;
            } else if (this.roomId == data.shaid) {
                //输
                this.resultType = 1;
            } else {
                //赢
                this.resultType = 3;
            }
        } else if (data.tp == "win") {
            //已下注，赢
            this.resultType = 4;
        } else if (data.tp == "lose") {
            //已下注，输
            this.resultType = 1;
        }
    }

    /** 设置房间名 */
    private setRoomName(id: number) {
        this.coinName = replaceMatchingCharacters(ROOM_NAME[id][i18nMgr.getlanguage()], 'GSP', (window as any).currencyName);
    }
}