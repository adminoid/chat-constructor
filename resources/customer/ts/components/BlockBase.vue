<template lang="pug">

  .base-block
    .base-block__header
      .input-connector(:class="{ active: active }")
    .base-block__body
      p Hello {{ id }}!
    .base-block__footer
      .output-connectors


</template>

<script lang="ts">

  import { Component, Prop, Watch } from 'vue-property-decorator'
  import { mixins } from 'vue-class-component'
  import EndLineMixin from '../mixins/EndLine'
  import { namespace } from 'vuex-class'
  // import ConnectorOutput from './ConnectorOutput.vue'
  // import ConnectorCreate from './ConnectorCreate.vue'
  // import * as _ from 'lodash'

  const BlockModule = namespace('Block');

  @Component({
    // components: { ConnectorOutput, ConnectorCreate },
  })
  export default class BlockBase extends mixins(EndLineMixin) {

    @BlockModule.Mutation checkCreateConnector;
    @BlockModule.State dd;

    @Prop({}) id!: number;
    @Prop({}) itemData!: object;
    @Prop({}) active: boolean;

    @Watch('dd', { deep: true })
    onItemsChanged() {
      // TODO: in the future make observing by bubbling custom events on watch local props: coords, targetCoords

      // console.log('watching ' + this.id);

      this.checkCreateConnector(this.id);
      this.$forceUpdate();

    }

    created() {
      this.checkCreateConnector(this.id);
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
    background: rgba(82, 176, 93, 0.57)
    border: 1px solid rgba(14, 81, 0, 0.8)
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
