import { Store } from 'vuex-mock-store'
import { mount } from '@vue/test-utils'
import TopButton from '@r/customer/ts/components/TopButton.vue'
import expect from 'expect'

const store = new Store({
  actions: {
    addAction: jest.fn()
  },
});

// add other mocks here so they are accessible in every component
const mocks = {
  $store: store,
};

// reset spies, initial state and getters
afterEach(() => store.reset());

describe('TopButton.vue', () => {

  it('addAction', () => {

    let wrapper = mount(TopButton, { mocks });

    wrapper.find('.top-panel__add-block-btn').trigger('click');

    let vuexActionCalled = store.dispatch.mock.calls[0][0];
    expect(vuexActionCalled).toBe('addAction');

  });

});

