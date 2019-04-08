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

  test('should contain Sidebar', () => {

    let text = wrapper.text(),
      includes = text.includes('Sidebar');

    expect(includes).to.be.true;

  });

  // test.only('just simple test test', () => {
  //   expect(true).to.be.true;
  // });

});
