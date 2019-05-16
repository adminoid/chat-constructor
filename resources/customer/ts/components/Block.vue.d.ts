import EndLineMixin from '../mixins/EndLine';
declare const BlockBase_base: (new (...args: any[]) => EndLineMixin & Vue) & VueConstructor<Vue>;
export default class BlockBase extends BlockBase_base {
    checkCreateConnector: any;
    dd: any;
    id: number;
    itemData: object;
    active: boolean;
    onItemsChanged(): void;
    created(): void;
}
