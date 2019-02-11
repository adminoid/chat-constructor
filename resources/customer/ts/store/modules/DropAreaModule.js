import * as tslib_1 from "tslib";
import { Module, VuexModule, Mutation, Action, } from 'vuex-module-decorators';
import _ from 'lodash';
let DropAreaModule = class DropAreaModule extends VuexModule {
    constructor() {
        super(...arguments);
        this.items = [];
        this.blockPositionSteps = {
            left: 15,
            top: 10,
        };
        this.dd = {
            dragging: false,
            startIdx: -1,
            elementOffset: -1,
        };
    }
    insertItem(item) {
        this.items.push(item);
    }
    setDragDropData(payload) {
        let { idx, elementOffset } = payload;
        let draggingItem = this.items.splice(idx, 1);
        this.dd.dragging = true;
        this.dd.startIdx = idx;
        this.dd.elementOffset = elementOffset;
        this.items.push(draggingItem[0]);
        // console.group('startDragging');
        // console.log(draggingItem[0]);
        // console.log(this.dd);
        // console.log(this.items);
        // console.log(idx, offset);
        // console.log(payload); // idx, offset<left, top>
        // console.log(this.dd);
        // console.groupEnd();
    }
    async insertBlock(itemData) {
        if (!_.has(itemData, 'component') || itemData.component !== 'BlockBase') {
            itemData.component = 'BlockBase';
        }
        let steps = this.context.state.blockPositionSteps;
        let total = this.context.state.items.length;
        let actualSteps = {};
        Object.keys(steps).map((key) => {
            actualSteps[key] = steps[key] * (total + 1) + 'px';
        });
        itemData.position = actualSteps;
        this.context.commit('insertItem', itemData);
    }
};
tslib_1.__decorate([
    Mutation
], DropAreaModule.prototype, "insertItem", null);
tslib_1.__decorate([
    Mutation
], DropAreaModule.prototype, "setDragDropData", null);
tslib_1.__decorate([
    Action({ rawError: true })
], DropAreaModule.prototype, "insertBlock", null);
DropAreaModule = tslib_1.__decorate([
    Module({
        name: 'DropAreaModule',
        namespaced: true,
        store: {},
    })
], DropAreaModule);
export default DropAreaModule;
//# sourceMappingURL=DropAreaModule.js.map