<template lang="pug">

  svg.svg(:style="[position, size]" :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg" v-html="lineElement")

</template>

<script lang="ts">

  import { Vue, Component, Prop } from 'vue-property-decorator'
  import * as _ from 'lodash'

  @Component({})
  export default class LineSvg extends Vue {

    @Prop({}) lineData!: any;

    lineMinSize: number = 3;

    topPadding: number = 70;

    get verticalAdd() {
      return this.lineData.begin.top > this.lineData.end.top - this.topPadding/3;
    }

    get reverseVertical() {
      return this.lineData.begin.top > this.lineData.end.top;
    }

    get reverseHorizontal() {
      return this.lineData.begin.left > this.lineData.end.left;
    }

    get horizontalClose() {
      return Math.abs(this.lineData.begin.left - this.lineData.end.left) < 50;
    }

    get x1x2 () {
      if( this.reverseHorizontal ) {
        return this.width - 1;
      }
      return 1;
    }

    get y1 () {
      let baseY1 = (this.verticalAdd) ? this.height - this.topPadding : 0;
      if( !this.verticalAdd && !this.reverseVertical ) {
        return baseY1;
      }
      return (this.reverseVertical) ? baseY1 : this.topPadding;
    }

    get y2 () {
      let baseY2 = (this.verticalAdd) ? 0 : this.height/2;
      return (this.reverseVertical) ? this.height * 2 : baseY2;
    }

    get x3 () {
      if( this.reverseHorizontal ) {
        return 0;
      }
      return this.width;
    }

    get x4 () {
      if( this.reverseHorizontal ) {
        return 1;
      }
      return this.width - 1;
    }

    get lineElement () {

      if( this.verticalAdd ) {

        return `<path d="M${this.x1x2} ${this.y1} C ${this.x1x2} ${this.height}, ${this.x3} 0, ${this.x4} ${this.height - this.y1}" stroke="#b03779" stroke-width="2" fill="transparent"/>`;

      }

      if( this.horizontalClose ) {
        return `<line x1="${this.x1x2}" y1="${this.y1}" x2="${this.x4}" y2="${this.height}" stroke="#b03779" stroke-width="2"/>`;
      }

      return `<path d="M${this.x1x2} ${this.y1} Q ${this.x1x2} ${this.y2}, ${this.width/2} ${this.height/2} T ${this.x4} ${this.height}"
              stroke="#b03779" stroke-width="2" fill="transparent"/>`;

    }

    get position () {

      // remove all undef from dataArray
      let dataArray = _.compact(_.values(this.lineData));
      console.log(dataArray);

      let leftMin = _.minBy(dataArray, o => o.left).left;
      let topMin = _.minBy(dataArray, o => o.top).top;

      // todo: refactor 1 px value
      if( this.verticalAdd ) {
        return {
          left: (leftMin - 1) + 'px',
          top: (topMin - this.topPadding - 1)+ 'px',
        }
      }

      return {
        left: (leftMin - 1) + 'px',
        top: (topMin - 1) + 'px',
      }
    }

    get width () {
      let dataArray = _.values(this.lineData),
        leftMin = _.minBy(dataArray, (o: any) => o.left).left,
        leftMax = _.maxBy(dataArray, (o: any) => o.left).left,
        widthAbs = leftMax - leftMin;
      return (widthAbs< this.lineMinSize) ? this.lineMinSize + 2 : widthAbs + 2;
    }

    get height () {
      // let dataArray = _.values(this.lineData);
      let dataArray = _.compact(_.values(this.lineData));

      let topMin = _.minBy(dataArray, (o: any) => o.top).top,
        topMax = _.maxBy(dataArray, (o: any) => o.top).top,
        heightAbs = topMax - topMin,
        height = (heightAbs < this.lineMinSize) ? this.lineMinSize + 2 : heightAbs + 2;

      if( this.verticalAdd ) {
        return height + this.topPadding * 2;
      }

      return height;
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
