import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators'

import axios from 'axios'
import * as _ from 'lodash'
import Vuex from 'vuex';
import Vue from 'vue'
Vue.use(Vuex);

@Module({
  name: 'Block',
  namespaced: true,
  dynamic: true,
  store: new Vuex.Store({}),
})
export default class Block extends VuexModule {

  $route;

  items = [];

  blockPositionSteps = {
    left: 15,
    top: 10,
  };

  dd = {
    dragging: false,
    id: -1,
    elementOffset: -1,
    newIdx: -1,
    targetId: -1,
    sourcePath: [],
  };

  area = {
    boundaries: {
      left: -1,
      top: -1,
      right: -1,
      bottom: -1,
    }
  };

  botId: -1;

  baseUrl: 'private/bots';

  @Action({ commit: 'updateBlocks', rawError: true })
  async fetchBlocks( botId1 ) {
    return await axios.get(`private/bots/${botId1}/blocks`);
  }
  @Mutation
  updateBots( blocks ) {
    this.items = blocks.data;
  }

  @Mutation
  setActiveTargetId( id: number ) {
    if( id > 0 ) {
      this.dd.targetId = id;
    }
  }

  @Mutation
  setBeginLineCoords( payload ) {
    let { itemId, connectorId, coords } = payload;

    _.map( this.items, item => {
      if ( item.id === itemId ) {
        item.itemData.connectors.output[connectorId].coords = coords;
      }
    });

  }

  @Mutation
  updateEndLineCoords( payload ) {
    let { itemId, coords } = payload;
    _.map( this.items, (item) => {
      if( item.id === itemId ) {
        item.sourceCoords = coords;
      }
      _.map( _.get(item, 'itemData.connectors.output'), connector => {
        if( connector.target === itemId ) {
          connector.targetCoords = coords;
        }
      });

    } );
  }

  @Mutation
  setTargetForConnectorCreate( clickedConnectorInfo ) {

    let [blockId, connectorId] = this.dd.sourcePath = clickedConnectorInfo,
      item = _.find(this.items, ['id', blockId]);

    if( _.has(item, 'itemData.connectors.output') ) {
      item.itemData.connectors.output[connectorId].target = this.dd.id;
    }

  }

  @Mutation
  setAreaBoundaries( data ) {
    this.area.boundaries = data;
  }

  @Mutation
  updateCoords( coords ) {
    if( this.dd.dragging ) {

      let actualCoords = {};

      Object.keys( coords ).map(( key ) => {
        actualCoords[key] = coords[key] - this.dd.elementOffset[key];
      });

      this.items[this.items.length-1].position = actualCoords;

    }
  }

  /**
   * Call when clicked on create connector
   *
   * @param cloneData
   */
  @Mutation
  insertConnectorClone( cloneData: any = {}) {

    // calculate position in area
    let inAreaPosition = {
      left: cloneData.clickedCoords.left - this.area.boundaries.left - cloneData.cursorOffset.left,
      top: cloneData.clickedCoords.top - this.area.boundaries.top - cloneData.cursorOffset.top,
    };

    let connectorData = {
      component: 'ConnectorClone',
      position: inAreaPosition,
      id: this.items.length,
    };

    this.dd.id = this.dd.newIdx = this.items.length;
    this.dd.dragging = true;
    this.dd.elementOffset = cloneData.cursorOffset;

    this.items.push(connectorData);

  }

  @Mutation
  insertItem( item: any ) {
    this.items.push(item);
  }

  @Mutation
  dragDropDataReset() {
    this.dd = {
      dragging: false,
      id: -1,
      elementOffset: -1,
      newIdx: -1,
      targetId: -1,
      sourcePath: [],
    };
  }

  @Mutation
  dragDropDataSet(payload) {

    let { id, idx, offset: elementOffset } = payload;

    this.dd.id = id;
    this.dd.dragging = true;
    this.dd.elementOffset = elementOffset;

    if( this.items.length > 1 ) {

      let draggingItem = this.items.splice(idx, 1);
      this.dd.newIdx = this.items.push(draggingItem[0]) - 1;

    } else if ( this.items.length == 1 ) {

      this.dd.newIdx = 0;

    } else {
      throw 'Error: Here no one block... What do you want to move?'
    }

  }

  @Mutation
  checkCreateConnector(blockId: number) {

    // console.log(this.items);
    // console.log(blockId);

    let item = _.find(this.items, ['id', blockId]),
      connectorsOutput = _.get(item.itemData, 'connectors.output') || [],
      createButtonCnt = _.filter(connectorsOutput, ['type', 'create']).length;

    if (!createButtonCnt || createButtonCnt < 1) {
      !_.has( item, 'itemData' ) && _.set( item, 'itemData', { connectors: { output: [] } } );

      !_.has( item, 'itemData.connectors' ) && _.set( item, 'itemData.connectors', { output: [] } );

      item.itemData.connectors.output.push({
        type: 'create',
      });
    }

  }

  /**
   * Action because in the future planned make async ajax queries to the server
   *
   * @param params
   */
  @Action({rawError: true})
  async insertBlock(params: any = {}) {

    if( !_.has( params, 'component' ) || params.component !== 'BlockBase' ) {
      params.component = 'BlockBase';
    }

    let blockData: object = {
      blockName: `Block №${this.context.getters['itemsTotal']}`
    };

    _.set(params, 'itemData', _.extend(blockData, _.omit(params, ['component', 'position'])));

    if ( _.has(params, 'connectors') ) {
      delete params.connectors;
    }

    if( !_.has( params, 'position' ) ) {
      let steps = (this.context.state as any).blockPositionSteps;
      let total = (this.context.state as any).items.length;

      let actualSteps = {};
      Object.keys(steps).map((key) => {
        actualSteps[key] = steps[key] * ( total + 1 );
      });

      params.position = actualSteps;
    }

    params.id = this.context.getters['itemsTotal'];

    this.context.commit('insertItem', params);

  }

  get itemsTotal() {
    return this.items.length;
  }

}
