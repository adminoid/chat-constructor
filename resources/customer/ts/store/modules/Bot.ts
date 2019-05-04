import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators'

import axios from 'axios'
import _ from "lodash"
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

  @Action({ commit: 'updateBots', rawError: true })
  async fetchBots() {
    return await axios.get(this.baseUrl)
  }
  @Mutation
  updateBots( bots ) {
    this.bots = bots.data;
  }

  @Action({ commit: 'appendBot'})
  async createBot() {
    return await axios.post(this.baseUrl, {
      'name': 'Billy' + Math.floor(Math.random() * 6) + 1
    });
  }
  @Mutation
  appendBot ( bot ) {
    this.bots.push(bot.data);
  }

  @Action
  async deleteBot(id: number) {

    let returnedId = await axios.delete(this.baseUrl + '/' + id);

    console.log(returnedId)

    _.remove( this.bots, (bot: any) => bot.id === returnedId.data.id );

    console.log(test);

  }

}
