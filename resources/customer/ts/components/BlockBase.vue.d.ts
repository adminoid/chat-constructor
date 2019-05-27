import Vue, { VueConstructor } from 'vue';
import EndLineMixin from '../mixins/EndLine';
declare const BlockBase_base: (new (...args: any[]) => EndLineMixin & Vue) & VueConstructor<Vue>;
export default class BlockBase extends BlockBase_base {
    dd: any;
    item: object;
    id: number;
    active: boolean;
    onItemsChanged(): void;
    created(): void;
}
