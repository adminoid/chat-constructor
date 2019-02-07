import { Module, VuexModule } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'DropAreaModule' })
export default class DropAreaModule extends VuexModule {

  count = 237;

}
