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

    let areaBoundaries = store.state.DropAreaModule.area.boundaries;
    let clientRect = this.$el.getBoundingClientRect();

    let paddingLeft = clientRect.width / 2,
      left = clientRect.left - areaBoundaries.left + paddingLeft,
      top = clientRect.top - areaBoundaries.top;

    return {
      left: left,
      top: top
    };

  }

  mounted () {

    store.commit('DropAreaModule/updateEndLineCoords', {
      itemId: this.id,
      coords: this.getLineEndCoords(),
    });

  }

}

