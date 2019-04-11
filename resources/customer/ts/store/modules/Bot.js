import * as tslib_1 from "tslib";
import { Module, VuexModule, Mutation, Action, } from 'vuex-module-decorators';
import axios from 'axios';
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
            return tslib_1.__generator(this, function (_a) {
                axios.get('private/bots')
                    .then(function (resp) {
                    console.log(resp);
                });
                return [2 /*return*/];
            });
        });
    };
    tslib_1.__decorate([
        Mutation
    ], Bot.prototype, "updateBots", null);
    tslib_1.__decorate([
        Action
    ], Bot.prototype, "fetchBots", null);
    Bot = tslib_1.__decorate([
        Module({
            name: 'Bot',
            namespaced: true,
            store: {},
        })
    ], Bot);
    return Bot;
}(VuexModule));
export default Bot;
//# sourceMappingURL=Bot.js.map