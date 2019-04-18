declare module 'vue/types/vue' {
  interface Vue {
    $confirm: any;
  }
}

import ModalWindow from '../components/ModalWindow.vue'
import $ from 'jquery'

export default {

  install (Vue, options) {

    Vue.prototype.$confirm = function(windowData) {
      return new Promise((resolve, reject) => {

        class ModalData {

          constructor() {
            this.clear();
          }

          title = '';
          message = '';
          active = false;

          clear() {
            this.title = '';
            this.message = '';
            this.active = false;
          }

          open(newData) {
            if (!!newData.title && !!newData.message) {
              this.title = newData.title;
              this.message = newData.message;
            }
          }

          close() {
            this.active = false;
            $('#modal-place').empty().append('<div id="modal-window"></div>')
          }

        }

        let Modal = new ModalData();
        Modal.open(windowData);

        new Vue({
          el: '#modal-window',
          template: '<modal-window :state="modal" @confirmed="confirmedAction" @canceled="canceledAction"></modal-window>',
          components: {
            ModalWindow
          },
          data () {
            return {
              modal: Modal
            }
          },
          methods: {
            confirmedAction () {
              console.log(this);
              // this.modal.close()
              // this.initAction(this.modal.action)
            },
            canceledAction () {
              // this.modal.close()
              reject(`Action is cancelled`)
            },
          }
        })

      });
    }
  }
}
