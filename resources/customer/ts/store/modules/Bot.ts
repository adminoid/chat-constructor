import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators'

import _ from "lodash"
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

  @Mutation
  updateBots( bots ) {
    this.bots = bots.data;
  }

  @Mutation
  appendBot ( bot ) {
    this.bots.push(bot.data);
  }

  @Mutation
  removeBot ( bot ) {
    _.remove(this.bots, {
      id: bot.id
    });
  }

  @Action({ commit: 'appendBot'})
  async createBot() {
    return await axios.post(this.baseUrl, {
      'name': 'Wally'
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
