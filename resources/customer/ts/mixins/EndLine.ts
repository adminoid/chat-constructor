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

  itemData: any;

  getLineEndCoords () {

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

  mounted () {

    let id = this.id || this.itemData.id;

    store.commit('Block/updateEndLineCoords', {
      itemId: id,
      coords: this.getLineEndCoords(),
    });
  }

}

