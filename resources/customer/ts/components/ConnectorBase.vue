<template lang="pug">

  .connector_clone

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  // import { namespace } from 'vuex-class'
  // const DropAreaModule = namespace('DropAreaModule');

  @Component({})
  export default class ConnectorBase extends Vue {

    // @DropAreaModule.Mutation startDragConnector;

    @Prop({}) itemData!: object;

    created () {
      console.log('connector clone created');
    }

  }

</script>

<style lang="sass">

  .connector_clone
    position: absolute
    height: 16px
    width: 16px
    border: 1px dashed #2a9055
    background: #b05a1d
    border-radius: 3px

</style>
