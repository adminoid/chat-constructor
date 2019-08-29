<template lang="pug">

  .buttons
    h4 Блок с кнопками
    ul.buttons__wrapper
      li(v-for="button in orderedButtons" :key="button.sort_order_id")
        input.btn.btn-primary(v-model="button.text")
      li
        button.btn.btn-info(type="button" @click="addButton") Добавить кнопку

</template>

<script lang="ts">

  import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
  import axios from 'axios'
  import _ from 'lodash'

  @Component
  export default class ModalFormBlockEditSubFormButton extends Vue {

    name: 'ModalFormBlockEditSubFormButton';

    buttons = [
      {
        id: 0,
        text: 'Текст на кнопке',
        sort_order_id: 0,
      },
    ];

    @Prop({}) state!: {
      params: {
        blockId: -1
      },
      formData: {
        buttons: [],
      },
    };

    created() {
      axios.get('/private/outputs/' + this.state.params.blockId).then(resp => {
        let buttons = resp.data;
        if( buttons.length > 0 ) {
          this.buttons = buttons;
        }
      });
    }

    get orderedButtons () {
      return _.orderBy(this.buttons, 'sort_order_id');
    }

    onInput(e, idx) {
      const value = e.target.innerText;
      this.buttons[idx].text = value;
    }

    addButton() {
      this.buttons.push({
        id: 0,
        text: 'Текст на кнопке ' + this.buttons.length,
        sort_order_id: this.buttons.length,
      });
    }

    @Watch('buttons', { immediate: true, deep: true })
    onButtonsChanged(val) {
      this.state.formData.buttons = val;
    }

  }

</script>

<style lang="sass" scoped>

  .buttons__wrapper
    list-style: none
    padding: 0
    li
      padding: 0  0 10px 0
      button
        min-width: 100px

</style>
