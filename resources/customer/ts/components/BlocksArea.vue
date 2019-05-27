<template lang="pug">

  #drop-area(@mousemove="mousemoveHandler" @mouseup="mouseupHandler")
    drag-item-wrapper(
      v-for="(item, index) in items"
      :key="item.id"
      :id="item.id"
      :idx="index"
      :position="item.position")
      component(
        class="itemComponent"
        ref="items"
        :is="item.component"
        :active="item.active"
        :id="item.id"
        :key="item.id"
        :itemData="item") {{ item.id }} ) {{ item.name }}
    line-svg(v-for="(line, index) in lines" :key="'line-' + index" :lineData="line")
    pre.br {{ this.dd }}

</template>

<script lang="ts">

  import { Vue, Component, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import * as _ from 'lodash'

  import DragItemWrapper from './DragItemWrapper.vue'
  import BlockBase from './BlockBase.vue'
  // import ConnectorClone from './ConnectorClone.vue'
  import LineSvg from './LineSvg.vue'


  const BlockModule = namespace('Block');

  @Component({
    //@ts-ignore
    components: { DragItemWrapper, BlockBase, LineSvg },
  })
  export default class BlocksArea extends Vue {

    @BlockModule.Action fetchBlocks;

    @BlockModule.State items;
    @BlockModule.State dd;
    @BlockModule.State area;
    @BlockModule.Mutation setAreaBoundaries;
    @BlockModule.Mutation dragDropDataReset;
    @BlockModule.Mutation updateCoords;
    @BlockModule.Mutation updateEndLineCoords;
    @BlockModule.Mutation setActiveTargetId;

    lines = [];

    closest = 20;

    connectorWidth = 16;

    botId;

    created () {
      this.botId = +this.$route.params.botId;
      this.fetchBlocks(this.botId);
    }

    mounted () {
      this.setupSizesOfArea();
      this.lines = this.makeLinesFromItems();
    }

    // botId = this.$route.params.;

    @Watch('items', { deep: true })
    onItemsChanged() {
      this.lines = this.makeLinesFromItems();
    }

    makeLinesFromItems() {
      let lines = [];
      _.map( this.items, item => {
        _.map( _.get(item, 'itemData.connectors.output'), connector => {
          if( connector.target && connector.coords && connector.targetCoords ) {
            lines.push({
              begin: connector.coords,
              end: connector.targetCoords,
            });
          }
        });
      });

      return lines;
    }

    setupSizesOfArea() {

      let bounding = this.$el.getBoundingClientRect();

      this.setAreaBoundaries({
        left: bounding.left,
        top: bounding.top,
        right: bounding.right,
        bottom: bounding.bottom
      });

    }

    mousemoveHandler(e) {

      if (this.dd.dragging) {

        let left = +Number(e.clientX - this.area.boundaries.left).toFixed(),
          top = +Number(e.clientY - this.area.boundaries.top).toFixed();

        if( e.clientX - this.dd.elementOffset.left < this.area.boundaries.left ) {
          left = this.dd.elementOffset.left;
        }

        if( e.clientY - this.dd.elementOffset.top < this.area.boundaries.top ) {
          top = this.dd.elementOffset.top;
        }

        if( e.clientX + this.dd.elementOffset.right > this.area.boundaries.right ) {
          left = ( this.area.boundaries.right - this.area.boundaries.left ) - this.dd.elementOffset.right;
        }

        if( e.clientY + this.dd.elementOffset.bottom > this.area.boundaries.bottom ) {
          top = ( this.area.boundaries.bottom - this.area.boundaries.top ) - this.dd.elementOffset.bottom;
        }

        // Update all begin and end coordinates who concern to this item
        if( this.dd.id >= 0 ) {

          let isNewLine = _.find(this.items, ['id', this.dd.id]).component === 'ConnectorClone',
            $items: any = this.$refs.items,
            $beginItem = _.find($items, ['id', this.dd.id]);

          // update sourceCoords (BlockModule\updateEndLineCoords)
          this.updateEndLineCoords({
            itemId: this.dd.id,
            coords: $beginItem.getLineEndCoords(),
          });

          _.map(this.items, (item) => {

            const isActive = (
              isNewLine && item.component === 'BlockBase' &&
              item.sourceCoords.left < left + this.closest &&
              item.sourceCoords.left > left - this.closest &&
              item.sourceCoords.top < top + this.closest &&
              item.sourceCoords.top > top - this.closest
            );

            if( _.get(item, 'itemData.connectors.output') ) {
              _.map(_.get(item, 'itemData.connectors.output'), (connector, cIdx) => {

                  // TODO: $beginItem updates not properly {Frozen error}
                  if (item.id === this.dd.id) {

                    if (!_.isEmpty($beginItem.$refs)) {
                      let $beginConnector = $beginItem.$refs['output-connectors'][cIdx];
                      if ($beginConnector) {
                        connector.coords = $beginConnector.getLineBeginCoords();
                      }
                    }

                  }

                  if (connector.target == this.dd.id) {
                    connector.targetCoords = $beginItem.getLineEndCoords();
                  }
                  // check if target item not itself
                  else {
                    item.active = isActive;
                    if (isActive) {
                      // TODO: if active, set target id to dd
                      this.setActiveTargetId(item.id);
                      left = item.sourceCoords.left + this.dd.elementOffset.left - this.connectorWidth / 2;
                      top = item.sourceCoords.top + this.dd.elementOffset.top - this.connectorWidth / 2;
                    }
                  }

                });
            }

            this.updateCoords({
              left: left,
              top: top,
            });

          });

        }

      }


    }

    mouseupHandler() {

      if( this.dd.sourcePath.length === 2 ) {

        let source = _.find(this.items, ['id', this.dd.sourcePath[0]]),
          sourceConnector = source.itemData.connectors.output[this.dd.sourcePath[1]];

        if( sourceConnector.type === 'create' ) {

          if( this.dd.targetId >= 0 ) {
            sourceConnector.target = this.dd.targetId;
            sourceConnector.type = 'output';
          }
          else {
            // remove target from output connector
            let item = _.find( this.items, ['id', this.dd.sourcePath[0]] ),
              source = _.get(item, 'itemData.connectors.output[' + this.dd.sourcePath[1] + ']');

            _.unset(source, 'target');
            _.unset(source, 'targetCoords');

            this.lines = this.makeLinesFromItems();

          }

          _.remove( this.items, (item: any) => item.id === this.dd.id );

        }

      }

      this.dragDropDataReset();

    }

  }

</script>

<style lang="sass">

  #drop-area
    z-index: 0
    height: calc(100vh - 140px)
    position: relative
    background: #d7d7d7
    border-radius: 5px
    .br
      position: absolute
      bottom: 10px
      right: 10px

</style>
