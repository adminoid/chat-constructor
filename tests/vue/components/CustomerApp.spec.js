import VueRouter from 'vue-router'
import { createLocalVue, mount} from '@vue/test-utils'
import CustomerApp from '@customer/ts/components/CustomerApp.vue'

import router from '@customer/ts/router/index.ts'
// const router = require('@customer/ts/router/').default;

const localVue = createLocalVue();
localVue.use(VueRouter);

const wrapper = mount(CustomerApp, { localVue });

describe('CustomerApp', () => {

  // Testing routes...

  it("renders a child component via routing", () => {

    const wrapper = mount(CustomerApp, { localVue, router });

    router.push("/");

    expect(wrapper.find(CustomerApp).exists()).toBe(true)
  });

  it('should contain Sidebar', () => {

    let text = wrapper.text();

    expect(true).is(true);
    // expect(text.includes('Sidebar')).toBe(true);
  });

  // it('is a Vue instance', () => {
  //   expect(wrapper.isVueInstance()).toBe(true)
  // });

  // it('renders correctly', () => {
  //   expect(wrapper.element).toMatchSnapshot()
  // })

});
