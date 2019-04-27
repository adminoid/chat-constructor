import * as tslib_1 from "tslib";
import Vue from 'vue';
import Vuex from 'vuex';
import Bot from "./modules/Bot";
Vue.use(Vuex);
export default new Vuex.Store({
    actions: {
<<<<<<< HEAD
        HideDeletedBot: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    console.log('here');
                    return [2 /*return*/];
                });
            });
        },
        addAction: function (context, payload) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    this.dispatch('HideDeletedBot', 1, { root: true });
                    console.log(context);
                    console.log(payload);
                    return [2 /*return*/];
                });
            });
        },
=======
        addAction: function () {
            console.log('a-a');
        }
>>>>>>> 981ec03e2f644af6ddb5163ffc80f27dcf845fe3
    },
    modules: {
        Bot: Bot
    }
});
//# sourceMappingURL=index.js.map