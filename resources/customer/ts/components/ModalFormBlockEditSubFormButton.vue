<template lang="pug">

  .buttons
    h4 Блок с кнопками
    ul.buttons__wrapper
      li(v-for="(button, idx) in buttons")
        input.btn.btn-primary(v-model="button.text")
      li
        button.btn.btn-info(type="button" @click="addButton") Добавить кнопку

</template>

<script lang="ts">

  import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

  @Component
  export default class ModalFormBlockEditSubFormButton extends Vue {

    name: 'ModalFormBlockEditSubFormButton';

    buttons = [
      {
        id: 0,
        text: 'Текст на кнопке',
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

    onInput(e, idx) {
      console.log(idx);
      const value = e.target.innerText;
      console.log(value);
      console.log(this.buttons[idx]);
      this.buttons[idx].text = value;
    }

    addButton() {
      this.buttons.push({
        id: this.buttons.length,
        text: 'Текст на кнопке ' + this.buttons.length,
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
