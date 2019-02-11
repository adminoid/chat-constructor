# TODO lists

## About frontend organization

- make decision about that how and where place cloned connector for visual moving and delete it after
  - figure out, how insert different components to array of components
  - how dynamically change coordinates of moved DOM-element
    1. run method who updates coordinate from area component as there <https://stackoverflow.com/questions/33682651/call-a-vue-js-component-method-from-outside-the-component>
    2. emit update coordinates custom event (ibid <https://stackoverflow.com/questions/33682651/call-a-vue-js-component-method-from-outside-the-component>)
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

## For future
### Backend
- nullable one-to-one relationship <https://laracasts.com/discuss/channels/eloquent/allow-null-for-belongsto-relationship?page=0>

