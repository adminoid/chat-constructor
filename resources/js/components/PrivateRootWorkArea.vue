<template lang="pug">

    .work-area
        .work-area__wrapper
            .top-panel
                button(type="button" class="top-panel__add-block-btn btn btn-success" v-on:click="addBlock") Добавить блок
            .work-area__main-area(class="h-100")
                keep-alive
                    template(v-for="(mainBlock, index) in mainBlocks")
                        component(:is="mainBlock" :key="mainBlock.name")

</template>

<script>

    import Vue from 'vue'
    import PrivateRootWorkAreaMainBlock from './PrivateRootWorkAreaMainBlock';

    export default {

        name: 'PrivateRootWorkArea',

        components: { PrivateRootWorkAreaMainBlock },

        data () {
            return {
                mainBlocks: []
            }
        },

        methods: {

            addBlock () {

                let BlockClass = Vue.extend(PrivateRootWorkAreaMainBlock);
                let BlockInstance = new BlockClass();
                BlockInstance.$mount();

                this.mainBlocks.push(new BlockInstance);

                console.log(this.mainBlocks);

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
