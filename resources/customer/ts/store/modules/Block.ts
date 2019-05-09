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
  namespaced: true, dynamic: true, store: new Vuex.Store({}), name: 'Block'
})
export default class Block extends VuexModule {

  blocks = [];

  currentBotId = 1;

  get baseUrl() {
    return 'private/bots/' + this.currentBotId + '/blocks';
  }

  @Action({ commit: 'updateBlocks', rawError: true })
  async fetchBlocks() {
    return await axios.get(this.baseUrl)
  }
  @Mutation
  updateBlocks( blocks ) {
    this.blocks = blocks.data;
  }

  @Action({ commit: 'appendBlock'})
  async createBlock() {
    return await axios.post(this.baseUrl, {
      'name': 'Blocky' + Math.floor(Math.random() * 6) + 1
    });
  }
  @Mutation
  appendBlock ( block ) {
    this.blocks.push(block.data);
  }

  @Action({ commit: 'removeBlock', rawError: true})
  async deleteBlock(id: number) {
    let resp = await axios.delete(this.baseUrl + '/' + id);
    return resp.data;
  }
  @Mutation
  removeBlock(id) {
    this.blocks = _.reject(this.blocks, b => b.id == id);
  }

}
