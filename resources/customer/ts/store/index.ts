// Inspired ;-) by example: <https://codeburst.io/vuex-and-typescript-3427ba78cfa8>

import Vue from "vue"
import Vuex from 'vuex';
// import { RootState } from './types';
import { DropAreaModule } from './drop-area/index';

Vue.use(Vuex);

const store = {

  state: {
    version: '0.9.0'
  },

  modules: {
    DropAreaModule
  }

};

export default new Vuex.Store(store);

// export default new Vuex.Store({
//   state: {}
// })
