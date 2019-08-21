import Vuex from 'vuex';
import Bot from "./modules/Bot";
import Block from "./modules/Block";

export default new Vuex.Store({

  actions: {

    async createEntity(context, payload) {

      if (payload.type === 'bot') {
        await context.dispatch('Bot/createBot');
      }

      else if (payload.type === 'block') {

        // TODO: take botId
        try {

          if (payload.botId > 0) {

            await context.dispatch('Block/createBlock', payload.botId);

          } else {

            console.error('Значение botId не передано');

          }

        } catch (e) {
          console.error(e);
        }

      }

    },

  },

  modules: {
    Bot, Block
  }

});

// TODO: delete connection if drag to area from input connector
