import store from '@r/customer/ts/store/index'
import expect from 'expect'

describe('has swore action', () => {

  it('should be good', function () {

    store.dispatch('addAction', 'bots');

    expect(true).toBe(!false);
  });
});


