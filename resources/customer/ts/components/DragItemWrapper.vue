<template lang="pug">

  .drag-item-wrapper(
  :style="position | pixelize"
  @mousedown.prevent = "dragStart")
    slot

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { getCursorOffset } from '../helpers'

  const BlockModule = namespace('Block');

  type positionInterface = {
    left: number,
    top: number
  };

  @Component({
    filters: {
      pixelize: function (object) {

        let pixelizedObject = {};
        for (let key in object) {
          if (object.hasOwnProperty(key)) {
            pixelizedObject[key] = object[key] + 'px';
          }
        }

        return pixelizedObject;

      }
    }
  })
  export default class DragItemWrapper extends Vue {

    @Prop({}) position!: positionInterface;

    @Prop({}) idx!: number;

    @Prop({}) id: number;

    @BlockModule.Mutation dragDropDataSet;

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
