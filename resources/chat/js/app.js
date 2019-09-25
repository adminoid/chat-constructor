require('./bootstrap');

import Vue from "vue"
import Chat from "./components/Chat.vue"

new Vue({

  el: '#chat',

  render (createElement) {
    return createElement(Chat);
  },

  components: { Chat },

});
