<template lang="pug">

    .work-area
        .work-area__wrapper
            .top-panel
                button(type="button" class="top-panel__add-block-btn btn btn-success" v-on:click="addBlock") Добавить блок
            .work-area__main-area(class="h-100")
                p {{ testStoreProp }}

</template>

<script>

    export default {

        name: 'PrivateRootWorkArea',

        data () {
            return {

            }
        },

        methods: {

            addBlock () {
                console.log('addBlock');
            }
        },

        computed: {
            testStoreProp () {
                return this.$store.state.testStoreProp
            }
        },

    }

</script>

<style lang="sass">

    .work-area
        .work-area__wrapper
            padding: 10px
            background-color: #8d8d8d
        .work-area__main-area
            height: 100%
    .top-panel
        display: flex
        height: 50px
        background: #f0f
        padding: 3px
        .top-panel__add-block-btn
            align-items: center

</style>
