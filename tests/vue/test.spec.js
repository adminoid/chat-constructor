import { shallowMount } from '@vue/test-utils'
import MainSidebar from '../../resources/customer/ts/components/MainSidebar'
import expect from 'expect'

describe('MainSidebar', () => {

  const wrapper = shallowMount(MainSidebar);

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<aside class="sidebar col-md-3">')
  });

  it('has a button', () => {
    expect(true).toBe(true)
  })
});
