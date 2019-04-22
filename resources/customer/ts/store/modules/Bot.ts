import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators'

import axios from 'axios'

import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

//dynamic: true, store, name: 'mm'
//namespaced: true, store, name: 'Bot'
@Module({
  namespaced: true, dynamic: true, store: new Vuex.Store({}), name: 'Bot'
})
export default class Bot extends VuexModule {

  baseUrl = 'private/bots';

  bots = [];

  @Mutation
  updateBots( bots ) {
    this.bots = bots.data;
  }

  @Action({ rawError: true })
  async deleteBot(id: number) {
    return await axios.delete(this.baseUrl + '/' + id);
    // return await setTimeout(() => { console.log('test here ' + id) },5000)
  }

  @Action({ commit: 'updateBots', rawError: true })
  async fetchBots() {
    return await axios.get('private/bots')
  }
}
