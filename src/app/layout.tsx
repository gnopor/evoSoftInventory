"use client";

import { I18nextProvider } from "react-i18next";

import Footer from "../components/footers/Footers";
import Header from "../components/headers/Header";
import i18n from "../i18n";
import { UIProvider } from "../stores/UIStore/UIContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <I18nextProvider i18n={i18n}>
            <UIProvider>
                <html lang="en">
                    <body>
                        <Header />
                        {children}
                        <Footer />
                    </body>
                </html>
            </UIProvider>
        </I18nextProvider>
    );
}
