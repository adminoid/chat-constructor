<template lang="pug">
  .container
    .row
      .col-md-5 Hi
      .col-md-7 {{ testVal }}
</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'

  @Component
  export default class CustomerApp extends Vue {

    testVal: string = 'kuku';

  }

</script>
