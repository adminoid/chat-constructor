<template lang="pug">
  .bots-area
    .bots-area__bot(v-for="bot in bots")
      div
        fa-icon(icon="robot" size="3x")
      div
        span.bots-area_wrap {{ bot.name }} / {{ bot.id }}
      div.bots-area__panel
        router-link.bots-area__link.btn.btn-primary(title="Редактировать" :to="'/bot/' + bot.id")
          fa-icon(icon="edit")
        button.bots-area__link.btn.btn-outline-danger(title="Удалить" @click="removeBot(bot.id)")
          fa-icon(icon="trash")

</template>

<script lang="ts">

  declare module 'vue/types/vue' {
    interface Vue {
      $confirm: any;
    }
  }

  import { Vue, Component } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const BotModel = namespace('Bot');

  @Component
  export default class BotsArea extends Vue {

    name: "BotsArea";

    $confirm;

    @BotModel.State bots;
    @BotModel.Action fetchBots;
    @BotModel.Action deleteBot;

    removeBot (id) {

      this.$confirm({
        message: 'Вы действительно хотите удалить бота?',
      })
        .then(() => {
          this.deleteBot(id);
        })
        .catch( e => { console.error(e.message) } );

    }

    created () {
      this.fetchBots();
    }

  }
</script>

<style lang="sass" scoped>

  .bots-area
    flex-wrap: wrap
    z-index: 0
    height: calc(100vh - 140px)
    position: relative
    background: #d7d7d7
    border-radius: 5px
    padding: 10px
    display: flex
    text-align: center
    .bots-area__bot
      max-width: 170px
      background-color: #fff
      align-self: flex-start
      min-width: 100px
      margin: 10px
      padding: 10px
      border: 2px solid #000
      border-radius: 5px
    .bots-area__panel
      padding: 10px
      display: flex
      justify-content: space-between
    .bots-area__link
      margin: 10px
    .bots-area_wrap
      white-space: normal !important

</style>
