import { Http } from "./Http";
import EventMng from "../framework/manager/EventMng";
import { ConfigModule } from "../userData/ConfigModule";
import UIHelp from "../framework/ui/UIHelp";
import GameDataCenter from "../userData/GameDataCenter";
import { Log, LOG_TAG } from "../utils/Log";

export class Network {
    private _httpUrl: string;

    constructor() {
        if(ConfigModule.IS_TEST){
            this._httpUrl = ConfigModule.HTTP_URL_TEST;
        }else{
            this._httpUrl = ConfigModule.HTTP_URL_DEV;
        }
    }

    //http请求
    httpSend(cmd, params, callback, loding) {
        
        var self = this;

        if (loding) {
            UIHelp.ShowLoding();
        }

        if (params && GameDataCenter.accountModel.jwt) {
            params["jwt"] = GameDataCenter.accountModel.jwt;
        }

        var param = this.obj_contact(params);
        var url = encodeURI(self._httpUrl + "/" + cmd + param);

        Log.logTag(LOG_TAG.HTTP, `%chttp发送: ${cmd}-->`,'color:#000;background:yellow', url);
        
        Http.get(url, function (eventName: string, xhr: XMLHttpRequest) {
            UIHelp.CloseLoding();
            if (eventName == 'COMPLETE') {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText)
                    let replace = cmd.replace(/\//g, '_')

                    if (cc.sys.isNative) {
                        Log.logTag(LOG_TAG.HTTP, `%chttp接收: ${replace}-->`,'color:#000;background:orange', JSON.stringify(response));
                    } else {
                        Log.logTag(LOG_TAG.HTTP, `%chttp接收: ${replace}-->`,'color:#000;background:orange', response);
                    }

                    if (response["errcode"] != 0) {
                        if(response["errcode"] == "1000"){
                            GameDataCenter.accountModel.jwt = "";
                        }
                        UIHelp.ShowTips(response["errmsg"]);
                        return;
                    }

                    callback && callback(response);
                } else {
                    UIHelp.ShowTips("服务器维护中");
                }
            } else if (eventName == 'TIMEOUT') {
                //TODO:添加提示连接网关超时
                // this.et.emit('TIMEOUT', {})
                Log.error("添加提示连接网关超时")
            } else if (eventName == 'ERROR') {
                //TODO:添加提示连接网关发生错误
                Log.error("添加提示连接网关发生错误")
            }
        }, this);
    }

    public httpPost(url: string, params: any, callback: Function, loding) {//异步httppost
        var self = this;
        if (loding) {
            UIHelp.ShowLoding();
        }
        
        var surl;
        surl = url;
        if(GameDataCenter.accountModel.jwt){
            surl = url + '?jwt=' + GameDataCenter.accountModel.jwt;
        }

        var urcl = encodeURI(self._httpUrl + "/" + surl);

        Log.logTag(LOG_TAG.HTTP, `%chttp发送: ${url}-->`,'color:#000;background:yellow', urcl);
        
        Http.post(urcl, params, function (eventName: string, xhr: XMLHttpRequest) {
            UIHelp.CloseLoding();
            if (eventName == 'COMPLETE') {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText)
                    let replace = url.replace(/\//g, '_')

                    if (cc.sys.isNative) {
                        Log.logTag(LOG_TAG.HTTP, `%chttp接收: ${replace}-->`,'color:#000;background:orange', JSON.stringify(response));
                    } else {
                        Log.logTag(LOG_TAG.HTTP, `%chttp接收: ${replace}-->`,'color:#000;background:orange', response);
                    }
                    
                    if (response["errcode"] != 0) {
                        UIHelp.ShowTips(response["errmsg"]);
                        return;
                    }

                    if(response.data.jwt){
                        GameDataCenter.accountModel.jwt = response.data.jwt;
                    }

                    callback && callback(response);
                }
            } else if (eventName == 'TIMEOUT') {
                //TODO:添加提示连接网关超时
                this.et.emit('TIMEOUT', {})
                Log.error("添加提示连接网关超时")
            } else if (eventName == 'ERROR') {
                //TODO:添加提示连接网关发生错误
                Log.error("添加提示连接网关发生错误")
            }
        }, this);
    }

    public obj_contact(obj) {
        var s = "";
        for (var k in obj) {
          let v = obj[k];
          if (s.length == 0) {
            s += "?" + k + "=" + v;
          } else {
            s += "&" + k + "=" + v;
          }
        }
        return s;
      }
}