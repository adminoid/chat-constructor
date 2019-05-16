import { Vue } from 'vue-property-decorator';
export default class DropArea extends Vue {
    items: any;
    dd: any;
    area: any;
    setAreaBoundaries: any;
    dragDropDataReset: any;
    updateCoords: any;
    updateEndLineCoords: any;
    setActiveTargetId: any;
    lines: any[];
    closest: number;
    connectorWidth: number;
    onItemsChanged(): void;
    makeLinesFromItems(): any[];
    setupSizesOfArea(): void;
    mousemoveHandler(e: any): void;
    mouseupHandler(): void;
    mounted(): void;
}
