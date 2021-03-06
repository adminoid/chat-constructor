import ModalWindowConfirm from '../components/ModalWindowConfirm.vue'

export default {

  install (Vue) {

    Vue.prototype.$confirm = function(windowData) {
      return new Promise((resolve, reject) => {

        class ModalData {

          private titleDefault = 'Подтвердите действие';

          title = '';
          message = '';
          active = false;

          constructor() {
            this.clear();
            this.active = true;
          }

          clear() {
            this.title = this.titleDefault;
            this.message = '';
            this.active = false;
          }

          open(newData) {
            if (!!newData.title || !!newData.message) {

              this.active = true;

              if (!!newData.title) {
                this.title = newData.title;
              }

              if (!!newData.message) {
                this.message = newData.message;
              }
            }
          }

          close() {
            this.active = false;
          }

        }

        let Modal = new ModalData();
        Modal.open(windowData);

        new Vue({
          template: '<modal-window :state="modal" @confirmed="confirmedAction" @canceled="canceledAction"></modal-window>',
          components: {
            'modal-window': ModalWindowConfirm
          },
          data () {
            return {
              modal: Modal
            }
          },
          methods: {
            confirmedAction () {
              // @ts-ignore
              this.modal.close();
              resolve();
            },
            canceledAction () {
              // @ts-ignore
              this.modal.close();
              reject(new Error('Операция отменена'))
            },
          }
        }).$mount('#modal-window');

      });
    }
  }
}
