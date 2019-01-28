<template lang="pug">

    .main-block(
        :style="getStyles()"
        @dragstart="dragStart"
        @dragend="dragEnd"
        draggable="true"
        v-if="!dragged"
    )
        p {{ blockData.blockName }} №{{ idx }}

</template>

<script>

    // TODO: inspect why block sometimes is gone...

    import { mapMutations, mapState } from 'vuex';
    import dragDropMixin from '../mixins/dragDrop';

    export default {

        name: 'PrivateRootWorkAreaMainBlock',

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
            ...mapState(['area'])
        },

        methods: {

            ...mapMutations(['setMovedBlockIndex']),

            dragStart (e) {

                this.dragged = true;
                this.setMovedBlockIndex(this.idx);

                this.setCursorOffset(e); // mixin method

                e.dataTransfer.effectAllowed = 'link';

            },

            dragEnd (e) {

                this.dragged = false;
                this.setMovedBlockIndex(-1);

                this.position = this.getPosition(e, this.area.offset); // getPosition - is mixin method

            },

            getStyles () {

                return {
                    ...this.normalizePosition(),
                    ...this.style
                }

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
        position: absolute
        height: 100px
        width: 150px
        background: #6a8aff
        border: 1px solid #030041
        padding: 10px
        @include border-radius(5px)

</style>
