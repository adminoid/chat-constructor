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

  @Mutation
  insertItem(item: any) {
    this.items.push(item);
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
      actualSteps[key] = steps[key] * ( total + 1 );
    });

    itemData.initialData = {
      position: actualSteps
    };

    this.context.commit('insertItem', itemData);
  }

}
