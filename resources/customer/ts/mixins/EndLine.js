/**
 * This mixin for BlockBase and ConnectorClone
 */
import * as tslib_1 from "tslib";
import Vue from 'vue';
import store from '../store';
import { Mixin } from 'vue-mixin-decorator';
// You can declare a mixin as the same style as components.
let EndLine = class EndLine extends Vue {
    getLineEndCoords() {
        let areaBoundaries = store.state.DropAreaModule.area.boundaries;
        let clientRect = this.$el.getBoundingClientRect();
        let paddingLeft = clientRect.width / 2, left = clientRect.left - areaBoundaries.left, top = clientRect.top - areaBoundaries.top;
        return {
            left: left + paddingLeft,
            top: top,
        };
    }
    mounted() {
        store.commit('DropAreaModule/updateEndLineCoords', {
            itemId: this.id,
            coords: this.getLineEndCoords(),
        });
    }
};
EndLine = tslib_1.__decorate([
    Mixin
], EndLine);
export default EndLine;
//# sourceMappingURL=EndLine.js.map