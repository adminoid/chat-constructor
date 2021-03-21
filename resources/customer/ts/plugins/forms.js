import ModalForm from "../components/ModalForm.vue";
import axios from 'axios';
import store from '../store';
import i18n from "../i18n";
export default {
    install: function (Vue) {
        Vue.prototype.$form = function (formData, params) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var FormData = /** @class */ (function () {
                    // constructor(params, $t) {
                    function FormData(params) {
                        this.titleDefault = '';
                        this.title = '';
                        this.active = false;
                        this.clear();
                        this.active = true;
                        this.params = params;
                        // this.$t = $t;
                    }
                    FormData.prototype.sendForm = function () {
                        var _this = this;
                        if ('buttons' in this.formData) {
                            this.formData.buttons.forEach(function (button, index) {
                                button.sort_order_id = index;
                            });
                        }
                        // send formData to the backend
                        axios.post('/private/save-extended-block-data', this.formData).then(function () {
                            // todo: run action for update this.formData.id block
                            store.dispatch('Block/fetchBlock', _this.formData.id);
                        });
                    };
                    FormData.prototype.clear = function () {
                        this.title = this.titleDefault;
                        this.active = false;
                    };
                    FormData.prototype.init = function (newData, trans) {
                        this.trans = trans;
                        this.active = true;
                        // component name for import
                        switch (newData.type) {
                            case 'editBlock':
                                this.componentName = 'ModalFormBlockEdit';
                                this.title = this.trans.block_edit;
                                break;
                            // this is test data for next form
                            case 'editBlock1':
                                console.info('edit block 1');
                                break;
                            default:
                                console.error(this.trans.error_block_type);
                        }
                    };
                    FormData.prototype.close = function () {
                        this.active = false;
                    };
                    return FormData;
                }());
                // const Modal = new FormData(params, this.$t);
                var Modal = new FormData(params);
                var trans = {
                    block_edit: _this.$t('customer.block_edit'),
                    error_block_type: _this.$t('customer.errors.block_type'),
                };
                Modal.init(formData, trans);
                new Vue({
                    i18n: i18n,
                    template: '<modal-form :state="modal" @confirmed="confirmedAction" @canceled="canceledAction" :formComponent="modal.componentName"></modal-form>',
                    components: {
                        'modal-form': ModalForm
                    },
                    data: function () {
                        return {
                            modal: Modal
                        };
                    },
                    methods: {
                        confirmedAction: function () {
                            // @ts-ignore
                            this.modal.close();
                            // @ts-ignore
                            this.modal.sendForm();
                            resolve();
                        },
                        canceledAction: function () {
                            // @ts-ignore
                            this.modal.close();
                            // @ts-ignore
                            reject(new Error(this.$t('customer.errors.cancelled_operation')));
                        },
                    },
                }).$mount('#modal-form');
            });
        };
    }
};
//# sourceMappingURL=forms.js.map