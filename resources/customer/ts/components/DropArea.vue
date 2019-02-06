<template lang="pug">

  #drop-area

</template>

<script lang="ts">

  import Vue from "vue"
  import Component from "vue-class-component"

  @Component({
    components: { },
    props: { },
  })
  export default class DropArea extends Vue {



  }

</script>

<style lang="sass">

  #drop-area
    height: calc(100vh - 140px)
    position: relative
    background: #d7d7d7
    border-radius: 5px

</style>
