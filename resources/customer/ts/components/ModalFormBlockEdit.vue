<template lang="pug">

  form
    .form-group
      label(for="name") Block name
      input(type="text" class="form-control" id="name" aria-describedby="blockHelp" placeholder="Block name")
      small#blockHelp.form-text.text-muted Имя блока назначается, чтобы его запомнить. {{ subFormName }}
    .form-group
      .form-group
        label(for="exampleFormControlSelect1") Example select
        select#exampleFormControlSelect1.form-control(v-model="subFormName")
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

    subFormName = null;

    subFormList = [];
      // {
      //   name: 'Блок с кнопками',
      //   component: 'SubFormButton'
      // },
      // {
      //   name: 'Блок с ответом',
      //   component: 'SubFormAnswer'
      // },
    // ];

    @Prop({}) state!: object;

    @BlockModule.Action getBlock;

    confirm () {
      this.$emit('confirmed')
    }

    cancel () {
      this.$emit('canceled')
    }

    created () {

      axios.get('/private/client-input-types').then((response) => {

        this.subFormList = response.data;

        axios.get('/private/block/3').then((blockData) => {
          console.log(blockData.data.client_input_type.component);

          this.subFormName = blockData.data.client_input_type.component;
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

</style>
