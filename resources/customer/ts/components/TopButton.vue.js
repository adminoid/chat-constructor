import * as tslib_1 from "tslib";
lang;
"pug" >
    button(type = "button", /** @class */ (function () {
        function class_1() {
        }
        return class_1;
    }()) = "top-panel__add-block-btn btn btn-success");
"addAction(type)";
{
    {
        text;
    }
}
/template>
    < script;
lang = "ts" >
;
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
/script>
    < style;
scoped >
    /style>;
//# sourceMappingURL=TopButton.vue.js.map