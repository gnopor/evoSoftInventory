"use client";

import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import "../styles/global.css";

import Footer from "../components/footers/Footers";
import Header from "../components/headers/Header";
import i18n from "../i18n";
import { UIProvider } from "../stores/UIStore/UIContext";
import { InventoryProvider } from "../stores/inventoryStore/inventoryContext";
import { NotificationProvider } from "../stores/notificationStore/notificationContext";
import { store } from "../stores/store";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <UIProvider>
                    <NotificationProvider>
                        <InventoryProvider>
                            <html lang="en">
                                <body>
                                    <Header />
                                    {children}
                                    <Footer />
                                </body>
                            </html>
                        </InventoryProvider>
                    </NotificationProvider>
                </UIProvider>
            </I18nextProvider>
        </Provider>
    );
}
