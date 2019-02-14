<template lang="pug">

  .drag-item-wrapper(
  :style="position | pixelize"
  @mousedown.prevent = "dragStart")
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

  @Component({
    filters: {
      pixelize: function (object) {
        // console.log(object);

        let pixelizedObject = {};
        for (let key in object) {
          if (object.hasOwnProperty(key)) {
            // console.log(object[key]);
            pixelizedObject[key] = object[key] + 'px';
            // console.log(object[key]);
          }
        }

        // console.log(object);
        // console.log(pixelizedObject);
        return pixelizedObject;

        // object.map((value) => {
        //   console.warn(value);
        // });
        // return object;
        // return value + 'px'
      }
    }
  })
  export default class DragItemWrapper extends Vue {

    @Prop({}) position!: positionInterface;

    @Prop({}) idx!: number;

    @DropAreaModule.Mutation dragDropDataSet;

    dragStart (e) {

      let cursorOffset = this.getCursorOffset(e);

      this.dragDropDataSet({idx: this.idx, offset: cursorOffset});

      // console.group('dragStart');
      // console.log(cursorOffset);
      // console.groupEnd();

    }

    getCursorOffset (e) {

      let leftOffset = +Number(e.clientX - e.currentTarget.getBoundingClientRect().left).toFixed(),
        topOffset = +Number(e.clientY - e.currentTarget.getBoundingClientRect().top).toFixed(),
        rightOffset = +Number(e.currentTarget.getBoundingClientRect().right - e.clientX).toFixed(),
        bottomOffset = +Number(e.currentTarget.getBoundingClientRect().bottom - e.clientY).toFixed();

      return {
        left: leftOffset,
        top: topOffset,
        right: rightOffset,
        bottom: bottomOffset,
      };
    }

  }

</script>

<style lang="sass" scoped>

  .drag-item-wrapper
    position: absolute

</style>
