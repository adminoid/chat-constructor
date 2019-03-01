import * as tslib_1 from "tslib";
import { Module, VuexModule, Mutation, Action, } from 'vuex-module-decorators';
import * as _ from 'lodash';
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
    setTargetForConnectorCreate(clickedConnectorInfo) {
        // getBlock
        let [blockId, connectorId] = clickedConnectorInfo;
        this.items[blockId].itemData.connectors.output[connectorId].target = this.dd.newIdx;
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
            this.items[this.items.length - 1].position = actualCoords;
        }
    }
    /**
     * Call when clicked on create connector
     *
     * @param cloneData
     */
    insertConnectorClone(cloneData = {}) {
        // calculate position in area
        let inAreaPosition = {
            left: cloneData.clickedCoords.left - this.area.boundaries.left - cloneData.cursorOffset.left,
            top: cloneData.clickedCoords.top - this.area.boundaries.top - cloneData.cursorOffset.top,
        };
        let connectorData = {
            component: 'ConnectorClone',
            position: inAreaPosition,
        };
        this.dd.startIdx = this.dd.newIdx = this.items.length;
        this.dd.dragging = true;
        this.dd.elementOffset = cloneData.cursorOffset;
        this.items.push(connectorData);
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
    pushCreateConnector(blockId) {
        console.info('here');
        console.log(this.items[blockId].itemData);
        // console.log(this.items[blockId].itemData.hasOwnProperty('connectors'));
        console.log(this.items[blockId].itemData.connectors);
        if (!_.has(this.items[blockId], 'itemData.connectors')) {
            this.items[blockId].itemData = {
                connectors: {
                    output: []
                }
            };
        }
        this.items[blockId].itemData.connectors.output.push({
            type: 'create',
        });
    }
    /**
     * Action because in the future planned make async ajax queries to the server
     *
     * @param params
     */
    async insertBlock(params = {}) {
        if (!_.has(params, 'component') || params.component !== 'BlockBase') {
            params.component = 'BlockBase';
        }
        let blockData;
        // It's temporary decor
        if (!_.has(params, 'blockName')) {
            blockData = {
                blockName: `Block №${this.context.getters['itemsTotal']}`,
            };
        }
        params.itemData = _.assign(blockData, _.omit(params, ['component', 'position']));
        if (_.has(params, 'connectors')) {
            delete params.connectors;
        }
        // console.log(params);
        // params.itemData.connectors = {
        //   output: [{
        //     type: 'output',
        //     target: 1,
        //   }, {
        //     type: 'create',
        //   }]
        // };
        if (!_.has(params, 'position')) {
            let steps = this.context.state.blockPositionSteps;
            let total = this.context.state.items.length;
            let actualSteps = {};
            Object.keys(steps).map((key) => {
                actualSteps[key] = steps[key] * (total + 1);
            });
            params.position = actualSteps;
        }
        // console.log(params);
        // return;
        this.context.commit('insertItem', params);
    }
    get itemsTotal() {
        return this.items.length;
    }
};
tslib_1.__decorate([
    Mutation
], DropAreaModule.prototype, "setTargetForConnectorCreate", null);
tslib_1.__decorate([
    Mutation
], DropAreaModule.prototype, "setAreaBoundaries", null);
tslib_1.__decorate([
    Mutation
], DropAreaModule.prototype, "updateCoords", null);
tslib_1.__decorate([
    Mutation
], DropAreaModule.prototype, "insertConnectorClone", null);
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
    Mutation
], DropAreaModule.prototype, "pushCreateConnector", null);
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