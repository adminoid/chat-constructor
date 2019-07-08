import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

import { getModule } from 'vuex-module-decorators'
import Bot from '@r/customer/ts/store/modules/Bot.ts';

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
let mock = new MockAdapter(axios);

mock.onGet('private/bots').reply(200, [
  {
    id: 1,
    name: 'Teston Feest',
    user_id: 1,
    created_at: '2019-01-10 16:47:77',
    updated_at: '2019-01-10 16:47:78',
  }, {
    id: 2,
    name: 'Testonuela Beahan',
    user_id: 1,
    created_at: '2019-01-10 16:47:77',
    updated_at: '2019-01-10 16:47:78',
  }
]);

mock.onDelete('private/bots').reply(200, 1);

describe('BotVuexModule.spec.js', () => {

  it('fetchBots to store and delete one', async () => {

    const bm = getModule(Bot);
    // await bm.fetchBots();
    await bm.fetchBots();

    expect(mock.history.get.length).toBe(1);
    expect(bm.bots.length).toBe(2);

    await bm.deleteBot(1)
    expect(bm.bots.length).toBe(1);

  });


});
