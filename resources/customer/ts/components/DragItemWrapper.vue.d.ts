import { Vue } from 'vue-property-decorator';
export default class DragItemWrapper extends Vue {
    x: number;
    y: number;
    id: number;
    idx: number;
    dragDropDataSet: any;
    readonly position: {
        left: string;
        top: string;
    };
    dragStart(e: any): void;
}
