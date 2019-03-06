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
      :id="item.id"
      :itemData="item.itemData")
    line-svg(v-for="(line, index) in lines" :key="'line-' + index" :lineData="line")
    pre(style="position: absolute; right: 30px; bottom: 20px;") {{ lines }}

</template>

<script lang="ts">

  import { Vue, Component, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import DragItemWrapper from './DragItemWrapper'
  import BlockBase from './BlockBase'
  import ConnectorClone from './ConnectorClone'
  import LineSvg from './LineSvg'
  import * as _ from 'lodash'

  const DropAreaModule = namespace('DropAreaModule');

  @Component({
    components: { DragItemWrapper, BlockBase, ConnectorClone, LineSvg },
  })
  export default class DropArea extends Vue {

    @DropAreaModule.State items;
    @DropAreaModule.State dd;
    @DropAreaModule.State area;
    @DropAreaModule.Mutation setAreaBoundaries;
    @DropAreaModule.Mutation dragDropDataReset;
    @DropAreaModule.Mutation updateCoords;

    lines = [];

    @Watch('items', { deep: true })
    onItemsChanged(val, oldVal) {
      // TODO: in the future make observing by bubbling custom events on watch local props: coords, targetCoords
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

        this.updateCoords({
          left: left,
          top: top,
        });

        // TODO: Update all begin and end coordinates who concern to this item
        // find all begin lines relates to this id
        if( this.dd.id >= 0 ) {

          let idx = _.findIndex(this.items, {id: this.dd.id}),
            $endItem = this.$refs.items[idx],
            endCoords = $endItem.getLineEndCoords();

          _.map(this.items, (item, index) => {
            _.map(_.get(item, 'itemData.connectors.output'), (connector, cidx) => {

              if( item.id === this.dd.id ) {
                let $connector = this.$refs.items[index].$refs['output-connectors'][cidx];
                if( $connector ) {
                  connector.coords = $connector.getLineBeginCoords();
                }
              }

              if( connector.target == this.dd.id ) {
                connector.targetCoords = endCoords;
              }

            });
          });

        }

      }


    }

    mouseupHandler() {
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
    height: calc(100vh - 140px)
    position: relative
    background: #d7d7d7
    border-radius: 5px

</style>
