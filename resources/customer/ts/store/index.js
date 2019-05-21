import * as tslib_1 from "tslib";
import Vuex from 'vuex';
import Bot from "./modules/Bot";
import Block from "./modules/Block";
export default new Vuex.Store({
    actions: {
        createEntity: function (context, typeOfNew) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    if (typeOfNew === 'bot') {
                        console.log('bOt');
                        // await context.dispatch('Bot/createBot');
                    }
                    else if (typeOfNew === 'block') {
                        console.log('blOck');
                        // await context.dispatch('Block/createBlock');
                    }
                    return [2 /*return*/];
                });
            });
        },
    },
    modules: {
        Bot: Bot, Block: Block
    }
});
//# sourceMappingURL=index.js.map