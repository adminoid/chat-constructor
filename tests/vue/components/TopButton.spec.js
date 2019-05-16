import { Store } from 'vuex-mock-store'
import { mount } from '@vue/test-utils'
import TopButton from '@r/customer/ts/components/TopButton.vue'
import expect from 'expect'

const store = new Store({
  actions: {
    createEntity: jest.fn()
  },
});

// add other mocks here so they are accessible in every component
const mocks = {
  $store: store,
  name,
  $route: jest.fn(),
};

// reset spies, initial state and getters
afterEach(() => store.reset());

describe('TopButton.vue', () => {

  it('createEntity', () => {

    let wrapper = mount(TopButton, { mocks });

    wrapper.find('.top-panel__add-block-btn').trigger('click');

    let calls = store.dispatch.mock.calls;
    expect(calls[0][0]).toBe('createEntity');
    expect(calls[0][1]).toBe('bot');
  });

});

