import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"

Vue.use(VueRouter);

export const router = new VueRouter({routes, mode: 'history'});

export default router;
