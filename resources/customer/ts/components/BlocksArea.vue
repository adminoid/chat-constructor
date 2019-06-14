<template lang="pug">

  #drop-area(@mousemove="mousemoveHandler" @mouseup="mouseupHandler")
    drag-item-wrapper(
      v-for="(item, index) in items"
      :key="index"
      :idx="index"
      :id="item.id"
      :x="item.x"
      :y="item.y")
      component(
        ref="items"
        :is="item.component"
        :active="item.active"
        :itemData="item")
      line-svg(v-for="(line, index) in lines" :key="'line-' + index" :lineData="line")
    pre.br {{ this.lines }}

</template>

<script lang="ts">

  import { Vue, Component, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import * as _ from 'lodash'

  import DragItemWrapper from './DragItemWrapper.vue'
  import BlockBase from './BlockBase.vue'
  import ConnectorClone from './ConnectorClone.vue'
  import LineSvg from './LineSvg.vue'

  const BlockModule = namespace('Block');

  @Component({
    //@ts-ignore
    components: { DragItemWrapper, BlockBase, ConnectorClone, LineSvg },
  })
  export default class BlocksArea extends Vue {

    @BlockModule.Action fetchBlocks;
    @BlockModule.Action deleteBlock;
    @BlockModule.Action saveBlockData;

    @BlockModule.State items;
    @BlockModule.State dd;
    @BlockModule.State area;

    @BlockModule.Mutation setAreaBoundaries;
    @BlockModule.Mutation dragDropDataReset;
    @BlockModule.Mutation updateCoords;
    @BlockModule.Mutation updateEndLineCoords;
    @BlockModule.Mutation setActiveTargetId;

    lines = [];

    closest = 30;

    connectorWidth = 16;

    botId;

    id;

    $route;

    created () {
      this.botId = +this.$route.params.botId;
      this.fetchBlocks(this.botId);
    }

    mounted () {
      this.setupSizesOfArea();
      this.lines = this.makeLinesFromItems();
    }

    @Watch('items', { deep: true })
    onItemsChanged() {
      this.lines = this.makeLinesFromItems();
    }

    makeLinesFromItems() {
      let lines = [];

      // console.log(this.items);

      _.map( this.items, item => {
        _.map( item.outputs, connector => {

          // console.log(connector);
          // TODO: make target: target_block_id, targetCoords to connector clone...

          if( connector.target_block_id && connector.x && connector.y && connector.targetCoords ) {
            lines.push({
              begin: {left: connector.x, top: connector.y},
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

        let left = +Number(e.clientX - this.area.boundaries.left - this.dd.elementOffset.left),
          top = +Number(e.clientY - this.area.boundaries.top - this.dd.elementOffset.top);

        if( e.clientX - this.dd.elementOffset.left < this.area.boundaries.left ) {
          left = 0;
        }

        if( e.clientY - this.dd.elementOffset.top < this.area.boundaries.top ) {
          top = 0;
        }

        if( e.clientX + this.dd.elementOffset.right > this.area.boundaries.right ) {
          left = ( this.area.boundaries.right - this.area.boundaries.left ) - this.dd.elementOffset.right;
          // TODO: make area expansion
          console.info('// TODO: make area expansion to right');
        }

        if( e.clientY + this.dd.elementOffset.bottom > this.area.boundaries.bottom ) {
          top = ( this.area.boundaries.bottom - this.area.boundaries.top ) - this.dd.elementOffset.bottom;
          console.info('// TODO: make area expansion to bottom');
        }

        // Update all begin and end coordinates who concern to this item
        if( this.dd.id >= 0 ) {

          this.updateCoords([left, top]);

          let item = _.find(this.items, ['id', this.dd.id]),
            isNewLine = item.component === 'ConnectorClone',
            $items: any = this.$refs.items;
            // $beginItem = _.find($items, ['itemData.id', this.dd.id]);

          let queue: any[] = $items;

          let $beginItem = _.find(queue, (item: any) => {
            if( item && item.itemData ) {
              return item.itemData.id === this.dd.id;
            }

            return false;
          });

          if( $beginItem ) {

            // update sourceCoords (BlockModule\updateEndLineCoords)
            let coords = $beginItem.getLineEndCoords();

            // console.log(coords);

            this.updateEndLineCoords({
              itemId: this.dd.id,
              x: coords.left,
              y: coords.top,
            });

            _.map(this.items, (item) => {

              // console.log(item);

              // TODO: 76 is bad, but it fast...
              const isActive = (
                isNewLine && item.component === 'BlockBase' &&
                item.x + 76 < left + this.closest &&
                item.x + 76 > left - this.closest &&
                item.y < top + this.closest &&
                item.y > top - this.closest
              );

              // console.log(isActive);
              // console.log(item);

              if( item.outputs ) {
                _.map( item.outputs, (connector, cIdx) => {

                  // TODO: $beginItem updates not properly {Frozen error}
                  if (item.id === this.dd.id) {

                    if ( ! _.isEmpty($beginItem.$refs) ) {
                      let $beginConnector = $beginItem.$refs['output-connectors'][cIdx];
                      let coords = $beginConnector.getLineBeginCoords();
                      if ($beginConnector) {
                        connector.x = coords.left;
                        connector.y = coords.top;
                      }
                    }

                  }

                  if (connector.target_block_id == this.dd.id) {
                    connector.targetCoords = $beginItem.getLineEndCoords();
                  }
                  // check if target item not itself
                  else {
                    item.active = isActive;
                    if (isActive) {
                      // TODO: if active, set target id to dd
                      // console.log(item);
                      this.setActiveTargetId(item.id);

                      left = item.x + this.dd.elementOffset.left - this.connectorWidth / 2 + 65;
                      top = item.y + this.dd.elementOffset.top - this.connectorWidth / 2 - 9;
                    }
                  }

                });
              }

              this.updateCoords([left, top]);

            });

          }

        }

      }


    }

    mouseupHandler() {

      // save new position to server
      let blockId = this.dd.id,
        botId = this.botId;

      if( blockId > 0 ) {

        // TODO: 1. save id to `itemData.id` instead `id` for connector clone
        let $item: any = _.find(this.$refs.items, ['itemData.id', blockId]);

        // console.log($item); // undefined
        // TODO: 2. I will think about saving connector clone target

        if( $item && $item.itemData.component !== 'ConnectorClone') {

          let payload = {
            'botId': botId,
            'blockId': blockId,
            'sendData': {
              'x': $item.itemData.x,
              'y': $item.itemData.y,
              'moved': 1,
            }
          };

          this.saveBlockData(payload);
        }

      }

      // if( this.dd.sourcePath.length === 2 ) {

        // let source = _.find(this.items, ['id', this.dd.sourcePath[0]]),
        //   sourceConnector = source.itemData.connectors.output[this.dd.sourcePath[1]];
        //
        // if( sourceConnector.type === 'create' ) {
        //
        //   if( this.dd.targetId >= 0 ) {
        //     sourceConnector.target = this.dd.targetId;
        //     sourceConnector.type = 'output';
        //   }
        //   else {
        //     // remove target from output connector
        //     let item = _.find( this.items, ['id', this.dd.sourcePath[0]] ),
        //       source = _.get(item, 'itemData.connectors.output[' + this.dd.sourcePath[1] + ']');
        //
        //     _.unset(source, 'target');
        //     _.unset(source, 'targetCoords');
        //
        //     this.lines = this.makeLinesFromItems();
        //
        //   }
        //
        //   _.remove( this.items, (item: any) => item.id === this.dd.id );
        //
        // }

      // }

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
