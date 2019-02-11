<template lang="pug">

  .drag-item-wrapper(
  :style="position"
  @mousedown.prevent.stop="dragStart")
    slot

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  import {
    namespace
  } from 'vuex-class'
  const DropAreaModule = namespace('DropAreaModule');

  type positionInterface = {
    left: number,
    top: number
  };

  @Component
  export default class DragItemWrapper extends Vue {

    @Prop({}) position!: positionInterface;

    @Prop({}) idx!: number;

    @DropAreaModule.Mutation setDragDropData;

    dragStart (e) {

      let cursorOffset = this.getCursorOffset(e);

      // console.group('dragStart');
      // console.log(this.idx);
      // console.log(cursorOffset);
      // console.groupEnd();

      this.setDragDropData({idx: this.idx, offset: cursorOffset});


    }

    getCursorOffset (e) : positionInterface {
      return {
        left: e.clientX - e.target.getBoundingClientRect().left,
        top: e.clientY - e.target.getBoundingClientRect().top
      };
    }

  }

</script>

<style lang="sass" scoped>

  .drag-item-wrapper
    position: absolute

</style>
