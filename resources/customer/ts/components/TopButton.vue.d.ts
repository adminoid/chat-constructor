import { Vue } from 'vue-property-decorator';
export default class TopButton extends Vue {
    name: "TopButton";
    text: string;
    type: string;
    insertBlock: any;
    addAction(): void;
}
