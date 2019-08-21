<template lang="pug">

  .connector(@mousedown.stop.prev = "startDragConnector")

</template>

<script lang="ts">

  import { Component, Prop } from 'vue-property-decorator'
  import { mixins } from 'vue-class-component'
  import BeginLineMixin from '../mixins/BeginLine'
  import { namespace } from 'vuex-class'
  import { getCursorOffset } from '../helpers'
  import _ from 'lodash'

  const BlockModule = namespace('Block');

  @Component({})
  export default class ConnectorOutput extends mixins(BeginLineMixin) {

    @BlockModule.State area;
    @BlockModule.State items;
    @BlockModule.State dd;
    @BlockModule.Mutation setTargetForConnector;
    @BlockModule.Mutation insertConnectorClone;
    @BlockModule.Mutation setConnectorTarget;

    @Prop({}) connectorData!: any;
    @Prop({}) blockId!: number;

    startDragConnector (e) {

      let $connector = _.find(_.find(this.items, ['id', this.blockId]).outputs, ['id', this.connectorData.id]);
      this.dd.target_old = $connector.target_block_id;
      delete $connector.target_block_id;

      // pass info about creating and clone connectors to store for drawing line between
      let connectorData = {
        blockId: this.blockId,
        clickedCoords: {left: e.clientX, top: e.clientY},
        cursorOffset: getCursorOffset(e),
      };

      // clicked block, then connector (source)
      const clickedConnectorInfo = [this.blockId, this.connectorData.id];

      this.insertConnectorClone(connectorData);
      this.setTargetForConnector(clickedConnectorInfo); // TODO: Check it

    }

  }

</script>

<style lang="sass">

  .connector
    height: 16px
    width: 16px
    border: 1px dashed #2a9055
    background: #65b02a
    border-radius: 3px

</style>
