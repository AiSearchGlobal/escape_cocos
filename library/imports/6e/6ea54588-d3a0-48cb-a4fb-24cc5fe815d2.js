"use strict";
cc._RF.push(module, '6ea54WI06BIy6T7JMxf6BXS', 'RoomChoseModel');
// script/userData/RoomChoseModel.ts

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
var IDataModel_1 = require("../framework/model/IDataModel");
var RoomChoseModel = /** @class */ (function (_super) {
    __extends(RoomChoseModel, _super);
    function RoomChoseModel() {
        var _this = _super.call(this, 'roomChose') || this;
        _this.room1_type = 2; //1:等待，2:进行中
        _this.room2_type = 2;
        _this.room3_type = 2;
        _this.room1_min = 0;
        _this.room1_max = 30;
        _this.room2_min = 0;
        _this.room2_max = 30;
        _this.room3_min = 0;
        _this.room3_max = 30;
        return _this;
    }
    RoomChoseModel.prototype.initData = function (list) {
        var room1 = list[0];
        var room2 = list[1];
        var room3 = list[2];
        this.room1_type = room1 === null || room1 === void 0 ? void 0 : room1.status;
        this.room1_min = room1 === null || room1 === void 0 ? void 0 : room1.num;
        this.room1_max = room1 === null || room1 === void 0 ? void 0 : room1.total;
        this.room2_type = room2 === null || room2 === void 0 ? void 0 : room2.status;
        this.room2_min = room2 === null || room2 === void 0 ? void 0 : room2.num;
        this.room2_max = room2 === null || room2 === void 0 ? void 0 : room2.total;
        this.room3_type = room3 === null || room3 === void 0 ? void 0 : room3.status;
        this.room3_min = room3 === null || room3 === void 0 ? void 0 : room3.num;
        this.room3_max = room3 === null || room3 === void 0 ? void 0 : room3.total;
    };
    return RoomChoseModel;
}(IDataModel_1.default));
exports.default = RoomChoseModel;

cc._RF.pop();