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
        if (store.state.Block && this.$el) {
            var areaBoundaries = store.state.Block.area.boundaries, clientRect = this.$el.getBoundingClientRect(), paddingLeft = clientRect.width / 2, x = clientRect.left - areaBoundaries.left, y = clientRect.top - areaBoundaries.top;
            var ret = {
                left: x + paddingLeft,
                top: y,
            };
            console.log(ret);
            return ret;
        }
        return {
            left: 0,
            top: 0,
        };
    };
    EndLine.prototype.mounted = function () {
        store.commit('Block/updateEndLineCoords', {
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