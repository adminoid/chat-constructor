import ModalWindowConfirm from '../components/ModalWindowConfirm.vue';
export default {
    install: function (Vue, options) {
        Vue.prototype.$confirm = function (windowData) {
            return new Promise(function (resolve, reject) {
                var ModalData = /** @class */ (function () {
                    function ModalData() {
                        this.titleDefault = 'Подтвердите действие';
                        this.title = '';
                        this.message = '';
                        this.active = false;
                        this.clear();
                        this.active = true;
                    }
                    ModalData.prototype.clear = function () {
                        this.title = this.titleDefault;
                        this.message = '';
                        this.active = false;
                    };
                    ModalData.prototype.open = function (newData) {
                        if (!!newData.title || !!newData.message) {
                            this.active = true;
                            if (!!newData.title) {
                                this.title = newData.title;
                            }
                            if (!!newData.message) {
                                this.message = newData.message;
                            }
                        }
                    };
                    ModalData.prototype.close = function () {
                        this.active = false;
                    };
                    return ModalData;
                }());
                var Modal = new ModalData();
                Modal.open(windowData);
                new Vue({
                    // el: '#modal-window',
                    template: '<modal-window :state="modal" @confirmed="confirmedAction" @canceled="canceledAction"></modal-window>',
                    components: {
                        'modal-window': ModalWindowConfirm
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
                            resolve();
                        },
                        canceledAction: function () {
                            // @ts-ignore
                            this.modal.close();
                            reject(new Error('Операция отменена'));
                        },
                    }
                }).$mount('#modal-window');
            });
        };
    }
};
//# sourceMappingURL=windows.js.map