import { Store } from 'vuex-mock-store'
import {config, createLocalVue, mount} from '@vue/test-utils'
import BlocksArea from '@r/customer/ts/components/BlocksArea.vue'
import expect from 'expect'
import VueRouter from 'vue-router'
import router from "@r/customer/ts/router";

config.stubs['fa-icon'] = '<div />';
config.stubs['router-link'] = '<div />';

// create the Store mock
const store = new Store({
  state: {
    Block: {
      blocks: [
        {
          id: 1,
          name: 'Block one',
          user_id: 1,
          bot_id: 1,
          created_at: '2019-04-10 16:46:44',
          updated_at: '2019-04-10 16:46:44',
        }, {
          id: 2,
          name: 'Manuela Block 2',
          user_id: 1,
          bot_id: 1,
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
  $route: jest.fn(),
};

// reset spies, initial state and getters
afterEach(() => store.reset());

describe('BlocksArea.vue', () => {

  test('fetchBots', () => {

    let wrapper = mount(BlocksArea, { mocks });

    expect(store.dispatch).toHaveBeenCalledWith('Block/fetchBlocks');
    // expect(wrapper.vm.blocks.length).toBe(2);
    // let blocks = wrapper.findAll('.blocks-area__block');
    // expect(blocks.length).toBe(2);
  });

  // const localVue = createLocalVue();
  // localVue.use(VueRouter);
  //
  // let wrapper;
  // beforeEach(() => {
  //   wrapper = mount( BlocksArea, {
  //     mocks, localVue, router } )
  // });
  //
  // router.push("/bot/21");
  // it("check right type of TopButton.vue", () => {
  //   let test = router;
  //   expect(wrapper.find(BlocksArea).exists()).toBe(true);
  //
  //   // let topButton = wrapper.find(TopButton);
  //   // let typeLocal = topButton.vm.type;
  //   // expect(typeLocal).toBe('bot');
  // });



  // test('deleteBot', () => {
  //
  //   const wrapper = mount(BlocksArea, {
  //     mocks
  //   });
  //
  //   const removeBotMock = jest.fn();
  //   wrapper.vm.removeBot = removeBotMock;
  //
  //   let bots = wrapper.findAll('.blocks-area__block'),
  //     bot = bots.at(1);
  //   expect(bots.length).toBe(2);
  //   bot.find('.btn-outline-danger').trigger('click');
  //   expect(removeBotMock.mock.calls.length).toBe(1);
  //
  //   wrapper.find('.btn-outline-danger').trigger('click');
  //   expect(removeBotMock.mock.calls.length).toBe(2);
  //
  // });

});

