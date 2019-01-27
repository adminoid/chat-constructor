<template lang="pug">

    .main-block(:style="getStyles()")
        p №{{ idx }}
        p {{ blockData.name }}

</template>

<script>

    export default {

        name: 'PrivateRootWorkAreaMainBlock',

        props: {
            idx: Number,
            blockData: Object
        },

        data: function () {
            return {
                position: {
                    left: 0,
                    top: 0
                }
            }
        },

        methods: {

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
