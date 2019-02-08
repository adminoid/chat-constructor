import * as tslib_1 from "tslib";
import { Module, VuexModule, Mutation, Action, } from 'vuex-module-decorators';
import _ from 'lodash';
let DropAreaModule = class DropAreaModule extends VuexModule {
    constructor() {
        super(...arguments);
        this.items = [];
    }
    insertItem(item) {
        this.items.push(item);
    }
    async insertBlock(itemData) {
        if (!_.has(itemData, 'component') || itemData.component !== 'BlockBase') {
            itemData.component = 'BlockBase';
        }
        this.context.commit('insertItem', itemData);
    }
};
tslib_1.__decorate([
    Mutation
], DropAreaModule.prototype, "insertItem", null);
tslib_1.__decorate([
    Action({ rawError: true })
], DropAreaModule.prototype, "insertBlock", null);
DropAreaModule = tslib_1.__decorate([
    Module({
        name: 'DropAreaModule',
        namespaced: true,
        store: {},
    })
], DropAreaModule);
export default DropAreaModule;
//# sourceMappingURL=DropAreaModule.js.map