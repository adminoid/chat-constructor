import BotsArea from "../components/BotsArea.vue";
import BlocksArea from "../components/BlocksArea.vue";
export default [
    { path: "/", component: BotsArea, name: 'bots' },
    { path: "/bot/:id", component: BlocksArea, name: 'blocks' },
    { path: "/bot/:id/edit'", component: BlocksArea, name: 'blockEdit' },
];
//# sourceMappingURL=routes.js.map