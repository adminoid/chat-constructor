import BotsArea from "../components/BotsArea.vue";
import BlocksArea from "../components/BlocksArea.vue";
export default [
    { path: "/", component: BotsArea, name: 'bot' },
    { path: "/bot/:id", component: BlocksArea, name: 'block' },
];
//# sourceMappingURL=routes.js.map