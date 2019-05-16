import BeginLineMixin from '../mixins/BeginLine';
declare const ConnectorCreate_base: (new (...args: any[]) => BeginLineMixin & Vue) & VueConstructor<Vue>;
export default class ConnectorCreate extends ConnectorCreate_base {
    area: any;
    setTargetForConnectorCreate: any;
    insertConnectorClone: any;
    setConnectorTarget: any;
    connectorData: object;
    connectorId: number;
    blockId: number;
    startDragConnector(e: any): void;
}
