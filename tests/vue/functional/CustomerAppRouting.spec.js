import { createLocalVue, mount} from '@vue/test-utils'
import BotsArea from '@r/customer/ts/components/BotsArea.vue'

// For routing test
import CustomerApp from '@r/customer/ts/components/CustomerApp.vue'
import VueRouter from 'vue-router'
import router from '@r/customer/ts/router/'

describe('BotsArea.vue', () => {

  it("renders a child component via routing", () => {

    const localVue = createLocalVue();
    localVue.use(VueRouter);

    const wrapper = mount(CustomerApp, { localVue, router });

    router.push("/");

    expect(wrapper.find(BotsArea).exists()).toBe(true);

  });

});
