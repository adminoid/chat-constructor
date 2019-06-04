import { Vue } from 'vue-property-decorator';
export default class DragItemWrapper extends Vue {
    itemData: any;
    dragDropDataSet: any;
    dragStart(e: any): void;
    readonly position: {
        left: string;
        top: string;
    };
}
