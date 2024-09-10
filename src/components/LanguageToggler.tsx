import { useTranslation } from "react-i18next";
import css from "styled-jsx/css";

import { useEffect } from "react";
import { useUI } from "../stores/UIStore/UIContext";
import Icon from "./Icon";

export default function LanguageToggler() {
    const { languages, currentLanguage, updateCurrentLanguage } = useUI();
    const { i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(currentLanguage.code2);
    }, [currentLanguage]);

    const handleSwitchLanguage = (languageCode2: string) => {
        updateCurrentLanguage(languageCode2);
    };

    return (
        <>
            <div className="language_toggler">
                <span className="icon">
                    <Icon name="fa:language" /> |
                </span>

                <ul className="languages">
                    {languages?.map((l, i) => (
                        <li key={i}>
                            <button
                                type="button"
                                className={`${currentLanguage?.code2 === l.code2 ? "current" : ""}`}
                                disabled={currentLanguage.code2 === l.code2}
                                onClick={() => handleSwitchLanguage(l.code2)}
                            >
                                {l.code2}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <style jsx>{styles}</style>
        </>
    );
}

const styles = css`
    .language_toggler {
        display: flex;
        align-items: center;
        gap: var(--spacing);
    }

    span.icon {
        font-size: 1.5em;
    }

    ul.languages {
        display: flex;
        align-items: center;
        gap: var(--spacing);
        padding: 0px;
        margin: 0px;
        list-style: none;
    }

    ul.languages li button {
        background: none;
        border: none;
        outline: none;
        color: inherit;
        text-transform: capitalize;
        cursor: pointer;
    }
    ul.languages li button.current {
        text-decoration: underline;
    }
`;
