import * as tslib_1 from "tslib";
import { Module, VuexModule, Mutation, Action, } from 'vuex-module-decorators';
import axios from 'axios';
import * as _ from 'lodash';
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
var Block = /** @class */ (function (_super) {
    tslib_1.__extends(Block, _super);
    function Block() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = [];
        _this.blockPositionSteps = {
            left: 15,
            top: 10,
        };
        _this.dd = {
            dragging: false,
            id: -1,
            elementOffset: -1,
            newIdx: -1,
            targetId: -1,
            sourcePath: [],
        };
        _this.area = {
            boundaries: {
                left: -1,
                top: -1,
                right: -1,
                bottom: -1,
            }
        };
        return _this;
    }
    Block.prototype.fetchBlocks = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.get("private/bots/" + id + "/blocks")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Block.prototype.updateBlocks = function (blocks) {
        this.items = blocks.data;
    };
    // @Mutation
    // setActiveTargetId( id: number ) {
    //   if( id > 0 ) {
    //     this.dd.targetId = id;
    //   }
    // }
    Block.prototype.setBeginLineCoords = function (payload) {
        var itemId = payload.itemId, connectorId = payload.connectorId, coords = payload.coords;
        _.map(this.items, function (item) {
            if (item.id === itemId) {
                item.itemData.connectors.output[connectorId].coords = coords;
            }
        });
    };
    Block.prototype.updateEndLineCoords = function (payload) {
        var itemId = payload.itemId, coords = payload.coords;
        _.map(this.items, function (item) {
            if (item.id === itemId) {
                item.sourceCoords = coords;
            }
            _.map(_.get(item, 'itemData.connectors.output'), function (connector) {
                if (connector.target === itemId) {
                    connector.targetCoords = coords;
                }
            });
        });
    };
    Block.prototype.setTargetForConnectorCreate = function (clickedConnectorInfo) {
        var _a = this.dd.sourcePath = clickedConnectorInfo, blockId = _a[0], connectorId = _a[1], item = _.find(this.items, ['id', blockId]);
        if (_.has(item, 'itemData.connectors.output')) {
            item.itemData.connectors.output[connectorId].target = this.dd.id;
        }
    };
    Block.prototype.setAreaBoundaries = function (data) {
        this.area.boundaries = data;
    };
    Block.prototype.updateCoords = function (coords) {
        // TODO - work here, find how change coordinates of moved `DragItemWrapper`
        if (this.dd.dragging) {
            console.info('dragging ---- ');
            // let actualCoords = {};
            //
            // Object.keys( coords ).map(( key ) => {
            //   actualCoords[key] = coords[key] - this.dd.elementOffset[key];
            // });
            //
            // if (this.items[this.items.length-1].position) {
            //   this.items[this.items.length-1].position = actualCoords;
            // }
            //
            // this.items[this.items.length-1].position = actualCoords;
        }
    };
    /**
     * Call when clicked on create connector
     *
     * @param cloneData
     */
    Block.prototype.insertConnectorClone = function (cloneData) {
        if (cloneData === void 0) { cloneData = {}; }
        // calculate position in area
        var inAreaPosition = {
            left: cloneData.clickedCoords.left - this.area.boundaries.left - cloneData.cursorOffset.left,
            top: cloneData.clickedCoords.top - this.area.boundaries.top - cloneData.cursorOffset.top,
        };
        var connectorData = {
            component: 'ConnectorClone',
            position: inAreaPosition,
            id: this.items.length,
        };
        this.dd.id = this.dd.newIdx = this.items.length;
        this.dd.dragging = true;
        this.dd.elementOffset = cloneData.cursorOffset;
        this.items.push(connectorData);
    };
    Block.prototype.insertItem = function (item) {
        this.items.push(item);
    };
    Block.prototype.dragDropDataReset = function () {
        this.dd = {
            dragging: false,
            id: -1,
            elementOffset: -1,
            newIdx: -1,
            targetId: -1,
            sourcePath: [],
        };
    };
    Block.prototype.dragDropDataSet = function (payload) {
        var id = payload.id, idx = payload.idx, elementOffset = payload.offset;
        this.dd.id = id;
        this.dd.dragging = true;
        this.dd.elementOffset = elementOffset;
        if (this.items.length > 1) {
            var draggingItem = this.items.splice(idx, 1);
            this.dd.newIdx = this.items.push(draggingItem[0]) - 1;
        }
        else if (this.items.length == 1) {
            this.dd.newIdx = 0;
        }
        else {
            throw 'Error: Here no one block... What do you want to move?';
        }
    };
    Block.prototype.checkCreateConnector = function (blockId) {
        var item = _.find(this.items, ['id', blockId]), connectorsOutput = _.get(item.itemData, 'connectors.output') || [], createButtonCnt = _.filter(connectorsOutput, ['type', 'create']).length;
        if (!createButtonCnt || createButtonCnt < 1) {
            !_.has(item, 'itemData') && _.set(item, 'itemData', { connectors: { output: [] } });
            !_.has(item, 'itemData.connectors') && _.set(item, 'itemData.connectors', { output: [] });
            item.itemData.connectors.output.push({
                type: 'create',
            });
        }
    };
    /**
     * Action because in the future planned make async ajax queries to the server
     *
     * @param params
     */
    Block.prototype.insertBlock = function (params) {
        if (params === void 0) { params = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var blockData, steps_1, total_1, actualSteps_1;
            return tslib_1.__generator(this, function (_a) {
                if (!_.has(params, 'component') || params.component !== 'BlockBase') {
                    params.component = 'BlockBase';
                }
                blockData = {
                    blockName: "__Block)_"
                };
                _.set(params, 'itemData', _.extend(blockData, _.omit(params, ['component', 'position'])));
                if (_.has(params, 'connectors')) {
                    delete params.connectors;
                }
                if (!_.has(params, 'position')) {
                    steps_1 = this.context.state.blockPositionSteps;
                    total_1 = this.context.state.items.length;
                    actualSteps_1 = {};
                    Object.keys(steps_1).map(function (key) {
                        actualSteps_1[key] = steps_1[key] * (total_1 + 1);
                    });
                    params.position = actualSteps_1;
                }
                params.id = this.context.getters['itemsTotal'];
                this.context.commit('insertItem', params);
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(Block.prototype, "itemsTotal", {
        get: function () {
            return this.items.length;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Action({ commit: 'updateBlocks', rawError: true })
    ], Block.prototype, "fetchBlocks", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "updateBlocks", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "setBeginLineCoords", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "updateEndLineCoords", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "setTargetForConnectorCreate", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "setAreaBoundaries", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "updateCoords", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "insertConnectorClone", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "insertItem", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "dragDropDataReset", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "dragDropDataSet", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "checkCreateConnector", null);
    tslib_1.__decorate([
        Action({ rawError: true })
    ], Block.prototype, "insertBlock", null);
    Block = tslib_1.__decorate([
        Module({
            name: 'Block',
            namespaced: true,
            dynamic: true,
            store: new Vuex.Store({}),
        })
    ], Block);
    return Block;
}(VuexModule));
export default Block;
//# sourceMappingURL=Block.js.map