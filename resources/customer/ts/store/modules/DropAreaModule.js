import * as tslib_1 from "tslib";
import { Module, VuexModule, Mutation, } from 'vuex-module-decorators';
var DropAreaModule = /** @class */ (function (_super) {
    tslib_1.__extends(DropAreaModule, _super);
    function DropAreaModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = [];
        return _this;
    }
    DropAreaModule.prototype.insert = function (item) {
        this.items.push(item);
    };
    tslib_1.__decorate([
        Mutation
    ], DropAreaModule.prototype, "insert", null);
    DropAreaModule = tslib_1.__decorate([
        Module({
            namespaced: true,
            name: 'DropAreaModule',
        })
    ], DropAreaModule);
    return DropAreaModule;
}(VuexModule));
export default DropAreaModule;
//# sourceMappingURL=DropAreaModule.js.map