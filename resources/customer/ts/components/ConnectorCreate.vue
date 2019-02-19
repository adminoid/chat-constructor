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

    // @DropAreaModule.Mutation startDragConnector;
    @DropAreaModule.Mutation insertConnectorClone;

    @Prop({}) itemData!: object;

    startDragConnector (e) {

      // pass info about create and clone connectors to store for drawing line between

      let connectorData = {
        blockIdx: this.$parent['idx'],
        clickedCoords: {left: e.clientX, top: e.clientY},
        cursorOffset: getCursorOffset(e)
      };

      console.log(connectorData);

      this.insertConnectorClone(connectorData);

    }

    created () {
      console.log('connector "create"');
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
