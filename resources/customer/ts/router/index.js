import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);
export var router = new VueRouter({ routes: routes, mode: 'history' });
export default router;
//# sourceMappingURL=index.js.map