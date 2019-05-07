import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators'

import axios from 'axios'
// import _ from "lodash"
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
  async createBot(type: string) {
    // console.log(type); // todo: add TypeBot/TypeBlock
    return await axios.post(this.baseUrl, {
      'name': 'Billy' + Math.floor(Math.random() * 6) + 1
    });
  }
  @Mutation
  appendBot ( bot ) {
    this.bots.push(bot.data);
  }

  @Action({rawError: true})
  async deleteBot(id: number) {
    let deletedId = await axios.delete(this.baseUrl + '/' + id);
    return deletedId;
  }
  // @Mutation
  // removeBot(id) {
  //   console.info(id + ' - update here! ');
  //   this.bots = _.filter(this.bots, function(o) { return o.id === id; });
  //   // this.bots = [];
  // }

}
