import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators'
import * as _ from 'lodash'

@Module({
  name: 'DropAreaModule',
  namespaced: true,
  store: {},
})
export default class DropAreaModule extends VuexModule {

  items = [];

  blockPositionSteps = {
    left: 15,
    top: 10,
  };

  dd = {
    dragging: false,
    startIdx: -1,
    elementOffset: -1,
    newIdx: -1,
  };

  area = {
    boundaries: {
      left: -1,
      top: -1,
      right: -1,
      bottom: -1,
    }
  };

  @Mutation
  setTargetForConnectorCreate( clickedConnectorInfo ) {

    // getBlock

    let [blockId, connectorId] = clickedConnectorInfo;

    this.items[blockId].itemData.connectors.output[connectorId].target = this.dd.newIdx;

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
    };

    this.dd.startIdx = this.dd.newIdx = this.items.length;
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
      startIdx: -1,
      elementOffset: -1,
      newIdx: -1,
    };
  }

  @Mutation
  dragDropDataSet(payload) {

    let { idx, offset: elementOffset } = payload;

    this.dd.startIdx = idx;
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
  pushCreateConnector(blockId: number) {

    if ( !_.has(this.items[blockId], 'itemData.connectors') ) {
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
  @Action({rawError: true})
  async insertBlock(params: any = {}) {

    if( !_.has( params, 'component' ) || params.component !== 'BlockBase' ) {
      params.component = 'BlockBase';
    }


    let blockData: object;
    // It's temporary decor
    if( !_.has( params, 'blockName' ) ) {
      blockData = {
        blockName: `Block №${this.context.getters['itemsTotal']}`,
      }
    }

    params.itemData = _.assign(blockData, _.omit(params, ['component', 'position']));

    if ( _.has(params, 'connectors') ) {
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

    if( !_.has( params, 'position' ) ) {
      let steps = (this.context.state as any).blockPositionSteps;
      let total = (this.context.state as any).items.length;

      let actualSteps = {};
      Object.keys(steps).map((key) => {
        actualSteps[key] = steps[key] * ( total + 1 );
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

}
