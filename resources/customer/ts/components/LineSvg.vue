<template lang="pug">

  .line-area

</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'

  @Component({})
  export default class LineSvg extends Vue {

    created () {
      console.info('line svg created');
    }

  }

</script>

<style lang="sass">
  .line-area
    background: #f00
    width: 10px
    height: 10px
    border: 1px solid #0f0
</style>
