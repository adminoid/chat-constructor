<template lang="pug">

    .work-area.col-md-9
        .work-area__wrapper
            .top-panel
                button(type="button" class="top-panel__add-block-btn btn btn-success" v-on:click="addBlock") Добавить блок
            .work-area__main-area
                private-root-work-area-main-block(v-for="(block, index) in blocks" :key="index" :idx="index" :startBlockData="block")


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

                this.$store.commit('pushBlock', {
                    blockName: 'Test block',
                    startPosition: {
                        left: 20,
                        top: 40
                    }
                });

                console.log(this.blocks);

            }
        }

    }

</script>

<style lang="sass">

    // Custom scss global mixins
    @import '../../sass/_mixins.scss'

    .work-area
        .work-area__wrapper
            background: #8d8d8d
            padding: 10px
        .work-area__main-area
            height: calc(100vh - 140px)
            position: relative
            background: #d7d7d7
            @include border-radius(5px)
    .top-panel
        display: flex
        height: 50px
        margin-bottom: 10px
        .top-panel__add-block-btn
            align-items: center

</style>
