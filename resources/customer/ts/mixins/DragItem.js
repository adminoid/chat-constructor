import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import store from '../store';
// You can declare a mixin as the same style as components.
let DragItem = class DragItem extends Vue {
    // You can declare a mixin as the same style as components.
    constructor() {
        super(...arguments);
        this.mixinValue = 'Hello';
    }
    testMethod() {
        console.group('DragItem.ts');
        console.log(store.state.version);
        // store.commit('DropAreaModule/change', 111);
        // console.log(store.state.version);
        // console.log(store.state.DropAreaModule.count);
        console.groupEnd();
    }
};
DragItem = tslib_1.__decorate([
    Component
], DragItem);
export default DragItem;
//# sourceMappingURL=DragItem.js.map