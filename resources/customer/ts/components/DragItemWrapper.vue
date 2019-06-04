<template lang="pug">

  .drag-item-wrapper( @mousedown.prevent="dragStart"
    :style="position")
    slot

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { getCursorOffset } from '../helpers'

  const BlockModule = namespace('Block');

  @Component
  export default class DragItemWrapper extends Vue {

    @Prop({}) itemData!: any;

    @BlockModule.Mutation dragDropDataSet;

    dragStart (e) {

      let cursorOffset = getCursorOffset(e);

      console.info(cursorOffset);

      // this.dragDropDataSet({id: this.id, idx: this.idx, offset: cursorOffset});

    }

    get position() {
      return {left: this.itemData.x + 'px', top: this.itemData.y + 'px'};
    }

    // mounted() {
    //   console.log(this.itemData.x, this.itemData.y);
    //   console.log(this.position);
    // }

  }

</script>

<style lang="sass" scoped>

  .drag-item-wrapper
    position: absolute

</style>
