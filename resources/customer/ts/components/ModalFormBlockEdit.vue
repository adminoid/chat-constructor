<template lang="pug">

  form
    .form-group
      label(for="exampleInputEmail1") Email address
      input(type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email")
      small#emailHelp.form-text.text-muted We'll never share your email with anyone else.
    .form-group
      label(for="exampleInputPassword1") Password
      input#exampleInputPassword1.form-control(type="password" placeholder="Password")

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class ModalFormBlockEdit extends Vue {

    name: 'ModalFormBlockEdit';

    @Prop({}) state!: object;

    confirm () {
      this.$emit('confirmed')
    }

    cancel () {
      this.$emit('canceled')
    }

    mount () {



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
