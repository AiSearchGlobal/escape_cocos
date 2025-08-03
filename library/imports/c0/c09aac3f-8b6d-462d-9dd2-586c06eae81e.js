"use strict";
cc._RF.push(module, 'c09aaw/i21GLZ3SWGwG6uge', 'PoolMng');
// script/framework/manager/PoolMng.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolMng = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PoolMng = /** @class */ (function () {
    function PoolMng() {
        this.dictPool = {};
        this.dictPrefab = {};
        // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
    }
    PoolMng_1 = PoolMng;
    Object.defineProperty(PoolMng, "instance", {
        get: function () {
            if (this._instance) {
                return this._instance;
            }
            this._instance = new PoolMng_1();
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 根据预设从对象池中获取对应节点
     */
    PoolMng.prototype.getNode = function (prefab, parent) {
        var name = prefab.data.name;
        this.dictPrefab[name] = prefab;
        var node;
        if (this.dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            var pool = this.dictPool[name];
            if (pool.size() > 0) {
                node = pool.get();
            }
            else {
                node = cc.instantiate(prefab);
            }
        }
        else {
            //没有对应对象池，创建他！
            var pool = new cc.NodePool();
            this.dictPool[name] = pool;
            node = cc.instantiate(prefab);
        }
        node.parent = parent;
        return node;
    };
    /**
     * 根据预设从对象池中获取对应节点
     */
    // getSpineNode (_name: string, parent: cc.Node) {
    //     let name = _name;
    //     let node: cc.Node;
    //     if (this.dictPool.hasOwnProperty(name)) {
    //         //已有对应的对象池
    //         let pool = this.dictPool[name];
    //         if (pool.size() > 0) {
    //             node = pool.get()!;
    //         } else {
    //             node = cc.instantiate(prefab);
    //         }
    //     } else {
    //         //没有对应对象池，创建他！
    //         let pool = new cc.NodePool();
    //         this.dictPool[name] = pool;
    //         node = cc.instantiate(prefab);
    //     }
    //     node.parent = parent;
    //     return node;
    // }
    /**
     * 将对应节点放回对象池中
     */
    PoolMng.prototype.putNode = function (node) {
        var name = node.name;
        var pool = null;
        if (this.dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            pool = this.dictPool[name];
        }
        else {
            //没有对应对象池，创建他！
            pool = new cc.NodePool();
            this.dictPool[name] = pool;
        }
        pool.put(node);
    };
    /**
     * 根据名称，清除对应对象池
     */
    PoolMng.prototype.clearPool = function (name) {
        if (this.dictPool.hasOwnProperty(name)) {
            var pool = this.dictPool[name];
            pool.clear();
        }
    };
    var PoolMng_1;
    PoolMng = PoolMng_1 = __decorate([
        ccclass("poolMng")
    ], PoolMng);
    return PoolMng;
}());
exports.PoolMng = PoolMng;

cc._RF.pop();