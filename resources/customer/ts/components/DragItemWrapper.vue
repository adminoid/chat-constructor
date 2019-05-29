<template lang="pug">

  .drag-item-wrapper(
  :style="position"
  @mousedown.prevent = "dragStart")
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

    @Prop({}) idx!: number;

    @Prop({}) id!: number;

    @BlockModule.Mutation dragDropDataSet;

    dragStart (e) {

      let cursorOffset = getCursorOffset(e);

      this.dragDropDataSet({id: this.id, idx: this.idx, offset: cursorOffset});

    }

    get position () {
      return {
        left: this.x,
        top: this.y
      }
    }

  }

</script>

<style lang="sass" scoped>

  .drag-item-wrapper
    position: absolute

</style>
