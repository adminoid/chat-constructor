<template lang="pug">

  .top-panel
    button(type="button" class="top-panel__add-block-btn btn btn-success" @click="pushBlock({blockName: 'Test block'})") Добавить блок

</template>

<script lang="ts">

  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class MainSidebar extends Vue {

    pushBlock () {

      console.group('TopPanel.vue');
      console.log(this.$store.state);
      console.info('block pushed');
      console.groupEnd();

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
