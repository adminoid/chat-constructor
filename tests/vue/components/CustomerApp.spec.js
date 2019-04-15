import { shallowMount, mount, config } from '@vue/test-utils'
import CustomerApp from '@r/customer/ts/components/CustomerApp'

config.stubs['router-view'] = '<div />'

describe('CustomerApp', () => {

  const wrapper = shallowMount(CustomerApp);

  it('should contain Sidebar', () => {

    let text = wrapper.text(),
      includes = text.includes('Sidebar');

    expect(includes).toBe(true);

  });

});
