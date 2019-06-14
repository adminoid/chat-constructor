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

    // console.log(this.$el);

    if (store.state.Block && this.$el) {
      let areaBoundaries = store.state.Block.area.boundaries,
        clientRect = this.$el.getBoundingClientRect(),
        paddingLeft = clientRect.width / 2,
        x = clientRect.left - areaBoundaries.left,
        y = clientRect.top - areaBoundaries.top;

      // console.info(clientRect.left);
      // console.log(this.$el.getBoundingClientRect());
      // console.info(areaBoundaries.left);


      // console.info(areaBoundaries);

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

