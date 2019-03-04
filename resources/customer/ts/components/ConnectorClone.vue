<template lang="pug">

  .connector_clone(@mouseup="mouseUp")

</template>

<script lang="ts">

  import { Component, Prop } from 'vue-property-decorator'
  import { mixins } from 'vue-class-component'
  import EndLineMixin from '../mixins/EndLine'

  import { namespace } from 'vuex-class'
  const DropAreaModule = namespace('DropAreaModule');

  @Component({})
  export default class ConnectorClone extends mixins(EndLineMixin) {

    @DropAreaModule.State line;

    @Prop({}) id!: number;
    @Prop({}) itemData!: object;

    mouseUp () {
      // TODO: here remove clone and lines
      console.log('mouse up on connector clone');

    }

    // mounted () {
      // add target (not standard block...) to block_id->connector_create
      // TODO: how rightly add target for connector clone and standard block with income connector? What is universal target?
      // I need target coords for line end

      // Target for line may be: ConnectorClone or Block (with one input connector)

      // this.saveClonedConnector(this.$el);
    // }

  }

</script>

<style lang="sass">

  .connector_clone
    position: absolute
    height: 16px
    width: 16px
    border: 1px dashed #2a9055
    background: #419410
    border-radius: 3px

</style>
