import * as tslib_1 from "tslib";
import Vue from 'vue';
import Vuex from 'vuex';
import Bot from "./modules/Bot";
import Block from "./modules/Block";
Vue.use(Vuex);
export default new Vuex.Store({
    actions: {
        addAction: function (context, typeOfNew) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(typeOfNew === 'bot')) return [3 /*break*/, 2];
                            return [4 /*yield*/, context.dispatch('Bot/createBot')];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2:
                            if (!(typeOfNew === 'block')) return [3 /*break*/, 4];
                            return [4 /*yield*/, context.dispatch('Block/createBlock')];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
    },
    modules: {
        Bot: Bot, Block: Block
    }
});
//# sourceMappingURL=index.js.map