import "./bootstrap";
import Vue from "vue";
import store from "./store";
import MainSidebar from "./components/MainSidebar.vue";
import MainContent from "./components/MainContent.vue";
new Vue({
    el: '#app',
    store: store,
    components: {
        MainSidebar: MainSidebar, MainContent: MainContent
    },
});
//# sourceMappingURL=index.js.map