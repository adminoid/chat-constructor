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

  count = 237;

  @Mutation
  change(n: number) {
    this.count = n;
  }

}
