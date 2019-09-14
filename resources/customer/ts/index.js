import "./bootstrap";
import Vue from "vue";
import CustomerApp from "./components/CustomerApp.vue";
import store from './store';
import router from "./router";
// font awesome
import { library as FontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import { faRobot, faTrash, faEdit, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
FontAwesomeLibrary.add({ faRobot: faRobot, faTrash: faTrash, faEdit: faEdit, faPuzzlePiece: faPuzzlePiece });
Vue.component('fa-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
import WindowsPlugin from './plugins/windows';
Vue.use(WindowsPlugin);
import FormsPlugin from './plugins/forms';
Vue.use(FormsPlugin);
import i18n from './i18n';
new Vue({
    el: '#customer-app',
    i18n: i18n,
    render: function (createElement) {
        return createElement(CustomerApp);
    },
    store: store,
    router: router,
    components: { CustomerApp: CustomerApp },
});
//# sourceMappingURL=index.js.map