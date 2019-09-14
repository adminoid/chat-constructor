import ModalForm from "../components/ModalForm.vue";
import axios from 'axios';
import store from '../store'
import i18n from "../i18n";

export default {

  install (Vue) {

    Vue.prototype.$form = function(formData, params) {

      return new Promise((resolve, reject) => {

        class FormData {

          private titleDefault = ''; // this.$t('customer.fill_fields')

          title = '';
          active = false;
          type: string;

          // $t: any;

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

          init(newData) {

            this.active = true;

            // component name for import
            switch ( newData.type ) {

              case 'editBlock':

                this.componentName = 'ModalFormBlockEdit';
                this.title = 'title'; //this.$t('customer.block_edit');

                // console.log(this.$t('customer.block_edit'));

                break;

              // this is test data for next form
              case 'editBlock1':
                console.info('edit block 1');
                break;

              default:
                // console.error(this.$t('customer.errors.block_type'));
                console.error('error');

            }

          }

          close() {
            this.active = false;
          }

        }

        // const Modal = new FormData(params, this.$t);
        const Modal = new FormData(params);

        Modal.init(formData);

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
              reject(new Error('error1'));
              // reject(new Error(this.$t('customer.errors.cancelled_operation')));
            },
          },

        }).$mount('#modal-form');

      });
    }
  }
}
