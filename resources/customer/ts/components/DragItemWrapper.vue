<template lang="pug">

  .drag-item-wrapper(:style="position")
    slot

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  type positionInterface = {
    left: number,
    top: number
  };

  @Component({})
  export default class DragItemWrapper extends Vue {

    @Prop({}) position!: positionInterface;

  }
</script>

<style lang="sass" scoped>

  .drag-item-wrapper
    position: absolute

</style>
