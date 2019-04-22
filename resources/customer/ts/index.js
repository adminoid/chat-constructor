import "./bootstrap";
import Vue from "vue";
import CustomerApp from "./components/CustomerApp.vue";
import store from './store';
import router from "./router";
// font awesome
import { library as FontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import { faRobot, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import WindowsPlugin from './plugins/windows';
Vue.use(WindowsPlugin);
FontAwesomeLibrary.add({ faRobot: faRobot, faTrash: faTrash, faEdit: faEdit });
Vue.component('fa-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
new Vue({
    el: '#customer-app',
    render: function (createElement) {
        return createElement(CustomerApp);
    },
    store: store,
    router: router,
    components: { CustomerApp: CustomerApp },
});
//# sourceMappingURL=index.js.map