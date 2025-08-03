"use strict";
cc._RF.push(module, 'a9ef75/WzpPRJR7PNYhroil', 'VMQrcode');
// script/framework/component/VMQrcode.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigModule_1 = require("../../userData/ConfigModule");
var Qrcode_1 = require("../lib/Qrcode");
var VMBase_1 = require("./VMBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, executeInEditMode = _a.executeInEditMode, help = _a.help;
/**
 *  [VM-Qrcode]
 *  绑定到一个锚点为（0，0）的空节点上，根据玩家id生成二维码
 */
var VMQrcode = /** @class */ (function (_super) {
    __extends(VMQrcode, _super);
    function VMQrcode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeQr = null;
        _this.uidWatchPath = "";
        return _this;
    }
    VMQrcode.prototype.start = function () {
        if (CC_EDITOR)
            return;
        var url = ConfigModule_1.ConfigModule.SHARE_URL;
        if (this.uidWatchPath) {
            var uid = this.VM.getValue(this.uidWatchPath);
            url += "?shangjiid=" + uid;
        }
        var qrcode = new Qrcode_1.QRCode(-1, 2);
        qrcode.addData(url);
        qrcode.make();
        var ctx = this.nodeQr.addComponent(cc.Graphics);
        // compute tileW/tileH based on node width and height
        var tileW = this.nodeQr.width / qrcode.getModuleCount();
        var tileH = this.nodeQr.height / qrcode.getModuleCount();
        // draw in the Graphics
        for (var row = 0; row < qrcode.getModuleCount(); row++) {
            for (var col = 0; col < qrcode.getModuleCount(); col++) {
                // ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
                if (qrcode.isDark(row, col)) {
                    ctx.fillColor = cc.Color.BLACK;
                }
                else {
                    ctx.fillColor = cc.Color.WHITE;
                }
                var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
                var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
                ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
                ctx.fill();
            }
        }
    };
    __decorate([
        property({ type: cc.Node, tooltip: "要生成二位码的节点，锚点必须是（0，0）" })
    ], VMQrcode.prototype, "nodeQr", void 0);
    __decorate([
        property({
            tooltip: '玩家id，用来绑定上下级用'
        })
    ], VMQrcode.prototype, "uidWatchPath", void 0);
    VMQrcode = __decorate([
        ccclass,
        menu('ModelViewer/VM-Qrcode(二维码)')
    ], VMQrcode);
    return VMQrcode;
}(VMBase_1.default));
exports.default = VMQrcode;

cc._RF.pop();