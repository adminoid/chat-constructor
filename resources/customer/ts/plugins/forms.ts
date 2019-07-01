export default {

  install (Vue) {

    Vue.prototype.$form = function(formData) {

      return new Promise((resolve, reject) => {

        class FormData {

          private titleDefault = 'Заполните данные';

          title = '';
          active = false;

          componentName;

          constructor() {
            this.clear();
            this.active = true;
          }

          clear() {
            this.title = this.titleDefault;
            this.active = false;
          }

          init(newData) {

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

          }

          close() {
            this.active = false;
          }

        }

        let Modal = new FormData();
        return;

        Modal.init(formData);

        console.info(Modal.componentName);

        new Vue({

          template: '<ModalForm :state="modal" @confirmed="confirmedAction" @canceled="canceledAction" :formComponent="Modal.componentName"></ModalForm>',
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
          },

          mounted () {
            console.log(Modal.componentName);
          }

        }).$mount('#modal-form');

      });
    }
  }
}
