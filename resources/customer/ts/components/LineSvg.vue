<template lang="pug">

  svg.svg(:style="[position, size]" :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg")
    line.svg__line(x1="0" :y1="y1" :x2="width" :y2="y2" stroke="rgba(14, 81, 0, 0.8)")

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  import * as _ from 'lodash'

  @Component({})
  export default class LineSvg extends Vue {

    @Prop({}) lineData!: object;

    lineMinSize: number = 3;

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

      type lineDataType = {
        begin: {
          left, top
        },
        end: {
          left, top
        }
      };

      let lineData: lineDataType | any = this.lineData;
      let test = _.reduce(lineData.begin, function(result, value, key) {
        return value < lineData.end[key] ?
          result : result.concat(key);
      }, []);

      return test.length === 1;
    }

    get width () {
      let dataArray = _.values(this.lineData),
        leftMin = _.minBy(dataArray, (o: any) => o.left).left,
        leftMax = _.maxBy(dataArray, (o: any) => o.left).left,
        width = leftMax - leftMin;

      return (width < this.lineMinSize) ? this.lineMinSize : width;
    }

    get height () {
      let dataArray = _.values(this.lineData),
        topMin = _.minBy(dataArray, (o: any) => o.top).top,
        topMax = _.maxBy(dataArray, (o: any) => o.top).top,
        height = topMax - topMin;

      return (height < this.lineMinSize) ? this.lineMinSize : height;
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
    z-index: -1
    position: absolute
    .svg__line
      stroke-width: 2

</style>
