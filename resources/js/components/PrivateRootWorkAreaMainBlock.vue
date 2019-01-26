<template lang="pug">

    .main-block(:style="position")
        p {{ idx }}

</template>

<script>

    export default {

        name: 'PrivateRootWorkAreaMainBlock',

        props: {
            idx: Number,
            startBlockData: Object
        },

        data: function () {
            return {
                position: _.mapValues(this.startBlockData['startPosition'], val => val + 'px')
            }
        },

    }

</script>

<style lang="sass">

    .main-block
        position: absolute
        height: 100px
        width: 150px
        background: #6a8aff
        border: 1px solid #030041

</style>
