import * as tslib_1 from "tslib";
import { Module, VuexModule, Mutation, Action, } from 'vuex-module-decorators';
import axios from 'axios';
import * as _ from "lodash";
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
var Block = /** @class */ (function (_super) {
    tslib_1.__extends(Block, _super);
    function Block() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.blocks = [];
        _this.currentBotId = 1;
        return _this;
    }
    Object.defineProperty(Block.prototype, "baseUrl", {
        get: function () {
            return 'private/bots/' + this.currentBotId + '/blocks';
        },
        enumerable: true,
        configurable: true
    });
    Block.prototype.fetchBlocks = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.get(this.baseUrl)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Block.prototype.updateBlocks = function (blocks) {
        this.blocks = blocks.data;
    };
    Block.prototype.createBlock = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.post(this.baseUrl, {
                            'name': 'Blocky' + Math.floor(Math.random() * 6) + 1
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Block.prototype.appendBlock = function (block) {
        this.blocks.push(block.data);
    };
    Block.prototype.deleteBlock = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var resp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.delete(this.baseUrl + '/' + id)];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp.data];
                }
            });
        });
    };
    Block.prototype.removeBlock = function (id) {
        this.blocks = _.reject(this.blocks, function (b) { return b.id == id; });
    };
    tslib_1.__decorate([
        Action({ commit: 'updateBlocks', rawError: true })
    ], Block.prototype, "fetchBlocks", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "updateBlocks", null);
    tslib_1.__decorate([
        Action({ commit: 'appendBlock' })
    ], Block.prototype, "createBlock", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "appendBlock", null);
    tslib_1.__decorate([
        Action({ commit: 'removeBlock', rawError: true })
    ], Block.prototype, "deleteBlock", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "removeBlock", null);
    Block = tslib_1.__decorate([
        Module({
            namespaced: true, dynamic: true, store: new Vuex.Store({}), name: 'Block'
        })
    ], Block);
    return Block;
}(VuexModule));
export default Block;
//# sourceMappingURL=Block.js.map