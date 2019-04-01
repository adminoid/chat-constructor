import "./bootstrap"
import Vue from "vue"

import CustomerApp from "./components/CustomerApp.vue"
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter);

new Vue({

  el: '#customer-app',

  store,

  render: h => h(CustomerApp),

});
