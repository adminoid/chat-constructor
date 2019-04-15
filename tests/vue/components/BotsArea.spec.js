import { Store } from 'vuex-mock-store'
import { mount } from '@vue/test-utils'
import BotsArea from '@r/customer/ts/components/BotsArea.vue'
import expect from 'expect'

// create the Store mock
const store = new Store({
  state: {
    Bot: {
      bots: [
        {
          id: 1,
          name: 'Colten Feest 2',
          user_id: 1,
          created_at: '2019-04-10 16:46:44',
          updated_at: '2019-04-10 16:46:44',
        }, {
          id: 2,
          name: 'Manuela Beahan 2',
          user_id: 1,
          created_at: '2019-04-10 16:46:44',
          updated_at: '2019-04-10 16:46:44',
        }
      ],
    }
  },
});

// add other mocks here so they are accessible in every component
const mocks = {
  $store: store,
};

// reset spies, initial state and getters
afterEach(() => store.reset());

describe('BotsArea.vue', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(BotsArea, { mocks })
  });

  it('calls increment', () => {
    expect(store.dispatch).toHaveBeenCalledWith('Bot/fetchBots');
    expect(wrapper.vm.bots.length).toBe(2);
    let bots = wrapper.findAll('.bots-area__bot');
    expect(bots.length).toBe(2);
  });

});


// describe('BotsArea.vue fetchBots()', () => {
//
//   let actions, state, store;
//
//   beforeEach(() => {
//     state = {
//       bots: []
//     };
//
//     actions = {
//       fetchBots: jest.fn()
//     };
//
//     store = new Vuex.Store({
//       modules: {
//         Bot: {
//           namespaced: true,
//           state,
//           actions,
//         }
//       }
//     })
//   });
//
//   it('loading user bots at created hook via ajax', () => {
//
//     shallowMount(BotsArea, { store, localVue });
//     expect(actions.fetchBots).toHaveBeenCalled();
//
//   });
// });
