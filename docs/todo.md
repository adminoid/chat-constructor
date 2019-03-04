# TODO lists

## About frontend organization

- make decision about that how and where place cloned connector for visual moving and delete it after
  + figure out, how insert different components to array of components
  - how dynamically change coordinates of moved DOM-element
    - run method who updates coordinate from area component as there <https://stackoverflow.com/questions/33682651/call-a-vue-js-component-method-from-outside-the-component>
    - emit update coordinates custom event (ibid <https://stackoverflow.com/questions/33682651/call-a-vue-js-component-method-from-outside-the-component>)
- split getCoordinates as method and computed coordinates based on it (for what? I'm forgotten...)
- install typescript & vue-class-component & decorators
  - **best explanation** (with vue-router) <https://medium.com/@titasgailius/initial-laravel-setup-with-vuejs-vue-router-vuex-in-typescript-305f7fe9d62b>

**final edited todo:**
+ reorganize file and folder to different folders for different frontend projects (customer, admin, app)
+ reorganize code with support typescript, vue-class-component and for vuex
+ make file types.ts with exporting many types (resources/customer/ts/ts-custom.d.ts)
- make list array for area component of different components with type as imported type from types.ts
- make base component for connector
  - make components based on connector: connector-moved, connector-create
- if mousedown on connector-create, insert connector-create to area children items array with true coordinates
- absolute position in area
  - get and save actual top/left positions cursor in area
  - get and save cursor position in draggable element (offset)
    - clicked position minus offset in cursor
  - save draggable element in store
  - insert copy of draggable element to area item array and save it in store
  - if left/top less than area offset - return 0, and by analogy for right/bottom
- **on mouse down**
  - place connector copy to current position
  - make jsplumb between connector and his copy
  - remove all store dd stuff
- later... split connector-group to connector-group-top and connector-group-bottom


> ---

### Notes
+ Using Vue mixins with typescript and vue-class-component <https://forum.vuejs.org/t/how-can-i-use-mixin-with-vue-class-component-and-typescript/21254/7>
+ vuex typing <https://github.com/vuejs/vuex/issues/564>
+ modules example <https://github.com/Anonyfox/vuex-store-module-example/blob/master/src/getters.ts>
+ vuex stuff
  + <https://codeburst.io/vuex-and-typescript-3427ba78cfa8>
  + <https://github.com/ktsn/vuex-class>
+ vue 'singleton' <https://stackoverflow.com/questions/52944052/creating-a-single-instance-of-a-class-within-a-vue-application>
+ transparent components: <https://zendev.com/2018/05/31/transparent-wrapper-components-in-vue.html>

### Semantic component structure
- index.blade:
  main-sidebar / aside
  main-content / section
    top-panel / nav
    drop-area
      drag-item [block, connector-dd, line] inner blocks wrapped to wrapper component **DragItem**
        block
          connector-group
            connector [connector-create, connector-dd, connector]

### Latest actual TODO list

+ make block component
  - copy padding and z-index from alpha version
  + insert to items
  - _insert to items with interface_
+ make insert block by click button
- make drag-item mixin
- [mixin] on mouse clicked save cursor position into clicked element
- bind drop-item position with store

#### also TODO

+ bind z-index hardly to all components in items array
+ add action addBlock to store module
  - add type of component
  + initial offset
- think about how rightly bind left/top position to DragItem-like components
  - Is it need move adding initial data to DragItemMixin?

#### Main work is...
- **comment mixin and replace it to DragItem/slot/Component**
for children dynamic components see <https://vuejs.org/v2/guide/components-dynamic-async.html>, example:
```javascript
Vue.component(
  'async-webpack-example',
  // The `import` function returns a Promise.
  () => import('./my-async-component')
)
// and
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

---

> + about watchers here: <https://alligator.io/vuejs/typescript-class-components/>
> + about extending styles: <https://alligator.io/vuejs/typescript-class-components/>
> + extending templates: <https://github.com/mrodal/vue-inheritance-loader>
> + mixin wrapper <https://github.com/ktsn/vue-typed-mixins> for class-like extending
  > + extending template with render function <https://github.com/vuejs/vue/issues/4665#issuecomment-321618056>
> + more extending: <https://forum.vuejs.org/t/extend-styles-and-behaviour-of-a-single-file-component/19420>
> + scalable content: <https://css-tricks.com/scaled-proportional-blocks-with-css-and-javascript/>

### Close TODO's
- replace `import from 'vue-class-component'` to `import from 'vue-property-decorator'`
- pass data through DragItem wrapper-component as here: <https://alligator.io/vuejs/add-v-model-support/>
  - this is my case: <https://stackoverflow.com/questions/50891858/vue-how-to-pass-down-slots-inside-wrapper-component>

**Notes**
+ conclusion about encapsulating components <https://stackoverflow.com/questions/48807290/how-to-encapsulate-wrap-a-vuejs-component>
- may to read about reusable components: <https://codeburst.io/creating-reusable-components-with-vue-js-button-component-503167facfde>
+ more <https://adamwathan.me/renderless-components-in-vuejs/>
+ get key value in child component <https://stackoverflow.com/questions/47783396/access-key-from-child-component-in-vue>
    `Otherwise you can access the key on the vnode within the component via this.$vnode.key`
+ get ref by index <https://www.reddit.com/r/vuejs/comments/89hywj/using_refs_with_arrays_of_things/>:
    ```
    <button @click="playPause(index)">Play/Pause</button>
    <audio ref="audioEl" src="audio/sample1.mp3" type="audio/mpeg">
      Your browser does not support the audio tag.
    </audio>

    methods: {
      playPause (index) {
        const audioEl = this.$refs.audioEl[index]
        audioEl[audioEl.paused ? 'play' : 'pause']()
      }
    }
    ```
    + also <https://jsfiddle.net/Fmajor/cuay7v1j/2/>
+ splice: `this.settingsData.campaigns.splice(index, 1);`
+ useful notes about refs array: <https://github.com/vuejs/vue/issues/4952#issuecomment-425875157>

## For future
### Backend
- nullable one-to-one relationship <https://laracasts.com/discuss/channels/eloquent/allow-null-for-belongsto-relationship?page=0>


**Extending**:
1. <https://jsfiddle.net/m7koc7uv/>
2. <https://stackoverflow.com/questions/51791676/how-can-both-a-base-class-and-mixins-be-used-with-vue-class-component>
3. <https://github.com/vuejs/vue-class-component/issues/80>

# income-connectors

- on mouseup:
  - modify connector-create to connector-outcome
  - add new connector-create to outcome-connectors
  
## SVG lines  

<https://stackoverflow.com/questions/52972648/drawing-path-in-svg-with-90-arc-between-perpendicular-lines>

Insert line before block, and after connecting last block move to up (z-index).

Testing: <http://blogs.sitepointstatic.com/examples/tech/svg-curves/cubic-curve.html>  
Need square:  
```
<path d="M71,111 C63,408 280,113 272,410 Z" />
```

## Notes
I have 3 types of connector (_each connector must contain type property_):
1. ConnectorNormal
1. ConnectorCreate
  - toggleable to ConnectorNormal
1. ConnectorClone
  - bind position
  
ConnectorClone and ConnectorCreate must pass his coordinates to store for drawing line... 

# About bezier curves

1. <https://codepen.io/anon/pen/LjPpGv?editors=1010> from <https://stackoverflow.com/questions/45240401/svg-path-create-a-curvy-line-to-link-two-points>
2. also: <https://stackoverflow.com/questions/49274176/how-to-create-a-curved-svg-path-between-two-points>

## Way for lodash select/where:  
```javascript
const people = [
  { name: "Tom", age: 19 },
  { name: "John", age: 3 },
  { name: "Seven", age: 37 },
  { name: "John", age: 42 }
];

let filtered_people = _.filter(people, function(p){
  return _.includes(['Tom', 'John'], p.name);  
});

console.log(filtered_people); // Array[3]
```

+ good cheat sheet for lodash <https://medium.com/voobans-tech-stories/10-lodash-functions-everyone-should-know-334b372aec5d>

I need internal in area x1,y1 and x2,y2 for a line, where x - left and y - top.  

+ another way to draw lines: <https://codepen.io/berky93/pen/vKmkWG>

# Latest TODO

- add second block for testing "computed" lines array
- add property target to each out connector
+ determine where draw svg lines (**in template of DropArea**) 

---

### New connector drawing
- mousedown
  - add target to items[id].itemData.connectors.output{type = 'create'}

Line contains from:
- ~~out connector block id~~
- ~~out connector id~~
+ source: block_id + connector_id (?)
+ target block id (in connector one for the block)

Actual question: **how calculate coordinates for line**
May be add method `getLineCoords` to: ConnectorClone and

# Next point to point tasks
1. set target (ConnectorClone) for ConnectorCreate by click on it
2. make "computed" array lines, created by filtering block->connector->has(target)
3. When mousemove, drawing square block for line (it would be svg frame)
  - need get coordinate offset for source and target elements
4. draw quadratic bezier in svg frame
5. create preset target and draw line between connector and target

# Extends and mixin use both
Full example: <https://stackoverflow.com/questions/51791676/how-can-both-a-base-class-and-mixins-be-used-with-vue-class-component>
Many examples/patterns: <https://learn-vuejs.github.io/vue-patterns/patterns/>

Force recompute computed: <https://github.com/vuejs/vue/issues/214>

## Latest questions

### V 1

When out or create connector are mounted, save his coordinates to store

When mousemove over DropArea, recalculate coordinates in store

**How and where recalculate coordinates of begin or end lines**

_How recalculate connector coordinates only for related to moved DragItemWrapper?_

### V 2

When connector mounted push his coordinates to store (item.connector && ..target)

Lodash update where examples
<https://stackoverflow.com/questions/41341075/lodash-collection-bulk-update>

