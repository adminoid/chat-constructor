<template lang="pug">

  .connector_clone(@mouseup="mouseUp")

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  import { namespace } from 'vuex-class'
  const DropAreaModule = namespace('DropAreaModule');

  @Component({})
  export default class ConnectorClone extends Vue {

    @DropAreaModule.State line;
    @DropAreaModule.Mutation saveClonedConnector;

    @Prop({}) itemData!: object;

    mouseUp () {
      // TODO: here remove clone and lines
      console.log('mouse up on connector clone');

    }

    mounted () {
      this.saveClonedConnector(this.$el);
    }

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
