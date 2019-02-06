<template lang="pug">
  .base-block
    .base-block__header Header
      .base-block__body
        p Block
      .base-block__footer Footer
</template>

<script lang="ts">

  import Vue from "vue"
  import Component from "vue-class-component"

  @Component({
    components: {  },
    props: {  },
  })
  export default class BaseBlock extends Vue {

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
