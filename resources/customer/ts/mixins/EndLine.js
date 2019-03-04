/**
 * This mixin for BlockBase and ConnectorClone
 */
import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import store from '../store';
// You can declare a mixin as the same style as components.
let EndLine = class EndLine extends Vue {
    getLineEndCoords() {
        let areaBoundaries = store.state.DropAreaModule.area.boundaries;
        let clientRect = this.$el.getBoundingClientRect();
        let paddingLeft = clientRect.width / 2, left = clientRect.left - areaBoundaries.left + paddingLeft, top = clientRect.top - areaBoundaries.top;
        return {
            left: left,
            top: top
        };
    }
    mounted() {
        // TODO: Install <https://github.com/justrhysism/vue-mixin-decorator> for properties linking
        // push end coordinates to out connector.target
        // console.log(this.id);
        store.commit('DropAreaModule/setEndLineCoords', {
            itemId: this.id,
            coords: this.getLineEndCoords(),
        });
    }
};
EndLine = tslib_1.__decorate([
    Component
], EndLine);
export default EndLine;
//# sourceMappingURL=EndLine.js.map