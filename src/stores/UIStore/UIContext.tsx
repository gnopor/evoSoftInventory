/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from "react";

import { LANGUAGE_CODES, DEFAULT_LANGUAGE_CODE, localStorageFields } from "../../constants";
import uiService from "../../services/ui.service";
import Helpers from "../../utilities/helpers/helpers";
import SecureLocalStorage from "../../utilities/helpers/secureLocalStorage.helpers";
import PathHelpers from "../../utilities/helpers/path.helpers";
import allLanguages from "../../../public/json/languages.json";
import allLabels from "../../../public/json/labels.json";

interface IUIContext {
    languages: I.ILanguage[] | undefined;
    currentLanguage: I.ILanguage | undefined;
    label: I.ILabel | undefined;
    updateCurrentLanguage: (languageCode2: string) => void;
    languageMap: { [key: string]: I.ILanguage } | undefined;
    currentPath: string | undefined;
    isConnected: boolean;
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
    const [languageMap, setLanguageMap] = useState<{ [key: string]: I.ILanguage }>();
    const [currentLanguage, setCurrentLanguage] = useState<I.ILanguage>(allLanguages[0]);
    const [label, setLabel] = useState<I.ILabel>(allLabels[0]);

    const [currentPath, setCurrentPath] = useState<string>();
    const [isConnected, setIsConnected] = useState(false);

    const isRunned = useRef(false);

    useEffect(() => {
        if (isRunned.current) return;
        isRunned.current = true;

        initState();
    }, []);

    const initState = async () => {
        handleSetCurrentPath();
        handleSetIsConnected();

        const language = await handleSetLanguageState();
        language && handleSetLabel(language);
    };

    const handleSetCurrentPath = () => {
        PathHelpers.onPathChange((newPath) => setCurrentPath(newPath));
    };

    const handleSetIsConnected = () => {
        Helpers.onConnectionStateChange((state) => setIsConnected(state));
    };

    const handleSetLabel = async (language: I.ILanguage) => {
        const label = await uiService.getLabel(language);
        label && setLabel(label);
    };

    const handleSetLanguageState = async () => {
        const languagesList = await uiService.getLanguages();
        const defaultLanguage = getDefaultLanguage();
        const languageCode = window.location.pathname.split("/")[1] || defaultLanguage;

        const language = languagesList.find((l) => l.code2 === languageCode);
        if (!language) {
            window.open(PathHelpers.homePagePath(defaultLanguage), "_self");
            return;
        }

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

        const newLanguage = languages.find((l) => l.code2 === languageCode2);
        if (!newLanguage) return;
        setCurrentLanguage(newLanguage);
        handleSetLabel(newLanguage);

        const oldPath = window.location.pathname;
        const pathParts = oldPath.split("/");
        pathParts[1] = languageCode2;
        const newPath = pathParts.join("/");
        window.history.pushState({}, "", newPath);

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
        label,
        updateCurrentLanguage,
        languageMap,
        currentPath,
        isConnected
    };

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export { UIProvider, useUI };
