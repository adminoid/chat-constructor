import * as tslib_1 from "tslib";
import { Module, VuexModule, Mutation, Action, } from 'vuex-module-decorators';
import axios from 'axios';
import * as _ from "lodash";
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
var Bot = /** @class */ (function (_super) {
    tslib_1.__extends(Bot, _super);
    function Bot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baseUrl = 'private/bots';
        _this.bots = [];
        _this.activeBotId = -1;
        _this.flagship = 0;
        return _this;
    }
    Bot.prototype.fetchBots = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, axios.get(this.baseUrl)];
            });
        });
    };
    Bot.prototype.updateBots = function (bots) {
        this.bots = bots.data;
    };
    Bot.prototype.getFlagship = function (botId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, axios.get("private/get-flagship/" + botId)];
            });
        });
    };
    Bot.prototype.saveFlagship = function (blockId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, axios.get("private/set-flagship/" + blockId)];
            });
        });
    };
    Bot.prototype.setFlagship = function (resp) {
        this.flagship = resp.data;
    };
    Bot.prototype.createBot = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, axios.post(this.baseUrl, {
                        'name': 'Billy ' + Math.floor(Math.random() * 6) + 1
                    }).then(function (resp) { return resp; }).catch(function (e) { return e.message; })];
            });
        });
    };
    Bot.prototype.appendBot = function (response) {
        if (typeof response !== 'string')
            this.bots.push(response.data);
    };
    Bot.prototype.deleteBot = function (id) {
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
    Bot.prototype.removeBot = function (id) {
        this.bots = _.reject(this.bots, function (b) { return b.id == id; });
    };
    tslib_1.__decorate([
        Action({ commit: 'updateBots', rawError: true })
    ], Bot.prototype, "fetchBots", null);
    tslib_1.__decorate([
        Mutation
    ], Bot.prototype, "updateBots", null);
    tslib_1.__decorate([
        Action({ commit: 'setFlagship' })
    ], Bot.prototype, "getFlagship", null);
    tslib_1.__decorate([
        Action({ commit: 'setFlagship', rawError: true })
    ], Bot.prototype, "saveFlagship", null);
    tslib_1.__decorate([
        Mutation
    ], Bot.prototype, "setFlagship", null);
    tslib_1.__decorate([
        Action({ commit: 'appendBot' })
    ], Bot.prototype, "createBot", null);
    tslib_1.__decorate([
        Mutation
    ], Bot.prototype, "appendBot", null);
    tslib_1.__decorate([
        Action({ commit: 'removeBot', rawError: true })
    ], Bot.prototype, "deleteBot", null);
    tslib_1.__decorate([
        Mutation
    ], Bot.prototype, "removeBot", null);
    Bot = tslib_1.__decorate([
        Module({
            name: 'Bot',
            namespaced: true,
            dynamic: true,
            store: new Vuex.Store({}),
        })
    ], Bot);
    return Bot;
}(VuexModule));
export default Bot;
//# sourceMappingURL=Bot.js.map