import "./bootstrap"
import Vue from "vue"
import store from "./store"
import CustomerApp from "./components/CustomerApp.vue"
import VueRouter from 'vue-router'

Vue.use(VueRouter);

new Vue({
  el: '#app',

  store,

  components: {
    CustomerApp
  },

});
