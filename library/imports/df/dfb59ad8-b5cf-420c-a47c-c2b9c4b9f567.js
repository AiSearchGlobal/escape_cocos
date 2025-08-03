"use strict";
cc._RF.push(module, 'dfb59rYtc9CDKR8wrnEufVn', 'auto_comSharePop');
// script/data/autoui/comPop/auto_comSharePop.ts

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
var ccclass = cc._decorator.ccclass;
var auto_comSharePop = /** @class */ (function (_super) {
    __extends(auto_comSharePop, _super);
    function auto_comSharePop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    auto_comSharePop.prototype.onLoad = function () {
        this.comSharePop = this.node;
        this.camera = this.comSharePop.getChildByName("camera");
        this.btn_haoyou = this.comSharePop.getChildByName("btn_haoyou");
        this.Background_haoyou = this.btn_haoyou.getChildByName("Background_haoyou");
        this.Label_haoyou = this.Background_haoyou.getChildByName("Label_haoyou");
        this.btn_pengyouquan = this.comSharePop.getChildByName("btn_pengyouquan");
        this.Background_pengyouquan = this.btn_pengyouquan.getChildByName("Background_pengyouquan");
        this.Label_pengyouquan = this.Background_pengyouquan.getChildByName("Label_pengyouquan");
        this.mask = this.comSharePop.getChildByName("mask");
        this.img_helloWorld = this.mask.getChildByName("img_helloWorld");
        this.com_qrcode = this.comSharePop.getChildByName("com_qrcode");
        this.btn_close = this.comSharePop.getChildByName("btn_close");
    };
    auto_comSharePop.URL = "db://assets/resources/prefab/comPop/comSharePop.prefab";
    auto_comSharePop = __decorate([
        ccclass
    ], auto_comSharePop);
    return auto_comSharePop;
}(cc.Component));
exports.default = auto_comSharePop;

cc._RF.pop();