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

//dynamic: true, namespaced: true
@Module({
  namespaced: true, dynamic: true, store: new Vuex.Store({}), name: 'Bot'
})
export default class Bot extends VuexModule {

  baseUrl = 'private/bots';

  bots = [];

  // @Mutation
  // addBot ( botData: any ) {
  // }

  @Mutation
  updateBots( bots ) {
    this.bots = bots.data;
  }

  @Mutation
  hideDeletedBot( bot ) {
    this.bots.splice(this.bots.findIndex(item => item.id === bot.data.id), 1);
  }

  @Mutation
  insertBot ( bot ) {
    console.log(bot);
  }

  @Action({ commit: 'appendBot'})
  async createBot() {
    return await axios.post(this.baseUrl, {
      'name': 'Billy'
    });
  }

  @Action({ commit: 'removeBot', rawError: true })
  async deleteBot(id: number) {
    return await axios.delete(this.baseUrl + '/' + id)
  }

  @Action({ commit: 'updateBots', rawError: true })
  async fetchBots() {
    return await axios.get(this.baseUrl)
  }
}
