<template lang="pug">

  .base-block
    .base-block__header
      .input-connector
    .base-block__body
      p {{ itemData.blockName }}
    .base-block__footer
      .output-connectors
        component(
        v-for="(connector, index) in connectorsOutput"
        :key="index"
        :connectorId="index"
        :blockId="id"
        :connectorData="connector"
        :is="'connector-' + connector.type"
        ref="output-connectors")

</template>

<script lang="ts">

  import { Component, Prop } from 'vue-property-decorator'
  import { mixins } from 'vue-class-component'
  import EndLineMixin from '../mixins/EndLine'
  import { namespace } from 'vuex-class'
  import ConnectorOutput from './ConnectorOutput'
  import ConnectorCreate from './ConnectorCreate'
  import * as _ from 'lodash'

  const DropAreaModule = namespace('DropAreaModule');

  @Component({
    components: { ConnectorOutput, ConnectorCreate },
  })
  export default class BlockBase extends mixins(EndLineMixin) {

    @DropAreaModule.Mutation pushCreateConnector;

    @Prop({}) id!: number;

    @Prop({}) itemData!: object;

    get connectorsOutput () {

      let connectorsOutput = _.get(this.itemData, 'connectors.output') || [];

      let createButtonCnt = _.filter(connectorsOutput, function(o) { if (o.type == 'create') return o }).length;

      if (!createButtonCnt || createButtonCnt < 1) {
        // here push create connector to store
        this.pushCreateConnector(this.id);
      } else if (createButtonCnt > 1) {
        throw 'create button must be a single'
      }

      return connectorsOutput;

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
    background: #6a8aff
    border: 1px solid #5d6dd5
    border-radius: 5px
    box-shadow: 4px 4px 14px 0 rgba(0,0,0,0.3)
    .base-block__header
      position: relative
    .base-block__body
      height: 100%
    .base-block__footer
      position: relative

  .output-connectors
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

  .connector_new
    height: 16px
    width: 16px
    border: 1px dashed #2a9055
    background: #31b06f
    border-radius: 3px
    &:hover
      border: 1px solid #005f26
      background: #2a9055
      cursor: pointer

</style>
