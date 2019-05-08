import Vue from 'vue';
import Vuex from 'vuex';
import Bot from "./modules/Bot";

Vue.use(Vuex);

export default new Vuex.Store({

  actions: {

    async addAction(context, typeOfNew) {

      console.log(typeOfNew);
      if (typeOfNew === 'bot') {
        console.log('BOT');

      }else if (typeOfNew === 'block') {
        console.log('BlOCK');

      }

      // await context.dispatch('Bot/createBot', payload);

    },

  },

  modules: {
    Bot
  }

});
