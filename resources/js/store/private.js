import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        testStoreProp: 'test store prop',

        blocks: [],

        area: {
            offset: {}
        },

        movedBlockIndex: -1
    },

    mutations: {

        setAreaOffset (state, offset) {
            state.area.offset = offset;
        },

        addBlock (state, block) {

            state.blocks.push(block);
        },

        setMovedBlockIndex (state, idx) {
            state.movedBlockIndex = idx;
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

            commit('addBlock', block);

        }

    },

});
