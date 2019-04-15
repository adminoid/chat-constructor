import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);
import { getModule } from 'vuex-module-decorators'
import Bot from '@r/customer/ts/store/modules/Bot.ts';
// import Bot from '../../../resources/customer/ts/store/modules/Bot.ts';

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// This sets the mock adapter on the default instance
let mock = new MockAdapter(axios);

mock.onGet('private/bots').reply(200, [
  {
    id: 1,
    name: 'Colten Feest 1',
    user_id: 1,
    created_at: '2019-04-10 16:46:44',
    updated_at: '2019-04-10 16:46:44',
  }, {
    id: 2,
    name: 'Manuela Beahan 1',
    user_id: 1,
    created_at: '2019-04-10 16:46:44',
    updated_at: '2019-04-10 16:46:44',
  }, {
    id: 3,
    name: 'River Herzog 1',
    user_id: 1,
    created_at: '2019-04-10 16:46:44',
    updated_at: '2019-04-10 16:46:44',
  }
]);

describe('accessing statics works on dynamic module', () => {
  it('should update count', async function() {

    const bm = getModule(Bot);
    // await bm.fetchBots();
    await bm.fetchBots()
      .then(() => {

        expect(mock.history.get.length).toBe(1);
        expect(bm.bots.length).toBe(3);

      });

  });
});
