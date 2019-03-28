import { shallowMount } from '@vue/test-utils'
import MainContent from '../../../resources/customer/ts/components/CustomerApp'
import expect from 'expect'

describe('MainContent', () => {

  const wrapper = shallowMount(MainContent);

  it('renders the correct markup', () => {
    // expect(true).toBe(true);
    expect(wrapper.html()).toContain('kuku');
  });

});

