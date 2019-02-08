<template lang="pug">
  .base-block(:style="style")
    .base-block__header Block №{{ idx }}
      .base-block__body
        p Block
      .base-block__footer Footer
</template>

<script lang="ts">

  import Component, { mixins } from 'vue-class-component'
  import DragItemMixin from '../mixins/DragItem'
  import { Prop } from 'vue-property-decorator'

  @Component({
    components: {  },
    props: {
      idx: Number
    }
  })
  export default class BlockBase extends mixins(DragItemMixin) {

    style: any = {};

    @Prop({}) idx!: number;
    @Prop({}) initialData!: any;

    created () {
      let position = this.initialData.position;

      Object.keys(position).forEach(function (item) {
        position[item] = position[item] + 'px';
      });

      this.style = position;

    }

  }

</script>

<style lang="sass">
  .base-block
    display: flex
    flex-flow: column nowrap
    justify-content: space-between
    align-items: center
    position: absolute
    height: 100px
    width: 150px
    background: #6a8aff
    border: 1px solid #5d6dd5
    border-radius: 5px
    .base-block__header
      position: relative
    .base-block__body
      height: 100%
    .base-block__footer
      position: relative

</style>
