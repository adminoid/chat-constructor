import BeginLineMixin from '../mixins/BeginLine';
declare const ConnectorOutput_base: (new (...args: any[]) => BeginLineMixin & Vue) & VueConstructor<Vue>;
export default class ConnectorOutput extends ConnectorOutput_base {
    connectorData: object;
    connectorId: number;
    blockId: number;
}
