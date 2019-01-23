<template lang="pug">
    .container
        .row
            private-root-sidebar
            private-root-content-container
</template>

<script>

    import PrivateRootSidebar from './PrivateRootSidebar'
    import PrivateRootContentContainer from './PrivateRootContentContainer'

    export default {

        components: {
            PrivateRootSidebar,
            PrivateRootContentContainer
        },

        mounted() {
            console.log('Component mounted.')
        }

    }
</script>
