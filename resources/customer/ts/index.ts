import "./bootstrap"
import Vue from "vue"
import store from "./store"
import MainSidebar from "./components/MainSidebar.vue"
import MainContent from "./components/MainContent.vue"

Vue.component('main-sidebar', MainSidebar);
Vue.component('main-content', MainContent);

// console.log(store);

new Vue({
  el: '#app',
  store,

  mounted() {
    console.log(store.test);
  }
});
