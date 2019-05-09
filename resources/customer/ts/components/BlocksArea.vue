<template lang="pug">
  .blocks-area
    .blocks-area__block(v-for="block in blocks")
      div
        fa-icon(icon="puzzle-piece" size="2x")
      div
        span.blocks-area_wrap Блок
      div.blocks-area__panel
        a.blocks-area__link.btn.btn-primary(title="Редактировать" href="#")
          fa-icon(icon="edit")
        button.blocks-area__link.btn.btn-outline-danger(title="Удалить" @click="removeBlock(block.id)")
          fa-icon(icon="trash")
</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const Block = namespace('Block');

  @Component
  export default class BlocksArea extends Vue {

    name: "BlocksArea";

    $confirm;

    @Block.State blocks;
    @Block.Action fetchBlocks;
    @Block.Action deleteBlock;

    mounted () {
      this.fetchBlocks();
    }

    removeBlock (id) {

      this.$confirm({
        message: 'Вы действительно хотите удалить блок?',
      })
        .then(() => {
          this.deleteBlock(id);
        })
        .catch( e => { console.error(e.message) } );

    }

  }

</script>

<style lang="sass" scoped>

  .blocks-area
    z-index: 0
    height: calc(100vh - 140px)
    position: relative
    background: #d7d7d7
    border-radius: 5px
    padding: 10px
    display: flex
    text-align: center
    .blocks-area__bot
      max-width: 170px
      background-color: #fff
      align-self: flex-start
      min-width: 100px
      margin: 10px
      padding: 10px
      border: 2px solid #000
      border-radius: 5px
    .blocks-area__panel
      padding: 10px
      display: flex
      justify-content: space-between
    .blocks-area__link
      margin: 10px
    .blocks-area_wrap
      white-space: normal !important

</style>
