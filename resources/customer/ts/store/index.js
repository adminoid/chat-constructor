import * as tslib_1 from "tslib";
import Vue from 'vue';
import Vuex from 'vuex';
import Bot from "./modules/Bot";
Vue.use(Vuex);
export default new Vuex.Store({
    actions: {
        addAction: function (context, typeOfNew) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    console.log(typeOfNew);
                    if (typeOfNew === 'bot') {
                        console.log('BOT');
                    }
                    else if (typeOfNew === 'block') {
                        console.log('BlOCK');
                    }
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