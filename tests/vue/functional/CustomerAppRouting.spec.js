import { createLocalVue, mount} from '@vue/test-utils'
import BotsArea from '@r/customer/ts/components/BotsArea.vue'

// For routing test
import CustomerApp from '@r/customer/ts/components/CustomerApp.vue'
import VueRouter from 'vue-router'
import router from '@r/customer/ts/router/'
import { Store } from 'vuex-mock-store'

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

describe('BotsArea.vue', () => {

  const localVue = createLocalVue();
  localVue.use(VueRouter);

  let wrapper;
  beforeEach(() => {
    wrapper = mount(CustomerApp, { mocks, localVue, router })
  });

  it("renders a child BotsArea component via routing", () => {

    router.push("/");

    expect(wrapper.find(BotsArea).exists()).toBe(true);

  });

});
