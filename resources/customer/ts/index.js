import "./bootstrap";
import Vue from "vue";
import CustomerApp from "./components/CustomerApp.vue";
import store from './store';
import router from "./router";
new Vue({
    el: '#customer-app',
    render: function (createElement) {
        return createElement(CustomerApp);
    },
    store: store,
    router: router,
    components: { CustomerApp: CustomerApp }
});
//# sourceMappingURL=index.js.map