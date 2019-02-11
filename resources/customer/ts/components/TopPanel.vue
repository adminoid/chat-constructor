<template lang="pug">

  .top-panel
    button(type="button" class="top-panel__add-block-btn btn btn-success" @click="addBlock") Добавить блок

</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'
  import {
    namespace
  } from 'vuex-class'

  const DropAreaModule = namespace('DropAreaModule');

  @Component
  export default class MainSidebar extends Vue {

    @DropAreaModule.Action('insertBlock') insertBlock;
    // @DropAreaModule.Mutation('insertItem') insertItem;

    addBlock () {

      this.insertBlock({
        blockName: 'Test block'
      });

    }

  }

</script>

<style lang="sass">

  .top-panel
    display: flex
    height: 50px
    margin-bottom: 10px
    .top-panel__add-block-btn
      align-items: center

</style>
