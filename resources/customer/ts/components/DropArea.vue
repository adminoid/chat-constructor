<template lang="pug">

  #drop-area
    drag-item-wrapper(
    v-for="(item, index) in items"
    :key="index"
    :position="item.position")
      component(
      :is="item.component"
      :idx="index")

</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'
  import {
    namespace
  } from 'vuex-class'
  import BlockBase from './BlockBase'
  import DragItemWrapper from './DragItemWrapper'

  const DropAreaModule = namespace('DropAreaModule');

  @Component({
    components: { BlockBase, DragItemWrapper }
  })
  export default class DropArea extends Vue {

    @DropAreaModule.State items;

    zIndexStep: number = 20;

  }

</script>

<style lang="sass">

  #drop-area
    height: calc(100vh - 140px)
    position: relative
    background: #d7d7d7
    border-radius: 5px

</style>
