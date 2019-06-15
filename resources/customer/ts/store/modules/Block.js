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
    Block.prototype.saveBlockData = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.patch("private/bots/" + data.botId + "/blocks/" + data.blockId, data.sendData)
                        // .then((response) => {
                        //   console.log(response);
                        // });
                    ];
                    case 1: return [2 /*return*/, _a.sent()
                        // .then((response) => {
                        //   console.log(response);
                        // });
                    ];
                }
            });
        });
    };
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
    Block.prototype.setActiveTargetId = function (id) {
        if (id > 0) {
            this.dd.targetId = id;
        }
    };
    Block.prototype.setBeginLineCoords = function (payload) {
        // console.log(payload);
        var itemId = payload.itemId, connectorId = payload.connectorId, coords = payload.coords;
        _.map(this.items, function (item) {
            if (item.id === itemId) {
                var output = _.find(item.outputs, ['id', connectorId]);
                output.coords = coords;
            }
        });
    };
    Block.prototype.updateEndLineCoords = function (payload) {
        // console.log(payload);
        // return;
        var itemId = payload.itemId, x = payload.x, y = payload.y;
        _.map(this.items, function (item) {
            if (item.id === itemId) {
                item.x = x;
                item.y = y;
                _.map(item.outputs, function (connector) {
                    if (connector.target_block_id === itemId) {
                        connector.targetCoords = { left: x, top: y };
                    }
                });
            }
        });
    };
    Block.prototype.setTargetForConnector = function (clickedConnectorInfo) {
        // console.log(clickedConnectorInfo);
        var _a = this.dd.sourcePath = clickedConnectorInfo, blockId = _a[0], connectorId = _a[1], item = _.find(this.items, ['id', blockId]);
        console.log(item.outputs);
        console.log(connectorId);
        var output = _.find(item.outputs, ['id', connectorId]);
        if (output) {
            output.target_block_id = this.dd.id;
            // item.outputs[connectorId].target_block_id = this.dd.id;
        }
    };
    Block.prototype.setAreaBoundaries = function (data) {
        this.area.boundaries = data;
    };
    Block.prototype.updateCoords = function (coords) {
        if (coords && this.dd.dragging) {
            var x = coords[0], y = coords[1], draggedItem = this.items[this.items.length - 1];
            draggedItem.x = x;
            draggedItem.y = y;
        }
    };
    /**
     * Call when clicked on create connector
     *
     * @param cloneData
     */
    Block.prototype.insertConnectorClone = function (cloneData) {
        // console.log(cloneData);
        if (cloneData === void 0) { cloneData = {}; }
        // calculate position in area
        var x = cloneData.clickedCoords.left - this.area.boundaries.left - cloneData.cursorOffset.left, y = cloneData.clickedCoords.top - this.area.boundaries.top - cloneData.cursorOffset.top;
        // make virtual id for connector-clone without saving to backend
        var virtualNextId = Math.max.apply(Math, this.items.map(function (o) { return o.id; })) + 1;
        // console.log(virtualNextId);
        var connectorData = {
            component: 'ConnectorClone',
            id: virtualNextId,
            x: x,
            y: y,
        };
        this.dd.id = this.dd.newIdx = virtualNextId;
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
    Object.defineProperty(Block.prototype, "itemsTotal", {
        // @Mutation
        // checkCreateConnector(blockId: number) {
        //
        //   let item = _.find(this.items, ['id', blockId]),
        //     connectorsOutput = _.get(item.itemData, 'connectors.output') || [],
        //     createButtonCnt = _.filter(connectorsOutput, ['type', 'create']).length;
        //
        //   if (!createButtonCnt || createButtonCnt < 1) {
        //     !_.has( item, 'itemData' ) && _.set( item, 'itemData', { connectors: { output: [] } } );
        //
        //     !_.has( item, 'itemData.connectors' ) && _.set( item, 'itemData.connectors', { output: [] } );
        //
        //     item.itemData.connectors.output.push({
        //       type: 'create',
        //     });
        //   }
        //
        // }
        /**
         * Action because in the future planned make async ajax queries to the server
         *
         * @param params
         */
        // @Action({rawError: true})
        // async insertBlock(params: any = {}) {
        //
        //   if( !_.has( params, 'component' ) || params.component !== 'BlockBase' ) {
        //     params.component = 'BlockBase';
        //   }
        //
        //   let blockData: object = {
        //     blockName: `__Block)_`
        //   };
        //
        //   _.set(params, 'itemData', _.extend(blockData, _.omit(params, ['component', 'position'])));
        //
        //   if ( _.has(params, 'connectors') ) {
        //     delete params.connectors;
        //   }
        //
        //   if( !_.has( params, 'position' ) ) {
        //     let steps = (this.context.state as any).blockPositionSteps;
        //     let total = (this.context.state as any).items.length;
        //
        //     let actualSteps = {};
        //     Object.keys(steps).map((key) => {
        //       actualSteps[key] = steps[key] * ( total + 1 );
        //     });
        //
        //     params.position = actualSteps;
        //   }
        //
        //   params.id = this.context.getters['itemsTotal'];
        //
        //   this.context.commit('insertItem', params);
        //
        // }
        get: function () {
            return this.items.length;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Action
    ], Block.prototype, "saveBlockData", null);
    tslib_1.__decorate([
        Action({ commit: 'updateBlocks', rawError: true })
    ], Block.prototype, "fetchBlocks", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "updateBlocks", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "setActiveTargetId", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "setBeginLineCoords", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "updateEndLineCoords", null);
    tslib_1.__decorate([
        Mutation
    ], Block.prototype, "setTargetForConnector", null);
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