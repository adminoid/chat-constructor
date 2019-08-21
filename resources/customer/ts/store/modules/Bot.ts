import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators'

import axios from 'axios'
import * as _ from "lodash"
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

@Module({
  name: 'Bot',
  namespaced: true,
  dynamic: true,
  store: new Vuex.Store({}),
})
export default class Bot extends VuexModule {

  baseUrl = 'private/bots';

  bots = [];

  activeBotId = -1;

  @Action({ commit: 'updateBots', rawError: true })
  async fetchBots() {
    return axios.get(this.baseUrl)
  }
  @Mutation
  updateBots( bots ) {
    this.bots = bots.data;
  }

  @Action({ commit: 'appendBot'})
  async createBot() {
    return axios.post(this.baseUrl, {
      'name': 'Billy ' + Math.floor(Math.random() * 6) + 1
    }).then(resp => resp).catch(e => e.message);
  }
  @Mutation
  appendBot ( response ) {
    if ( typeof response !== 'string' ) this.bots.push(response.data);
  }

  @Action({ commit: 'removeBot', rawError: true})
  async deleteBot(id: number) {
    let resp = await axios.delete(this.baseUrl + '/' + id);
    return resp.data;
  }
  @Mutation
  removeBot(id) {
    this.bots = _.reject(this.bots, b => b.id == id);
  }

}
