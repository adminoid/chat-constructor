<template lang="pug">

  #drop-area

</template>

<script lang="ts">

  import Vue from "vue"
  import Component from "vue-class-component"
  import {
    State,
    namespace
  } from 'vuex-class'

  const DropAreaModule = namespace('DropAreaModule');

  @Component({
    components: { },
    props: { },
  })
  export default class DropArea extends Vue {

    @State version;
    @DropAreaModule.State count;

    created () {
      console.log(this.version);
      console.log(this.count);
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
