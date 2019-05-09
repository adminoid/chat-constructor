import * as tslib_1 from "tslib";
import { Vue, Component } from 'vue-property-decorator';
import TopButton from "./TopButton.vue";
var CustomerApp = /** @class */ (function (_super) {
    tslib_1.__extends(CustomerApp, _super);
    function CustomerApp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.links = [
            'Боты',
            'Информация',
            'Личный кабинет',
        ];
        return _this;
    }
    CustomerApp.prototype.mounted = function () {
        // this.$confirm('Test confirm');
        // console.log(result);
        // this is plugin: `resources/customer/ts/plugins/windows.ts`
        // this.$confirm('Test confirm')
        //   .then(_=> console.log('confirmed'))
        //   .catch(e=> console.error(e.message))
    };
    CustomerApp = tslib_1.__decorate([
        Component({
            components: { TopButton: TopButton }
        })
    ], CustomerApp);
    return CustomerApp;
}(Vue));
export default CustomerApp;
//# sourceMappingURL=CustomerApp.vue.js.map