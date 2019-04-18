# Testing notes

## Backend

### testing crud resource controller (BotsController)

which methods leave?
+ index [list of bots]
- create [page with create new bot html form]
+ store [post query for create new bot]
- show [get info about single bot by id]
- edit [page with edit bot html form]
+ update [update specific bot by id]
+ destroy [delete bot by id]

leave (only): 'index', 'store', 'update', 'destroy'
removed (except): 'create', 'show', 'edit'

---

## Frontend

todo:
- look for 'vuex sync with backend'
- think about vuex modules structure

1. test mock with vuex action `await fetchBots()` when BotsArea created()
2. test imported vuex module BotsModel (name for example) with axios mock has been called

### Read
+ <https://lmiller1990.github.io/electic/posts/mocks_and_stubs:_testing_api_requests_with_vue.html>
+ <https://codeburst.io/a-pattern-for-mocking-and-unit-testing-vuex-actions-8f6672bdb255>

To check myMethod called in mounted hook:
```js
const myMethod = jest.fn()
wrapper = mount(ProfileSidebarIndex, {
    methods: { myMethod }
});
```

Testing Vuex action called example: <https://stackoverflow.com/questions/50278708/vue-test-utils-how-to-test-logic-within-mounted-lifecycle-hook-with-vuex>

Mocking window sizes example:
```js
describe('Mock `getBoundingClientRect`', () => {
    beforeEach(() => {
        Element.prototype.getBoundingClientRect = jest.fn(() => {
            return {
                width: 120,
                height: 120,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            }
        });
    });
    it('should mock `getBoundingClientRect`', () => {
        const element = document.createElement('span');
        const rect = element.getBoundingClientRect();
        expect(rect.width).toEqual(120);
    });
});
```

todo:
- test button text toggle by route
- move text to vue-i18n (later)

+ <https://stackoverflow.com/questions/45259086/stubbing-a-function-using-jest>
+ <https://jestjs.io/docs/en/mock-functions>


Regarding **BotsArea** frontend tests:
+ routing tests (mock or stub vuex)
  + routing for bots (root routing)
- Vuex Store (modules/Bot)
  - fetchBots, deleteBot, createBot actions to axios mock
- BotsArea
  + run action fetchBots() when created
  + check render bots in area by vuex module store mock
  + install icon package with robot icon
    + font size
  - check view of component (visually)
    + make markup
    + make delete button
  - click delete button 
- TopButton
  - click add button - call insertBot()


+ testing vuex module decorator: <https://github.com/championswimmer/vuex-module-decorators/blob/master/test/action_access_module_dynamic.ts>
+ also: <https://github.com/championswimmer/vuex-module-decorators/issues/71>

Example for testing run vuex action without _vuex-mock-store_ npm package:
```js

describe('BotsArea.vue fetchBots()', () => {

  let actions, state, store;

  beforeEach(() => {
    state = {
      bots: []
    };

    actions = {
      fetchBots: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        Bot: {
          namespaced: true,
          state,
          actions,
        }
      }
    })
  });

  it('loading user bots at created hook via ajax', () => {

    shallowMount(BotsArea, { store, localVue });
    expect(actions.fetchBots).toHaveBeenCalled();

  });
});
```

# Modal windows information (from `adminoid cms` source code)
files for modal windows as promise:
- resources/assets/js/components/admin/ModalWindow.vue
- resources/assets/js/components/admin/SortableTreeAjax.vue
- resources/assets/js/admin.modals.js

Info about testing: <https://github.com/vuejs/vue/tree/dev/test/unit/features>

All vue test examples: <https://github.com/vuejs/vue/tree/dev/test/unit/features>

modal component with confirming: <https://stackoverflow.com/questions/45038317/vue-how-to-destroy-already-created-and-mounted-tooltip-component-to-the-app> or just native window confirm: <https://stackoverflow.com/questions/52609015/manually-instantiating-components-in-vue>

Very interesting:
+ <https://stackoverflow.com/questions/48837002/vue-js-mount-component-after-dom-tree-mutation-to-add-a-vue-component>
- may be useful: <https://forum.vuejs.org/t/how-to-destroy-mounted-element-with-its-parent/3232>

