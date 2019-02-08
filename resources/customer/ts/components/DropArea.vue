<template lang="pug">

  #drop-area
    component(
      v-for="(item, index) in items"
      :key="index"
      :is="item.component"
      :idx="index"
      :style="{ zIndex: index * zIndexStep }"
    )

</template>

<script lang="ts">

  import Component from 'vue-class-component'
  import {
    namespace
  } from 'vuex-class'
  import Vue from 'vue'
  import BlockBase from './BlockBase'

  const DropAreaModule = namespace('DropAreaModule');

  @Component({
    components: { BlockBase },
    props: { },
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
