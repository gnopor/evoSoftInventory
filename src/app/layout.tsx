"use client";

import { I18nextProvider } from "react-i18next";

import i18n from "../i18n";
import { UIProvider } from "../stores/UIStore/UIContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <I18nextProvider i18n={i18n}>
            <UIProvider>
                <html lang="en">
                    <body>{children}</body>
                </html>
            </UIProvider>
        </I18nextProvider>
    );
}
