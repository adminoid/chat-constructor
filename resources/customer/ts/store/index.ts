import Vuex from 'vuex';
import Bot from "./modules/Bot";
import Block from "./modules/Block";

export default new Vuex.Store({

  actions: {

    async createEntity(context, typeOfNew) {

      if (typeOfNew === 'bot') {
        console.log('==bOt');
        // await context.dispatch('Bot/createBot');
      }

      else if (typeOfNew === 'block') {
        console.log('--blOck');
        // await context.dispatch('Block/createBlock');
      }

    },

  },

  modules: {
    Bot, Block
  }

});
