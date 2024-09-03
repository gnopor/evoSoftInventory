import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enResources from "./assets/json/i18n/en.resources.json";
import frResources from "./assets/json/i18n/fr.resources.json";

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        lng: "en",
        fallbackLng: "en",
        resources: {
            en: enResources,
            fr: frResources
        }
    });

export default i18n;
