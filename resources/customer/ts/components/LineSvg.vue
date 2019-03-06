<template lang="pug">

  .line-area(:style="[position, size]")

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  import * as _ from 'lodash'

  @Component({})
  export default class LineSvg extends Vue {

    @Prop({}) lineData!: object;

    get position () {
      let dataArray = _.values(this.lineData);

      let leftMin = _.minBy(dataArray, function(o: any) { return o.left; }).left;
      let topMin = _.minBy(dataArray, function(o: any) { return o.top; }).top;

      return {
        left: leftMin + 'px',
        top: topMin + 'px',
      }
    }

    get size () {
      let dataArray = _.values(this.lineData);

      let leftMin = _.minBy(dataArray, function(o: any) { return o.left; }).left;
      let topMin = _.minBy(dataArray, function(o: any) { return o.top; }).top;
      let leftMax = _.maxBy(dataArray, function(o: any) { return o.left; }).left;
      let topMax = _.maxBy(dataArray, function(o: any) { return o.top; }).top;

      return {
        height: topMax - topMin + 'px',
        width: leftMax - leftMin + 'px',
      };
    }

  }

</script>

<style lang="sass">

  .line-area
    position: absolute
    background: #e0ffcf
    opacity: .3

</style>
