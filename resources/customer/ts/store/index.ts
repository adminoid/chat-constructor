import Vue from 'vue';
import Vuex from 'vuex';
import Bot from "./modules/Bot";

Vue.use(Vuex);

export default new Vuex.Store({

  actions: {
<<<<<<< HEAD

    async HideDeletedBot() {
      console.log('here');
    },

    async addAction(context, payload) {

      this.dispatch('HideDeletedBot', 1, {root:true});

      console.log(context);
      console.log(payload);

    },

=======
    addAction () {
      console.log('a-a');
    }
>>>>>>> 981ec03e2f644af6ddb5163ffc80f27dcf845fe3
  },

  modules: {
    Bot
  }

});
