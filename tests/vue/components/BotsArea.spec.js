import { Store } from 'vuex-mock-store'
import {config, mount} from '@vue/test-utils'
import BotsArea from '@r/customer/ts/components/BotsArea.vue'
import expect from 'expect'
import VueRouter from 'vue-router'
import router from "@r/customer/ts/router";

config.stubs['fa-icon'] = '<div />';
config.stubs['router-link'] = '<div />';

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

  test('fetchBots', () => {

    let wrapper = mount(BotsArea, { mocks });

    expect(store.dispatch).toHaveBeenCalledWith('Bot/fetchBots');
    expect(wrapper.vm.bots.length).toBe(2);
    let bots = wrapper.findAll('.bots-area__bot');
    expect(bots.length).toBe(2);
  });

  test('deleteBot', () => {

    const wrapper = mount(BotsArea, {
      mocks
    });

    const removeBotMock = jest.fn();
    wrapper.vm.removeBot = removeBotMock;

    let bots = wrapper.findAll('.bots-area__bot'),
      bot = bots.at(1);
    expect(bots.length).toBe(2);
    bot.find('.btn-outline-danger').trigger('click');
    expect(removeBotMock.mock.calls.length).toBe(1);

    wrapper.find('.btn-outline-danger').trigger('click');
    expect(removeBotMock.mock.calls.length).toBe(2);

  });

});

