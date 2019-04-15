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

### Next todo

+ test BotsArea when created() run fetchBots() in vuex module
- test vuex module for fetchBots() run axios and get bots data
  - check for mock bots are rendered

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
  - check view of component (visually)
  - click delete button 
- TopButton
  - click add button - call insertBot()


+ testing vuex module decorator: <https://github.com/championswimmer/vuex-module-decorators/blob/master/test/action_access_module_dynamic.ts>
+ also: <https://github.com/championswimmer/vuex-module-decorators/issues/71>
