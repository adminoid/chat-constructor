<template lang="pug">

  .container

    form(v-on:submit.prevent)

      .form-group
        label(for="name") Имя блока
        input(type="text" class="form-control" id="name" aria-describedby="blockHelp" placeholder="Block name" v-model="subFormData.name")
        small#blockHelp.form-text.text-muted Имя блока назначается, чтобы его запомнить.

      fieldset.border.p-2.messages
        legend.w-auto Сообщения
        .messages__block(v-for="message, index in subFormData.messages" :key="message.sort_order_id")
          input.messages__delay.form-control(type="text" aria-label="delay" v-model="subFormData.messages[index].delay")
          .input-group
            textarea.messages__message.form-control(v-model="subFormData.messages[index].text") {{ message.text }}
          .messages__panel
            button.btn.btn-outline-secondary.btn-outline-danger.btn-sm(type="button")
              fa-icon(icon="trash")

      fieldset.border.p-2

        .messages__add
          button.btn.btn-outline-primary(@click.prev.stop="addMessage") Добавить сообщение

      hr

      .form-group
        .form-group
          label(for="select-block-type") Тип блока
          select#select-block-type.form-control(v-model="subFormData.client_input_type" @change="onChange")
            option(v-for="subForm in subFormList" :value="{id: subForm.id, name: subForm.name, component: subForm.component}") {{ subForm.id }} - {{ subForm.name }} - {{ subForm.component }}

      hr

      component(v-if="subFormData.client_input_type.component" :is="subFormData.client_input_type.component")

</template>

<script lang="ts">

  import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import axios from 'axios'

  import ModalFormBlockEditSubFormButton from './ModalFormBlockEditSubFormButton.vue'
  import ModalFormBlockEditSubFormAnswer from './ModalFormBlockEditSubFormAnswer.vue'

  const BlockModule = namespace('Block');

  @Component({
    // ts-ignore
    components: { ModalFormBlockEditSubFormButton, ModalFormBlockEditSubFormAnswer }
  })
  export default class ModalFormBlockEdit extends Vue {

    name: 'ModalFormBlockEdit';

    subFormData = {
      messages: [],
      client_input_type: {
        id: null,
        name: null,
        component: null,
      },
      client_input_type_id: null,
    };

    subFormList = [];

    @Prop({}) state!: {
      params: {
        blockId: -1
      },
      formData: {},
    };

    @BlockModule.Action getBlock;

    beforeCreate () {

      axios.get('/private/client-input-types').then(( response ) => {
        this.subFormList = response.data;
        axios.get('/private/block/' + this.state.params.blockId).then(( response ) => {
          this.subFormData = response.data;
        });
      });

    }

    onChange () {
      // save block type to server
      axios.post('private/save-client-input-types', {
        id: this.subFormData.client_input_type_id,
        block_id: this.state.params.blockId,
      });
    }

    addMessage () {

      axios.get('/private/messages/create-new/' + this.state.params.blockId)
        .then(resp => {
          this.subFormData.messages = resp.data;
        });

    }

    @Watch('subFormData', { immediate: true, deep: true })
    onSubFormDataChanged(val) {
      this.state.formData = val;
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
