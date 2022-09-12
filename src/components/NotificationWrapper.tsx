import React, { useEffect } from "react";
import css from "styled-jsx/css";

interface IProps {
    open: boolean;
    message: string;
    title: string;
    type: string;
    closeNotification: () => void;
}

export default function NotificationWrapper({
    open,
    message,
    title,
    type,
    closeNotification
}: IProps) {
    useEffect(() => {
        open && runCloseTimeout();
    }, [open]);

    const runCloseTimeout = () => {
        setTimeout(closeNotification, 5000);
    };

    return (
        <>
            {open && (
                <div
                    id="custom_notification"
                    style={
                        {
                            "--color": type === "error" ? "indianred" : "mediumseagreen"
                        } as React.CSSProperties
                    }
                >
                    <div className="wrapper">
                        <span>{title}</span>
                        <span className="close-btn" onClick={closeNotification}>
                            x
                        </span>
                    </div>

                    <p>{message}</p>
                </div>
            )}

            <style jsx>{style}</style>
        </>
    );
}

const style = css`
    #custom_notification {
        position: fixed;
        top: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        background-color: var(--color);
        color: white;
        border-radius: 10px 0 10px 10px;
        padding: 10px;
        margin: 10px;
        width: 300px;
        max-width: 100vw;
        z-index: 99999999;
        animation: custom_notifiation 0.3s ease forwards;
    }

    #custom_notification .wrapper {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        margin: 5px 0;
    }

    #custom_notification .close-btn {
        cursor: pointer;
        margin: 0 10px;
    }

    @keyframes custom_notifiation {
        0% {
            transform: translateX(400px);
        }
        100% {
            transform: translateX(0);
        }
    }
`;
