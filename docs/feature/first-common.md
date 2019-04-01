# feature/first-common branch info

Testing example (typescript, vue-class-component): <https://danpottsdoes.wordpress.com/2018/01/23/my-solution-to-unit-testing-vue-class-components-with-typescript-and-mocha/>  

Also testing examples: <https://lmiller1990.github.io/vue-testing-handbook/vue-router.html#vue-router>  

## Todo list

### First todo
+ commit js testing
+ install vue-router
- look at hellotars.com for index page of customer panel
  - the page where create bots
  - the page where edit bots
  - 
- come up with a first tests ideas
- write test
- write index of customer panel

### Second todo
- I should make routing in separate file
  - bots area
  - blocks area

## Testing todo
- mount CustomerApp with real components Sidebar and MainArea, but mock all others
- the MainArea must have TopPanel and router placement
- check routing between /bots /bots/$1/edit
- create button add bot and check adding bot
- then create redirect to edit bot and have possible added blocks
- add block by button click
- open popup when click 'edit block'
- save and restore data of block
- saving block and his target, targetCoordinates and so on...

there are enough

**Routing sidebar, top-menu and main-container**  
<https://stackoverflow.com/questions/47915016/vue-vuetify-vue-router-changing-toolbar-content-based-on-page>  
 
Vuex Router sync: <https://github.com/vuejs/vuex-router-sync>

+ Vue test utils: <https://vue-test-utils.vuejs.org/>
+ Vue testing handbook: <https://lmiller1990.github.io/vue-testing-handbook/>

