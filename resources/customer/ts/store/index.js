import * as tslib_1 from "tslib";
import Vue from 'vue';
import Vuex from 'vuex';
import Bot from "./modules/Bot";
Vue.use(Vuex);
export default new Vuex.Store({
    actions: {
        addAction: function (context, payload) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    context.dispatch('Bot/createBot', 237);
                    return [2 /*return*/];
                });
            });
        },
    },
    modules: {
        Bot: Bot
    }
});
//# sourceMappingURL=index.js.map