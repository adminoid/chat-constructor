/**
 * This mixin for ConnectorCreate and ConnectorOutput
 */
import * as tslib_1 from "tslib";
import Vue from 'vue';
import store from '../store';
import { Mixin } from 'vue-mixin-decorator';
// You can declare a mixin as the same style as components.
var BeginLine = /** @class */ (function (_super) {
    tslib_1.__extends(BeginLine, _super);
    function BeginLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BeginLine.prototype.getLineBeginCoords = function () {
        var areaBoundaries = store.state.Block.area.boundaries;
        var clientRect = this.$el.getBoundingClientRect();
        var paddingLeft = clientRect.width / 2, left = clientRect.left - areaBoundaries.left + paddingLeft + store.state.Block.scrollPosition.left, top = clientRect.bottom - areaBoundaries.top + store.state.Block.scrollPosition.top;
        return {
            left: left,
            top: top,
        };
    };
    BeginLine.prototype.mounted = function () {
        // push begin coordinates to out connector
        var payload = {
            itemId: this.blockId,
            connectorId: this.connectorData.id,
            coords: this.getLineBeginCoords(),
        };
        store.commit('Block/setBeginLineCoords', payload);
    };
    BeginLine = tslib_1.__decorate([
        Mixin
    ], BeginLine);
    return BeginLine;
}(Vue));
export default BeginLine;
//# sourceMappingURL=BeginLine.js.map