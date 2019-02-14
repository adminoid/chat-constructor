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
            newIdx: -1,
        };
        this.area = {
            boundaries: {
                left: -1,
                top: -1,
                right: -1,
                bottom: -1,
            }
        };
    }
    setAreaBoundaries(data) {
        this.area.boundaries = data;
    }
    updateCoords(coords) {
        if (this.dd.dragging) {
            let actualCoords = {};
            Object.keys(coords).map((key) => {
                actualCoords[key] = coords[key] - this.dd.elementOffset[key];
            });
            if (actualCoords['left']) {
            }
            this.items[this.items.length - 1].position = actualCoords;
        }
    }
    insertItem(item) {
        this.items.push(item);
    }
    dragDropDataReset() {
        this.dd = {
            dragging: false,
            startIdx: -1,
            elementOffset: -1,
            newIdx: -1,
        };
    }
    dragDropDataSet(payload) {
        let { idx, offset: elementOffset } = payload;
        this.dd.startIdx = idx;
        this.dd.dragging = true;
        this.dd.elementOffset = elementOffset;
        if (this.items.length > 1) {
            let draggingItem = this.items.splice(idx, 1);
            this.dd.newIdx = this.items.push(draggingItem[0]) - 1;
        }
        else if (this.items.length == 1) {
            this.dd.newIdx = 0;
        }
        else {
            throw 'Error: Here no one block... What do you want to move?';
        }
    }
    /**
     * Action because in the future planned make async ajax queries to the server
     *
     * @param itemData
     */
    async insertBlock(itemData = {}) {
        if (!_.has(itemData, 'component') || itemData.component !== 'BlockBase') {
            itemData.component = 'BlockBase';
        }
        if (!_.has(itemData, 'blockName')) {
            itemData.initialData = {
                blockName: `Block №${this.context.getters['itemsTotal']}`,
            };
        }
        let steps = this.context.state.blockPositionSteps;
        let total = this.context.state.items.length;
        let actualSteps = {};
        Object.keys(steps).map((key) => {
            actualSteps[key] = steps[key] * (total + 1);
        });
        // console.log(itemData);
        itemData.position = actualSteps;
        this.context.commit('insertItem', itemData);
    }
    get itemsTotal() {
        return this.items.length;
    }
};
tslib_1.__decorate([
    Mutation
], DropAreaModule.prototype, "setAreaBoundaries", null);
tslib_1.__decorate([
    Mutation
], DropAreaModule.prototype, "updateCoords", null);
tslib_1.__decorate([
    Mutation
], DropAreaModule.prototype, "insertItem", null);
tslib_1.__decorate([
    Mutation
], DropAreaModule.prototype, "dragDropDataReset", null);
tslib_1.__decorate([
    Mutation
], DropAreaModule.prototype, "dragDropDataSet", null);
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