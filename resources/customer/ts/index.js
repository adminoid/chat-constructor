import "./bootstrap";
import Vue from "vue";
import CustomerApp from "./components/CustomerApp.vue";
import store from './store';
import router from "./router";
new Vue({
    el: '#customer-app',
    store,
    router,
    components: { CustomerApp }
});
//# sourceMappingURL=index.js.map