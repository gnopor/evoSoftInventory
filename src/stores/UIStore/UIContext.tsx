// /* eslint-disable max-lines-per-function */
// import React, { useEffect, useState } from "react";

// import { DEFAULT_LANGUAGE_CODE, localStorageFields, PHONE_SCREEN_SIZE } from "../../constants";
// import CircularProgress from "../../components/CircularProgress";
// import uiService from "../../services/ui.service";
// import Helpers from "../../utilities/helpers/helpers";
// import SecureLocalStorage from "../../utilities/helpers/secureLocalStorage.helpers";
// import PathHelpers from "../../utilities/helpers/path.helpers";

// // copied from the linter of value
// interface IUIContext {
//     languages: I.ILanguage[] | undefined;
//     currentLanguage: I.ILanguage | undefined;
//     label: I.ILabel | undefined;
//     isPhoneView: boolean;
//     updateCurrentLanguage: (languageCode2: string) => void;
//     languageMap: { [key: string]: I.ILanguage } | undefined;
//     currentPath: string | undefined;
// }

// const UIContext = React.createContext({} as IUIContext);

// function useUI() {
//     const context = React.useContext(UIContext);

//     if (context === undefined) {
//         throw new Error("UIContext must be used within an UIProvider.");
//     }

//     return context;
// }

// function UIProvider({ children }: { children: React.ReactNode }) {
//     const [languages, setLanguages] = useState<I.ILanguage[]>();
//     const [languageMap, setLanguageMap] = useState<{ [key: string]: I.ILanguage }>();
//     const [currentLanguage, setCurrentLanguage] = useState<I.ILanguage>();

//     const [label, setLabel] = useState<I.ILabel>();

//     const [isPhoneView, setIsPhoneView] = useState(false);
//     const [currentPath, setCurrentPath] = useState<string>();

//     useEffect(() => {
//         Object.keys(label || {}).length === 0 && initState();
//     }, [label]);

//     const initState = async () => {
//         handleSetPhoneViewState();
//         handleSetCurrentPath();

//         const language = await handleSetLanguageState();
//         language && handleSetLabel(language);
//     };

//     const handleSetPhoneViewState = () => {
//         setIsPhoneView(Helpers.getScreenWidth() < PHONE_SCREEN_SIZE);
//         Helpers.onScreenSizeChange((size: number) => setIsPhoneView(size < PHONE_SCREEN_SIZE));
//     };

//     const handleSetCurrentPath = () => {
//         PathHelpers.onPathChange((newPath) => setCurrentPath(newPath));
//     };

//     const handleSetLabel = async (language: I.ILanguage) => {
//         const label = await uiService.getLabel(language);
//         setLabel(label);
//     };

//     const handleSetLanguageState = async () => {
//         const languagesList = await uiService.getLanguages();
//         const languageCode = getDefaultLanguage();

//         const language = languagesList.find((l) => l.code2 === languageCode);
//         if (!language) {
//             window.open(PathHelpers.homePagePath(languageCode), "_self");
//             return;
//         }

//         const newLanguageMap = Helpers.getMap(languagesList, "code2");

//         setLanguageMap(newLanguageMap);
//         setLanguages(languagesList);
//         setCurrentLanguage(language);
//         saveDefaultLanguage(languageCode);

//         return language;
//     };

//     const updateCurrentLanguage = (languageCode2: string) => {
//         if (languageCode2 === getDefaultLanguage()) return;

//         const oldPath = window.location.pathname;

//         const pathParts = oldPath.split("/");
//         pathParts[1] = languageCode2;

//         saveDefaultLanguage(languageCode2);
//         window.open(pathParts.join("/"), "_self");
//     };

//     const saveDefaultLanguage = (languageCode2: string) => {
//         return SecureLocalStorage.setItem(localStorageFields.DEFAULT_USER_LANGUAGE, languageCode2);
//     };

//     const getDefaultLanguage = () => {
//         const languageCode = SecureLocalStorage.getItem(localStorageFields.DEFAULT_USER_LANGUAGE);
//         return languageCode || DEFAULT_LANGUAGE_CODE;
//     };

//     const value = {
//         languages,
//         currentLanguage,
//         label,
//         isPhoneView,
//         updateCurrentLanguage,
//         languageMap,
//         currentPath
//     };

//     return (
//         <UIContext.Provider value={value}>
//             {Object.keys(label || {}).length > 0 ? (
//                 children
//             ) : (
//                 <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
//                     <CircularProgress />
//                 </div>
//             )}
//         </UIContext.Provider>
//     );
// }

// export { UIProvider, useUI };
