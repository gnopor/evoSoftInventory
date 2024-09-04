/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from "react";

import allLanguages from "../../../public/json/languages.json";
import { DEFAULT_LANGUAGE_CODE, LANGUAGE_CODES, localStorageFields } from "../../constants";
import Helpers from "../../utilities/helpers/helpers";
import SecureLocalStorage from "../../utilities/helpers/secureLocalStorage.helpers";

interface IUIContext {
    languages: I.ILanguage[];
    currentLanguage: I.ILanguage;
    updateCurrentLanguage: (languageCode2: string) => void;
    languageMap: Record<string, I.ILanguage> | undefined;
}

const UIContext = React.createContext({} as IUIContext);

function useUI() {
    const context = React.useContext(UIContext);

    if (context === undefined) {
        throw new Error("UIContext must be used within an UIProvider.");
    }

    return context;
}

function UIProvider({ children }: { children: React.ReactNode }) {
    const [languages, setLanguages] = useState<I.ILanguage[]>(allLanguages);
    const [languageMap, setLanguageMap] = useState<Record<string, I.ILanguage>>();
    const [currentLanguage, setCurrentLanguage] = useState<I.ILanguage>(allLanguages[0]);

    useEffect(() => {
        initState();
    }, []);

    const initState = () => {
        handleSetLanguageState();
    };

    const handleSetLanguageState = async () => {
        const languagesList = allLanguages;
        const languageCode = getDefaultLanguage();

        const language = languagesList.find((l) => l.code2 === languageCode);
        if (!language) return;

        const newLanguageMap = Helpers.getMap(languagesList, "code2");

        setLanguageMap(newLanguageMap);
        setLanguages(languagesList);
        setCurrentLanguage(language);
        saveDefaultLanguage(languageCode);

        return language;
    };

    const updateCurrentLanguage = (languageCode2: string) => {
        if (!LANGUAGE_CODES.includes(languageCode2)) return;
        if (languageCode2 === getDefaultLanguage()) return;

        console.log({ languageCode2 });

        const newLanguage = languages.find((l) => l.code2 === languageCode2);
        if (!newLanguage) return;

        setCurrentLanguage(newLanguage);
        saveDefaultLanguage(languageCode2);
    };

    const saveDefaultLanguage = (languageCode2: string) => {
        return SecureLocalStorage.setItem(localStorageFields.DEFAULT_USER_LANGUAGE, languageCode2);
    };

    const getDefaultLanguage = () => {
        const languageCode = SecureLocalStorage.getItem(localStorageFields.DEFAULT_USER_LANGUAGE);
        return languageCode || DEFAULT_LANGUAGE_CODE;
    };

    const value = {
        languages,
        currentLanguage,
        updateCurrentLanguage,
        languageMap
    };

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export { UIProvider, useUI };
