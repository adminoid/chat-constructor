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
        // console.log(store.state);
        // return;
        // let areaBoundaries = store.state.Blocks.area.boundaries,
        //   clientRect = this.$el.getBoundingClientRect(),
        //   paddingLeft = clientRect.width / 2,
        //   left = clientRect.left - areaBoundaries.left,
        //   top = clientRect.top - areaBoundaries.top;
        return {
            left: 964,
            top: 2
        };
        // return {
        //   left: left + paddingLeft,
        //   top: top,
        // };
    };
    EndLine.prototype.created = function () {
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