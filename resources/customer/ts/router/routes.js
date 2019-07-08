// TODO: Make dynamic components
import BotsArea from "../components/BotsArea.vue";
import BlocksArea from "../components/BlocksArea.vue";
// import blockEdit from "../components/blockEdit.vue"
export default [
    { path: "/", component: BotsArea, name: 'bots' },
    { path: "/bot/:botId", component: BlocksArea, name: 'blocks' },
];
//# sourceMappingURL=routes.js.map