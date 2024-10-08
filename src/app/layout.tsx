"use client";

import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import "../styles/global.css";

import Footer from "../components/footers/Footers";
import Header from "../components/headers/Header";
import i18n from "../i18n";
import { UIProvider } from "../stores/UIStore/UIContext";
import { InventoryProvider } from "../stores/inventoryStore/inventoryContext";
import { store } from "../stores/store";
import StyledJsxRegistry from "./registry";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <UIProvider>
                    <InventoryProvider>
                        <html lang="en">
                            <body>
                                <StyledJsxRegistry>
                                    <Header />
                                    {children}
                                    <Footer />
                                </StyledJsxRegistry>
                            </body>
                        </html>
                    </InventoryProvider>
                </UIProvider>
            </I18nextProvider>
        </Provider>
    );
}
