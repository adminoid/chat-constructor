import { Vue } from 'vue-property-decorator';
export default class BlocksArea extends Vue {
    fetchBlocks: any;
    deleteBlock: any;
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
    botId: any;
    id: any;
    $route: any;
    created(): void;
    mounted(): void;
    onItemsChanged(): void;
    makeLinesFromItems(): any[];
    setupSizesOfArea(): void;
    mousemoveHandler(e: any): void;
    mouseupHandler(): void;
}
