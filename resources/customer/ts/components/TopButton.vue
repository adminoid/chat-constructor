<template lang="pug">
  button(type="button" class="top-panel__add-block-btn btn btn-success" @click="insertBlock()") Добавить блок
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import {
    namespace
  } from 'vuex-class'

  const DropAreaModule = namespace('DropAreaModule');

  @Component
  export default class CustomerApp extends Vue {

    name: "TopButton";

    @DropAreaModule.Action('insertBlock') insertBlock;

  }

</script>

<style scoped>

</style>
