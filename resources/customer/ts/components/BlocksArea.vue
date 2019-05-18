<template lang="pug">

  #drop-area(@mousemove="mousemoveHandler" @mouseup="mouseupHandler")
    drag-item-wrapper(
    v-for="(item, index) in items"
    :key="index"
    :idx="index"
    :id="item.id"
    :position="item.position")
      component(
      ref="items"
      :is="item.component"
      :active="item.active"
      :id="item.id"
      :key="item.id"
      :itemData="item.itemData")
    line-svg(v-for="(line, index) in lines" :key="'line-' + index" :lineData="line")

</template>

<script lang="ts">

  import { Vue, Component, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import * as _ from 'lodash'
  import Block from './Block.vue'
  import DragItemWrapper from './DragItemWrapper.vue'
  import LineSvg from './LineSvg.vue'
  import ConnectorClone from './ConnectorClone.vue'
  const BlockModel = namespace('Block');

  @Component({
    components: { DragItemWrapper, Block, ConnectorClone, LineSvg },
  })
  export default class BlocksArea extends Vue {

    @BlockModel.State items;
    @BlockModel.State dd;
    @BlockModel.State area;
    @BlockModel.Mutation setAreaBoundaries;
    @BlockModel.Mutation dragDropDataReset;
    @BlockModel.Mutation updateCoords;
    @BlockModel.Mutation updateEndLineCoords;
    @BlockModel.Mutation setActiveTargetId;

    lines = [];

    closest = 20;

    connectorWidth = 16;

    @Watch('items', { deep: true })
    onItemsChanged() {
      // TODO: in the future make observing by bubbling custom events on watch local props: coords, targetCoords

      this.lines = this.makeLinesFromItems();

      // this.lines = _.debounce( <any>function (this) {
      //   console.log(this.lines);
      //   return this.makeLinesFromItems();
      // }.bind(this), 1000);

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

          // update sourceCoords (BlockModel\updateEndLineCoords)
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

            _.map(_.get(item, 'itemData.connectors.output'), (connector, cIdx) => {

              if( item.id === this.dd.id ) {

                let $beginConnector = $beginItem.$refs['output-connectors'][cIdx];
                if( $beginConnector ) {
                  connector.coords = $beginConnector.getLineBeginCoords();
                }
              }

              if( connector.target == this.dd.id ) {
                connector.targetCoords = $beginItem.getLineEndCoords();
              }
              // check if target item not itself
              else {
                item.active = isActive;
                if( isActive ) {
                  // TODO: if active, set target id to dd
                  this.setActiveTargetId(item.id);
                  left = item.sourceCoords.left + this.dd.elementOffset.left - this.connectorWidth/2;
                  top = item.sourceCoords.top + this.dd.elementOffset.top - this.connectorWidth/2;
                }
              }

            });
          });

          this.updateCoords({
            left: left,
            top: top,
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

    mounted () {
      this.setupSizesOfArea();
      this.lines = this.makeLinesFromItems();
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

</style>
