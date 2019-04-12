import * as tslib_1 from "tslib";
import { Module, VuexModule, Mutation, Action, } from 'vuex-module-decorators';
import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
// import store from '../index'
//dynamic: true, store, name: 'mm'
//namespaced: true, store, name: 'Bot'
var Bot = /** @class */ (function (_super) {
    tslib_1.__extends(Bot, _super);
    function Bot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bots = [];
        return _this;
    }
    Bot.prototype.updateBots = function (bots) {
        this.bots = bots;
    };
    Bot.prototype.fetchBots = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.get('private/bots')
                            .then(function (resp) {
                            _this.updateBots(resp.data);
                        })
                            .catch(function (err) {
                            console.log(err);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        Mutation
    ], Bot.prototype, "updateBots", null);
    tslib_1.__decorate([
        Action({ rawError: true })
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