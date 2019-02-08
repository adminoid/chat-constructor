import Vue from 'vue'
import Component from 'vue-class-component'
import store from '../store'

// You can declare a mixin as the same style as components.
@Component
export default class DragItem extends Vue {

  mixinValue = 'Hello';

  testMethod () {
    console.group('DragItem.ts');
    console.log(store.state.version);
    // store.commit('DropAreaModule/change', 111);
    // console.log(store.state.version);
    // console.log(store.state.DropAreaModule.count);
    console.groupEnd();
  }

}
