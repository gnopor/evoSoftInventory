import React from "react";
import { reducer, initialState } from "./reducer";

const AnnonceContext = React.createContext({
    state: initialState,
    dispatch: () => null
});

function useAnnonce() {
    const context = React.useContext(AnnonceContext);

    if (context === undefined) {
        throw new Error(
            "AnnonceContext must be used within an AnnonceProvider."
        );
    }
}

const AnnonceProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <AnnonceContext.Provider value={[state, dispatch]}>
            {/* TODO: Return starting are not yet fetched */}
            {children}
        </AnnonceContext.Provider>
    );
};

export { AnnonceProvider, useAnnonce };
