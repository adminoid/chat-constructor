<template lang="pug">

  .base-block
    .base-block__header
      .input-connector
    .base-block__body
      p {{ itemData.id }}. {{ itemData.name }}
      div.base-block__panel
        a.base-block__link.btn.btn-primary.btn-sm(:title="$t('customer.edit')" @mousedown.prev.stop="editBlock")
          fa-icon(icon="edit")
        button.base-block__link.btn.btn-outline-danger.btn-sm(:title="$t('customer.del')" @mousedown.prev.stop="removeBlock")
          fa-icon(icon="trash")
    .base-block__footer
      .outputs
        connector-output(
          v-for="(connector, index) in sortedOutputs"
          :key="index"
          :blockId="itemData.id"
          :connectorData="connector"
          ref="outputs"
          :title="connector.id")

</template>

<script lang="ts">

  declare module 'vue/types/vue' {
    interface Vue {
      $form: any;
    }
  }

  import { Component, Prop, Watch } from 'vue-property-decorator'
  import { mixins } from 'vue-class-component'
  import EndLineMixin from '../mixins/EndLine'
  import { namespace } from 'vuex-class'
  import ConnectorOutput from './ConnectorOutput.vue'
  import _ from 'lodash'

  const BlockModule = namespace('Block');

  @Component({
    components: { ConnectorOutput },
  })
  export default class BlockBase extends mixins(EndLineMixin) {

    $form;

    @BlockModule.State dd;

    @Prop({}) itemData!: any; // TODO: here itemData, there - just id, it is bug. Pass id to mixin

    @Watch('dd', { deep: true })
    onItemsChanged() {
      // TODO: in the future make observing by bubbling custom events on watch local props: coords, targetCoords
      this.$forceUpdate();
    }

    editBlock () {

      // for form need:
      //  1. form title
      //  2. title
      //  3. active - for show/hide form
      this.$form({
        type: 'editBlock', // need to pass through components, for fill form sub-component
      }, {
        blockId: this.itemData.id,
      }).catch( e => console.error(e) );
    }

    removeBlock () {
      console.info('removeBlock');
    }

    get sortedOutputs () {
      return _.sortBy(this.itemData.outputs, 'sort_order_id');
    }

  }

</script>

<style lang="sass">
  .base-block
    display: flex
    flex-flow: column nowrap
    justify-content: space-between
    align-items: center
    /*height: 136px*/
    width: 140px
    background: rgba(82, 176, 93, 0.57)
    border: 1px solid rgba(14, 81, 0, 0.8)
    border-radius: 5px
    box-shadow: 4px 4px 14px 0 rgba(0,0,0,0.3)
    .base-block__header
      position: relative
    .base-block__body
      height: 100%
      > p
        margin: 5px 10px

    .base-block__footer
      position: relative

    .base-block__panel
      padding: 10px
      display: flex
      justify-content: space-between
    .base-block__link
      margin: 10px
    .base-block_wrap
      white-space: normal !important

    .outputs
      padding: 2px
      margin: 0
      list-style: none
      display: flex
      position: relative
      bottom: -11px
      border: 1px dashed #7c7c7c
      border-radius: 3px

    .input-connector
      padding: 2px
      margin: 0
      list-style: none
      display: flex
      position: relative
      top: -8px
      height: 16px
      width: 16px
      border: 1px dashed #4046b8
      background: #575dff
      border-radius: 3px
      opacity: .7
      &.active
        background: #f09593

</style>
