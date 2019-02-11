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
  };

  @Mutation
  insertItem(item: any) {
    this.items.push(item);
  }

  @Mutation
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

  @Action({rawError: true})
  async insertBlock(itemData: any) {
    if( !_.has( itemData, 'component' ) || itemData.component !== 'BlockBase' ) {
      itemData.component = 'BlockBase';
    }

    let steps = (this.context.state as any).blockPositionSteps;
    let total = (this.context.state as any).items.length;

    let actualSteps = {};
    Object.keys(steps).map((key) => {
      actualSteps[key] = steps[key] * ( total + 1 ) + 'px';
    });

    itemData.position = actualSteps;

    this.context.commit('insertItem', itemData);
  }

}
