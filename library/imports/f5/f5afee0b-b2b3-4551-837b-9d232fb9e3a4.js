"use strict";
cc._RF.push(module, 'f5afe4LsrNFUYN7nSMvueOk', 'H5WxSdkTool');
// script/framework/sdk/H5WxSdkTool.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("../../utils/Log");
var FrameEventConst_1 = require("../const/FrameEventConst");
var base64_1 = require("../lib/base64");
var crypto_1 = require("../lib/crypto");
var EventMng_1 = require("../manager/EventMng");
var IDataModel_1 = require("../model/IDataModel");
var H5WxSdkTool = /** @class */ (function (_super) {
    __extends(H5WxSdkTool, _super);
    function H5WxSdkTool() {
        var _this = _super.call(this) || this;
        _this.env = {
            uploadImageUrl: "xxxx",
            AccessKeySecret: 'xxxx',
            OSSAccessKeyId: 'xxxx',
            timeout: 80000 //这个是上传文件时Policy的失效时间
        };
        return _this;
    }
    //获取这个单例
    H5WxSdkTool.getInstance = function () {
        if (!this.instance) {
            this.instance = new H5WxSdkTool();
        }
        return this.instance;
    };
    H5WxSdkTool.prototype.getSign = function () {
        var url = location.href.split('#')[0];
        var params = {
            url: encodeURIComponent(url)
        };
        this.sendHttpMsg("login/getwxconfig", params, this.setConfig, false);
    };
    H5WxSdkTool.prototype.setConfig = function (res) {
        var _this = this;
        var wxConfig = res.data;
        wx["config"]({
            debug: false,
            appId: wxConfig.appid,
            timestamp: wxConfig.timestamp,
            nonceStr: wxConfig.noncestr,
            signature: wxConfig.signature,
            jsApiList: [
                'updateAppMessageShareData',
                'updateTimelineShareData',
            ]
        });
        wx["error"](function () {
            Log_1.Log.log("wx.error");
        });
        wx["ready"](function () {
            Log_1.Log.log("wx.ready");
            _this.shareMessage();
            _this.shareTimeline();
        });
    };
    //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
    H5WxSdkTool.prototype.shareMessage = function () {
        wx["ready"](function () {
            wx["updateAppMessageShareData"]({
                title: '',
                desc: '',
                link: '',
                imgUrl: '',
                success: function () {
                }
            });
        });
    };
    //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
    H5WxSdkTool.prototype.shareTimeline = function () {
        wx["ready"](function () {
            wx["updateTimelineShareData"]({
                title: '',
                link: '',
                imgUrl: '',
                success: function () {
                }
            });
        });
    };
    //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
    H5WxSdkTool.prototype.shareWeibo = function () {
        wx["onMenuShareWeibo"]({
            title: '',
            desc: '',
            link: '',
            imgUrl: '',
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    };
    //预览图片功能,下载分享
    H5WxSdkTool.prototype.previewImage = function (url) {
        wx.previewImage({
            current: url,
            urls: [url] // 需要预览的图片http链接列表
        });
    };
    H5WxSdkTool.prototype.pay = function (data, payCallback) {
        var _this = this;
        this.payData = data;
        this.payCallback = payCallback;
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', function () {
                    _this.onBridgeReady();
                }, false);
            }
            else if (document["attachEvent"]) {
                document["attachEvent"]('WeixinJSBridgeReady', function () {
                    _this.onBridgeReady();
                });
                document["attachEvent"]('onWeixinJSBridgeReady', function () {
                    _this.onBridgeReady();
                });
            }
        }
        else {
            this.onBridgeReady();
        }
    };
    /** 拉起JSAPI支付接口 */
    H5WxSdkTool.prototype.onBridgeReady = function () {
        var _this = this;
        WeixinJSBridge.invoke('getBrandWCPayRequest', {
            "appId": this.payData.appId,
            "timeStamp": this.payData.timeStamp,
            "nonceStr": this.payData.nonceStr,
            "package": this.payData.package,
            "signType": this.payData.signType,
            "paySign": this.payData.paySign
        }, function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                Log_1.Log.log("充值成功");
                _this.payCallback();
            }
            else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            }
            else if (res.err_msg == "get_brand_wcpay_request:fail") {
                Log_1.Log.log("充值失败", res);
            }
        });
    };
    //----------------选择照片上传阿里云OSS----------------
    H5WxSdkTool.prototype.chooseImage = function () {
        var self = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                Log_1.Log.log("tempFilePaths", tempFilePaths);
                var nowTime = self.formatTime(new Date());
                //支持多图上传
                for (var i = 0; i < res.tempFilePaths.length; i++) {
                    //显示消息提示框
                    wx.showLoading({
                        title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
                        mask: true
                    });
                    //上传图片
                    //你的域名下的/images文件下的/当前年月日文件下的/图片.png
                    //图片路径可自行修改
                    self.uploadFile(res.tempFilePaths[i], 'images/' + nowTime + '/', function (result) {
                        Log_1.Log.log("======上传成功图片地址为：", result);
                        //做你具体的业务逻辑操作
                        EventMng_1.default.emit(FrameEventConst_1.FrameEventConst.WX_UPLOAD_IMG_SUCCESS, result);
                        wx.hideLoading();
                    }, function (result) {
                        Log_1.Log.log("======上传失败======", result);
                        //做你具体的业务逻辑操作
                        wx.hideLoading();
                    });
                }
            }
        });
    };
    H5WxSdkTool.prototype.uploadFile = function (filePath, dir, successc, failc) {
        if (!filePath || filePath.length < 1) {
            wx.showModal({
                title: '图片错误',
                content: '请重试',
                showCancel: false,
            });
            return;
        }
        Log_1.Log.log('上传图片.....');
        //图片名字 可以自行定义，     这里是采用当前的时间戳 + 150内的随机数来给图片命名的
        var aliyunFileKey = dir + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';
        var aliyunServerURL = this.env.uploadImageUrl; //OSS地址，需要https
        var accessid = this.env.OSSAccessKeyId;
        var policyBase64 = this.getPolicyBase64();
        var signature = this.getSignature(policyBase64); //获取签名
        wx.uploadFile({
            url: aliyunServerURL,
            filePath: filePath,
            name: 'file',
            formData: {
                'key': aliyunFileKey,
                'policy': policyBase64,
                'OSSAccessKeyId': accessid,
                'signature': signature,
                'success_action_status': '200',
            },
            success: function (res) {
                if (res.statusCode != 200) {
                    failc(new Error('上传错误:' + JSON.stringify(res)));
                    return;
                }
                successc(aliyunServerURL + aliyunFileKey);
            },
            fail: function (err) {
                err.wxaddinfo = aliyunServerURL;
                failc(err);
            },
        });
    };
    H5WxSdkTool.prototype.getPolicyBase64 = function () {
        var date = new Date();
        date.setHours(date.getHours() + this.env.timeout);
        var srcT = date.toISOString();
        var policyText = {
            "expiration": srcT,
            "conditions": [
                ["content-length-range", 0, 5 * 1024 * 1024] // 设置上传文件的大小限制,5mb
            ]
        };
        var policyBase64 = base64_1.base64.encode(JSON.stringify(policyText));
        return policyBase64;
    };
    H5WxSdkTool.prototype.getSignature = function (policyBase64) {
        var accesskey = this.env.AccessKeySecret;
        var bytes = crypto_1.Cryptos.HMAC(policyBase64, accesskey, {
            asBytes: true
        });
        var signature = crypto_1.Cryptos.util.bytesToBase64(bytes);
        return signature;
    };
    H5WxSdkTool.prototype.formatTime = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return [year, month, day].map(this.formatNumber).join('-');
        // + ' ' + [hour, minute, second].map(formatNumber).join(':')
    };
    H5WxSdkTool.prototype.formatNumber = function (n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
    };
    return H5WxSdkTool;
}(IDataModel_1.default));
exports.default = H5WxSdkTool;

cc._RF.pop();