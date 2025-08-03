"use strict";
cc._RF.push(module, '467a1yy5XNDaKO04we3LklU', 'UIHelp');
// script/framework/ui/UIHelp.ts

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var UIMng_1 = require("../manager/UIMng");
var ViewZorder_1 = require("../const/ViewZorder");
var UIComDialog_1 = require("../../logic/ui/comPop/UIComDialog");
var UIComTips_1 = require("../../logic/ui/comPop/UIComTips");
var i18nMgr_1 = require("../i18n/i18nMgr");
var Log_1 = require("../../utils/Log");
var Utils_1 = require("../../utils/Utils");
var UIHelp = /** @class */ (function () {
    function UIHelp() {
    }
    UIHelp.SetLabel = function (node) {
        var _a;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var value = params[0];
        if (typeof value === 'number') {
            value = value.toString();
        }
        else if (value == undefined) {
            value = "";
        }
        // 文本和富文本只能二选一
        if (node.getComponent(cc.RichText)) {
            var defaultColor = node.color.toHEX('#rrggbb');
            node.getComponent(cc.RichText).string = "<color=" + defaultColor + ">" + value + "</c>";
        }
        else {
            if (node.getComponent("i18nLabel")) {
                (_a = node.getComponent("i18nLabel")).init.apply(_a, params);
            }
            else {
                var strList = value.split("|");
                if (i18nMgr_1.i18nMgr.getlanguage() == "zh") {
                    node.getComponent(cc.Label).string = strList[0];
                }
                else {
                    node.getComponent(cc.Label).string = strList[2] || strList[0];
                }
            }
        }
    };
    UIHelp.numToStr = function (num) {
        //空：无单位;     K：1千；        M：100万；    B：10亿； T：1兆；        AA：1千兆；      AB：1京；
        var digits = 0;
        var si = [
            { value: 1, symbol: "" },
            { value: 1E3, symbol: "k" },
            { value: 1E6, symbol: "m" },
            { value: 1E9, symbol: "b" },
            { value: 1E12, symbol: "t" },
            { value: 1E15, symbol: "aa" },
            { value: 1E18, symbol: "ab" }
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value * 100) {
                break;
            }
        }
        var _num = (num / si[i].value);
        if (_num > 10000) {
            digits = 0;
        }
        else if (_num > 1000) {
            digits = 1;
        }
        else if (_num > 100) {
            digits = 2;
        }
        return _num.toFixed(digits).replace(rx, "$1") + si[i].symbol;
    };
    UIHelp.numToStr2 = function (num) {
        //空：无单位;     K：1千；        M：100万；    B：10亿； T：1兆；        AA：1千兆；      AB：1京；
        var digits = 0;
        var si = [
            { value: 1, symbol: "" },
            { value: 1E3, symbol: "K" },
            { value: 1E6, symbol: "M" },
            { value: 1E9, symbol: "B" },
            { value: 1E12, symbol: "T" },
            { value: 1E15, symbol: "AA" },
            { value: 1E18, symbol: "AB" }
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value * 0.1) {
                break;
            }
        }
        var _num = (num / si[i].value);
        // if(_num > 10000){
        //     digits = 0;
        // }else if(_num > 1000){
        digits = 1;
        // }else if(_num > 100){
        //     digits = 2;
        // }
        return _num.toFixed(digits).replace(rx, "$1") + si[i].symbol;
    };
    //数字转2位小数
    UIHelp.fixedTo2 = function (a) {
        var b = String(a);
        var bNew;
        var re = /([0-9]+.[0-9]{2})[0-9]*/;
        bNew = b.replace(re, "$1");
        return bNew;
    };
    UIHelp.SetLabelColor = function (node, color) {
        node.getComponent(cc.Label).node.color = color;
    };
    UIHelp.GetEditBoxStr = function (node) {
        return node.getComponent(cc.EditBox).string;
    };
    UIHelp.SetProgressBar = function (node, progress) {
        if (typeof progress != 'number') {
            return Log_1.Log.log("参数错误");
        }
        node.getComponent(cc.ProgressBar).progress = progress;
    };
    //进度条根据图片填充
    UIHelp.SetSpriteRange = function (node, progress) {
        if (typeof progress != 'number') {
            return Log_1.Log.log("参数错误");
        }
        node.getComponent(cc.Sprite).fillRange = progress;
    };
    UIHelp.CreateSprite = function (spriteFrame) {
        //创建一个新的节点，因为cc.Sprite是组件不能直接挂载到节点上，只能添加到为节点的一个组件
        var node = new cc.Node('myNode');
        //调用新建的node的addComponent函数，会返回一个sprite的对象
        var sprite = node.addComponent(cc.Sprite);
        //给sprite的spriteFrame属性 赋值
        sprite.spriteFrame = spriteFrame;
        return node;
    };
    UIHelp.SetSpriteFrame = function (node, dAtlas, imgPath) {
        if (imgPath === void 0) { imgPath = ""; }
        if (!dAtlas) {
            return;
        }
        if (typeof dAtlas === 'string') {
            if (dAtlas.indexOf("http") >= 0 || dAtlas.indexOf("https") >= 0) {
                if (dAtlas.slice(dAtlas.length - 4) == ".png") {
                    cc.loader.load(dAtlas, function (err, texture) {
                        if (!err) {
                            var frame = new cc.SpriteFrame(texture);
                            if (node.isValid) {
                                node.getComponent(cc.Sprite).spriteFrame = frame;
                            }
                        }
                        else {
                            Log_1.Log.log("加载头像失败");
                        }
                    });
                }
                else if (dAtlas.slice(dAtlas.length - 4) == ".jpg") {
                    console.log(dAtlas, 'dAtlas');
                    cc.loader.load({ url: dAtlas, type: 'jpg' }, function (err, texture) {
                        if (!err) {
                            var frame = new cc.SpriteFrame(texture);
                            if (node.isValid) {
                                console.log('加载头像成功', texture, node);
                                node.getComponent(cc.Sprite).spriteFrame = null;
                                node.getComponent(cc.Sprite).spriteFrame = frame;
                            }
                        }
                        else {
                            Log_1.Log.log("加载头像失败");
                        }
                    });
                }
                else {
                    cc.loader.load({ url: dAtlas, type: 'png' }, function (err, texture) {
                        if (!err) {
                            var frame = new cc.SpriteFrame(texture);
                            if (node.isValid) {
                                node.getComponent(cc.Sprite).spriteFrame = frame;
                            }
                        }
                        else {
                            Log_1.Log.log("加载头像失败");
                        }
                    });
                }
            }
            else {
                cc.resources.load(dAtlas, cc.Texture2D, function (err, texture) {
                    var frame = new cc.SpriteFrame(texture);
                    if (node.isValid) {
                        node.getComponent(cc.Sprite).spriteFrame = frame;
                    }
                });
            }
        }
        else {
            var framec = dAtlas.getSpriteFrame(imgPath);
            if (node.isValid) {
                node.getComponent(cc.Sprite).spriteFrame = framec;
            }
        }
    };
    /**按钮灰化，只有注册click事件，才会真正被禁用 */
    UIHelp.SetBtnGrayState = function (node, isGray) {
        var button = node.getComponent(cc.Button);
        if (!button) {
            return;
        }
        button.interactable = !isGray;
        // button.enableAutoGrayEffect = isGray;
    };
    UIHelp.IsBtnGray = function (node) {
        var button = node.getComponent(cc.Button);
        if (!button) {
            return false;
        }
        return !button.interactable;
    };
    UIHelp.ShowUI = function (uiClass, callback) {
        var _a;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        (_a = UIMng_1.UIMng.getInstance()).openUI.apply(_a, __spreadArrays([uiClass, ViewZorder_1.ViewZorder.UI, callback, null], args));
    };
    UIHelp.ShowScene = function (uiClass, callback) {
        var _a;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        (_a = UIMng_1.UIMng.getInstance()).openUI.apply(_a, __spreadArrays([uiClass, ViewZorder_1.ViewZorder.Scene, callback, null], args));
    };
    UIHelp.ShowMenu = function (uiClass, callback) {
        var _a;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        (_a = UIMng_1.UIMng.getInstance()).openUI.apply(_a, __spreadArrays([uiClass, ViewZorder_1.ViewZorder.MenuPanel, callback, null], args));
    };
    UIHelp.ShowLoding = function () {
        // cc.find("loding").getComponent("UILoading").showLoding();
    };
    UIHelp.CloseLoding = function () {
        // cc.find("loding").getComponent("UILoading").hideLoding();
    };
    UIHelp.CloseUI = function (uiClass) {
        UIMng_1.UIMng.getInstance().closeUI(uiClass);
    };
    UIHelp.IsShowingUI = function (uiClass) {
        return UIMng_1.UIMng.getInstance().isShowing(uiClass);
    };
    UIHelp.ShowTips = function (message) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var tipUI = UIMng_1.UIMng.getInstance().getUI(UIComTips_1.default);
        if (!tipUI) {
            UIMng_1.UIMng.getInstance().openUI(UIComTips_1.default, ViewZorder_1.ViewZorder.Tips, function (ui) {
                UIHelp.ShowTips(message);
            });
        }
        else {
            tipUI.showTip(message);
        }
    };
    UIHelp.ShowDialog = function (data) {
        UIMng_1.UIMng.getInstance().openUI(UIComDialog_1.default, ViewZorder_1.ViewZorder.Dialog, null, null, data);
    };
    /**
     * 得到一个节点的世界坐标
     * node的原点在中心
     * @param {*} node
     */
    UIHelp.localConvertWorldPointAR = function (node) {
        if (node) {
            return node.convertToWorldSpaceAR(cc.v2(0, 0));
        }
        return null;
    };
    /**
     * 把一个世界坐标的点，转换到某个节点下的坐标
     * 原点在node中心
     * @param {*} node
     * @param {*} worldPoint
     */
    UIHelp.worldConvertLocalPointAR = function (node, worldPoint) {
        if (node) {
            return node.convertToNodeSpaceAR(worldPoint);
        }
        return null;
    };
    /**
     *  * 把一个节点的本地坐标转到另一个节点的本地坐标下
     * @param {*} node
     * @param {*} targetNode
     */
    UIHelp.convetOtherNodeSpaceAR = function (node, targetNode) {
        if (!node || !targetNode) {
            return null;
        }
        //先转成世界坐标
        var worldPoint = this.localConvertWorldPointAR(node);
        return this.worldConvertLocalPointAR(targetNode, worldPoint);
    };
    /**
     * 计算两点之间的距离
     * @param p1 坐标1
     * @param p2 坐标2
     */
    UIHelp.getTwoPointDistance = function (p1, p2) {
        var distance = p1.sub(p2).mag();
        return distance;
    };
    /**
     *
     * @param node 需要添加动画的节点
     * @param aniName 动画文件名字
     * @param animation 播放某个动画的名字,默认是animation，可传可不传
     * @param type 1:sp, 2:龙骨
     */
    UIHelp.addAni = function (node, aniName, animation, type) {
        if (animation === void 0) { animation = "animation"; }
        if (type === void 0) { type = 1; }
        if (type == 1) {
            //skeleton
            cc.loader.loadRes("spine/" + aniName, sp.SkeletonData, function (err, res) {
                if (err) {
                    Log_1.Log.error('资源加载失败');
                    return;
                }
                if (node.getComponent(sp.Skeleton)) {
                    var skeleton = node.getComponent(sp.Skeleton);
                }
                else {
                    var skeleton = node.addComponent(sp.Skeleton);
                }
                skeleton.skeletonData = res;
                skeleton.animation = animation;
                skeleton.enableBatch = true;
            });
        }
        else {
            //dragonBones
            cc.loader.loadRes("spine/" + aniName, dragonBones.DragonBonesAsset, function (err, res) {
                if (err) {
                    Log_1.Log.error('资源加载失败');
                    return;
                }
                if (node.getComponent(dragonBones.ArmatureDisplay)) {
                    var _dragonBones = node.getComponent(dragonBones.ArmatureDisplay);
                }
                else {
                    var _dragonBones = node.addComponent(dragonBones.ArmatureDisplay);
                }
                _dragonBones.dragonAsset = res;
                cc.loader.loadRes("spine/" + aniName.replace("_ske", "_tex"), dragonBones.DragonBonesAtlasAsset, function (err, dragonAtlasAsset) {
                    if (err) {
                        Log_1.Log.error('资源加载_tex失败');
                        return;
                    }
                    _dragonBones.dragonAtlasAsset = dragonAtlasAsset;
                    _dragonBones.armatureName = "Armature";
                    _dragonBones.playAnimation(animation, 0);
                });
            });
        }
    };
    /**参数说明：
     * 根据长度截取先使用字符串，超长部分追加…
     * str 对象字符串
     * len 目标字节长度
     * 返回值： 处理结果字符串
     */
    UIHelp.cutString = function (str, len, jiadian) {
        if (jiadian === void 0) { jiadian = true; }
        //length属性读出来的汉字长度为1
        if (str.length * 2 <= len) {
            return str;
        }
        var strlen = 0;
        var s = "";
        for (var i = 0; i < str.length; i++) {
            s = s + str.charAt(i);
            if (str.charCodeAt(i) > 128) {
                strlen = strlen + 2;
                if (strlen >= len) {
                    if (jiadian) {
                        return s.substring(0, s.length - 1) + "...";
                    }
                    else {
                        return s.substring(0, s.length - 1) + "";
                    }
                }
            }
            else {
                strlen = strlen + 1;
                if (strlen >= len) {
                    if (jiadian) {
                        return s.substring(0, s.length - 2) + "...";
                    }
                    else {
                        return s.substring(0, s.length - 2) + "";
                    }
                }
            }
        }
        return s;
    };
    UIHelp.getRadomPos = function (node) {
        var w = node.width;
        var h = node.height;
        var x = node.x;
        var y = node.y;
        var maxX = node.x + w / 2;
        var minX = node.x - w / 2;
        var maxY = node.y + h / 2;
        var minY = node.y - h / 2;
        return cc.v2(Utils_1.Utils.random(minX, maxX), Utils_1.Utils.random(minY, maxY));
    };
    return UIHelp;
}());
exports.default = UIHelp;

cc._RF.pop();