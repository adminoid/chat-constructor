import { Vue } from 'vue-property-decorator';
export default class CustomerApp extends Vue {
    name: "CustomerApp";
    links: {
        name: string;
        link: string;
    }[];
    mounted(): void;
}
