<template lang="pug">
  #frame-drop-area(@scroll="handleScroll" ref="frame")
    pre#debugger {{ dd }}
    #drop-area(@mousemove.prev="mousemoveHandler" @mouseup="mouseupHandler" ref="area" :style="areaSizePx")
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

</template>

<script lang="ts">

  import { Vue, Component, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import * as _ from 'lodash'
  import axios from 'axios'

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

    $refs!: {
      area: HTMLElement,
      frame: HTMLElement,
      items
    };

    @BlockModule.Action fetchBlocks;
    @BlockModule.Action deleteBlock;
    @BlockModule.Action saveBlockData;
    @BlockModule.Action saveConnectorTarget;

    @BlockModule.State items;
    @BlockModule.State dd;
    @BlockModule.State area;
    @BlockModule.State scrollPosition;

    @BlockModule.Mutation setAreaBoundaries;
    @BlockModule.Mutation dragDropDataReset;
    @BlockModule.Mutation updateCoords;
    @BlockModule.Mutation updateEndLineCoords;
    @BlockModule.Mutation setActiveTargetId;
    @BlockModule.Mutation setScrollOffset;

    lines = [];

    closest = 20;

    connectorWidth = 16;

    botId;

    $route;

    areaSize = {
      width: 0,
      height: 0,
    };

    isItemsChanged = false;

    created () {
      this.botId = +this.$route.params.botId;
    }

    mounted () {
      this.setAreaBorders();
      this.fetchBlocks(this.botId).then(() => {
        this.setAreaSize();
      });
    }

    setAreaSize() {
      // todo: find the farthest items
      let maxX = (this.items.length > 0) ? (_.maxBy(this.items, 'x') as any).x : 0;
      let maxY = (this.items.length > 0) ? (_.maxBy(this.items, 'y') as any).y : 0;

      this.areaSize.width = maxX + 200;
      this.areaSize.height = maxY + 200;
      this.lines = this.makeLinesFromItems();
      this.isItemsChanged = true;
    }

    setAreaBorders() {

      let bounding = this.$el.getBoundingClientRect();

      this.setAreaBoundaries({
        left: bounding.left,
        top: bounding.top,
        right: bounding.right,
        bottom: bounding.bottom
      });

    }

    get areaSizePx () {
      return {
        width: this.areaSize.width + 'px',
        height: this.areaSize.height + 'px',
      }
    }

    @Watch('items', { deep: true })
    onItemsChanged() {
      if (this.isItemsChanged) this.lines = this.makeLinesFromItems();
    }

    handleScroll () {

      // calculate scroll position
      this.setScrollOffset({
        top: this.$el.scrollTop,
        left: this.$el.scrollLeft,
      });

    }

    makeLinesFromItems() {
      let lines = [];

      _.map( this.items, item => {
        _.map( item.outputs, connector => {
          if( connector.target_block_id && connector.coords && connector.coords.left && connector.coords.top && connector.targetCoords) {
            lines.push({
              begin: connector.coords,
              end: connector.targetCoords,
            });
          }
        });
      });

      return lines;
    }

    mousemoveHandler(e) {

      if (this.dd.dragging) {

        let left = +Number(e.clientX - this.area.boundaries.left - this.dd.elementOffset.left + this.scrollPosition.left),
          top = +Number(e.clientY - this.area.boundaries.top - this.dd.elementOffset.top + this.scrollPosition.top);

        if( left < 0 ) {
          left = 0;
        }

        if( top < 0 ) {
          top = 0;
        }

        // Update all begin and end coordinates who concern to this item
        if( this.dd.id >= 0 ) {

          let item = _.find(this.items, ['id', this.dd.id]),
            isNewLine = item.component === 'ConnectorClone';

          let $beginItem = _.find(this.$refs.items, (item: any) => {
            if( item && item.itemData ) {
              return item.itemData.id === this.dd.id;
            }
            return false;
          });

          if( $beginItem ) {

            let bounding = $beginItem.$el.getBoundingClientRect(),
              rightPosition = left + bounding.width + 10,
              bottomPosition = top + bounding.height + 10 + 10;

            if( e.clientX - this.dd.elementOffset.left < this.area.boundaries.left ) {
              // touch left of visible area
              if( left > 0 ) {
                this.$refs.frame.scrollLeft -= 10;
              }
            }

            if( e.clientY - this.dd.elementOffset.top < this.area.boundaries.top ) {
              // touch top of visible area
              if( top > 0 ) {
                this.$refs.frame.scrollTop -= 10;
              }
            }

            if( e.clientX + this.dd.elementOffset.right > this.area.boundaries.right ) {
              // left = ( this.area.boundaries.right - this.area.boundaries.left ) - this.dd.elementOffset.right;

              // touch right of visible area
              if( left > 0 ) { // todo: if left less than area height
                // check for increase width
                if( rightPosition >= this.areaSize.width ) {
                  // width need to increase
                  this.areaSize.width += 200;
                } else {
                  this.$refs.frame.scrollLeft += 10;
                }
              }

            }

            if( e.clientY + this.dd.elementOffset.bottom > this.area.boundaries.bottom ) {
              // top = ( this.area.boundaries.bottom - this.area.boundaries.top ) - this.dd.elementOffset.bottom;

              // touch bottom of visible area
              if( top > 0 ) { // todo: if top less than area width

                // check for increase height
                if( bottomPosition >= this.areaSize.height ) {
                  // height need to increase
                  this.areaSize.height += 200;
                } else {
                  this.$refs.frame.scrollTop += 10;
                }
              }
            }

            // update sourceCoords (BlockModule\updateEndLineCoords)
            let coords = $beginItem.getLineEndCoords();

            this.updateEndLineCoords({
              itemId: this.dd.id,
              x: coords.left,
              y: coords.top,
            });

            _.map(this.items, (item) => {

              // TODO: 76 is bad, but it fast...
              const isActive = (
                isNewLine && item.component === 'BlockBase' &&
                item.x + 70 < left + this.closest &&
                item.x + 70 > left - this.closest &&
                item.y < top + this.closest &&
                item.y > top - this.closest
              );

              if( item.outputs ) {
                _.map( item.outputs, (connector, cIdx) => {

                  // $beginItem updates now properly
                  if (item.id === this.dd.id) {

                    if ( ! _.isEmpty($beginItem.$refs) ) {

                      let $beginConnector = $beginItem.$refs['outputs'][cIdx];
                      let coords = $beginConnector.getLineBeginCoords();

                      if ($beginConnector) {
                        connector.coords = coords;
                      }
                    }

                  }

                  if (connector.target_block_id === this.dd.id) {
                    connector.targetCoords = $beginItem.getLineEndCoords();
                  }
                  // check if target item not itself
                  else {
                    item.active = isActive;
                    if (isActive) {
                      // TODO: if active, set target id to dd
                      this.setActiveTargetId(item.id);

                      left = item.x - this.connectorWidth / 2 + 70;
                      top = item.y - this.connectorWidth / 2 + 1;
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

      if( this.dd.sourcePath.length === 2 ) {

        let source = _.find(this.items, ['id', this.dd.sourcePath[0]]);

        let sourceConnector = _.find(source.outputs, (output) => {
          return output.id === this.dd.sourcePath[1];
        });

        if( this.dd.targetId >= 0 ) {
          sourceConnector.target_block_id = this.dd.targetId;

          // saving connector to backend
          this.saveConnectorTarget(sourceConnector);

        }
        else {
          // remove target from output connector
          _.unset(sourceConnector, 'targetCoords');
          _.unset(sourceConnector, 'target_block_id');

          // send axios request for delete target from here
          if( this.dd.target_old ) {
            axios.post(`private/connector/save-target`, {
              'connector-id': sourceConnector.id,
              'target-id': null,
            });
          }
        }

        _.remove( this.items, (item: any) => item.id === this.dd.id );

        this.$nextTick(() => {
          this.lines = this.makeLinesFromItems();
        });

      }

      this.dragDropDataReset();

    }

  }

</script>

<style lang="sass">

  #frame-drop-area
    overflow: scroll
    height: calc(100vh - 140px)
    background: #d7d7d7
    border-radius: 5px
  #drop-area
    position: relative
    z-index: 0
  pre#debugger
    position: fixed
    top: 90px
    right: 30px

</style>
