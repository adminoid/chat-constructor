<template lang="pug">
  .row.no-gutters
    aside.sidebar.col-md-3
      ul.sidebar__area
        li(v-for="link in links")
          router-link(:to="link.link") {{ link.name }}
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

    links = [
      {
        name: 'В начало',
        link: '/'
      }
    ];

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
      li
        list-style: none !important
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
