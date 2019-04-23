<template lang="pug">
  button(type="button" class="top-panel__add-block-btn btn btn-success" @click="addAction(type)") {{ text }}
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { Action } from 'vuex-class'

  @Component
  export default class TopButton extends Vue {

    text = 'Добавить бота';
    type = 'bots';

    @Action addAction;

  }

</script>

<style scoped>

</style>
