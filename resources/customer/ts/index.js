import "./bootstrap";
import Vue from "vue";
// import store from "./store"
import MainSidebar from "./components/MainSidebar.vue";
import MainContent from "./components/MainContent.vue";
// Vue.component('main-sidebar', MainSidebar);
// Vue.component('main-content', MainContent);
import Vuex from 'vuex';
import DropAreaModule from './store/modules/DropAreaModule';
Vue.use(Vuex);
var store = new Vuex.Store({
    state: {
        version: '0.9.0'
    },
    mutations: {
        change: function (state, newVersion) {
            state.version = newVersion;
        }
    },
    modules: {
        DropAreaModule: DropAreaModule
    }
});
console.log(store);
// console.log(store2);
new Vue({
    el: '#app',
    store: store,
    components: {
        MainSidebar: MainSidebar, MainContent: MainContent
    },
    mounted: function () {
        console.log(this.$store.state); // alias: console.log(store.state);
    }
});
//# sourceMappingURL=index.js.map