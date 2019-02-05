# TODO lists

## About frontend organization

- make decision about that how and where place cloned connector for visual moving and delete it after
  - figure out, how insert different components to array of components
  - how dynamically change coordinates of moved DOM-element
    1. run method who updates coordinate from area component as there <https://stackoverflow.com/questions/33682651/call-a-vue-js-component-method-from-outside-the-component>
    2. emit update coordinates custom event (ibid <https://stackoverflow.com/questions/33682651/call-a-vue-js-component-method-from-outside-the-component>)
- split getCoordinates as method and computed coordinates based on it (for what? I'm forgotten...)
- install typescript & vue-class-component & decorators
  - best explanation <https://medium.com/@titasgailius/initial-laravel-setup-with-vuejs-vue-router-vuex-in-typescript-305f7fe9d62b>

**final edited todo:**
+ reorganize file and folder to different folders for different frontend projects (customer, admin, app)
- reorganize code with support typescript, vue-class-component and for vuex
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


