// import VueRouter from 'vue-router'
import { createLocalVue, mount} from '@vue/test-utils'
import CustomerApp from '@r/customer/ts/components/CustomerApp.vue'

import router from '@r/customer/ts/router/'

const localVue = createLocalVue();
// localVue.use(VueRouter);

describe('CustomerApp', () => {

  // Testing routes...

  it("renders a child component via routing", () => {

    const wrapper = mount(CustomerApp, { localVue, router });

    router.push("/");

    expect(wrapper.find(CustomerApp).exists()).toBe(true)
  });

});
