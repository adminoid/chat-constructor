import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        testStoreProp: 'test store prop',

        blocks: []
    },

    mutations: {
        pushBlock (state, block) {

            state.blocks.push(block);
        }

    }
});
