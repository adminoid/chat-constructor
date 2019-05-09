import { createLocalVue, mount, config } from '@vue/test-utils'
import VueRouter from 'vue-router'
import router from '@r/customer/ts/router/index.ts'
import { Store } from 'vuex-mock-store'
import CustomerApp from '@r/customer/ts/components/CustomerApp.vue'
import BlocksArea from '@r/customer/ts/components/BlocksArea.vue'
import BotsArea from '@r/customer/ts/components/BlocksArea.vue'
import TopButton from "@r/customer/ts/components/TopButton.vue";

const store = new Store({
  state: {},
});

config.stubs['fa-icon'] = '<div />';

// add other mocks here so they are accessible in every component
const mocks = {
  $store: store,
};

// reset spies, initial state and getters
afterEach(() => store.reset());

describe('Mounting child components in CustomerApp via routing', () => {

  const localVue = createLocalVue();
  localVue.use(VueRouter);

  let wrapper;
  beforeEach(() => {
    wrapper = mount(CustomerApp, { mocks, localVue, router })
  });

  // router.push("/");
  it("check right type of TopButton.vue", () => {
    let test = router;
    expect(wrapper.find(BlocksArea).exists()).toBe(true);
    let topButton = wrapper.find(TopButton);
    let typeLocal = topButton.vm.type;
    expect(typeLocal).toBe('bot');
  });

  router.push("/bot/21");
  it("check right type of TopButton.vue", () => {
    expect(wrapper.find(BlocksArea).exists()).toBe(true);
    let topButton = wrapper.find(TopButton);
    let typeLocal = topButton.vm.type;
    expect(typeLocal).toBe('bot');
  });

  // // push oot route
  // router.push("/bot/21");
  // it("check right type of TopButton.vue", () => {
  //   expect(wrapper.find(BotsArea).exists()).toBe(true);
  //   let topButton = wrapper.find(TopButton);
  //   let typeLocal = topButton.vm.type;
  //   expect(typeLocal).toBe('block');
  // });
  //
  // it("renders a child BlocksArea.vue", () => {
  //   expect(wrapper.find(BotsArea).exists()).toBe(true);
  // });
  //
  // it("check right type of TopButton.vue", () => {
  //   let topButton = wrapper.find(TopButton);
  //   expect(topButton.vm.type).toBe('block');
  // });

});

