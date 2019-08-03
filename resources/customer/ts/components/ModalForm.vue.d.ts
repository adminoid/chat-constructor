import { Vue } from 'vue-property-decorator';
export default class ModalForm extends Vue {
    name: 'ModalForm';
    state: object;
    formComponent: string;
    confirm(): void;
    cancel(): void;
}
