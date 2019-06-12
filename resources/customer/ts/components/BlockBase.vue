<template lang="pug">

  .base-block
    .base-block__header
      .input-connector
    .base-block__body
      p {{ itemData.id }}. {{ itemData.name }}
    .base-block__footer
      .outputs
        connector-output(
          v-for="(connector, index) in itemData.outputs"
          :key="index"
          :blockId="itemData.id"
          :connectorData="connector"
          ref="outputs"
          :title="connector.id")


</template>

<script lang="ts">

  import { Component, Prop, Watch } from 'vue-property-decorator'
  import { mixins } from 'vue-class-component'
  import EndLineMixin from '../mixins/EndLine'
  import { namespace } from 'vuex-class'
  import ConnectorOutput from './ConnectorOutput.vue'
  import ConnectorClone from './ConnectorClone.vue'

  const BlockModule = namespace('Block');

  @Component({
    components: { ConnectorOutput, ConnectorClone },
  })
  export default class BlockBase extends mixins(EndLineMixin) {

    @BlockModule.State dd;

    @Prop({}) itemData!: any;

    @Watch('dd', { deep: true })
    onItemsChanged() {
      // TODO: in the future make observing by bubbling custom events on watch local props: coords, targetCoords
      this.$forceUpdate();
    }

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
    background: rgba(82, 176, 93, 0.57)
    border: 1px solid rgba(14, 81, 0, 0.8)
    border-radius: 5px
    box-shadow: 4px 4px 14px 0 rgba(0,0,0,0.3)
    .base-block__header
      position: relative
    .base-block__body
      height: 100%
    .base-block__footer
      position: relative

    .outputs
      padding: 2px
      margin: 0
      list-style: none
      display: flex
      position: relative
      bottom: -11px
      border: 1px dashed #7c7c7c
      border-radius: 3px

    .input-connector
      padding: 2px
      margin: 0
      list-style: none
      display: flex
      position: relative
      top: -8px
      height: 16px
      width: 16px
      border: 1px dashed #4046b8
      background: #575dff
      border-radius: 3px
      opacity: .7
      &.active
        background: #f09593

</style>
