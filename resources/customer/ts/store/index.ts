// TODO: For upgrade look here <https://codeburst.io/vuex-and-typescript-3427ba78cfa8>

import DropAreaModule from "./modules/DropAreaModule";
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    version: '0.9.1'
  },

  mutations: {
    rootMoot(state, newVersion) {
      state.version = newVersion;
    }
  },

  modules: {
    DropAreaModule
  }

});
