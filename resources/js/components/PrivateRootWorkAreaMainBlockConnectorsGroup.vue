<template lang="pug">

    ul.connectors-group(:class="classes" ref="out-connectors")
        private-root-work-area-main-block-connector(v-for="(connector, index) in connectors" :key="index" :connector="connector")

</template>

<script>

    import PrivateRootWorkAreaMainBlockConnector from './PrivateRootWorkAreaMainBlockConnector';

    export default {

        name: 'PrivateRootWorkAreaMainBlockConnectorsGroup',

        props: {
            kind: {
                type: String,
                default: 'out'
            },
        },

        components: { PrivateRootWorkAreaMainBlockConnector },

        data () {

            return {
                classes: [
                    'connectors-group_kind_' + this.kind
                ],
                connectors: []
            }

        },

        created () {

            this.connectors.push({
                kind: 'new1'
            })

        }

    }

</script>

<style lang="sass">

    @import '../../sass/_mixins.scss'

    .connectors-group
        padding: 2px
        margin: 0
        list-style: none
        display: flex
        position: relative
        bottom: -11px
        border: 1px dashed #7c7c7c
        @include border-radius(3px)

</style>
