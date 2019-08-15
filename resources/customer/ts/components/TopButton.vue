<template lang="pug">
  button(type="button" class="top-panel__add-block-btn btn btn-success" @click="createEntity({type: type, botId: botId})") {{ text }}
</template>

<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator'
  import { Action } from 'vuex-class'

  @Component
  export default class TopButton extends Vue {

    text = 'Добавить бота';
    type = 'bot';
    botId = '';

    @Action createEntity;

    @Watch('$route', { immediate: true, deep: true })
    onUrlChange(newRoute) {
      if (newRoute.name == 'blocks') {
        this.text = 'Добавить блок';
        this.type = 'block';
      } else {
        this.text = 'Добавить бота';
        this.type = 'bot';
      }
    }

    @Watch('$route.params.botId')
    onBotIdChange(newBotId) {
      this.botId = newBotId;
    }

    mounted () {
      this.botId = this.$route.params.botId;
    }

    changed () {
      console.log(this.$route.params.botId);
    }

  }

</script>

<style scoped>

</style>
