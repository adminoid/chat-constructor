import { Vue } from 'vue-property-decorator';
export default class BlocksArea extends Vue {
    $refs: {
        area: HTMLElement;
        frame: HTMLElement;
        items;
    };
    fetchBlocks: any;
    deleteBlock: any;
    saveBlockData: any;
    saveConnectorTarget: any;
    items: any;
    dd: any;
    area: any;
    scrollPosition: any;
    setAreaBoundaries: any;
    dragDropDataReset: any;
    updateCoords: any;
    updateEndLineCoords: any;
    setActiveTargetId: any;
    setScrollOffset: any;
    lines: any[];
    closest: number;
    connectorWidth: number;
    botId: any;
    $route: any;
    areaSize: {
        width: number;
        height: number;
    };
    isItemsChanged: boolean;
    created(): void;
    mounted(): void;
    setAreaSize(): void;
    setAreaBorders(): void;
    readonly areaSizePx: {
        width: string;
        height: string;
    };
    onItemsChanged(): void;
    handleScroll(): void;
    makeLinesFromItems(): any[];
    mousemoveHandler(e: any): void;
    mouseupHandler(): void;
}
