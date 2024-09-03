import { useTranslation } from "react-i18next";
import css from "styled-jsx/css";

import { useUI } from "../stores/UIStore/UIContext";
import Icon from "./Icon";

export default function LanguageToggler() {
    const { languages, currentLanguage, updateCurrentLanguage } = useUI();
    const { i18n } = useTranslation();

    const handleSwitchLanguage = async (languageCode2: string) => {
        if (!languageCode2) return;

        i18n.changeLanguage(languageCode2);
        return updateCurrentLanguage(languageCode2);
    };

    return (
        <>
            <div className="language_toggler">
                <span className="icon">
                    <Icon name="fa:language" /> |
                </span>

                <ul className="languages">
                    {languages?.map((l, i) => (
                        <li key={i} onClick={() => handleSwitchLanguage(l.code2)}>
                            <button
                                key={i}
                                type="button"
                                className={`${currentLanguage?.code2 === l.code2 ? "current" : ""}`}
                                disabled={currentLanguage.code2 === l.code2}
                            >
                                {l.code2}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <style jsx>{styles}</style>
            <style jsx global>
                {globalStyle}
            </style>
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
        text-transform: capitalize;
        cursor: pointer;
    }
    ul.languages li button.current {
        text-decoration: underline;
    }
`;
const globalStyle = css.global`
    .language_form button {
        color: inherit;
    }
`;
