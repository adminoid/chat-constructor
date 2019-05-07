import * as tslib_1 from "tslib";
import { Module, VuexModule, Mutation, Action, } from 'vuex-module-decorators';
import axios from 'axios';
// import _ from "lodash"
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
        // @Mutation
        // removeBot(id) {
        //   console.info(id + ' - update here! ');
        //   this.bots = _.filter(this.bots, function(o) { return o.id === id; });
        //   // this.bots = [];
        // }
    }
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
    Bot.prototype.updateBots = function (bots) {
        this.bots = bots.data;
    };
    Bot.prototype.createBot = function (type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.post(this.baseUrl, {
                            'name': 'Billy' + Math.floor(Math.random() * 6) + 1
                        })];
                    case 1: 
                    // console.log(type); // todo: add TypeBot/TypeBlock
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Bot.prototype.appendBot = function (bot) {
        this.bots.push(bot.data);
    };
    Bot.prototype.deleteBot = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var deletedId;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.delete(this.baseUrl + '/' + id)];
                    case 1:
                        deletedId = _a.sent();
                        return [2 /*return*/, deletedId];
                }
            });
        });
    };
    tslib_1.__decorate([
        Action({ commit: 'updateBots', rawError: true })
    ], Bot.prototype, "fetchBots", null);
    tslib_1.__decorate([
        Mutation
    ], Bot.prototype, "updateBots", null);
    tslib_1.__decorate([
        Action({ commit: 'appendBot' })
    ], Bot.prototype, "createBot", null);
    tslib_1.__decorate([
        Mutation
    ], Bot.prototype, "appendBot", null);
    tslib_1.__decorate([
        Action({ rawError: true })
    ], Bot.prototype, "deleteBot", null);
    Bot = tslib_1.__decorate([
        Module({
            namespaced: true, dynamic: true, store: new Vuex.Store({}), name: 'Bot'
        })
    ], Bot);
    return Bot;
}(VuexModule));
export default Bot;
//# sourceMappingURL=Bot.js.map