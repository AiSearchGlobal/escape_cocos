"use strict";
cc._RF.push(module, '4a206VTyP5NQ52Olj8A8yma', 'auto_killer');
// script/data/autoui/prefab/auto_killer.ts

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
var auto_killer = /** @class */ (function (_super) {
    __extends(auto_killer, _super);
    function auto_killer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    auto_killer.prototype.onLoad = function () {
        this.killer = this.node;
        this.sp_killer = this.killer.getChildByName("sp_killer");
    };
    auto_killer.URL = "db://assets/resources/prefab/killer.prefab";
    auto_killer = __decorate([
        ccclass
    ], auto_killer);
    return auto_killer;
}(cc.Component));
exports.default = auto_killer;

cc._RF.pop();