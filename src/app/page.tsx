"use client";

import { useTranslation } from "react-i18next";
import Page from "../components/Page";

interface IProp {
    params: Record<string, string>;
    searchParams: { [key: string]: string | string[] | undefined };
}

const languages = {
    en: { nativeName: "English" },
    fr: { nativeName: "Francais" }
};

export default function HomePage({ params, searchParams }: IProp) {
    const { t, i18n } = useTranslation("home");

    return (
        <Page title="Home">
            <h1>{params["lng"]}</h1>

            <h1>{t("common:buttons.cancel.label")}</h1>

            <h1>{t("welcome")}</h1>

            <div>
                {Object.keys(languages).map((l) => (
                    <button
                        key={l}
                        type="submit"
                        onClick={() => i18n.changeLanguage(l)}
                        disabled={i18n.resolvedLanguage === l}
                    >
                        {(languages as any)[l].nativeName}
                    </button>
                ))}
            </div>
        </Page>
    );
}
