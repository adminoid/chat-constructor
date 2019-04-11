import store from '@r/customer/ts/store/index.ts'

jest.mock('axios', () => {
  return {
    get: () => ({ data: { userId: 1 }})
  }
});

describe('store/modules/Bot.ts', () => {

  it('fetchBots', () => {

      // const store = { commit: jest.fn() };

      // await store.actions.getPost(store);

    console.log(store);

      expect(store.commit).toHaveBeenCalledWith('SET_POST', { userId: 1 })


    // actions.getAsync({ commit: mockCommit })
    //   .then(() => {
    //     expect(count).toBe(1)
    //     expect(data).toEqual({ title: 'Mock with Jest' })
    //   })

  })

});
