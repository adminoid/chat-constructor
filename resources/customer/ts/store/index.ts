import Vue from 'vue';
import Vuex from 'vuex';
import Bot from "./modules/Bot";
import Block from "./modules/Block";

Vue.use(Vuex);

export default new Vuex.Store({

  actions: {

    async addAction(context, typeOfNew) {

      if (typeOfNew === 'bot') {
        await context.dispatch('Bot/createBot');
      }else if (typeOfNew === 'block') {
        await context.dispatch('Block/createBlock');
      }

    },

  },

  modules: {
    Bot, Block
  }

});
