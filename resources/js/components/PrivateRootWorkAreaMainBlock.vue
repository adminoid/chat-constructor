<template lang="pug">

    .main-block(
        :style="getStyles()"
        @dragstart="dragStart"
        @dragend="dragEnd"
        @drag="drag"
        draggable="true"
        v-if="!dragged"
    )
        p №{{ idx }}
        p {{ blockData.blockName }}

</template>

<script>

    import { mapMutations, mapState } from 'vuex';

    export default {

        name: 'PrivateRootWorkAreaMainBlock',

        props: {
            idx: Number,
            blockData: Object,
            parentOffset: Object
        },

        data: function () {
            return {
                position: {
                    left: 0,
                    top: 0
                },
                dragged: false,
                cursorOffset: {
                    top: 0, left: 0
                }
            }
        },

        methods: {

            ...mapMutations(['setMovedBlockIndex']),

            drag (e) {

                // console.log(e.dataTransfer);

            },

            dragStart (e) {

                // e.preventDefault();
                this.dragged = true;
                this.setMovedBlockIndex(this.idx);

                this.cursorOffset.left = e.clientX - e.target.getBoundingClientRect().left;

                this.cursorOffset.top = e.clientY - e.target.getBoundingClientRect().top;

                e.dataTransfer.effectAllowed = 'link';
                e.dataTransfer.setData("text", e.target.id);
                console.log('drag start...');

            },

            dragEnd (e) {

                this.dragged = false;
                this.setMovedBlockIndex(-1);

                this.position.left = e.clientX - this.parentOffset.left - this.cursorOffset.left;
                this.position.top = e.clientY - this.parentOffset.top - this.cursorOffset.top;

                this.cursorOffset = {};

            },

            getStyles () {

                return {
                    ...this.getPosition(),
                    ...this.style
                }

            },

            getPosition () {
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

    .main-block
        position: absolute
        height: 100px
        width: 150px
        background: #6a8aff
        border: 1px solid #030041

</style>
