import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        testStoreProp: 'test store prop',

        blocks: []
    },

    mutations: {

        addBlock (state, block) {

            state.blocks.push(block);
        }

    },

    getters: {

        getNextBlockZIndex (state) {

            return (state.blocks.length + 1) * 100;

        },

        getNextBlockOffset (state) {

            let offset = (state.blocks.length + 1) * 10;

            return {
                left: offset,
                top: offset
            };

        },

    },

    actions: {

        pushBlock ({getters, commit}, block) {

            block.style = {
                'z-index': getters.getNextBlockZIndex
            };

            block.startPosition = getters.getNextBlockOffset;

            // console.log(getters.getNextBlockZIndex);
            // console.log(block);

            commit('addBlock', block);

        }

    },

});
