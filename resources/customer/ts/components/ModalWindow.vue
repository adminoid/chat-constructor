<template lang="pug">
  .modal-window
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component
  export default class ModalWindow extends Vue {
    name: 'ModalWindow';
  }

</script>

<style lang="sass" scoped>
  .modal-window
    width: 300px
    height: 100px
    background: #575dff

</style>
