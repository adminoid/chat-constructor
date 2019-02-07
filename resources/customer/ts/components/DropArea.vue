<template lang="pug">

  #drop-area

</template>

<script lang="ts">

  import Component, { mixins } from 'vue-class-component'
  import {
    State, namespace, Mutation,
  } from 'vuex-class'

  import DragItemMixin from '../mixins/DragItem'

  const DropAreaModule = namespace('DropAreaModule');

  @Component({
    components: { },
    props: { },
  })
  export default class DropArea extends mixins(DragItemMixin) {

    @State version;
    @DropAreaModule.State count;
    @Mutation rootMoot;
    @DropAreaModule.Mutation change;

    created () {
      console.group('DropArea.vue');
      this.rootMoot('new val');
      console.log(this.mixinValue);
      console.log(this.count);
      this.change(721);
      console.log(this.count);
      console.groupEnd();
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
