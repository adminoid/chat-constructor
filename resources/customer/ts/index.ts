import "./bootstrap"
import Vue from "vue"
import store from "./store"
import MainSidebar from "./components/MainSidebar.vue"
import MainContent from "./components/MainContent.vue"

Vue.component('main-sidebar', MainSidebar);
Vue.component('main-content', MainContent);

new Vue({
  el: '#app',
  store,
});
