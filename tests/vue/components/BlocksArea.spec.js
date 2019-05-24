import { Store } from 'vuex-mock-store'
import {config, mount} from '@vue/test-utils'
import BlocksArea from '@r/customer/ts/components/BlocksArea.vue'
import expect from 'expect'

config.stubs['fa-icon'] = '<div />';
config.stubs['router-link'] = '<div />';

// create the Store mock
const store = new Store({
  state: {
    Block: {
      blocks: [
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

describe('BlocksArea.vue', () => {

  test('fetchBlocks', () => {


    let wrapper = mount(BlocksArea, { mocks });

    // expect(4+3).toBe(7);

    expect(store.dispatch).toHaveBeenCalledWith('Block/fetchBlocks');
    // expect(wrapper.vm.blocks.length).toBe(2);
    // let blocks = wrapper.findAll('.blocks-area__block');
    // expect(blocks.length).toBe(2);


  });

  // test('deleteBlock', () => {
  //
  //   const wrapper = mount(BlocksArea, {
  //     mocks
  //   });
  //
  //   const removeBlockMock = jest.fn();
  //   wrapper.vm.removeBlock = removeBlockMock;
  //
  //   let blocks = wrapper.findAll('.blocks-area__block'),
  //     block = blocks.at(1);
  //   expect(blocks.length).toBe(2);
  //   block.find('.btn-outline-danger').trigger('click');
  //   expect(removeBlockMock.mock.calls.length).toBe(1);
  //
  //   wrapper.find('.btn-outline-danger').trigger('click');
  //   expect(removeBlockMock.mock.calls.length).toBe(2);

});

