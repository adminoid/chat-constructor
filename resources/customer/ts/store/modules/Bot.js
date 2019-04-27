import * as tslib_1 from "tslib";
import { Module, VuexModule, Mutation, Action, } from 'vuex-module-decorators';
import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
//dynamic: true, store, name: 'mm'
//namespaced: true, store, name: 'Bot'
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
    Bot.prototype.hideDeletedBot = function (bot) {
        this.bots.splice(this.bots.findIndex(function (item) { return item.id === bot.data.id; }), 1);
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
    ], Bot.prototype, "hideDeletedBot", null);
    tslib_1.__decorate([
        Action({ commit: 'hideBot', rawError: true })
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