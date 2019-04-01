const tu = require('@vue/test-utils');
const CustomerApp = require('@customer/ts/components/CustomerApp.vue').default;

describe('CustomerApp', () => {

  const wrapper = tu.shallowMount(CustomerApp);

  it('should contain Sidebar', () => {
    expect(wrapper.text().includes('Sidebar')).toBe(true);
  });

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

});
