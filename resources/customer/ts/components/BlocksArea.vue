<template lang="pug">
  #blocks-area {{ $route.params.id }}
</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'

  @Component
  export default class BotsArea extends Vue {

    name: "BlocksArea";

  }

</script>

<style lang="scss">

</style>
