import Vue from 'vue'
import Component from 'vue-class-component'
import store from '../store'

// You can declare a mixin as the same style as components.
@Component
export default class BeginLine extends Vue {

  // get test () {
  //   return store.state.DropAreaModule.dd.dragging;
  // }

  // TODO: extendable...
  getLineBeginCoords () {

    let areaBoundaries = store.state.DropAreaModule.area.boundaries;
    let clientRect = this.$el.getBoundingClientRect();

    let paddingLeft = clientRect.width / 2,
      left = clientRect.left - areaBoundaries.left + paddingLeft,
      top = clientRect.bottom - areaBoundaries.top;

    return {
      left: left,
      top: top
    };

  }

}

