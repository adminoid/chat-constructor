import { createLocalVue, mount} from '@vue/test-utils'
import BotsArea from '@r/customer/ts/components/BotsArea.vue'

describe('BotsArea.vue', () => {

  it.only('loading user bots at created hook via ajax', () => {

    // jest.mock('axios', () => {
    //   return {
    //     get: () => ({ data: { userId: 1 }})
    //   }
    // })

    var axios = require('axios');
    var MockAdapter = require('axios-mock-adapter');

    // This sets the mock adapter on the default instance
    var mock = new MockAdapter(axios);

    // Mock any GET request to /users
    // arguments for reply are (status, data, headers)
    mock.onGet('/users').reply(200, {
      users: [
        { id: 1, name: 'John Smith' }
      ]
    });

    axios.get('/users')
      .then(function(response) {
        console.log(response.data);
      });

  });

});
