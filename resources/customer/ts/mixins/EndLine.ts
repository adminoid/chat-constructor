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


    // console.log(store.state);
    // return;

    // let areaBoundaries = store.state.Blocks.area.boundaries,
    //   clientRect = this.$el.getBoundingClientRect(),
    //   paddingLeft = clientRect.width / 2,
    //   left = clientRect.left - areaBoundaries.left,
    //   top = clientRect.top - areaBoundaries.top;

    return {
      left: 964,
      top: 2
    };

    // return {
    //   left: left + paddingLeft,
    //   top: top,
    // };

  }

  created () {
    store.commit('Block/updateEndLineCoords', {
      itemId: this.id,
      coords: this.getLineEndCoords(),
    });
  }

}

