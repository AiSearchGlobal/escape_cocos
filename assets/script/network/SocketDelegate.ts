import GameDataCenter from "../userData/GameDataCenter";
import EventMng from "../framework/manager/EventMng";
import UIHelp from "../framework/ui/UIHelp";
import { Websocket } from "./Websocket";
import { ConfigModule } from "../userData/ConfigModule";
import GameController from "../GameController";
import { Log, LOG_TAG } from "../utils/Log";

export class SocketDelegate {
    private url: string;
    private websocket: Websocket;

    constructor() {
        if(ConfigModule.IS_TEST){
            this.url = ConfigModule.WS_URL_TEST;        
        }else{
            this.url = ConfigModule.WS_URL_DEV;        
        }
    }
   
    public connect() {
        this.websocket = new Websocket({
            url: this.url,
            pingTimeout: 3000,
            pongTimeout: 5000,
            pingMsg: JSON.stringify({"c":"game","m":"ping","data":{}})
        });

        this.websocket.onopen = this.onopen.bind(this);
        this.websocket.onmessage = this.onmessage.bind(this);
        this.websocket.onreconnect = this.onreconnect.bind(this);
        this.websocket.onclose = this.onclose.bind(this);
        this.websocket.onerror = this.onerror.bind(this);
    }

    public send(c: string, m: string, data: any) {
        var obj: Object = {
            "c": c,
            "m": m,
            "data": data
        };

        this.websocket.send(JSON.stringify(obj))

        if (cc.sys.isNative) {
            Log.logTag(LOG_TAG.SOCKET, '%cSOCKET发送-->','color:#fff;background:red', JSON.stringify(obj))
        } else {
            Log.logTag(LOG_TAG.SOCKET, '%cSOCKET发送-->','color:#fff;background:red', obj);
        }
    }

    public close(){
        this.websocket.close();
    }

    //需要自己补充逻辑
    public toLoginScene(){
        GameController.socket.close();
        // if (cc.director.getScene().name == "hallScene") {
        //     cc.director.loadScene("loginScene");
        // }
    }

    private onopen(){
        Log.warn('connect success');
        // cc.director.resume();
        UIHelp.CloseLoding();
        GameDataCenter.socketModel.login();
    }

    private appandeMsg(data) {
        var self = this;

        if (data.m != "ping" && data.m != "pong") {
            if (cc.sys.isNative) {
                Log.logTag(LOG_TAG.SOCKET, '%cSOCKET接收-->','color:#fff;background:green',JSON.stringify(data))
            } else {
                Log.logTag(LOG_TAG.SOCKET, '%cSOCKET接收-->','color:#fff;background:green',data)
            }
        }

        data['src'] = 'tcp';

        if (data.m == "pong") {
            self.websocket.heartCheck();
        } else {
            if (data.data.errcode) {
                UIHelp.ShowTips(data['data']["errmsg"]);

                if(data.m == "login"){
                    Log.error("login失败，返回首页，清空jwt")
                    self.toLoginScene();
                    return
                }

                if (data.data.errcode == 503) {
                    //服务器维护中
                    self.toLoginScene();
                }
                   
                return
            }

            EventMng.emit(`${data.c}_${data.m}`, data.data);
        }
    }

    private onmessage(e){
        var self = this;
        if (cc.sys.isNative) {
            var a = new Uint8Array(e.data)
            let packet: Object = JSON.parse(self.Utf8ArrayToStr(a))
            self.appandeMsg(packet);
        } else {
            if(cc.sys.platform == cc.sys.WECHAT_GAME){
                var str = self.arrayBufferToString(e)
                let packet: Object = JSON.parse(str);
                self.appandeMsg(packet);
            }else{
                var fileReader = new FileReader();
                fileReader.onload = function (progressEvent) {
                    var arrayBuffer: ArrayBuffer = this.result as ArrayBuffer;//arrayBuffer即为blob对应的arrayBuffer  
                    var a = new Uint8Array(arrayBuffer)
                    let packet: Object = JSON.parse(self.Utf8ArrayToStr(a))
                    self.appandeMsg(packet);
                };
                fileReader.readAsArrayBuffer(e.data);
            }
        }
    }

    private onreconnect(){
        Log.error('reconnecting...');
        // cc.director.pause();
        UIHelp.ShowLoding();
    }

    private onclose(){
    }

    private onerror(){
    }

    private Utf8ArrayToStr(array) {
        var out, i, len, c;
        var char2, char3;

        out = "";
        len = array.length;
        i = 0;
        while (i < len) {
            c = array[i++];
            switch (c >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12: case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }

        return out;
    }

    private arrayBufferToString(arr) {
        if (typeof arr === 'string') {
            return arr;
        }
        var dataview = new DataView(arr.data);
        var ints = new Uint8Array(arr.data.byteLength);
        for (var i = 0; i < ints.length; i++) {
            ints[i] = dataview.getUint8(i);
        }
        arr = ints;
        var str = '',
            _arr = arr;
        for (var i = 0; i < _arr.length; i++) {
            var one = _arr[i].toString(2),
                v = one.match(/^1+?(?=0)/);
            if (v && one.length == 8) {
                var bytesLength = v[0].length;
                var store = _arr[i].toString(2).slice(7 - bytesLength);
                for (var st = 1; st < bytesLength; st++) {
                    store += _arr[st + i].toString(2).slice(2);
                }
                str += String.fromCharCode(parseInt(store, 2));
                i += bytesLength - 1;
            } else {
                str += String.fromCharCode(_arr[i]);
            }
        }
        return str;
    }
}