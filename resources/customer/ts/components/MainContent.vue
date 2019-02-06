<template lang="pug">

  section.main-content.col-md-9
    top-panel
    drop-area

</template>

<script lang="ts">

  import Vue from "vue"
  import Component from "vue-class-component"

  import TopPanel from "./TopPanel.vue"
  import DropArea from "./DropArea.vue"

  @Component({
    components: { TopPanel, DropArea },
    props: { },
  })
  export default class MainContent extends Vue {



  }

</script>

<style lang="sass" scoped>

  section.main-content
    background: #8d8d8d
    padding: 10px

</style>
