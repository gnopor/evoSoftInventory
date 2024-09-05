/* eslint-disable max-lines-per-function */
import React, { useRef, useState } from "react";

import ConfirmationBox from "../../components/ConfirmationBox";
import NotificationBox from "../../components/NotificationBox";

interface INotificationContext {
    title?: string;
    message: string;
    type?: ITypeNotification;
    showNotification: (options: INotificationHandlerOptions) => void;
    closeNotification: () => void;
    showConfirmation: (options: IConfirmationHandlerOptions) => Promise<boolean>;
    closeConfirmation: (isConfirmed: boolean) => void;
}
type ITypeNotification = "succeed" | "error";
interface IHandlerOptions {
    title?: string;
    message: string;
}
interface INotificationHandlerOptions extends IHandlerOptions {
    type?: ITypeNotification;
}
interface IConfirmationHandlerOptions extends IHandlerOptions {}

const NotificationContext = React.createContext({} as INotificationContext);

function useNotification() {
    const context = React.useContext(NotificationContext);
    if (context === undefined) {
        throw new Error("NotificationContext must be used within an NotificationProvider.");
    }

    return context;
}

function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState<ITypeNotification>("succeed");

    const [displayNotification, setDisplayNotification] = useState(false);
    const [displayConfirmation, setDisplayConfirmation] = useState(false);

    const isConfirmedRef = useRef<boolean>();

    const showNotification = (options: INotificationHandlerOptions) => {
        const { message, title = "", type = "succeed" } = options;
        setTitle(title || "Notification");
        setMessage(message);
        setType(type);
        setDisplayNotification(true);
    };
    const closeNotification = () => {
        setDisplayNotification(false);
    };

    const showConfirmation = (options: IConfirmationHandlerOptions) => {
        const { message, title = "" } = options;
        setTitle(title || "Confirmation");
        setMessage(message);
        setDisplayConfirmation(true);

        return new Promise<boolean>((resolve) => {
            const interval = setInterval(() => {
                const isConfirmed = isConfirmedRef.current;

                if (isConfirmed !== undefined) {
                    clearInterval(interval);

                    setDisplayConfirmation(false);
                    isConfirmedRef.current = undefined;

                    resolve(isConfirmed);
                }
            }, 100);
        });
    };
    const closeConfirmation = (isConfirmed: boolean) => {
        isConfirmedRef.current = isConfirmed;
    };

    const value = {
        title,
        message,
        type,
        showNotification,
        closeNotification,
        showConfirmation,
        closeConfirmation
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
            {!!displayNotification && <NotificationBox {...value} />}
            {!!displayConfirmation && <ConfirmationBox {...value} />}
        </NotificationContext.Provider>
    );
}

export { NotificationProvider, useNotification };
