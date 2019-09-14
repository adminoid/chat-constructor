<template lang="pug">

  #modal-form
    .modal.fade.show(v-if="state.active" tabindex='-1' role='dialog' aria-labelledby='exampleModalLongTitle')
      .modal-dialog(role='document')
        .modal-content
          .modal-header
            h5.modal-title {{ state.title }}
            button.close(type='button', @click='cancel', data-dismiss='modal', aria-label='Close')
              span(aria-hidden='true') &times;
          .modal-body
            component(:is="formComponent" :state="state")
          .modal-footer
            button.btn.btn-primary(type='button', @click='confirm') {{ $t('customer.confirm') }}
            button.btn.btn-secondary(type='button', @click='cancel', data-dismiss='modal') {{ $t('customer.cancel') }}

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  import ModalFormBlockEdit from './ModalFormBlockEdit.vue'

  @Component({
    //@ts-ignore
    components: { ModalFormBlockEdit }
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

  }

</script>
