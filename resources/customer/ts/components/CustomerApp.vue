<template lang="pug">
  .row.no-gutters
    aside.sidebar.col-md-3
      .sidebar__area Sidebar
    section.col-md-9.right-area
      .top-panel
        top-button
      router-view
</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'
  import TopButton from "./TopButton.vue"

  @Component({
    components: { TopButton }
  })
  export default class CustomerApp extends Vue {

    name: "CustomerApp";

    $confirm;

    mounted () {
      // this is plugin: `resources/customer/ts/plugins/windows.ts`
      // this.$confirm('Test confirm');
      this.$confirm('Test confirm')
        .then(_=> console.log('confirmed'))
        .catch(e=> console.error(e.message))
    }

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

  .right-area
    background: #8d8d8d
    padding: 10px !important

  .top-panel
    display: flex
    height: 50px
    margin-bottom: 10px
    .top-panel__add-block-btn
      align-items: center

  .main-container
    z-index: 0
    height: calc(100vh - 140px)
    position: relative
    background: #d7d7d7
    border-radius: 5px

</style>
