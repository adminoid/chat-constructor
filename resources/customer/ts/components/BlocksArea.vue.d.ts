import { Vue } from 'vue-property-decorator';
export default class BlocksArea extends Vue {
    name: "BlocksArea";
    $confirm: any;
    blocks: any;
    fetchBlocks: any;
    deleteBlock: any;
    mounted(): void;
    removeBlock(id: any): void;
}
