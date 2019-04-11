import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators'

import axios from 'axios'

@Module({
  name: 'Bot',
  namespaced: true,
  store: {},
})
export default class Bot extends VuexModule {

  bots = [];

  @Mutation
  updateBots( bots: [] ) {
    this.bots = bots;
  }

  @Action({rawError: true})
  async fetchBots() {
    await axios.get('private/bots')
      .then((resp) => {
        // console.log(resp.data.length);
        console.log('hi there');
      });
  }

}
