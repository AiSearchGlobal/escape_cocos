"use strict";
cc._RF.push(module, '34837AxZGtD0oI7oXPq37iv', 'VMCamera');
// script/framework/component/VMCamera.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.XxsType = exports.CameraType = void 0;
var UIBase_1 = require("../ui/UIBase");
var UIHelp_1 = require("../ui/UIHelp");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
//1:相册，2:拍照
var CameraType;
(function (CameraType) {
    CameraType[CameraType["PHOTO"] = 0] = "PHOTO";
    CameraType[CameraType["CAMERE"] = 1] = "CAMERE";
    CameraType[CameraType["All"] = 2] = "All";
})(CameraType = exports.CameraType || (exports.CameraType = {}));
var XxsType;
(function (XxsType) {
    XxsType[XxsType["OSS"] = 1] = "OSS";
    XxsType[XxsType["OBS"] = 2] = "OBS";
    XxsType[XxsType["AWS"] = 3] = "AWS";
})(XxsType = exports.XxsType || (exports.XxsType = {}));
/**
 *  [VM-Camera]
 *  专门处理 拉取手机相册或拍照
 */
var VMCamera = /** @class */ (function (_super) {
    __extends(VMCamera, _super);
    function VMCamera() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spr = null;
        _this.cameraType = CameraType.PHOTO;
        _this.btnPhoto = null;
        _this.btnCamera = null;
        _this.maxMb = 5;
        _this.xxs = XxsType.OSS;
        _this.accessKeyId = "";
        _this.accessKeySecret = "";
        _this.region = _this.xxs == XxsType.OSS ? "oss-cn-beijing" : "s3.amazonaws.com";
        _this.endpoint = "obs.cn-north-4.myhuaweicloud.com";
        _this.bucket = "";
        _this.dir = "";
        _this.realmName = "";
        _this.successEvents = [];
        return _this;
    }
    VMCamera.prototype.onShow = function () {
        if (this.btnPhoto)
            this.onRegisterEvent(this.btnPhoto, this.photoClick);
        if (this.btnCamera)
            this.onRegisterEvent(this.btnCamera, this.cameraClick);
    };
    VMCamera.prototype.onHide = function () {
    };
    VMCamera.prototype.onStart = function () {
    };
    VMCamera.prototype.photoClick = function () {
        this.openFile(1);
    };
    VMCamera.prototype.cameraClick = function () {
        this.openFile(2);
    };
    /**
     * 打开文件操作
     */
    VMCamera.prototype.openFile = function (type) {
        if (type == 1) {
            var input_imageFile = document.getElementById('OpenTextFile');
        }
        else {
            var input_imageFile = document.getElementById('OpenImageFile');
        }
        if (input_imageFile == null)
            return;
        // 添加需要处理的代码
        input_imageFile.onchange = function (event) {
            var files = event.target.files;
            if (files && files.length > 0) {
                try {
                    this.uploading(files[0]);
                }
                catch (e) {
                    alert('文件读取失败，请再试一次');
                    this.canRepeatUpload();
                    return;
                }
            }
        }.bind(this);
        input_imageFile.click();
    };
    /**
     * 允许重复上传
     * 这里的函数操作主要是为了允许可以重复打开同一个文件
     */
    VMCamera.prototype.canRepeatUpload = function () {
        var input_imageFile = document.getElementById('OpenImageFile');
        if (input_imageFile == null) {
            cc.log('上传失败');
            return;
        }
        if (input_imageFile.outerHTML) {
            input_imageFile.outerHTML = input_imageFile.outerHTML;
        }
        if (input_imageFile["value"]) {
            input_imageFile["value"] = null;
        }
    };
    //将文件转为blob类型
    VMCamera.prototype.readFileAsBuffer = function (file) {
        var reader = new FileReader();
        return new Promise(function (resolve, reject) {
            // reader.readAsDataURL(file);
            // reader.onload = function(e) {
            //     this.canRepeatUpload();
            //     if(this.spr){
            //         let strImg = e.target.result;
            //         let img = new Image();
            //         img.src = strImg;
            //         img.onload = function () {
            //             //将读取到图片生成一个可以给sprite使用的texture
            //             let texture = new cc.Texture2D();
            //             texture.initWithElement(img);
            //             var frame = new cc.SpriteFrame(texture);
            //             if (this.spr.node.isValid) {
            //                 this.spr.spriteFrame = frame;
            //             }
            //         }.bind(this);
            //     }
            //     const base64File = reader.result["replace"](/^data:\w+\/\w+;base64,/,"");
            //     resolve(new OSS["Buffer"](base64File, "base64"));
            resolve("");
            // }.bind(this);
        }.bind(this));
    };
    VMCamera.prototype.uploading = function (imgFile) {
        return __awaiter(this, void 0, void 0, function () {
            var upType;
            return __generator(this, function (_a) {
                upType = imgFile.type;
                if (upType == 'image/gif' || upType.indexOf("image") < 0) {
                    UIHelp_1.default.ShowTips('只允许上传图片文件！');
                    this.canRepeatUpload();
                    return [2 /*return*/];
                }
                //限制允许上传的图片最大为5m
                if (imgFile.size > (1024 * 1024 * this.maxMb)) {
                    UIHelp_1.default.ShowTips("\u56FE\u7247\u8FC7\u5927\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9" + this.maxMb + "MB\u4EE5\u5185\u7684\u56FE\u7247");
                    this.canRepeatUpload();
                    return [2 /*return*/];
                }
                if (this.xxs === XxsType.OSS) {
                    this.updateOSS(imgFile);
                }
                else if (this.xxs === XxsType.OBS) {
                }
                else if (this.xxs === XxsType.AWS) {
                    this.updateAWS(imgFile);
                }
                return [2 /*return*/];
            });
        });
    };
    VMCamera.prototype.updateOSS = function (imgFile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    VMCamera.prototype.updateAWS = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    VMCamera.className = "VM-Camera";
    __decorate([
        property({ type: cc.Sprite, displayName: "需要渲染的节点" })
    ], VMCamera.prototype, "spr", void 0);
    __decorate([
        property({
            type: cc.Enum(CameraType),
            displayName: "相册or拍照or所有"
        })
    ], VMCamera.prototype, "cameraType", void 0);
    __decorate([
        property({
            type: cc.Node, displayName: "相册按钮",
            visible: function () { return this.cameraType === CameraType.PHOTO || this.cameraType === CameraType.All; }
        })
    ], VMCamera.prototype, "btnPhoto", void 0);
    __decorate([
        property({
            type: cc.Node, displayName: "拍照按钮",
            visible: function () { return this.cameraType === CameraType.CAMERE || this.cameraType === CameraType.All; }
        })
    ], VMCamera.prototype, "btnCamera", void 0);
    __decorate([
        property({ type: cc.Integer, displayName: "图片最大MB" })
    ], VMCamera.prototype, "maxMb", void 0);
    __decorate([
        property({
            type: cc.Enum(XxsType),
            displayName: "云服务器"
        })
    ], VMCamera.prototype, "xxs", void 0);
    __decorate([
        property()
    ], VMCamera.prototype, "accessKeyId", void 0);
    __decorate([
        property()
    ], VMCamera.prototype, "accessKeySecret", void 0);
    __decorate([
        property({
            tooltip: '阿里云region',
            visible: function () { return this.xxs === XxsType.OSS || this.xxs === XxsType.AWS; }
        })
    ], VMCamera.prototype, "region", void 0);
    __decorate([
        property({
            tooltip: '华为云endpoint',
            visible: function () { return this.xxs === XxsType.OBS; }
        })
    ], VMCamera.prototype, "endpoint", void 0);
    __decorate([
        property()
    ], VMCamera.prototype, "bucket", void 0);
    __decorate([
        property({ displayName: "bucket下文件夹名字" })
    ], VMCamera.prototype, "dir", void 0);
    __decorate([
        property({ displayName: "域名" })
    ], VMCamera.prototype, "realmName", void 0);
    __decorate([
        property({ type: [cc.Component.EventHandler], tooltip: '上传成功后，通知页面把url发送给服务端' })
    ], VMCamera.prototype, "successEvents", void 0);
    VMCamera = __decorate([
        ccclass,
        menu('ModelViewer/VM-Camera(拉取手机相册或拍照)')
    ], VMCamera);
    return VMCamera;
}(UIBase_1.default));
exports.default = VMCamera;

cc._RF.pop();