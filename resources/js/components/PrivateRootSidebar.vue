<template lang="pug">

    aside.sidebar.col-md-3
        .sidebar__area Sidebar

</template>

<script>
    export default {

        name: "PrivateRootSidebar"

    }
</script>

<style lang="sass">

    @import '../../sass/_mixins.scss'

    .sidebar
        height: calc(100vh - 60px)
        background: #8d8d8d
        .sidebar__area
            background: #b4b4b4
            height: calc(100% - 20px)
            margin: 10px 0 10px 10px
            @include border-radius(5px)
            padding: 10px

</style>
