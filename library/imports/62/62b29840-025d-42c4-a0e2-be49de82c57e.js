"use strict";
cc._RF.push(module, '62b29hAAl1CxKDivknegsV+', 'EventConst');
// script/userData/EventConst.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoEvent = exports.GameEvent = void 0;
var GameEvent = /** @class */ (function () {
    function GameEvent() {
    }
    GameEvent.SET_DOORS = "SET_DOORS";
    GameEvent.RANK_TAB_CHANGE = "RANK_TAB_CHANGE";
    GameEvent.RANK_PAGE_1 = "RANK_PAGE_1";
    GameEvent.RANK_PAGE_2 = "RANK_PAGE_2";
    GameEvent.CLOSE_GAME = "CLOSE_GAME";
    GameEvent.OPEN_GAME = "OPEN_GAME";
    GameEvent.COIN_SCALE = "COIN_SCALE";
    return GameEvent;
}());
exports.GameEvent = GameEvent;
var VideoEvent = /** @class */ (function () {
    function VideoEvent() {
    }
    return VideoEvent;
}());
exports.VideoEvent = VideoEvent;

cc._RF.pop();