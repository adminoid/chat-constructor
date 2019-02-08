import {
  Module,
  VuexModule,
  Mutation,
} from 'vuex-module-decorators';

@Module({
  namespaced: true,
  name: 'DropAreaModule',
})
export default class DropAreaModule extends VuexModule {

  items = [];

  @Mutation
  insert(item: any) {
    this.items.push(item);
  }

}
