import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';
import _ from 'lodash';

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

      if( actualCoords['left'] ) {

      }

      this.items[this.items.length-1].position = actualCoords;

    }
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

  /**
   * Action because in the future planned make async ajax queries to the server
   *
   * @param itemData
   */
  @Action({rawError: true})
  async insertBlock(itemData: any = {}) {

    if( !_.has( itemData, 'component' ) || itemData.component !== 'BlockBase' ) {
      itemData.component = 'BlockBase';
    }

    if( !_.has( itemData, 'blockName' ) ) {
      itemData.initialData = {
        blockName: `Block №${this.context.getters['itemsTotal']}`,
      }
    }

    let steps = (this.context.state as any).blockPositionSteps;
    let total = (this.context.state as any).items.length;

    let actualSteps = {};
    Object.keys(steps).map((key) => {
      actualSteps[key] = steps[key] * ( total + 1 );
    });

    // console.log(itemData);

    itemData.position = actualSteps;

    this.context.commit('insertItem', itemData);

  }

  get itemsTotal() {
    return this.items.length;
  }

}
