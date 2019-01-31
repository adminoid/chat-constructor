<template lang="pug">

    li.connector(:class="classes" @mouseenter="onHover" @mouseout="onUnHover")

</template>

<script>

    export default {

        name: 'PrivateRootWorkAreaMainBlockConnector',

        props: {
            kind: {
                type: String,
                default: 'create-new'
            },
            data: {}
        },

        data () {
            return {
                classes: [
                    'connector_' + this.kind
                ]
            }
        },

        methods: {
            onHover (e) {

                console.log('onHover');
                this.classes.push('connector_hover')

            },

            onUnHover (e) {

                console.log('onUnHover');
                this.classes.pop();
            }
        }

    }

</script>

<style lang="sass">

    @import '../../sass/_mixins.scss'

    .connector
        height: 16px
        width: 16px
        border: 1px dashed #2a9055
        @include border-radius(3px)
    .connector_hover
        border: 1px solid #005f26
        background: #2a9055
        cursor: pointer

</style>
