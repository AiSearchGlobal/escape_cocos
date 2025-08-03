"use strict";
cc._RF.push(module, '58bb1LVDpNPZLkEJzL3gp3i', 'enum');
// script/framework/adapter/define/enum.ts

"use strict";
// import { Enum } from "cc";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewEvent = exports.HolderEvent = exports.ReleaseState = exports.Transition = exports.IndicatorMode = exports.AlwaysScroll = exports.NestedDirection = exports.ScrollbarDirection = exports.ScrollDirection = exports.ChildAlignment = exports.MagneticDirection = exports.TouchMode = exports.WrapMode = exports.Layer = exports.StretchDirection = exports.ArrangeAxis = exports.MovementType = exports.Orientation = void 0;
var Orientation;
(function (Orientation) {
    Orientation[Orientation["Vertical"] = 0] = "Vertical";
    Orientation[Orientation["Horizontal"] = 1] = "Horizontal";
})(Orientation = exports.Orientation || (exports.Orientation = {}));
var MovementType;
(function (MovementType) {
    MovementType[MovementType["Unrestricted"] = 0] = "Unrestricted";
    MovementType[MovementType["Elastic"] = 1] = "Elastic";
    MovementType[MovementType["Clamped"] = 2] = "Clamped";
})(MovementType = exports.MovementType || (exports.MovementType = {}));
var ArrangeAxis;
(function (ArrangeAxis) {
    ArrangeAxis[ArrangeAxis["Start"] = 0] = "Start";
    ArrangeAxis[ArrangeAxis["End"] = 1] = "End";
})(ArrangeAxis = exports.ArrangeAxis || (exports.ArrangeAxis = {}));
var StretchDirection;
(function (StretchDirection) {
    StretchDirection[StretchDirection["Auto"] = 0] = "Auto";
    StretchDirection[StretchDirection["Header"] = 1] = "Header";
    StretchDirection[StretchDirection["Footer"] = 2] = "Footer";
    StretchDirection[StretchDirection["Center"] = 3] = "Center";
})(StretchDirection = exports.StretchDirection || (exports.StretchDirection = {}));
var Layer;
(function (Layer) {
    Layer[Layer["Lowest"] = 0] = "Lowest";
    Layer[Layer["Medium"] = 1] = "Medium";
    Layer[Layer["Highest"] = 2] = "Highest";
})(Layer = exports.Layer || (exports.Layer = {}));
var WrapMode;
(function (WrapMode) {
    WrapMode[WrapMode["Auto"] = 0] = "Auto";
    WrapMode[WrapMode["Wrap"] = 1] = "Wrap";
    WrapMode[WrapMode["Nowrap"] = 2] = "Nowrap";
})(WrapMode = exports.WrapMode || (exports.WrapMode = {}));
var TouchMode;
(function (TouchMode) {
    /** 当内容未填满时 并且未开启PullRelease 并且 未开启Center 功能是不可滑动 */
    TouchMode[TouchMode["Auto"] = 0] = "Auto";
    /** 永远可以滑动，无论是否有内容 */
    TouchMode[TouchMode["AlwaysAllow"] = 1] = "AlwaysAllow";
    /** 禁用滑动 */
    TouchMode[TouchMode["Disabled"] = 2] = "Disabled";
})(TouchMode = exports.TouchMode || (exports.TouchMode = {}));
var MagneticDirection;
(function (MagneticDirection) {
    MagneticDirection[MagneticDirection["Header"] = 0] = "Header";
    MagneticDirection[MagneticDirection["Footer"] = 1] = "Footer";
})(MagneticDirection = exports.MagneticDirection || (exports.MagneticDirection = {}));
var ChildAlignment;
(function (ChildAlignment) {
    ChildAlignment[ChildAlignment["UpperLeft"] = 0] = "UpperLeft";
    ChildAlignment[ChildAlignment["UpperCenter"] = 1] = "UpperCenter";
    ChildAlignment[ChildAlignment["UpperRight"] = 2] = "UpperRight";
    ChildAlignment[ChildAlignment["MiddleLeft"] = 3] = "MiddleLeft";
    ChildAlignment[ChildAlignment["MiddleCenter"] = 4] = "MiddleCenter";
    ChildAlignment[ChildAlignment["MiddleRight"] = 5] = "MiddleRight";
    ChildAlignment[ChildAlignment["LowerLeft"] = 6] = "LowerLeft";
    ChildAlignment[ChildAlignment["LowerCenter"] = 7] = "LowerCenter";
    ChildAlignment[ChildAlignment["LowerRight"] = 8] = "LowerRight";
})(ChildAlignment = exports.ChildAlignment || (exports.ChildAlignment = {}));
var ScrollDirection;
(function (ScrollDirection) {
    ScrollDirection[ScrollDirection["Up"] = 0] = "Up";
    ScrollDirection[ScrollDirection["Down"] = 1] = "Down";
    ScrollDirection[ScrollDirection["Left"] = 2] = "Left";
    ScrollDirection[ScrollDirection["Right"] = 3] = "Right";
    ScrollDirection[ScrollDirection["None"] = 4] = "None";
})(ScrollDirection = exports.ScrollDirection || (exports.ScrollDirection = {}));
var ScrollbarDirection;
(function (ScrollbarDirection) {
    ScrollbarDirection[ScrollbarDirection["Top_To_Bottom"] = 0] = "Top_To_Bottom";
    ScrollbarDirection[ScrollbarDirection["Bottom_To_Top"] = 1] = "Bottom_To_Top";
    ScrollbarDirection[ScrollbarDirection["Left_To_Right"] = 2] = "Left_To_Right";
    ScrollbarDirection[ScrollbarDirection["Right_To_Left"] = 3] = "Right_To_Left";
})(ScrollbarDirection = exports.ScrollbarDirection || (exports.ScrollbarDirection = {}));
var NestedDirection;
(function (NestedDirection) {
    NestedDirection[NestedDirection["Both"] = 0] = "Both";
    NestedDirection[NestedDirection["Header"] = 1] = "Header";
    NestedDirection[NestedDirection["Footer"] = 2] = "Footer";
})(NestedDirection = exports.NestedDirection || (exports.NestedDirection = {}));
var AlwaysScroll;
(function (AlwaysScroll) {
    AlwaysScroll[AlwaysScroll["Auto"] = 0] = "Auto";
    AlwaysScroll[AlwaysScroll["Header"] = 1] = "Header";
    AlwaysScroll[AlwaysScroll["Footer"] = 2] = "Footer";
})(AlwaysScroll = exports.AlwaysScroll || (exports.AlwaysScroll = {}));
var IndicatorMode;
(function (IndicatorMode) {
    IndicatorMode[IndicatorMode["Normal"] = 0] = "Normal";
    IndicatorMode[IndicatorMode["Button"] = 1] = "Button";
})(IndicatorMode = exports.IndicatorMode || (exports.IndicatorMode = {}));
var Transition;
(function (Transition) {
    Transition[Transition["None"] = 0] = "None";
    Transition[Transition["ColorTint"] = 1] = "ColorTint";
    Transition[Transition["SpriteSwap"] = 2] = "SpriteSwap";
    Transition[Transition["Scale"] = 3] = "Scale";
})(Transition = exports.Transition || (exports.Transition = {}));
var ReleaseState;
(function (ReleaseState) {
    ReleaseState["IDLE"] = "IDLE";
    ReleaseState["PULL"] = "PULL";
    ReleaseState["WAIT"] = "WAIT";
    ReleaseState["RELEASE"] = "RELEASE";
})(ReleaseState = exports.ReleaseState || (exports.ReleaseState = {}));
var HolderEvent;
(function (HolderEvent) {
    HolderEvent["CREATED"] = "ADAPTER:HOLDER:CREATED";
    HolderEvent["VISIBLE"] = "ADAPTER:HOLDER:VISIBLE";
    HolderEvent["DISABLE"] = "ADAPTER:HOLDER:DISABLE";
})(HolderEvent = exports.HolderEvent || (exports.HolderEvent = {}));
var ViewEvent;
(function (ViewEvent) {
    ViewEvent["VISIBLE"] = "ADAPTER:VIEW:VISIBLE";
    ViewEvent["DISABLE"] = "ADAPTER::VIEW:DISABLE";
})(ViewEvent = exports.ViewEvent || (exports.ViewEvent = {}));
cc.Enum(Orientation);
cc.Enum(MovementType);
cc.Enum(ArrangeAxis);
cc.Enum(StretchDirection);
cc.Enum(MagneticDirection);
cc.Enum(ScrollbarDirection);
cc.Enum(ChildAlignment);
cc.Enum(TouchMode);
cc.Enum(IndicatorMode);
cc.Enum(Transition);

cc._RF.pop();