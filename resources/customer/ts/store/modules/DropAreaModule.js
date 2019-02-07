import * as tslib_1 from "tslib";
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
var DropAreaModule = /** @class */ (function (_super) {
    tslib_1.__extends(DropAreaModule, _super);
    function DropAreaModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = 237;
        return _this;
    }
    DropAreaModule.prototype.increment = function (delta) {
        this.count += delta;
    };
    DropAreaModule.prototype.decrement = function (delta) {
        this.count -= delta;
    };
    // action 'incr' commits mutation 'increment' when done with return value as payload
    DropAreaModule.prototype.incr = function () {
        return 5;
    };
    // action 'decr' commits mutation 'decrement' when done with return value as payload
    DropAreaModule.prototype.decr = function () {
        return 5;
    };
    tslib_1.__decorate([
        Mutation
    ], DropAreaModule.prototype, "increment", null);
    tslib_1.__decorate([
        Mutation
    ], DropAreaModule.prototype, "decrement", null);
    tslib_1.__decorate([
        Action({ commit: 'increment' })
    ], DropAreaModule.prototype, "incr", null);
    tslib_1.__decorate([
        Action({ commit: 'decrement' })
    ], DropAreaModule.prototype, "decr", null);
    DropAreaModule = tslib_1.__decorate([
        Module({ namespaced: true, name: 'DropAreaModule' })
    ], DropAreaModule);
    return DropAreaModule;
}(VuexModule));
export default DropAreaModule;
//# sourceMappingURL=DropAreaModule.js.map