// TODO: Make dynamic components
import BotsArea from "../components/BotsArea.vue";
import BlocksArea from "../components/BlocksArea.vue";
import store from '../store';
export default [
    { path: "/", component: BotsArea, name: 'bots' },
    {
        name: 'blocks',
        path: "/bot/:botId",
        component: BlocksArea,
        beforeEnter: function (to, from, next) {
            store.state.Block.items = [];
            next();
        },
    },
];
//# sourceMappingURL=routes.js.map