import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {

        paddingStep: 30,

        testStoreProp: 'test store prop',

        blocks: [],

        area: {
            offset: {top: 0, left: 0},
            cursorInArea: {top: 0, left: 0},
            el: {},
        },

        movedBlockIndex: -1,

        dd: {

            trackCursor: false,

            coordinates: {top: 0, left: 0},

        }

    },

    mutations: {

        saveWorkAreaEl (state, el) {

            state.area.el = el;

        },

        setTrackCursor (state, enable = false) {

            state.dd.trackCursor = enable;

        },

        updateCursorCoordinates (state, e) {

            // console.log(e.pageX);
            // console.log(e.pageY);

            // if (!state.trackCursor) return false;

            state.dd.coordinates.top = e.pageY;
            state.dd.coordinates.left = e.pageX;

            // console.log(state.dd.coordinates.top, state.dd.coordinates.left);
            // console.log(state.area.offset.top, state.area.offset.left);

            let top = state.dd.coordinates.top - state.area.offset.top;
            let left = state.dd.coordinates.left - state.area.offset.left;

            // TODO: add boundaries for right and bottom
            state.area.cursorInArea.top = (top < 0) ? 0 : top;
            state.area.cursorInArea.left = (left < 0) ? 0 : left;

            // console.log(state.area.cursorInArea.top, state.area.cursorInArea.left);

        },

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

            let offset = (state.blocks.length + 1) * state.paddingStep;

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
