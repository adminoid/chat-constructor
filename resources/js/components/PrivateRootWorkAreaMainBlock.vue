<template lang="pug">

    .main-block
        p {{ idx }}

</template>

<script>

    export default {

        name: 'PrivateRootWorkAreaMainBlock',

        props: {
            idx: Number,
            startBlockData: Object
        }

    }

</script>

<style lang="sass">

    .main-block
        height: 100px
        width: 150px
        background: #6a8aff
        border: 1px solid #030041

</style>
