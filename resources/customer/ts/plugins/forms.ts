import ModalForm from "../components/ModalForm.vue";
import axios from 'axios';

export default {

  install (Vue) {

    Vue.prototype.$form = function(formData, params) {

      return new Promise((resolve, reject) => {

        class FormData {

          private titleDefault = 'Заполните данные';

          title = '';
          active = false;
          type: string;

          formData: {};

          params: {
            blockId: null,
          };

          componentName;

          constructor(params) {
            this.clear();
            this.active = true;
            this.params = params;
          }

          sendForm () {

            // send formData to the backend
            axios.post('/private/save-extended-block-data', this.formData).then(resp => {
              console.log(resp);
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
                this.title = 'Редактирование блока';

                break;

              // this is test data for next form
              case 'editBlock1':
                console.info('edit block 1');
                break;

              default:
                console.error('Ошибка: не верный тип блока');

            }

          }

          close() {
            this.active = false;
          }

        }

        const Modal = new FormData(params);

        Modal.init(formData);

        new Vue({
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
              reject(new Error('Операция отменена'))
            },
          },

        }).$mount('#modal-form');

      });
    }
  }
}
