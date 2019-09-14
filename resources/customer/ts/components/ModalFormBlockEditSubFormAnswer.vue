<template lang="pug">

  strong {{ $t('customer.block_answer') }}

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class ModalFormBlockEditSubFormAnswer extends Vue {

    name: 'ModalFormBlockEditSubFormAnswer';



  }

</script>

<style scoped>

</style>
