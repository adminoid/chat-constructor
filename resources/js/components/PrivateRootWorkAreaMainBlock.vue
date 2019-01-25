<template lang="pug">

    .main-block

</template>

<script>

    export default {

        name: 'PrivateRootWorkAreaMainBlock',

        data () {
            return {
                name: 'block-1' //+ this.$store.state.blocks.length + 1
            }
        },

        mounted() {
            console.log(this.name);
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
