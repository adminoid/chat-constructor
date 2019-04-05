import Vue from 'vue'
import { shallowMount, mount, RouterLinkStub } from '@vue/test-utils'
import CustomerApp from '@r/customer/ts/components/CustomerApp'

const chai = require('chai');
const expect = chai.expect;

// mock component
Vue.component('router-view', {
  name: 'router-view',
  render: h => h('div')
});

describe('CustomerApp', () => {

  const wrapper = shallowMount(CustomerApp);

  it('should contain Sidebar', () => {

    let text = wrapper.text(),
      includes = text.includes('Sidebar');

    expect(includes).to.be.true;

  });

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).to.be.true
  });

  // it('renders correctly', () => {
  //   expect(wrapper.element).toMatchSnapshot()
  // })

});
