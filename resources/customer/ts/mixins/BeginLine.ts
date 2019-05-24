/**
 * This mixin for ConnectorCreate and ConnectorOutput
 */

import Vue from 'vue'
import store from '../store'
import { Mixin } from 'vue-mixin-decorator'

// You can declare a mixin as the same style as components.
@Mixin
export default class BeginLine extends Vue {

  connectorId: number;
  blockId: number;

  getLineBeginCoords () {

    let areaBoundaries = store.state.Block.area.boundaries;
    let clientRect = this.$el.getBoundingClientRect();

    let paddingLeft = clientRect.width / 2,
      left = clientRect.left - areaBoundaries.left + paddingLeft,
      top = clientRect.bottom - areaBoundaries.top;

    return {
      left: left,
      top: top
    };

  }

  mounted () {

    // push begin coordinates to out connector
    store.commit('DropAreaModule/setBeginLineCoords', {
      itemId: this.blockId,
      connectorId: this.connectorId,
      coords: this.getLineBeginCoords(),
    });

  }

}

