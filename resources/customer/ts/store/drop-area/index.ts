// import { Module } from 'vuex';
// import { DropAreaState } from './types';
// import { RootState } from '../types';

export const state = {

  test: 'test state value',

  items: [],

};

const namespaced: boolean = true;

export const DropAreaModule = {
  namespaced,
  state,
};

// export default {
//   state: {  },
//   mutations: {  },
//   actions: {  }
// }
