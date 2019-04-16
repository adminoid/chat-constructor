import "./bootstrap"
import Vue from "vue"
import CustomerApp from "./components/CustomerApp.vue"
import store from './store'
import router from "./router"

// font awesome
import { library as FontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core'
import { faRobot as fontAwesomeIcons } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import WindowsPlugin from './plugins/windows'
Vue.use(WindowsPlugin);

FontAwesomeLibrary.add(fontAwesomeIcons);
Vue.component('fa-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

declare module 'vue/types/vue' {
  interface Vue {
    $confirm: any;
  }
}

new Vue({

  el: '#customer-app',

  render (createElement) {
    return createElement(CustomerApp);
  },

  store,

  router,

  components: { CustomerApp },

  mounted () {

    console.log('mounted here');
    this.$confirm('kuku yopta');

  }

});
