import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import BotsArea from '@r/customer/ts/components/BotsArea.vue'

const localVue = createLocalVue();
localVue.use(Vuex);

describe('BotsArea.vue fetchBots()', () => {

  let actions, state, store;

  beforeEach(() => {
    state = {
      bots: []
    };

    actions = {
      fetchBots: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        Bot: {
          namespaced: true,
          state,
          actions,
        }
      }
    })
  });

  it('loading user bots at created hook via ajax', () => {

    shallowMount(BotsArea, { store, localVue });
    expect(actions.fetchBots).toHaveBeenCalled();

  });



});
