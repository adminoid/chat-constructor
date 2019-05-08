import * as tslib_1 from "tslib";
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action } from 'vuex-class';
var TopButton = /** @class */ (function (_super) {
    tslib_1.__extends(TopButton, _super);
    function TopButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = 'Добавить бота';
        _this.type = 'bot';
        return _this;
    }
    TopButton.prototype.onUrlChange = function (newRoute) {
        if (newRoute.name == 'block') {
            this.text = 'Добавить блок';
            this.type = 'block';
        }
        else {
            this.text = 'Добавить бота';
            this.type = 'bot';
        }
    };
    tslib_1.__decorate([
        Action
    ], TopButton.prototype, "addAction", void 0);
    tslib_1.__decorate([
        Watch('$route', { immediate: true, deep: true })
    ], TopButton.prototype, "onUrlChange", null);
    TopButton = tslib_1.__decorate([
        Component
    ], TopButton);
    return TopButton;
}(Vue));
export default TopButton;
//# sourceMappingURL=TopButton.vue.js.map