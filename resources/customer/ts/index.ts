import "./bootstrap"
import Vue from "vue"
import CustomerApp from "./components/CustomerApp.vue"
import store from './store'
import router from "./router"

// js core of font awesome
import { library as FontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core'
// importing one symbol "fa-robot"
import { faRobot as fontAwesomeIcons } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

FontAwesomeLibrary.add(fontAwesomeIcons);

Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

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
