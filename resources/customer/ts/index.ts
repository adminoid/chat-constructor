import "./bootstrap"
import Vue from "vue"
import CustomerApp from "./components/CustomerApp.vue"
import store from './store'
import router from "./router"

// font awesome
import { library as FontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core'
import { faRobot, faTrash, faEdit, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

FontAwesomeLibrary.add({faRobot, faTrash, faEdit, faPuzzlePiece});
Vue.component('fa-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

import WindowsPlugin from './plugins/windows'
Vue.use(WindowsPlugin);

import FormsPlugin from './plugins/forms'
Vue.use(FormsPlugin);

new Vue({

  el: '#customer-app',

  render (createElement) {
    return createElement(CustomerApp);
  },

  store,

  router,

  components: { CustomerApp },

});
