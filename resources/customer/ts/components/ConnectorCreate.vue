<template lang="pug">

  .connector_create(@mousedown.stop = "startDragConnector")

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { getCursorOffset } from '../helpers'

  const DropAreaModule = namespace('DropAreaModule');

  @Component({})
  export default class ConnectorCreate extends Vue {

    @DropAreaModule.Mutation setTargetForConnectorCreate;
    @DropAreaModule.Mutation insertConnectorClone;
    @DropAreaModule.Mutation setConnectorTarget;

    @Prop({}) itemData!: object;
    @Prop({}) connectorId!: number;

    startDragConnector (e) {

      // TODO: pass info about create and clone connectors to store for drawing line between

      let blockId = this.$parent['idx'];

      let connectorData = {
        blockIdx: blockId,
        clickedCoords: {left: e.clientX, top: e.clientY},
        cursorOffset: getCursorOffset(e),
      };

      // clicked block, then connector (source)
      const clickedConnectorInfo = [blockId, this.connectorId];

      this.insertConnectorClone(connectorData);

      // console.log(this.connectorId);
      this.setTargetForConnectorCreate(clickedConnectorInfo);

      // insert source for a line
      // find block and his connector
      // or e.target

      // ---

      // target of output connector (create of ) is: target item id
      // source for line is:
      // output connector with id or create connector without id

      // --------

      // TODO: how describe source connector?..
      // first: connector type is clone
      // second: block id (blockId)

      /**
       * variants of target describe:
       * 1. [block(index), connector (index or type)]
       *
       * ??? If source connector not have id, then connector is create type, else if have id, then connector type is output
       */


      // Insert target to clicked connector: items[id].itemData.connectors.output[id].target
      // this.setConnectorTarget(sourceConnector, targetItemId);

      // NOTE: All target is item (with id) in DropArea.items, wrapped by DragItemWrapper

      // TODO: how update coordinate of line end when DropArea@mousemove?
      // answer: get target by ref (only in DropArea.vue), and get offset. Position = cursor minus offset...

      // It's all?...

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
