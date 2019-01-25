<template lang="pug">

    .work-area
        .work-area__wrapper
            .top-panel
                button(type="button" class="top-panel__add-block-btn btn btn-success" v-on:click="addBlock") Добавить блок
            .work-area__main-area(class="h-100")
                keep-alive
                    div.work-area__block.block(v-for="(block, index) in blocks" :key="index")
                        private-root-work-area-main-block(:name="block.name")


</template>

<script>

    import PrivateRootWorkAreaMainBlock from './PrivateRootWorkAreaMainBlock';
    import { mapState } from 'vuex';

    export default {

        name: 'PrivateRootWorkArea',

        components: { PrivateRootWorkAreaMainBlock },

        computed: {
            ...mapState(['blocks'])
        },

        methods: {

            addBlock () {

                this.$store.commit('pushBlock', {name: 'Test block'});

                console.log(this.blocks);

            }
        }

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
