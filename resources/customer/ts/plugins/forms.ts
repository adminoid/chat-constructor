import ModalForm from "../components/ModalForm.vue";
import axios from 'axios';
import store from '../store'
import i18n from "../i18n";

export default {

  install (Vue) {

    Vue.prototype.$form = function(formData, params) {

      return new Promise((resolve, reject) => {

        class FormData {

          private titleDefault = '';

          title = '';
          active = false;
          type: string;

          trans: any;

          formData: any;

          params: {
            blockId: null,
          };

          componentName;

          // constructor(params, $t) {
          constructor(params) {
            this.clear();
            this.active = true;
            this.params = params;
            // this.$t = $t;
          }

          sendForm () {

            if( 'buttons' in this.formData ) {

              this.formData.buttons.forEach(function (button, index) {
                button.sort_order_id = index;
              });
            }

            // send formData to the backend
            axios.post('/private/save-extended-block-data', this.formData).then(() => {
              // todo: run action for update this.formData.id block
              store.dispatch('Block/fetchBlock', this.formData.id);
            });
          }

          clear() {
            this.title = this.titleDefault;
            this.active = false;
          }

          init(newData, trans) {

            this.trans = trans;
            this.active = true;

            // component name for import
            switch ( newData.type ) {

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

          }

          close() {
            this.active = false;
          }

        }

        // const Modal = new FormData(params, this.$t);
        const Modal = new FormData(params);

        let trans = {
          block_edit: this.$t('customer.block_edit'),
          error_block_type: this.$t('customer.errors.block_type'),
        };

        Modal.init(formData, trans);

        new Vue({
          i18n,

          template: '<modal-form :state="modal" @confirmed="confirmedAction" @canceled="canceledAction" :formComponent="modal.componentName"></modal-form>',
          components: {
            'modal-form': ModalForm
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
              // @ts-ignore
              this.modal.sendForm();
              resolve();
            },
            canceledAction () {
              // @ts-ignore
              this.modal.close();
              // @ts-ignore
              reject(new Error(this.$t('customer.errors.cancelled_operation')));
            },
          },

        }).$mount('#modal-form');

      });
    }
  }
}
