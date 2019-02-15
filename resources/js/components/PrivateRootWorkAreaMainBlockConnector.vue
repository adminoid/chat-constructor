<template lang="pug">

    li.connector(
        :style="coordinates"
        :class="classMain"
        @mouseenter="onHover"
        @mouseout="onUnHover"
        @dragstart.stop.prevent="onDragStart"
        @mousedown.stop.prevent="onMouseDown"
    ) {{ coordinates }}

</template>

<script>

    import { mapMutations, mapState } from 'vuex';
    import Vue from 'vue';
    import draggableCloneOfConnectorMixin from '../mixins/draggableCloneOfConnector';
    import PrivateRootWorkAreaMainBlockConnector from './PrivateRootWorkAreaMainBlockConnector';

    export default {

        name: 'PrivateRootWorkAreaMainBlockConnector',

        props: {
            kind: {
                type: String,
                default: 'new'
            },

            connector: {}
        },

        data () {
            return {

                classMain: '',

                classesArray: [],

                dd: {
                    shiftX: 0,
                    shiftY: 0,
                    moving: false,
                    connectorCopy: {},
                }

            }
        },

        computed: {

            ...mapState(['area']),

        },

        methods: {

            ...mapMutations(['setTrackCursor']),

            onMouseDown () {

                console.log('m-d');

                this.setTrackCursor(true);

                let connectorClass = Vue.extend(PrivateRootWorkAreaMainBlockConnector);

                let connectorInstance = new connectorClass({

                    mixins: [draggableCloneOfConnectorMixin],

                    propsData: {kind: 'clone'},

                });

                connectorInstance.$mount();

                this.$parent.$el.appendChild(connectorInstance.$el);
                // TODO: Not add to virtual DOM...

                // this.$parent.connectors.push(connectorInstance);

            },

            onDragStart () {
                return false;
            },

            onHover () {

                this.classesArray.push('connector_hover')

            },

            onUnHover () {

                this.classesArray.pop();

            }
        },

        created () {

            this.classMain = 'connector_' + this.kind;

        }
    }

</script>

<style lang="sass">

    @import '../../sass/_mixins.scss'

    .connector
        height: 16px
        width: 16px
        border: 1px dashed #2a9055
        background: #31b06f
        @include border-radius(3px)
    .connector_hover
        border: 1px solid #005f26
        background: #2a9055
        cursor: pointer
    .connector_clone
        background: #000
        position: absolute
        top: 30px
        left: 20px

</style>
