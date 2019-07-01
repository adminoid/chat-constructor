export default {
    install: function (Vue) {
        Vue.prototype.$form = function (formData) {
            return new Promise(function (resolve, reject) {
                var FormData = /** @class */ (function () {
                    function FormData() {
                        this.titleDefault = 'Заполните данные';
                        this.title = '';
                        this.active = false;
                        this.clear();
                        this.active = true;
                    }
                    FormData.prototype.clear = function () {
                        this.title = this.titleDefault;
                        this.active = false;
                    };
                    FormData.prototype.init = function (newData) {
                        // component name for import
                        switch (newData.type) {
                            case 'editBlock':
                                this.componentName = 'ModalFormBlockEdit';
                                this.title = 'Редактирование блока';
                                break;
                            // this is test data for next form
                            case 'editBlock1':
                                console.info('edit block 1');
                                break;
                            default:
                                console.error('Ошибка: не верный тип блока');
                        }
                        // dynamically activate necessary component
                        // if ( newData.type ) {
                        //
                        //   this.active = true;
                        //
                        //   if (!!newData.title) {
                        //     this.title = newData.title;
                        //   }
                        //
                        // }
                    };
                    FormData.prototype.close = function () {
                        this.active = false;
                    };
                    return FormData;
                }());
                var Modal = new FormData();
                return;
                Modal.init(formData);
                console.info(Modal.componentName);
                new Vue({
                    template: '<ModalForm :state="modal" @confirmed="confirmedAction" @canceled="canceledAction" :formComponent="Modal.componentName"></ModalForm>',
                    data: function () {
                        return {
                            modal: Modal
                        };
                    },
                    methods: {
                        confirmedAction: function () {
                            // @ts-ignore
                            this.modal.close();
                            resolve();
                        },
                        canceledAction: function () {
                            // @ts-ignore
                            this.modal.close();
                            reject(new Error('Операция отменена'));
                        },
                    },
                    mounted: function () {
                        console.log(Modal.componentName);
                    }
                }).$mount('#modal-form');
            });
        };
    }
};
//# sourceMappingURL=forms.js.map