import { Vue } from 'vue-property-decorator';
export default class TopButton extends Vue {
    text: string;
    type: string;
    createEntity: any;
    onUrlChange(newRoute: any): void;
}
