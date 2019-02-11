<template lang="pug">
  .base-block
    .base-block__header Block №{{ idx }}
      .base-block__body
        p Block
      .base-block__footer Footer
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component({
    components: {  },
    props: {
      idx: Number
    }
  })
  export default class BlockBase extends Vue {

    @Prop({}) idx!: number;

  }

</script>

<style lang="sass">
  .base-block
    display: flex
    flex-flow: column nowrap
    justify-content: space-between
    align-items: center
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
