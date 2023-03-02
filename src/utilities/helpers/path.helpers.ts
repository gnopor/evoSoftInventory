import { LANGUAGE_CODES, DEFAULT_LANGUAGE_CODE } from "../../constants";

export default class PathHelpers {
    static onPathChange(callback: (newPath?: string) => void) {
        const element = window.document;
        let previousPath = window.location.pathname;

        callback?.(previousPath);

        const observer = new MutationObserver((mutationRecords) => {
            mutationRecords.every(() => {
                if (previousPath !== window.location.pathname) {
                    previousPath = window.location.pathname;
                    callback?.(previousPath);
                    return false;
                }
                return true;
            });
        });

        const options = { subtree: true, attributes: true };
        observer.observe(element, options);
    }

    static getPath(path: string, languageCode2 = "") {
        let languageCode = languageCode2.trim();
        if (!languageCode && typeof window !== "undefined") {
            languageCode = window.location.pathname.split("/")[1];
        }

        languageCode = LANGUAGE_CODES.includes(languageCode) ? languageCode : DEFAULT_LANGUAGE_CODE;
        return `/${languageCode}${path}`;
    }

    static getUrlParam(key: string) {
        return new URLSearchParams(window.location.search).get(key) || undefined;
    }

    static setUrlParams(params: { [key: string]: string }) {
        const url = new URL(window.location.href);

        for (const [key, value] of Object.entries(params)) {
            url.searchParams.set(key, value);
        }

        window.history.pushState({ path: url.href }, "", url.href);
    }

    // -----------------------------
    static error404Path() {
        return "/404/";
    }
    static homePagePath(languageCode?: string) {
        return this.getPath("/home/", languageCode);
    }

    static registerPagePath() {
        return "/account/register/";
    }
    static loginPagePath() {
        return "/account/login/";
    }
    static forgotIdentifierPagePath() {
        return "/account/forgot-identifier/";
    }
    static forgotPasswordPagePath() {
        return "/account/forgot-password/";
    }
}
