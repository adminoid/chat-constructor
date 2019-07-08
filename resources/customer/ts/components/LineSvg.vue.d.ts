import { Vue } from 'vue-property-decorator';
export default class LineSvg extends Vue {
    lineData: any;
    lineMinSize: number;
    topPadding: number;
    readonly verticalAdd: boolean;
    readonly reverseVertical: boolean;
    readonly reverseHorizontal: boolean;
    readonly horizontalClose: boolean;
    readonly x1x2: number;
    readonly y1: number;
    readonly y2: number;
    readonly x3: number;
    readonly x4: number;
    readonly lineElement: string;
    readonly position: {
        left: string;
        top: string;
    };
    readonly width: number;
    readonly height: number;
    readonly viewBox: string;
    readonly size: {
        height: string;
        width: string;
    };
}
