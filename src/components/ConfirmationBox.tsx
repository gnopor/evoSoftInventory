import css from "styled-jsx/css";

import { useTranslation } from "react-i18next";

interface IProps {
    message: string;
    title: string;
    closeConfirmation: (isConfirmed: boolean) => void;
}

export default function ConfirmationBox({ title, message, closeConfirmation }: IProps) {
    const { t } = useTranslation();

    return (
        <>
            <div id="confirmation_dialogbox">
                <div className="dialogbox_content">
                    <div className="dialogbox_header">
                        <button onClick={() => closeConfirmation(false)}>X</button>
                    </div>

                    <div className="dialogbox_body">
                        <span>{title}</span>
                        <p>{message}</p>
                    </div>

                    <div className="dialogbox_footer">
                        <button className="btn" onClick={() => closeConfirmation(false)}>
                            {t("buttons.cancel.label")}
                        </button>
                        <button
                            color="#fff"
                            className="btn btn-dark"
                            onClick={() => closeConfirmation(true)}
                        >
                            {t("buttons.confirm.label")}
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{style}</style>
        </>
    );
}

const style = css`
    #confirmation_dialogbox {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(51, 51, 51, 0.5);
        height: 100vh;
        width: 100vw;
        z-index: 99999999999;
    }

    #confirmation_dialogbox .dialogbox_content {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 10px;
        padding: 1em;
        width: 500px;
        max-width: calc(100vw - 10vw);
    }

    /* header  */
    #confirmation_dialogbox .dialogbox_content .dialogbox_header {
        position: absolute;
        top: -3em;
        right: 0px;
    }
    .dialogbox_header button {
        background-color: transparent;
        color: #fff;
        border-width: 0;
        font-weight: bolder;
        padding: 1em;
    }

    /* body  */
    #confirmation_dialogbox .dialogbox_body > * {
        display: block;
        text-align: center;
        width: 100%;
    }
    .dialogbox_body span {
        font-weight: bolder;
    }
    .dialogbox_body p {
        margin: 1em 0px;
        font-size: 0.8em;
    }

    /* footer  */
    #confirmation_dialogbox .dialogbox_footer {
        display: flex;
        justify-content: flex-end;
        width: 100%;
    }
    .dialogbox_footer button:first-child {
        border: 1px solid var(--dark);
        margin-right: 1em;
    }
`;
