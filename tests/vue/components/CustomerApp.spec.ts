import { shallowMount, mount, RouterLinkStub } from '@vue/test-utils'
import CustomerApp from '@r/customer/ts/components/CustomerApp.vue'

const chai = require('chai');
const expect = chai.expect;

// const chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised);


describe('CustomerApp', () => {

  it('should contain Sidebar', () => {

    // const wrapper = shallowMount(CustomerApp);

    const wrapper = shallowMount(CustomerApp, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    });

    let text = wrapper.text(),
      includes = text.includes('Sidebar');

    // expect(true).is(true);

    // expect().toBe(true);
    // expect(includes).toBe(true);
    expect(includes).to.be.true;



  });

  // it('is a Vue instance', () => {
  //   expect(wrapper.isVueInstance()).toBe(true)
  // });

  // it('renders correctly', () => {
  //   expect(wrapper.element).toMatchSnapshot()
  // })

});
