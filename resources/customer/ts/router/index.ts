import Vue from "vue"
import VueRouter from "vue-router"
import BotsArea from "../components/BotsArea";

const routes = [
  { path: "/", component: BotsArea }
];

Vue.use(VueRouter);

export default new VueRouter({routes});

