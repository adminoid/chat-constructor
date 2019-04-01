import * as tslib_1 from "tslib";
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const DropAreaModule = namespace('DropAreaModule');
let CustomerApp = class CustomerApp extends Vue {
};
tslib_1.__decorate([
    DropAreaModule.Action('insertBlock')
], CustomerApp.prototype, "insertBlock", void 0);
CustomerApp = tslib_1.__decorate([
    Component
], CustomerApp);
export default CustomerApp;
//# sourceMappingURL=CustomerApp.vue.js.map