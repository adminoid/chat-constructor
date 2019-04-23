import { createLocalVue, mount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import router from '@r/customer/ts/router/index.ts'
import { Store } from 'vuex-mock-store'
import CustomerApp from '@r/customer/ts/components/CustomerApp.vue'
import BotsArea from '@r/customer/ts/components/BotsArea.vue'
import TopButton from "@r/customer/ts/components/TopButton";

const store = new Store({
  state: {
    Bot: {
      name: 'Victor'
    },
  },
});

// add other mocks here so they are accessible in every component
const mocks = {
  $store: store,
};

// reset spies, initial state and getters
afterEach(() => store.reset());

describe('Routing custom tests', () => {

  describe('Mounting child components in CustomerApp via routing', () => {

    const localVue = createLocalVue();
    localVue.use(VueRouter);

    let wrapper;
    beforeEach(() => {
      wrapper = mount(CustomerApp, { mocks, localVue, router })
    });

    // push root route
    router.push("/");

    it("renders a child BotsArea.vue", () => {
      expect(wrapper.find(BotsArea).exists()).toBe(true);
    });

    it("check right type of TopButton.vue", () => {
      let topButton = wrapper.find(TopButton);
      expect(topButton.vm.type).toBe('bots');
    });

  });
});
