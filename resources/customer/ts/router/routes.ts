// import BotsArea from "../components/BotsArea"
// import BotsArea from "@/customer/ts/components/BotsArea"
// import BotsArea from "@r/customer/ts/components/BotsArea"
import BotsArea from "../components/BotsArea.vue"
import BlocksArea from "../components/BlocksArea.vue"

export default [
  { path: "/", component: BotsArea },
  { path: "/bot/:id", component: BlocksArea },
]
