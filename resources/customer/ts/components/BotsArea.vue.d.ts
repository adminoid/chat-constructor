import { Vue } from 'vue-property-decorator';
export default class BotsArea extends Vue {
    name: "BotsArea";
    $confirm: any;
    bots: any;
    fetchBots: any;
    created(): void;
    deleteBot(): void;
}
