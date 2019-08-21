import * as tslib_1 from "tslib";
import Vuex from 'vuex';
import Bot from "./modules/Bot";
import Block from "./modules/Block";
export default new Vuex.Store({
    actions: {
        createEntity: function (context, payload) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var e_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(payload.type === 'bot')) return [3 /*break*/, 2];
                            return [4 /*yield*/, context.dispatch('Bot/createBot')];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 2:
                            if (!(payload.type === 'block')) return [3 /*break*/, 8];
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 7, , 8]);
                            if (!(payload.botId > 0)) return [3 /*break*/, 5];
                            return [4 /*yield*/, context.dispatch('Block/createBlock', payload.botId)];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            console.error('Значение botId не передано');
                            _a.label = 6;
                        case 6: return [3 /*break*/, 8];
                        case 7:
                            e_1 = _a.sent();
                            console.error(e_1);
                            return [3 /*break*/, 8];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        },
    },
    modules: {
        Bot: Bot, Block: Block
    }
});
// TODO: delete connection if drag to area from input connector
//# sourceMappingURL=index.js.map