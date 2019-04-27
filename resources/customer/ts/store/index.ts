import Vue from 'vue';
import Vuex from 'vuex';
import Bot from "./modules/Bot";

Vue.use(Vuex);

export default new Vuex.Store({

  actions: {

    async HideDeletedBot() {
      console.log('here');
    },

    async addAction(context, payload) {

      this.dispatch('HideDeletedBot', 1, {root:true});

      console.log(context);
      console.log(payload);

    },

  },

  modules: {
    Bot
  }

});
