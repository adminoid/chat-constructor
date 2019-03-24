import "./bootstrap";
import Vue from "vue";
import store from "./store";
import MainSidebar from "./components/MainSidebar.vue";
import MainContent from "./components/MainContent.vue";
import VueRouter from 'vue-router';
Vue.use(VueRouter);
new Vue({
    el: '#app',
    store,
    components: {
        MainSidebar, MainContent
    },
});
//# sourceMappingURL=index.js.map