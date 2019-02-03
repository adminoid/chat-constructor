<template lang="pug">

    .work-area.col-md-9
        .work-area__wrapper(ref="work-area")
            .top-panel
                button(type="button" class="top-panel__add-block-btn btn btn-success" @click="pushBlock({blockName: 'Test block'})") Добавить блок
            #area.work-area__main-area(@dragover="dragOver" @mouseup.stop.prevent="onMouseUp" @drop="drop")
                private-root-work-area-main-block(
                    v-for="(block, index) in blocks"
                    :key="index"
                    :idx="index"
                    :blockData="block"
                )


</template>

<script>

    import PrivateRootWorkAreaMainBlock from './PrivateRootWorkAreaMainBlock';
    import { mapState, mapActions, mapMutations } from 'vuex';
    import _ from 'lodash';

    export default {

        name: 'PrivateRootWorkArea',

        components: { PrivateRootWorkAreaMainBlock },

        data () {
            return {
                offset: {
                    top: 0,
                    left: 0
                }
            }
        },

        computed: {
            ...mapState(['blocks', 'area'])
        },

        mounted () {

            this.saveWorkAreaEl(this.$el);
            this.saveWorkAreaOffset();

        },

        methods: {

            onMouseUp () {

                console.log('m-u');

                this.setTrackCursor(false);

            },

            drop (e) {
                console.log(e.target);
            },

            ...mapMutations(['saveWorkAreaEl', 'setAreaOffset', 'setTrackCursor']),

            saveWorkAreaOffset () {

                let el = document.getElementById('area');
                let coordinates = el.getBoundingClientRect();
                this.setAreaOffset(_.pick(coordinates, ['top', 'left']));

            },

            dragOver (e) {

                e.preventDefault();

            },


            ...mapActions(['pushBlock']),

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
