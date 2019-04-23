<template lang="pug">
  button(type="button" class="top-panel__add-block-btn btn btn-success" @click="addAction") {{ text }}
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import {
    namespace
  } from 'vuex-class'

  const DropAreaModule = namespace('DropAreaModule');

  @Component
  export default class TopButton extends Vue {

    name: "TopButton";

    text = 'Добавить бота';

    type = 'bots';

    @DropAreaModule.Action insertBlock;

    addAction () {



    }

  }

</script>

<style scoped>

</style>
