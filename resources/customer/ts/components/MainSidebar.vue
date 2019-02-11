<template lang="pug">

  aside.sidebar.col-md-3
    .sidebar__area Sidebar

</template>

<script lang="ts">

  import { Vue, Component } from "vue-property-decorator"

  @Component({
    components: { },
    props: { },
  })
  export default class MainSidebar extends Vue {



  }

</script>

<style lang="sass">

  .sidebar
    height: calc(100vh - 60px)
    background: #8d8d8d
    .sidebar__area
      background: #b4b4b4
      height: calc(100% - 20px)
      margin: 10px 0 10px 10px
      border-radius: 5px
      padding: 10px

</style>
