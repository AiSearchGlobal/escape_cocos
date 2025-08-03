"use strict";
cc._RF.push(module, 'a025cQrsC5EJYhLgZu+JpT/', 'VMListViewCtrl');
// script/framework/component/VMListViewCtrl.ts

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
var Log_1 = require("../../utils/Log");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
/**
 *  [VM-ListViewCtrl]
 * 将该组件绑定到scrollView上
 * 竖屏滑块，content不需要添加layout，可显示无限条数据
 * 获取到数据后调用initialize渲染
 * 小预置体需要有initUI方法，供该组件调用刷新数据
 */
var VMListViewCtrl = /** @class */ (function (_super) {
    __extends(VMListViewCtrl, _super);
    function VMListViewCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemTemplate = null;
        _this.scrollView = null;
        _this.spawnCount = 20; // how many items we actually spawn
        _this.spacing = 10; // space between each item
        _this.bufferZone = 1600; // when item is away from bufferZone, we relocate it
        _this.items = []; // array to store spawned items
        _this.updateTimer = 0;
        _this.updateInterval = 0.2;
        _this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down
        _this.dataList = []; //后台返回数据
        return _this;
    }
    VMListViewCtrl.prototype.onEnable = function () {
        this._spawnCount = this.spawnCount;
    };
    VMListViewCtrl.prototype.onDestroy = function () {
    };
    VMListViewCtrl.prototype.onLoad = function () {
        this.content = this.scrollView.content;
        this.itemTemplateName = this.itemTemplate.name.replace(this.itemTemplate.name[0], "UI" + this.itemTemplate.name[0].toUpperCase());
    };
    //初始话滑块
    VMListViewCtrl.prototype.initialize = function (dataList) {
        this.dataList = dataList;
        this.totalCount = dataList.length;
        this._spawnCount = Math.min(this.totalCount, this._spawnCount);
        this.content.removeAllChildren();
        this.items = [];
        this.content.height = this.totalCount * (this.itemTemplate.data.height + this.spacing) + this.spacing; // get total content height
        for (var i = 0; i < this._spawnCount; ++i) { // spawn items, we only need to do this once
            var item = cc.instantiate(this.itemTemplate);
            this.content.addChild(item);
            item["itemID"] = i;
            item.x = 0;
            item.y = -item.height * (0.5 + i) - this.spacing * (i + 1);
            item.getComponent(this.itemTemplateName).initUI(dataList[i]);
            this.items.push(item);
        }
    };
    VMListViewCtrl.prototype.getPositionInView = function (item) {
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    };
    VMListViewCtrl.prototype.update = function (dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval)
            return; // we don't need to do the math every frame
        this.updateTimer = 0;
        var items = this.items;
        var buffer = this.bufferZone;
        var isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
        var offset = (this.itemTemplate.data.height + this.spacing) * items.length;
        for (var i = 0; i < items.length; ++i) {
            var viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].y = items[i].y + offset;
                    var item = items[i].getComponent(this.itemTemplateName);
                    var itemId = items[i].itemID - items.length;
                    items[i].itemID = itemId;
                    item.initUI(this.dataList[itemId]);
                }
            }
            else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                    items[i].y = items[i].y - offset;
                    var item = items[i].getComponent(this.itemTemplateName);
                    var itemId = items[i].itemID + items.length;
                    items[i].itemID = itemId;
                    item.initUI(this.dataList[itemId]);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.scrollView.content.y;
    };
    VMListViewCtrl.prototype.scrollEvent = function (sender, event) {
        switch (event) {
            case 0:
                Log_1.Log.log("Scroll to Top");
                break;
            case 1:
                Log_1.Log.log("Scroll to Bottom");
                break;
            case 2:
                Log_1.Log.log("Scroll to Left");
                break;
            case 3:
                Log_1.Log.log("Scroll to Right");
                break;
            case 4:
                Log_1.Log.log("Scrolling");
                break;
            case 5:
                Log_1.Log.log("Bounce Top");
                break;
            case 6:
                Log_1.Log.log("Bounce bottom");
                break;
            case 7:
                Log_1.Log.log("Bounce left");
                break;
            case 8:
                Log_1.Log.log("Bounce right");
                break;
            case 9:
                Log_1.Log.log("Auto scroll ended");
                break;
        }
    };
    VMListViewCtrl.prototype.addItem = function () {
        this.content.height = (this.totalCount + 1) * (this.itemTemplate.data.height + this.spacing) + this.spacing; // get total content height
        this.totalCount = this.totalCount + 1;
    };
    VMListViewCtrl.prototype.removeItem = function () {
        if (this.totalCount - 1 < 30) {
            cc.error("can't remove item less than 30!");
            return;
        }
        this.content.height = (this.totalCount - 1) * (this.itemTemplate.data.height + this.spacing) + this.spacing; // get total content height
        this.totalCount = this.totalCount - 1;
        this.moveBottomItemToTop();
    };
    VMListViewCtrl.prototype.moveBottomItemToTop = function () {
        var offset = (this.itemTemplate.data.height + this.spacing) * this.items.length;
        var length = this.items.length;
        var item = this.getItemAtBottom();
        // whether need to move to top
        if (item.y + offset < 0) {
            item.y = item.y + offset;
            var itemComp = item.getComponent('Item');
            var itemId = itemComp.itemID - length;
            itemComp.updateItem(itemId);
        }
    };
    VMListViewCtrl.prototype.getItemAtBottom = function () {
        var item = this.items[0];
        for (var i = 1; i < this.items.length; ++i) {
            if (item.y > this.items[i].y) {
                item = this.items[i];
            }
        }
        return item;
    };
    VMListViewCtrl.prototype.scrollToFixedPosition = function () {
        this.scrollView.scrollToOffset(cc.v2(0, 500), 2);
    };
    __decorate([
        property(cc.Prefab)
    ], VMListViewCtrl.prototype, "itemTemplate", void 0);
    __decorate([
        property(cc.ScrollView)
    ], VMListViewCtrl.prototype, "scrollView", void 0);
    __decorate([
        property(cc.Integer)
    ], VMListViewCtrl.prototype, "spawnCount", void 0);
    __decorate([
        property(cc.Integer)
    ], VMListViewCtrl.prototype, "spacing", void 0);
    __decorate([
        property(cc.Integer)
    ], VMListViewCtrl.prototype, "bufferZone", void 0);
    VMListViewCtrl = __decorate([
        ccclass,
        menu("ModelViewer/VM-ListViewCtrl(竖滑块)")
    ], VMListViewCtrl);
    return VMListViewCtrl;
}(cc.Component));
exports.default = VMListViewCtrl;

cc._RF.pop();