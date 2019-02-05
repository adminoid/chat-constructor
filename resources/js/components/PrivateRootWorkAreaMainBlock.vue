<template lang="pug">

    .main-block(
        :style="styles"
        @dragstart="dragStart"
        @dragend="dragEnd"
        @drag="drag"
        draggable="true"
        v-if="!dragged"
    )
        .main-block__header Header
        .main-block__body
            p {{ blockData.blockName }} №{{ idx }}
        .main-block__footer
            private-root-work-area-main-block-connectors-group(kind="out")



</template>

<script>

    // TODO: inspect why block sometimes is gone...

    import { mapMutations, mapState } from 'vuex';
    import dragDropMixin from '../mixins/dragDrop';
    import PrivateRootWorkAreaMainBlockConnectorsGroup from "./PrivateRootWorkAreaMainBlockConnectorsGroup";

    export default {

        name: 'PrivateRootWorkAreaMainBlock',
        components: {PrivateRootWorkAreaMainBlockConnectorsGroup},
        // TODO: here place connector components

        mixins: [dragDropMixin],

        props: {
            idx: Number,
            blockData: Object,
        },

        data: function () {
            return {
                position: {
                    left: 0,
                    top: 0
                }
            }
        },

        computed: {
            ...mapState(['area']),

            styles () {

                return {
                    ...this.normalizePosition(),
                    ...this.style
                }

            },
        },

        methods: {

            drag (e) {

                e.preventDefault();

                // console.log(e.target);
                // console.log(this.position);

            },

            ...mapMutations(['setMovedBlockIndex']),

            dragStart (e) {

                this.dragged = true;
                this.setMovedBlockIndex(this.idx);

                this.setCursorOffset(e); // mixin method

                e.dataTransfer.effectAllowed = 'link';
                return false;

            },

            dragEnd (e) {

                this.dragged = false;
                this.setMovedBlockIndex(-1);

                this.position = this.getPosition(e, this.area.offset); // getPosition - is mixin method

            },

            normalizePosition () {
                return _.mapValues(this.position, val => val + 'px')
            }

        },

        mounted () {

            this.position = this.blockData['startPosition'];

            this.style = this.blockData['style'];

        }

    }

</script>

<style lang="sass">

    @import '../../sass/_mixins.scss'

    .main-block
        display: flex
        flex-flow: column nowrap
        justify-content: space-between
        align-items: center
        position: absolute
        height: 100px
        width: 150px
        background: #6a8aff
        border: 1px solid #5d6dd5
        @include border-radius(5px)
        .main-block__header
            position: relative
        .main-block__body
            height: 100%
        .main-block__footer
            position: relative

</style>
