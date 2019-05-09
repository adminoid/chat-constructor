<template lang="pug">
  button(type="button" class="top-panel__add-block-btn btn btn-success" @click="addAction(type)") {{ text }}
</template>

<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator'
  import { Action } from 'vuex-class'

  @Component
  export default class TopButton extends Vue {

    text = 'Добавить бота';
    type = 'bot';

    @Action addAction;

    @Watch('$route', { immediate: true, deep: true })
    onUrlChange(newRoute) {
      console.log(newRoute);
      if (newRoute.name == 'blocks') {
        this.text = 'Добавить блок';
        this.type = 'block';
      } else {
        this.text = 'Добавить бота';
        this.type = 'bot';
      }
    }

  }

</script>

<style scoped>

</style>
