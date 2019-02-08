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

  @Mutation
  insertItem(item: any) {
    this.items.push(item);
  }

  @Action({rawError: true})
  async insertBlock(itemData: any) {
    if( !_.has( itemData, 'component' ) || itemData.component !== 'BlockBase' ) {
      itemData.component = 'BlockBase';
    }

    this.context.commit('insertItem', itemData);
  }

}
