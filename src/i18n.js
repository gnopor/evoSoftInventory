import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import resources from "../public/json/i18n.resources.json";

i18n.use(initReactI18next).use(LanguageDetector).init({
    lng: "fr",
    fallbackLng: "fr",
    defaultNS: "common",
    resources
});

export default i18n;
