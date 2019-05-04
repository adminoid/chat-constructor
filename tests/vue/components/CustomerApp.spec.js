import { mount, config } from '@vue/test-utils'
import CustomerApp from '@r/customer/ts/components/CustomerApp.vue'

config.stubs['router-view'] = '<div />';

describe('CustomerApp', () => {

  const wrapper = mount(CustomerApp);

  // it('funny test ', () => {
  //   let text = wrapper.text(),
  //     includes = text.includes('Sidebar');
  //   expect(includes).toBe(true);
  // });

  // test('addBot', () => {
  //
  //   wrapper.
  //   expect(true).toBe(false)
  //
  // });


});

