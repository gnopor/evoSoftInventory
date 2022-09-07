/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from "react";

import { localStorageFields } from "../../constants";
import CircularProgress from "../../components/CircularProgress";
import uiService from "../../services/ui.service";
import Helpers from "../../utilities/helpers/helpers";
import SecureLocalStorage from "../../utilities/helpers/secureLocalStorage.helpers";

// copied from the linter of value
interface IUIContext {
    languages: I.ILanguage[] | undefined;
    currentLanguage: I.ILanguage | undefined;
    label: I.ILabel | undefined;
    updateCurrentLanguage: (language: string) => void;
    languageMap: { [key: string]: I.ILanguage } | undefined;
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
    const [languages, setLanguages] = useState<I.ILanguage[]>();
    const [label, setLabel] = useState<I.ILabel>();

    const [languageMap, setLanguageMap] = useState<{ [key: string]: I.ILanguage }>();
    const [currentLanguage, setCurrentLanguage] = useState<I.ILanguage>();

    const isRunned = useRef(false);

    useEffect(() => {
        if (isRunned.current) return;
        isRunned.current = true;

        Object.keys(label || {}).length === 0 && initState();
    }, [label]);

    const initState = async () => {
        const language = await handleSetLanguageState();
        handleSetLabels(language as I.ILanguage);
    };

    const handleSetLabels = async (language: I.ILanguage) => {
        const label = await uiService.getLabel(language);
        setLabel(label);
    };

    const handleSetLanguageState = async () => {
        const languagesList = await uiService.getLanguages();
        const languageCode = window.location.pathname.split("/")[1] || getDefaultLanguage();
        const newLanguageMap = Helpers.getMap(languagesList, "code2");

        if (!languageCode) {
            return window.open("/en/home", "_self");
        }

        const language = languagesList.find((l) => l.code2 === languageCode);
        if (!language) {
            return window.open("/en/home", "_self");
        }

        setLanguages(languagesList);
        setLanguageMap(newLanguageMap);

        setCurrentLanguage(language);
        saveDefaultLanguage(languageCode);
        return language;
    };

    const updateCurrentLanguage = (language: string) => {
        if (language === getDefaultLanguage()) return;

        const oldPath = window.location.pathname;

        let newPath: string | string[] = oldPath.split("/");
        newPath[1] = language;
        newPath = newPath.join("/");

        saveDefaultLanguage(language);
        window.open(newPath, "_self");
    };

    const saveDefaultLanguage = (languageCode2: string) => {
        return SecureLocalStorage.setItem(
            localStorageFields.DEFAULT_MEMBER_LANGUAGE,
            languageCode2
        );
    };

    const getDefaultLanguage = () => {
        return SecureLocalStorage.getItem(localStorageFields.DEFAULT_MEMBER_LANGUAGE) || "";
    };

    const value = {
        languages,
        currentLanguage,
        label,
        updateCurrentLanguage,
        languageMap
    };

    return (
        <UIContext.Provider value={value}>
            {Object.keys(label || {}).length > 0 ? (
                children
            ) : (
                <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
                    <CircularProgress />
                </div>
            )}
        </UIContext.Provider>
    );
}

export { UIProvider, useUI };
