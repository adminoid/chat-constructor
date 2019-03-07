<template lang="pug">

  svg.svg(:style="[position, size]" :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg")
    line.svg__line(x1="0" :y1="y1" :x2="width" :y2="y2" stroke="#6b240c")

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

    get y1 () {
      return (this.mirrored) ? this.height : 0;
    }

    get y2 () {
      return (this.mirrored) ? 0 : this.height;
    }

    get mirrored () {
      // console.log(this.lineData); // begin/end . left/top
      let lineData = this.lineData;
      let test = _.reduce(lineData.begin, function(result, value, key) {
        return value < lineData.end[key] ?
          result : result.concat(key);
      }, []);

      return test.length === 1;
    }

    get width () {
      let dataArray = _.values(this.lineData);

      let leftMin = _.minBy(dataArray, function(o: any) { return o.left; }).left;
      let leftMax = _.maxBy(dataArray, function(o: any) { return o.left; }).left;

      return leftMax - leftMin;
    }

    get height () {
      let dataArray = _.values(this.lineData);

      let topMin = _.minBy(dataArray, function(o: any) { return o.top; }).top;
      let topMax = _.maxBy(dataArray, function(o: any) { return o.top; }).top;

      return topMax - topMin;
    }

    get viewBox () {
      return `0 0 ${this.width} ${this.height}`
    }

    get size () {
      return {
        height: this.height + 'px',
        width: this.width + 'px',
      };
    }

  }

</script>

<style lang="sass">

  .svg
    position: absolute
    background: rgba(222, 255, 203, 0.33)
    .svg__line
      stroke-width: 2

</style>
