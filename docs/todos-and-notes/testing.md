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
