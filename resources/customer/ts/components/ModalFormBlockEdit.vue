<template lang="pug">

  .container

    form.messages
      label Сообщения
      .messages__block
        input.messages__delay.form-control(type="text" aria-label="delay")
        .input-group
          textarea.messages__message.form-control
        .messages__panel
          button.btn.btn-outline-secondary.btn-outline-danger.btn-sm(type="button")
            fa-icon(icon="trash")

      hr

      .messages__add
        button.btn.btn-outline-primary Добавить сообщение

      hr

    form
      .form-group
        label(for="name") Block name
        input(type="text" class="form-control" id="name" aria-describedby="blockHelp" placeholder="Block name" v-model="subFormData.name")
        small#blockHelp.form-text.text-muted Имя блока назначается, чтобы его запомнить. {{ subFormData.client_input_type.component }}
      .form-group
        .form-group
          label(for="exampleFormControlSelect1") Example select
          select#exampleFormControlSelect1.form-control(v-model="subFormData.client_input_type.component")
            option(v-for="subForm in subFormList" :value="subForm.component") {{ subForm.name }}

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import axios from 'axios'

  const BlockModule = namespace('Block');

  @Component
  export default class ModalFormBlockEdit extends Vue {

    name: 'ModalFormBlockEdit';

    subFormData = {
      client_input_type: {
        component: null
      }
    };

    subFormList = [];

    @Prop({}) state!: object;

    @BlockModule.Action getBlock;

    confirm () {
      this.$emit('confirmed')
    }

    cancel () {
      this.$emit('canceled')
    }

    created () {

      axios.get('/private/client-input-types').then(( response ) => {
        this.subFormList = response.data;
        axios.get('/private/block/3').then(( response ) => {
          this.subFormData = response.data;
        });
      });

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
  .messages
    .messages__block
      display: flex
    .messages__delay
      max-width: 50px
    .messages__message
      margin: 0 10px

</style>
