<template lang="pug">

  .drag-item-wrapper(
    @mousedown.prevent.stop="dragStart"
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

    @Prop({}) x!: number;
    @Prop({}) y!: number;
    @Prop({}) id!: number;
    @Prop({}) idx!: number;

    @BlockModule.Mutation dragDropDataSet;

    get position() {
      return {left: this.x + 'px', top: this.y + 'px'}
    };

    dragStart (e) {

      let cursorOffset = getCursorOffset(e);
      this.dragDropDataSet({id: this.id, idx: this.idx, offset: cursorOffset});

    }

  }

</script>

<style lang="sass" scoped>

  .drag-item-wrapper
    position: absolute

</style>
