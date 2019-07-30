import { Vue } from 'vue-property-decorator';
export default class ModalFormBlockEdit extends Vue {
    name: 'ModalFormBlockEdit';
    subFormData: {
        messages: any[];
        client_input_type: {
            id: any;
            name: any;
            component: any;
        };
        client_input_type_id: any;
    };
    subFormList: any[];
    state: {
        params: {
            blockId: -1;
        };
        formData: {};
    };
    getBlock: any;
    beforeCreate(): void;
    onChange(): void;
    addMessage(): void;
    onSubFormDataChanged(val: any): void;
}
