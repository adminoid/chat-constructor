<template lang="pug">

  .connector_output

</template>

<script lang="ts">

  import { Component, Prop } from 'vue-property-decorator'
  import { mixins } from 'vue-class-component'
  import ConnectorCommonMixin from '../mixins/ConnectorCommon'

  @Component({})
  export default class ConnectorOutput extends mixins(ConnectorCommonMixin) {

    @Prop({}) itemData!: object;

  }

</script>

<style lang="sass">

  .connector_output
    height: 16px
    width: 16px
    border: 1px dashed #2a9055
    background: #b03779
    border-radius: 3px

</style>
