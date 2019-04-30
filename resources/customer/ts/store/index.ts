import Vue from 'vue';
import Vuex from 'vuex';
import Bot from "./modules/Bot";

Vue.use(Vuex);

export default new Vuex.Store({

  actions: {

    async addAction(context, payload) {

      context.dispatch('Bot/createBot', 237);

    },

  },

  modules: {
    Bot
  }

});
