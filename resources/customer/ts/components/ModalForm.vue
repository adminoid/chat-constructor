<template lang="pug">

  #modal-form
    .modal-mask(v-if='state.active')
      .modal-wrapper
        .modal-dialog(role='document')
          .modal-content
            .modal-header
              h5.modal-title {{ state.title }}
              button.close(type='button', @click='cancel', data-dismiss='modal', aria-label='Close')
                span(aria-hidden='true') ×
            .modal-body
              p component(:is=FormComponent)
            .modal-footer
              button.btn.btn-primary(type='button', @click='confirm') Подтвердить
              button.btn.btn-secondary(type='button', @click='cancel', data-dismiss='modal') Отмена

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  import ModalFormBlockEdit from './ModalFormBlockEdit.vue'

  @Component({
    // ts-ignore
    components: ModalFormBlockEdit
  })
  export default class ModalForm extends Vue {

    name: 'ModalForm';

    @Prop({}) state!: object;

    @Prop({}) formComponent!: string;

    confirm () {
      this.$emit('confirmed')
    }

    cancel () {
      this.$emit('canceled')
    }

    created () {
      alert('created');

      console.log(this.formComponent)
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
