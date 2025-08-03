"use strict";
cc._RF.push(module, '67eb4yZV0lJc5XohgONVb2u', 'XcxSdk');
// script/framework/sdk/XcxSdk.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("../../utils/Log");
var FrameEventConst_1 = require("../const/FrameEventConst");
var base64_1 = require("../lib/base64");
var crypto_1 = require("../lib/crypto");
var AudioMng_1 = require("../manager/AudioMng");
var EventMng_1 = require("../manager/EventMng");
var IDataModel_1 = require("../model/IDataModel");
var XcxSdk = /** @class */ (function (_super) {
    __extends(XcxSdk, _super);
    function XcxSdk() {
        var _this = _super.call(this) || this;
        _this.wxRun = 0;
        _this.env = {
            uploadImageUrl: "xxxx",
            AccessKeySecret: 'xxxx',
            OSSAccessKeyId: 'xxxx',
            timeout: 80000 //这个是上传文件时Policy的失效时间
        };
        //注册右上角...里的分享，分享朋友圈
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        });
        //右上角...被动分享好友
        wx.onShareAppMessage(function () {
            return {
                title: 'I`m Shark',
                imageUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep4iaauHk6qmCLM3ASY3ia0CKibSPF3FzFyc3IXR5yZA9uAFXVyGaDTqyX1LB6WpjrB4picu4K7lnXgGw/132",
                query: "uid=" + 0,
            };
        });
        //右上角...被动分享朋友圈
        wx.onShareTimeline(function () {
            return {
                title: 'I`m Shark',
                imageUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep4iaauHk6qmCLM3ASY3ia0CKibSPF3FzFyc3IXR5yZA9uAFXVyGaDTqyX1LB6WpjrB4picu4K7lnXgGw/132",
                query: "uid=" + 0,
            };
        });
        wx.onShow(function (_a) {
            var query = _a.query;
            Log_1.Log.log("wx.onShow--->query:", query);
            _this.setQueryData(query);
        });
        wx.onHide(function () {
            Log_1.Log.log("wx.onHide");
        });
        // 在首次启动时通过 wx.getLaunchOptionsSync 接口获取
        var query = wx.getLaunchOptionsSync().query;
        Log_1.Log.log("wx.getLaunchOptionsSync--->query:", query);
        _this.setQueryData(query);
        return _this;
    }
    //从获取到query，对游戏内的数据进行处理
    XcxSdk.prototype.setQueryData = function (query) {
        if (query.uid) {
        }
    };
    //主动拉取分享好友
    XcxSdk.prototype.shareAppMessage = function () {
        this.shareStartTime = Math.floor(new Date().getTime() / 1000);
        wx.shareAppMessage({
            title: "I`m Shark",
            imageUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep4iaauHk6qmCLM3ASY3ia0CKibSPF3FzFyc3IXR5yZA9uAFXVyGaDTqyX1LB6WpjrB4picu4K7lnXgGw/132",
            query: "uid=" + 0,
        });
    };
    //获取微信步数
    XcxSdk.prototype.getWeRunData = function () {
        var self = this;
        wx.getWeRunData({
            success: function (res) {
                return __awaiter(this, void 0, void 0, function () {
                    var encryptedData, params, stepInfoList;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                Log_1.Log.log("getWeRunData", res);
                                encryptedData = res.encryptedData;
                                params = {
                                    encryptData: encryptedData,
                                    iv: res["iv"],
                                    encryptedData: self.replacenormalcharacter(encryptedData)
                                };
                                return [4 /*yield*/, self.getEncryptedData(params)];
                            case 1:
                                stepInfoList = _a.sent();
                                self.wxRun = stepInfoList[stepInfoList.length - 1]["step"];
                                return [2 /*return*/];
                        }
                    });
                });
            },
            fail: function (res) {
                Log_1.Log.log("res===get==fail======", res);
                self.wxRun = 0;
            },
        });
    };
    //预览图片功能,下载分享
    XcxSdk.prototype.previewImage = function (url) {
        wx.previewImage({
            current: url,
            urls: [url] // 需要预览的图片http链接列表
        });
    };
    //跳转小程序
    XcxSdk.prototype.navigateToMiniProgram = function (appId) {
        wx.navigateToMiniProgram({
            appId: appId,
            success: function (res) {
                // 打开成功
                Log_1.Log.log("跳转小程序成功");
            }
        });
    };
    //播放视频
    XcxSdk.prototype.createVideo = function (url) {
        AudioMng_1.AudioMng.getInstance().pauseAll();
        var video = wx.createVideo({
            x: 0,
            y: 0,
            src: url,
            autoplay: true,
            initialTime: 0,
            width: wx.getSystemInfoSync().windowWidth,
            height: wx.getSystemInfoSync().windowHeight,
            controls: false,
            showProgress: false,
            showProgressInControlMode: false,
        });
        video.onEnded(function (res) {
            Log_1.Log.log('=========end', res);
            EventMng_1.default.emit(FrameEventConst_1.FrameEventConst.WX_VIDEO_FINISH);
            AudioMng_1.AudioMng.getInstance().resumeAll();
            video.destroy();
        });
    };
    //----------------选择照片上传阿里云OSS----------------
    XcxSdk.prototype.chooseImage = function () {
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
    XcxSdk.prototype.uploadFile = function (filePath, dir, successc, failc) {
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
    XcxSdk.prototype.getPolicyBase64 = function () {
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
    XcxSdk.prototype.getSignature = function (policyBase64) {
        var accesskey = this.env.AccessKeySecret;
        var bytes = crypto_1.Cryptos.HMAC(policyBase64, accesskey, {
            asBytes: true
        });
        var signature = crypto_1.Cryptos.util.bytesToBase64(bytes);
        return signature;
    };
    XcxSdk.prototype.formatTime = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return [year, month, day].map(this.formatNumber).join('-');
        // + ' ' + [hour, minute, second].map(formatNumber).join(':')
    };
    XcxSdk.prototype.formatNumber = function (n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
    };
    //----------------选择照片上传阿里云OSS----------------
    //拿 encryptedData 到开发者后台解密开放数据
    XcxSdk.prototype.getEncryptedData = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sendHttpMsg("login/wxcheck", params, function (res) {
                var data = res.data;
                resolve(data.data.res.stepInfoList);
            }.bind(_this));
        });
    };
    XcxSdk.prototype.replacenormalcharacter = function (normalcharacterstr) {
        return normalcharacterstr.replace(/\=/g, "~").replace(/\//g, "_").replace(/\+/g, "-");
    };
    return XcxSdk;
}(IDataModel_1.default));
exports.default = XcxSdk;

cc._RF.pop();