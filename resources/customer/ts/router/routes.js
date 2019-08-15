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
            store.state.Block.scrollPosition = {
                top: 0,
                left: 0,
            };
            next();
        },
    },
];
//# sourceMappingURL=routes.js.map