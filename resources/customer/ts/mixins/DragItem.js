import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
// You can declare a mixin as the same style as components.
var DragItem = /** @class */ (function (_super) {
    tslib_1.__extends(DragItem, _super);
    function DragItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mixinValue = 'Hello';
        return _this;
    }
    DragItem = tslib_1.__decorate([
        Component
    ], DragItem);
    return DragItem;
}(Vue));
export default DragItem;
//# sourceMappingURL=DragItem.js.map