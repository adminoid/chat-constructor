import { Vue } from 'vue-property-decorator';
export default class ModalWindowConfirm extends Vue {
    name: 'ModalWindowConfirm';
    state: object;
    confirm(): void;
    cancel(): void;
    mounted(): void;
}
