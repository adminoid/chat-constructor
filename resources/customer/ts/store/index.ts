// TODO: For upgrade look here <https://codeburst.io/vuex-and-typescript-3427ba78cfa8>

import Bot from "./modules/Bot";
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({

  actions: {
    addAction () {
      console.log('a-a');
    }
  },

  modules: {
    Bot
  }

});
