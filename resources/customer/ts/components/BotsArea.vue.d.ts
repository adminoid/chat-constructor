declare module 'vue/types/vue' {
    interface Vue {
        $confirm: any;
    }
}
import { Vue } from 'vue-property-decorator';
export default class BotsArea extends Vue {
    name: "BotsArea";
    $confirm: any;
    bots: any;
    fetchBots: any;
    deleteBot: any;
    created(): void;
    removeBot(id: any): void;
}
