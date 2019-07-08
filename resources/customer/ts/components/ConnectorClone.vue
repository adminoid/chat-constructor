<template lang="pug">

  .connector_clone(:title="itemData.id")

</template>

<script lang="ts">

  import { Component, Prop } from 'vue-property-decorator'
  import { mixins } from 'vue-class-component'
  import EndLineMixin from '../mixins/EndLine'

  @Component({})
  export default class ConnectorClone extends mixins(EndLineMixin) {

    @Prop({}) itemData!: any;

  }

</script>

<style lang="sass">

  .connector_clone
    position: absolute
    height: 16px
    width: 16px
    border: 1px dashed #2a9055
    background: #419410
    border-radius: 3px

</style>
