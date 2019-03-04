<template lang="pug">

  .connector_create(@mousedown.stop = "startDragConnector")

</template>

<script lang="ts">

  import { Component, Prop } from 'vue-property-decorator'
  import { mixins } from 'vue-class-component'
  import BeginLineMixin from '../mixins/BeginLine'
  import { namespace } from 'vuex-class'
  import { getCursorOffset } from '../helpers'

  const DropAreaModule = namespace('DropAreaModule');

  @Component({})
  export default class ConnectorCreate extends mixins(BeginLineMixin) {

    @DropAreaModule.State area;
    @DropAreaModule.Mutation setTargetForConnectorCreate;
    @DropAreaModule.Mutation insertConnectorClone;
    @DropAreaModule.Mutation setConnectorTarget;

    @Prop({}) itemData: object;
    @Prop({}) connectorId!: number;
    @Prop({}) blockId!: number;

    startDragConnector (e) {

      // TODO: pass info about create and clone connectors to store for drawing line between

      let connectorData = {
        blockId: this.blockId,
        clickedCoords: {left: e.clientX, top: e.clientY},
        cursorOffset: getCursorOffset(e),
      };

      // clicked block, then connector (source)
      const clickedConnectorInfo = [this.blockId, this.connectorId];
      this.insertConnectorClone(connectorData);
      this.setTargetForConnectorCreate(clickedConnectorInfo);

    }

  }

</script>

<style lang="sass">

  .connector_create
    height: 16px
    width: 16px
    border: 1px dashed #2a9055
    background: #65b02a
    border-radius: 3px

</style>
