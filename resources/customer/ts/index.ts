import "./bootstrap"
import Vue from "vue"

import CustomerApp from "./components/CustomerApp.vue"
import store from './store'

import router from "./router"

declare module 'vue/types/vue' {
  interface Vue {
    $myProperty: string
  }
}

new Vue({

  el: '#customer-app',

  render (createElement) {
    return createElement(CustomerApp);
  },

  store,

  router,

  components: { CustomerApp }

});
