<template lang="pug">

  #drop-area

</template>

<script lang="ts">

  import Vue from "vue"
  import Component from "vue-class-component"
  // import {
  //   State,
  //   namespace
  // } from 'vuex-class'
  import { mapState } from 'vuex'

  // const DropAreaModule = namespace('DropAreaModule');

  @Component({
    components: { },
    props: { },
    computed: mapState('DropAreaModule', ['test']),
    // computed: mapState('version'),
  })
  export default class DropArea extends Vue {

    // @DropAreaModule.State test;

    // @DropAreaModule.State("test") test!: string;

    // test: string = 'test111';
    test: string;

    // version: string;

    mounted () {
      console.log(this.test);
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
