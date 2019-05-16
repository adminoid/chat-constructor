// TODO: Make dynamic components
import BotsArea from "../components/BotsArea.vue"
import BlocksArea from "../components/BlocksArea.vue"
// import blockEdit from "../components/blockEdit.vue"

export default [
  { path: "/", component: BotsArea, name: 'bots' },
  { path: "/bot/:botId", component: BlocksArea, name: 'blocks' },
  // { path: "/bot/:botId/block/:blockId'", component: blockEdit, name: 'block' },
  // { path: "/404", component: ErrorPage, name: '404' },
]
