import "./bootstrap"
import Vue from "vue"
// import store from "./store" // TODO: now not working, look later...
import MainSidebar from "./components/MainSidebar.vue"
import MainContent from "./components/MainContent.vue"

// Vue.component('main-sidebar', MainSidebar);
// Vue.component('main-content', MainContent);
import Vuex from 'vuex'
import DropAreaModule from './store/modules/DropAreaModule'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    version: '0.9.0'
  },
  modules: {
    DropAreaModule
  }
});

console.log(store);
// console.log(store2);

new Vue({
  el: '#app',

  store,

  components: {
    MainSidebar, MainContent
  },

  // mounted() {
  //   console.log(this.$store.state); // alias: console.log(store.state);
  // }

});
