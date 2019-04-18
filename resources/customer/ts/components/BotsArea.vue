<template lang="pug">
  .bots-area
    .bots-area__bot(v-for="bot in bots")
      fa-icon(icon="robot" size="5x")
      br
      span Hi! My name is {{ bot.name }}
      br
      a(href="" @click.prevent="deleteBot") Удалить бота
</template>

<script lang="ts">

  declare module 'vue/types/vue' {
    interface Vue {
      $confirm: any;
    }
  }

  import { Vue, Component } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const wait = (ms) => new Promise(res => setTimeout(res, ms));

  const Bot = namespace('Bot');

  @Component
  export default class BotsArea extends Vue {

    name: "BotsArea";

    $confirm;

    @Bot.State bots;

    @Bot.Action fetchBots;

    created () {
      this.fetchBots();
    }

    deleteBot () {

      this.$confirm({
        title: '~Title~',
        message: '**MESSAGE**',
      })
        .then( resp => { console.info('all right'); console.log(resp) } )
        .catch( e => { console.error(e.message) } );

    }

  }
</script>

<style lang="sass" scoped>

  .bots-area
    z-index: 0
    height: calc(100vh - 140px)
    position: relative
    background: #d7d7d7
    border-radius: 5px
    .bots-area__bot
      float: left
      width: 100px
      height: 100px

</style>
