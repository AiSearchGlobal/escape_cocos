import { i18nMgr } from "../framework/i18n/i18nMgr";
import IDataModel from "../framework/model/IDataModel";
import GameDataCenter from "./GameDataCenter";
import PlayerModel from "./PlayerModel";

export default class AccountModel extends IDataModel {
    public avatar: string = "";
    public nickName: string = "";
    public uid: number = 0;
    public status: number = 0;
    public players: Map<number, PlayerModel> = new Map();
    public noMoreJilu: boolean = false;
    public myRankNo: string = "";           //vm显示排行榜自己排名
    public lastRankNo: string = "";
    public thisRankNo: string = "";
    public myRankNum: string = "";           //vm显示排行榜自己金币
    public lastRankNum: string = "";
    public thisRankNum: string = "";
    public jwt: string = "";

    constructor() {
        super('account');
    }

    // public get jwt() : string {
    //     return this.Query("jwt", "");
    // }

    // public set jwt(v : string) {
    //     this.Set("jwt", v);
    //     this.Save();
    // }

    //登录
    login(token: string, company_code: string): Promise<any> {
        var params = {
            token: token,

            company_code: company_code,
            // user_id: '1007'
        }

        return new Promise((resolve, reject) => {
            this.postHttpMsg("game/v1/login", params, function (res) {
                let data = res.data;
                console.log(data, '登录数据')
                resolve(data);
            }.bind(this))
        });
    }

    //获取记录
    getGameLog(): Promise<any> {
        var params = {
            room_type: GameDataCenter.roomInfoModel.roomType
        }

        return new Promise((resolve, reject) => {
            this.postHttpMsg("game/v1/getGameLog", params, function (res) {
                let data = res.data;

                var item1 = {
                    type: 1,
                    list: data.sha_100_list
                };

                var item2 = {
                    type: 2,
                    list: data.sha_list
                };

                var item3 = {
                    type: 3,
                    betting_total: data.betting_total,
                    result_total: data.result_total,
                };
                resolve([item1, item2, item3]);
            }.bind(this))
        });
    }

    //下注记录
    getBettingLog(page: number): Promise<any> {
        var params = {
            room_type: GameDataCenter.roomInfoModel.roomType,
            page: page,
            limit: 20
        }

        return new Promise((resolve, reject) => {
            if (this.noMoreJilu) {
                resolve([]);
                return
            }
            this.postHttpMsg("game/v1/getbettinglog", params, function (res) {
                let data = res.data;
                let list = [];
                for (let index of data.list) {
                    let item = {
                        type: 4,
                        user: index
                    }
                    list.push(item);
                }

                if (list.length < 20) {
                    if (!this.noMoreJilu) {
                        this.noMoreJilu = true;
                        list.push({ type: 5 });
                    }
                }
                resolve(list);
            }.bind(this))
        });
    }

    //获得排行榜数据
    getRank(): Promise<any> {
        var params = {
            room_type: GameDataCenter.roomInfoModel.roomType
        }

        const language = {
            zh: '未上榜',
            en: 'Not Ranked'
        }

        return new Promise((resolve, reject) => {
            this.postHttpMsg("game/v1/getRank", params, (res) => {
                const l = language[i18nMgr.getlanguage()]
                let data = res.data;
                this.lastRankNum = data.last_rank_num;
                this.myRankNum = this.thisRankNum = data.this_rank_num;
                this.lastRankNo = data.last_rank_no == 0 ? l : String(data.last_rank_no);
                this.myRankNo = this.thisRankNo = data.this_rank_no == 0 ? l : String(data.this_rank_no);

                resolve(data);
            })
        });
    }

    public get myPlayer(): PlayerModel {
        return this.players.get(this.uid);
    }
}