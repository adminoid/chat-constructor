import * as tslib_1 from "tslib";
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
var TopButton = /** @class */ (function (_super) {
    tslib_1.__extends(TopButton, _super);
    function TopButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = 'Добавить бота';
        _this.type = 'bots';
        return _this;
    }
    tslib_1.__decorate([
        Action
    ], TopButton.prototype, "addAction", void 0);
    TopButton = tslib_1.__decorate([
        Component
    ], TopButton);
    return TopButton;
}(Vue));
export default TopButton;
//# sourceMappingURL=TopButton.vue.js.map