<template lang="pug">
  .wrapper
    .center {{ message }}.
</template>

<script>
  export default {
    name: "TestComponent",

    data () {
      return {
        message: "Hy there"
      }
    }
  }
</script>

<style scoped>

</style>
