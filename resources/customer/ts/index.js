import "./bootstrap";
import Vue from "vue";
import store from "./store";
import MainSidebar from "./components/MainSidebar.vue";
Vue.component('main-sidebar', MainSidebar);
new Vue({
    el: '#app',
    store: store,
});
//# sourceMappingURL=index.js.map