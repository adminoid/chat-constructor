/**
 * This mixin for BlockBase and ConnectorClone
 */

import Vue from 'vue'
import store from '../store'
import { Mixin } from 'vue-mixin-decorator'

// You can declare a mixin as the same style as components.
@Mixin
export default class EndLine extends Vue {

  id: number;

  getLineEndCoords () {

    console.log('getLineEndCoords');

    if (store.state.Block && this.$el) {
      let areaBoundaries = store.state.Block.area.boundaries,
        clientRect = this.$el.getBoundingClientRect(),
        paddingLeft = clientRect.width / 2,
        x = clientRect.left - areaBoundaries.left,
        y = clientRect.top - areaBoundaries.top;

      return {
        left: x + paddingLeft,
        top: y,
      };

    }

    return {
      left: 0,
      top: 0,
    };

  }

  created () {
    store.commit('Block/updateEndLineCoords', {
      itemId: this.id,
      coords: this.getLineEndCoords(),
    });
  }

}

