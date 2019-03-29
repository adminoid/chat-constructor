const tu = require('@vue/test-utils');
// const CustomerApp = require('../../../resources/customer/ts/components/CustomerApp').default;
const CustomerApp = require('@customer/ts/components/CustomerApp.vue').default;

describe('CustomerApp', () => {

  test('is a Vue instance', () => {
    const wrapper = tu.mount(CustomerApp);
    expect(wrapper.isVueInstance()).toBeTruthy()
  });



});

