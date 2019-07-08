<template lang="pug">

  span.test Тестовый компонент для проверки будущих модальных форм

</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'

  @Component
  export default class TestComponent extends Vue {

    name: 'TestComponent';

  }

</script>

<style lang="sass" scoped>

  span.test
    color: #500200

</style>
