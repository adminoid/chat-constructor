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
        var areaBoundaries = store.state.DropAreaModule.area.boundaries;
        var clientRect = this.$el.getBoundingClientRect();
        var paddingLeft = clientRect.width / 2, left = clientRect.left - areaBoundaries.left, top = clientRect.top - areaBoundaries.top;
        return {
            left: left + paddingLeft,
            top: top,
        };
    };
    EndLine.prototype.mounted = function () {
        store.commit('DropAreaModule/updateEndLineCoords', {
            itemId: this.id,
            coords: this.getLineEndCoords(),
        });
    };
    EndLine = tslib_1.__decorate([
        Mixin
    ], EndLine);
    return EndLine;
}(Vue));
export default EndLine;
//# sourceMappingURL=EndLine.js.map