import { Vue } from 'vue-property-decorator';
export default class DragItemWrapper extends Vue {
    position: positionInterface;
    idx: number;
    id: number;
    dragDropDataSet: any;
    dragStart(e: any): void;
}
