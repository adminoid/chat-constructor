<template lang="pug">

  form
    .form-group
      label(for="name") Block name
      input(type="text" class="form-control" id="name" aria-describedby="blockHelp" placeholder="Block name")
      small#blockHelp.form-text.text-muted Имя блока назначается, чтобы его запомнить.
    .form-group
      .form-group
        label(for="exampleFormControlSelect1") Example select
        select#exampleFormControlSelect1.form-control
          option 1
          option 2
          option 3
</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  const BlockModule = namespace('Block');

  @Component
  export default class ModalFormBlockEdit extends Vue {

    name: 'ModalFormBlockEdit';

    @Prop({}) state!: object;

    @BlockModule.Action getBlock;

    confirm () {
      this.$emit('confirmed')
    }

    cancel () {
      this.$emit('canceled')
    }

    mount () {

      console.log(this.state);

      // this.getBlock(this.botId).then(() => {
      //   this.lines = this.makeLinesFromItems();
      // });

    }

  }

</script>

<style lang="sass" scoped>

  .modal-mask
    position: fixed
    z-index: 9998
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, .5)
    display: table
    transition: opacity .3s ease
    .modal-wrapper
      display: table-cell
      vertical-align: middle

</style>
