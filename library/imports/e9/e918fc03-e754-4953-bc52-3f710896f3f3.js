"use strict";
cc._RF.push(module, 'e918fwD51RJU7xSP3EIlvPz', 'UIMng');
// script/framework/manager/UIMng.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIMng = void 0;
var ViewZorder_1 = require("../const/ViewZorder");
var Log_1 = require("../../utils/Log");
var UIComTips_1 = require("../../logic/ui/comPop/UIComTips");
var UIMng = /** @class */ (function () {
    function UIMng() {
        this.uiList = [];
        this.comTips = null;
    }
    UIMng.getInstance = function () {
        if (this.instance == null) {
            this.instance = new UIMng();
        }
        return this.instance;
    };
    /**
     * 打开UI
     * @param uiClass
     * @param zOrder
     * @param callback 打开完毕回调函数
     * @param onProgress 打开过程进度函数
     * @param args 传入到UI的参数
     */
    UIMng.prototype.openUI = function (uiClass, zOrder, callback, onProgress) {
        var _this = this;
        if (zOrder === void 0) { zOrder = ViewZorder_1.ViewZorder.UI; }
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            args[_i - 4] = arguments[_i];
        }
        if (this.getUI(uiClass)) {
            Log_1.Log.error("UIMng OpenUI 1: ui " + uiClass.getName() + " is already exist, please check");
            return;
        }
        cc.loader.loadRes(uiClass.getUrl(), function (completedCount, totalCount, item) {
            onProgress && onProgress(completedCount, totalCount, item);
        }, function (error, prefab) {
            if (error) {
                Log_1.Log.error("UIMng OpenUI: load ui error: " + error);
                return;
            }
            if (_this.getUI(uiClass)) {
                Log_1.Log.error("UIMng OpenUI 2: ui " + uiClass.getName() + " is already exist, please check");
                return;
            }
            var uiNode = cc.instantiate(prefab);
            var ui = uiNode.getComponent(uiClass);
            if (!ui) {
                Log_1.Log.error(uiClass.getUrl() + "\u6CA1\u6709\u7ED1\u5B9AUI\u811A\u672C!!!");
                return;
            }
            ui.init(args);
            // let uiRoot = cc.director.getScene().getChildByName('UIRoot');
            var uiRoot = cc.director.getScene();
            if (!uiRoot) {
                Log_1.Log.error("\u5F53\u524D\u573A\u666F" + cc.director.getScene().name + "Canvas!!!");
                return;
            }
            uiNode.parent = uiRoot;
            uiNode.zIndex = zOrder;
            if (zOrder == ViewZorder_1.ViewZorder.UI) {
                _this.hideAllUI();
            }
            if (uiNode.getComponent(UIComTips_1.default)) {
                _this.comTips = ui;
            }
            else {
                _this.uiList.push(ui);
            }
            // this.uiList.push(ui);
            ui.tags = uiClass;
            callback && callback(ui);
        });
    };
    /**
     * 清除依赖资源
     * @param prefabUrl
     */
    UIMng.prototype.clearDependsRes = function (prefabUrl) {
        var deps = cc.loader.getDependsRecursively(prefabUrl);
        // Log.log(`UIMng clearDependsRes: release ${prefabUrl} depends resources `, deps);
        deps.forEach(function (item) {
            // todo：排除公共资源，然后清理
            // if (item.indexOf('common') === -1) {
            //     cc.loader.release(item);
            // }
        });
    };
    UIMng.prototype.closeUI = function (uiClass) {
        for (var i = 0; i < this.uiList.length; ++i) {
            if (this.uiList[i].tags === uiClass) {
                var isUI = this.uiList[i].node.zIndex == ViewZorder_1.ViewZorder.UI;
                if (cc.isValid(this.uiList[i].node)) {
                    this.uiList[i].node.destroy();
                    this.clearDependsRes(uiClass.getUrl());
                }
                this.uiList.splice(i, 1);
                if (isUI && this.uiList.length && this.uiList[this.uiList.length - 1].node.zIndex == ViewZorder_1.ViewZorder.UI) {
                    this.uiList[this.uiList.length - 1].node.active = true;
                }
                return;
            }
        }
    };
    UIMng.prototype.closeAllUI = function () {
        if (this.uiList.length == 0) {
            return;
        }
        this.closeUI(this.uiList[0].tags);
        while (this.uiList.length > 0) {
            this.closeUI(this.uiList[0].tags);
        }
    };
    UIMng.prototype.hideAllUI = function () {
        if (this.uiList.length == 0) {
            return;
        }
        for (var i = 0; i < this.uiList.length; ++i) {
            if (cc.isValid(this.uiList[i].node) && this.uiList[i].node.zIndex == ViewZorder_1.ViewZorder.UI) {
                this.uiList[i].node.active = false;
            }
        }
    };
    UIMng.prototype.showUI = function (uiClass, callback) {
        var ui = this.getUI(uiClass);
        if (!ui) {
            Log_1.Log.error("UIMng showUI: ui " + uiClass.getName() + " not exist");
            return;
        }
        ui.node.active = true;
    };
    UIMng.prototype.hideUI = function (uiClass) {
        var ui = this.getUI(uiClass);
        if (ui) {
            ui.node.active = false;
        }
    };
    UIMng.prototype.getUI = function (uiClass) {
        var _a, _b;
        if (uiClass.getName() == "UIComTips" && ((_b = (_a = this.comTips) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.parent)) {
            return this.comTips;
        }
        else {
            for (var i = 0; i < this.uiList.length; ++i) {
                if (this.uiList[i].tags === uiClass) {
                    return this.uiList[i];
                }
            }
        }
        return null;
    };
    UIMng.prototype.isShowing = function (uiClass) {
        var ui = this.getUI(uiClass);
        if (!ui) {
            return false;
        }
        return ui.node.active;
    };
    return UIMng;
}());
exports.UIMng = UIMng;

cc._RF.pop();