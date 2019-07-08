/**
 * This mixin for ConnectorCreate and ConnectorOutput
 */

import Vue from 'vue'
import store from '../store'
import { Mixin } from 'vue-mixin-decorator'

// You can declare a mixin as the same style as components.
@Mixin
export default class BeginLine extends Vue {

  connectorData: any;
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
    let payload = {
      itemId: this.blockId,
      connectorId: this.connectorData.id,
      coords: this.getLineBeginCoords(),
    };

    store.commit('Block/setBeginLineCoords', payload);

  }

}

