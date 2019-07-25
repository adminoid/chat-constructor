import { Vue } from 'vue-property-decorator';
export default class ModalFormBlockEdit extends Vue {
    name: 'ModalFormBlockEdit';
    subFormData: {
        messages: any[];
        client_input_type: {
            component: any;
        };
    };
    messages: any[];
    subFormList: any[];
    state: {
        params: {
            blockId: -1;
        };
    };
    getBlock: any;
    confirm(): void;
    cancel(): void;
    created(): void;
    addMessage(): void;
}
