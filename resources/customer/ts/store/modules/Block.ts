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

  items : Array<any> = [];

  blockPositionSteps = {
    x: 15,
    y: 10,
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

  scrollPosition = {
    top: 0,
    left: 0,
  };

  @Action
  async saveBlockData(data) {
    return await axios.patch(`private/bots/${data.botId}/blocks/${data.blockId}`, data.sendData )
  }

  @Action({ commit: 'updateBlocks', rawError: true })
  async fetchBlocks(id) {
    return await axios.get(`private/bots/${id}/blocks`);
  }
  @Mutation
  updateBlocks( blocks ) {
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
        let output = _.find(item.outputs, ['id', connectorId]);
        output.coords = coords;
      }
    });

  }

  @Mutation
  updateEndLineCoords( payload ) {

    let itemId = payload.itemId;

    let x = payload.x,
      y = payload.y;

    if( payload.coords ) {
      x = payload.coords.left;
      y = payload.coords.top;
    }


    _.map( this.items, (item) => {
      _.map( item.outputs, connector => {
        if ( connector.target_block_id === itemId ) {
          connector.targetCoords = {left: x, top: y};
        }
      });
    });
  }

  @Mutation
  setTargetForConnector( clickedConnectorInfo ) {

    let [blockId, connectorId] = this.dd.sourcePath = clickedConnectorInfo,
      item = _.find(this.items, ['id', blockId]);

    let output = _.find(item.outputs, ['id', connectorId]);
    if( output ) {
      output.target_block_id = this.dd.id;
    }

  }

  @Mutation
  setAreaBoundaries( data ) {
    this.area.boundaries = data;
  }

  @Mutation
  updateCoords( coords ) {
    if( coords && this.dd.dragging ) {

      let [x, y] = coords,
        draggedItem = this.items[this.items.length-1];

      draggedItem.x = x;
      draggedItem.y = y;

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
    let x = cloneData.clickedCoords.left - this.area.boundaries.left - cloneData.cursorOffset.left,
      y = cloneData.clickedCoords.top - this.area.boundaries.top - cloneData.cursorOffset.top;

    // make virtual id for connector-clone without saving to backend
    let virtualNextId = Math.max.apply(Math, this.items.map(function(o) { return o.id; })) + 1;

    let connectorData = {
      component: 'ConnectorClone',
      id: virtualNextId,
      x: x,
      y: y,
    };

    this.dd.id = this.dd.newIdx = virtualNextId;
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
      console.error('Error: Here no one block... What do you want to move?');
    }

  }

  @Mutation
  setScrollOffset(positions) {
    this.scrollPosition = positions;
  }

  @Action
  async saveConnectorTarget( connector: any ) {
    let connectorId = connector.id,
      targetBlockId = connector.target_block_id;

    return await axios.post(`private/connector/save-target`, {
      'connector-id': connectorId,
      'target-id': targetBlockId,
    });

  }

  @Action({rawError: true, commit: 'appendBlock'})
  async createBlock(botId) {

    const baseUrl = `private/bots/${botId}/blocks`;

    let steps = (this.context.state as any).blockPositionSteps;

    let filtered = _.filter( this.items, (item) => {
      return !item.moved;
    });

    let total = filtered.length;

    // TODO: get all items who not moved
    let actualSteps : any = {};
    Object.keys(steps).map((key) => {
      actualSteps[key] = steps[key] * ( total + 1 );
    });

    return await axios.post(baseUrl, {
      'name': 'Block ' + Math.floor(Math.random() * 6) + 1,
      'bot_id': botId,
      x: actualSteps.x,
      y: actualSteps.y,
    });

  }
  @Mutation
  appendBlock ( block ) {
    this.items.push(block.data);
  }

  get itemsTotal() {
    return this.items.length;
  }

}
