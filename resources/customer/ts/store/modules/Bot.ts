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

// import store from '../index'

//dynamic: true, store, name: 'mm'
//namespaced: true, store, name: 'Bot'
@Module({
  namespaced: true, dynamic: true, store: new Vuex.Store({}), name: 'Bot'
})
export default class Bot extends VuexModule {

  bots = [];

  @Mutation
  updateBots( bots ) {
    this.bots = bots;
  }

  @Action({rawError: true})
  async fetchBots() {
    await axios.get('private/bots')
      .then((resp) => {
        this.updateBots(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
