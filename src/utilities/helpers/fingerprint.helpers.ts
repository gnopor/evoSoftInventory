import { APP_NAME } from "../contstants";

const CANVAS_TEXT = APP_NAME;

class FingerprintHelper {
    #fingerprint!: string;
    #text;

    constructor(appName = "") {
        this.#text = appName;
    }

    #getHash = (str: string) => {
        let hash = 0;

        for (let i = 0; i < str.length; ++i) {
            const char = str.charCodeAt(i);
            hash = (-hash << 5) - hash + char;
            hash = hash & hash;
        }

        return hash;
    };

    getFingerprint() {
        if (typeof window === "undefined") {
            return "";
        }

        return this.#fingerprint || this.buildFingerprint();
    }

    buildFingerprint() {
        const newFingerprint = `${this.getNavigatorMetadata()}.${this.getCanvasFingerprint()}`;

        this.#fingerprint = newFingerprint;

        return newFingerprint;
    }

    getNavigatorMetadata() {
        const source = window.navigator as any;

        const metadata = {
            appCodeName: source.appCodeName || "",
            appName: source.appName || "",
            appVersion: source.appVersion || "",
            language: source.language || "",
            platform: source.platform || "",
            product: source.product || "",
            productSub: source.productSub || "",
            userAgent: source.userAgent || "",
            vendorSub: source.vendorSub || "",
            vendor: source.vendor || "",
            buildID: source.buildID || "",
            doNotTrack: source.doNotTrack || "",
            oscpu: source.oscpu || "",
            plugins: source.plugins || "",
            deviceMemory: source.deviceMemory || "",
            hardwareConcurrency: source.hardwareConcurrency || ""
        };

        return this.#getHash(JSON.stringify(metadata));
    }

    getCanvasFingerprint() {
        if (!window.HTMLCanvasElement) {
            return "";
        }

        const text = this.#text;
        const canvas = document.createElement("canvas");

        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.textBaseline = "top";
        ctx.font = "16px 'Arial'";
        ctx.textBaseline = "alphabetic";
        ctx.rotate(0.05);
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText(text, 2, 15);
        ctx.fillStyle = "rgba(102,200,0,0.7";
        ctx.fillText(text, 4, 17);
        ctx.shadowBlur = 10;
        ctx.shadowColor = "blue";
        ctx.fillRect(-20, 10, 234, 5);

        const stringData = canvas.toDataURL();
        return this.#getHash(stringData);
    }
}

export default new FingerprintHelper(CANVAS_TEXT);
