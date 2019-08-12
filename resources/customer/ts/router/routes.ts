// TODO: Make dynamic components
import BotsArea from "../components/BotsArea.vue"
import BlocksArea from "../components/BlocksArea.vue"
import store from '../store'

export default [
  { path: "/", component: BotsArea, name: 'bots' },
  {
    name: 'blocks',
    path: "/bot/:botId",
    component: BlocksArea,
    beforeEnter: (to, from, next) => {
      store.state.Block.items = [];
      next();
    },
  },
  // { path: "/bot/:botId/block/:blockId'", component: blockEdit, name: 'block' },
  // { path: "/404", component: ErrorPage, name: '404' },
]
