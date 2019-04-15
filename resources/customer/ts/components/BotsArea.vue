<template lang="pug">
  .bots-area
    .bots-area__bot(v-for="bot in bots")
      span Bot: {{ bot.name }}
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const Bot = namespace('Bot');

  @Component
  export default class BotsArea extends Vue {

    name: "BotsArea";

    @Bot.State bots;

    @Bot.Action fetchBots;

    created () {
      this.fetchBots();
    }

  }
</script>

<style lang="sass">

  #bots-area
    z-index: 0
    height: calc(100vh - 140px)
    position: relative
    background: #d7d7d7
    border-radius: 5px

</style>
