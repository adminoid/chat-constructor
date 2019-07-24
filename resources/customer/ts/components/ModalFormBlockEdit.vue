<template lang="pug">

  .container

    form

      .form-group
        label(for="name") Имя блока
        input(type="text" class="form-control" id="name" aria-describedby="blockHelp" placeholder="Block name" v-model="subFormData.name")
        small#blockHelp.form-text.text-muted Имя блока назначается, чтобы его запомнить. {{ subFormData.client_input_type.component }}

      fieldset.border.p-2.messages
        legend.w-auto Сообщения
        .messages__block(v-for="message in subFormData.messages" :key="message.sort_order_id")
          input.messages__delay.form-control(type="text" aria-label="delay" v-model="message.delay")
          .input-group
            textarea.messages__message.form-control {{ message.text }}
          .messages__panel
            button.btn.btn-outline-secondary.btn-outline-danger.btn-sm(type="button")
              fa-icon(icon="trash")

      fieldset.border.p-2

        .messages__add
          button.btn.btn-outline-primary(@click.prev.stop="addMessage") Добавить сообщение

      hr

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
      messages: [],
      client_input_type: {
        component: null
      }
    };

    messages = [];

    subFormList = [];

    @Prop({}) state!: {
      params: {
        blockId: -1
      }
    };

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
        axios.get('/private/block/' + this.state.params.blockId).then(( response ) => {
          this.subFormData = response.data;
        });
      });

    }

    addMessage () {

      console.info('addMessage');

      axios.get('/private/messages/create-new/' + this.state.params.blockId)
        .then(resp => {
          this.subFormData.messages = resp.data;
          // console.log(resp.data);
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
