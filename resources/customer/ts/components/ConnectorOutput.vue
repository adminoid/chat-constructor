<template lang="pug">

  .connector_output

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  // import { namespace } from 'vuex-class'
  // const DropAreaModule = namespace('DropAreaModule');

  @Component({})
  export default class ConnectorOutput extends Vue {

    // @DropAreaModule.Mutation startDragConnector;

    @Prop({}) itemData!: object;

    created () {
      console.log('connector output created');
    }

  }

</script>

<style lang="sass">

  .connector_output
    height: 16px
    width: 16px
    border: 1px dashed #2a9055
    background: #b03779
    border-radius: 3px

</style>
