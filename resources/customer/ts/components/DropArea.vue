<template lang="pug">

  #drop-area

</template>

<script lang="ts">

  import Vue from "vue"
  import Component, { mixins } from 'vue-class-component'
  import {
    State,
    namespace
  } from 'vuex-class'

  import DragItemMixin from '../mixins/DragItem'

  // Use `mixins` helper function instead of `Vue`.
  // `mixins` can receive any number of arguments.
  @Component
  export class MyComp extends mixins(DragItemMixin) {
    created () {

    }
  }

  const DropAreaModule = namespace('DropAreaModule');

  @Component({
    components: { },
    props: { },
  })
  export default class DropArea extends mixins(DragItemMixin) {

    @State version;
    @DropAreaModule.State count;

    created () {
      console.log(this.version);
      console.log(this.count);
      console.log(this.mixinValue) // -> Hello
    }

  }

</script>

<style lang="sass">

  #drop-area
    height: calc(100vh - 140px)
    position: relative
    background: #d7d7d7
    border-radius: 5px

</style>
