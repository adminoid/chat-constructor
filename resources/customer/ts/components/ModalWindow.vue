<template lang="pug">
  .modal-window
    .modal-window__header {{ title }}
    .modal-window__body {{ message }}
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class ModalWindow extends Vue {

    name: 'ModalWindow';

    @Prop({}) title!: string;
    @Prop({}) message!: string;

    // closeHandler (closure: Function, error?: Error) {
    //   console.log('close handle');
    // }
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
