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

    static getPath(str: string, languageCode: ILanguageCode = "en") {
        const pathName = window.location.pathname;

        const language = pathName[3] === "/" ? pathName.slice(0, 3) : `/${languageCode}`;
        const path = String(str).trim();

        return `${language}${path}`;
    }

    // -----------------------------
    
    static error404Path() {
        return "/404/";
    }
    static homePagePath() {
        return "/home/";
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
