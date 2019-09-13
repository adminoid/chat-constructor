/**
 * This mixin for BlockBase and ConnectorClone
 */
import * as tslib_1 from "tslib";
import Vue from 'vue';
import store from '../store';
import { Mixin } from 'vue-mixin-decorator';
// You can declare a mixin as the same style as components.
var EndLine = /** @class */ (function (_super) {
    tslib_1.__extends(EndLine, _super);
    function EndLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EndLine.prototype.getLineEndCoords = function () {
        var addTop = 0;
        if (this.$options.name == 'ConnectorClone') {
            addTop = 8;
        }
        var areaBoundaries = store.state.Block.area.boundaries, clientRect = this.$el.getBoundingClientRect(), paddingLeft = clientRect.width / 2, x = clientRect.left - areaBoundaries.left + store.state.Block.scrollPosition.left, y = clientRect.top - areaBoundaries.top + store.state.Block.scrollPosition.top + addTop;
        return {
            left: x + paddingLeft,
            top: y,
        };
    };
    EndLine.prototype.mounted = function () {
        var id = this.id || this.itemData.id, coords = this.getLineEndCoords();
        store.commit('Block/updateEndLineCoords', {
            itemId: id,
            x: coords.left,
            y: coords.top,
        });
    };
    EndLine = tslib_1.__decorate([
        Mixin
    ], EndLine);
    return EndLine;
}(Vue));
export default EndLine;
//# sourceMappingURL=EndLine.js.map