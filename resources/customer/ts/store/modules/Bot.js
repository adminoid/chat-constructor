import * as tslib_1 from "tslib";
import { Module, VuexModule, Mutation, Action, } from 'vuex-module-decorators';
import _ from "lodash";
import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
//dynamic: true, namespaced: true
var Bot = /** @class */ (function (_super) {
    tslib_1.__extends(Bot, _super);
    function Bot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baseUrl = 'private/bots';
        _this.bots = [];
        return _this;
    }
    Bot.prototype.updateBots = function (bots) {
        this.bots = bots.data;
    };
    Bot.prototype.appendBot = function (bot) {
        this.bots.push(bot.data);
    };
    Bot.prototype.removeBot = function (bot) {
        _.remove(this.bots, {
            id: bot.id
        });
    };
    Bot.prototype.createBot = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.post(this.baseUrl, {
                            'name': 'Wally'
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Bot.prototype.deleteBot = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.delete(this.baseUrl + '/' + id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Bot.prototype.fetchBots = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.get(this.baseUrl)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    tslib_1.__decorate([
        Mutation
    ], Bot.prototype, "updateBots", null);
    tslib_1.__decorate([
        Mutation
    ], Bot.prototype, "appendBot", null);
    tslib_1.__decorate([
        Mutation
    ], Bot.prototype, "removeBot", null);
    tslib_1.__decorate([
        Action({ commit: 'appendBot' })
    ], Bot.prototype, "createBot", null);
    tslib_1.__decorate([
        Action({ commit: 'removeBot', rawError: true })
    ], Bot.prototype, "deleteBot", null);
    tslib_1.__decorate([
        Action({ commit: 'updateBots', rawError: true })
    ], Bot.prototype, "fetchBots", null);
    Bot = tslib_1.__decorate([
        Module({
            namespaced: true, dynamic: true, store: new Vuex.Store({}), name: 'Bot'
        })
    ], Bot);
    return Bot;
}(VuexModule));
export default Bot;
//# sourceMappingURL=Bot.js.map