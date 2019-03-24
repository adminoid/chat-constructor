/**
 * This mixin for ConnectorCreate and ConnectorOutput
 */
import * as tslib_1 from "tslib";
import Vue from 'vue';
import store from '../store';
import { Mixin } from 'vue-mixin-decorator';
// You can declare a mixin as the same style as components.
let BeginLine = class BeginLine extends Vue {
    getLineBeginCoords() {
        let areaBoundaries = store.state.DropAreaModule.area.boundaries;
        let clientRect = this.$el.getBoundingClientRect();
        let paddingLeft = clientRect.width / 2, left = clientRect.left - areaBoundaries.left + paddingLeft, top = clientRect.bottom - areaBoundaries.top;
        return {
            left: left,
            top: top
        };
    }
    mounted() {
        // push begin coordinates to out connector
        store.commit('DropAreaModule/setBeginLineCoords', {
            itemId: this.blockId,
            connectorId: this.connectorId,
            coords: this.getLineBeginCoords(),
        });
    }
};
BeginLine = tslib_1.__decorate([
    Mixin
], BeginLine);
export default BeginLine;
//# sourceMappingURL=BeginLine.js.map