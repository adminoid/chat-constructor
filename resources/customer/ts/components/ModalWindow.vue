<template lang="pug">
  .modal-window
    .modal-window__header {{ state.title }}
    .modal-window__body {{ state.message }}
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class ModalWindow extends Vue {

    name: 'ModalWindow';

    @Prop({}) state!: object;

    confirm () {
      this.$emit('confirmed')
    }

    cancel () {
      this.$emit('canceled')
    }

    mounted () {
      console.log('Modal Window mounted')
    }

  }

</script>

<style lang="sass" scoped>

  .modal-window
    position: fixed
    left: 100px
    top: 50px
    width: 300px
    height: 100px
    background: #575dff

</style>
