<template lang="pug">

  .base-block
    .base-block__header {{ itemData.blockName }}
    .base-block__body
      p Block
    .base-block__footer
      .output-connectors
        output-connector(
        v-for="(connector, index) in itemData.outputConnectors"
        :key="index"
        :connectorData="connector"
        class="connector_output")
        li.connector_new( @mousedown.prevent.stop="startDragConnector" )

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { getCursorOffset } from '../helpers'

  const DropAreaModule = namespace('DropAreaModule');

  @Component({
    components: {  },
  })
  export default class BlockBase extends Vue {

    @DropAreaModule.Mutation insertConnectorClone;

    @Prop({}) idx!: number;

    @Prop({}) itemData!: object;

    startDragConnector (e) {

      let connectorData = {
        blockIdx: this.idx,
        clickedCoords: {left: e.clientX, top: e.clientY},
        cursorOffset: getCursorOffset(e)
      };

      this.insertConnectorClone(connectorData);
    }

    get outputConnectors () {

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
