import * as tslib_1 from "tslib";
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
var Bot = namespace('Bot');
var BotsArea = /** @class */ (function (_super) {
    tslib_1.__extends(BotsArea, _super);
    function BotsArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BotsArea.prototype.created = function () {
        console.log('bots area created');
        this.fetchBots();
    };
    tslib_1.__decorate([
        Bot.State
    ], BotsArea.prototype, "bots", void 0);
    tslib_1.__decorate([
        Bot.Action
    ], BotsArea.prototype, "fetchBots", void 0);
    BotsArea = tslib_1.__decorate([
        Component
    ], BotsArea);
    return BotsArea;
}(Vue));
export default BotsArea;
//# sourceMappingURL=BotsArea.vue.js.map