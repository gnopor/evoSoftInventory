/* eslint-disable max-lines-per-function */
import React, { useState } from "react";

import ConfirmationBox from "../../components/ConfirmationBox";
import NotificationBox from "../../components/NotificationBox";

interface INotificationContext {
    open: boolean;
    title: string;
    message: string;
    type: string;
    showNotification: (options: INotificationHandlerOptions) => void;
    closeNotification: () => void;
    showConfirmation: (options: IConfirmationHandlerOptions) => Promise<boolean>;
    closeConfirmation: (isConfirmed: boolean) => void;
}
interface INotificationHandlerOptions {
    message: string;
    title?: string;
    type?: "error" | "succeed";
}
interface IConfirmationHandlerOptions {
    message: string;
    title?: string;
}

const NotificationContext = React.createContext({} as INotificationContext);

function useNotification() {
    const context = React.useContext(NotificationContext);

    if (context === undefined) {
        throw new Error("NotificationContext must be used within an NotificationProvider.");
    }

    return context;
}

function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("success");

    const [isDialogBox, setIsDialogBox] = useState(false);
    const [, setConfirmationProcessed] = useState<boolean>();

    const showNotification = (options: INotificationHandlerOptions) => {
        const { message = "", title = "", type = "success" } = options;
        setTitle(title || "Notification");
        setMessage(message);
        setType(type);
        setOpen(true);
    };
    const closeNotification = () => {
        setOpen(false);
    };

    const showConfirmation = (options: IConfirmationHandlerOptions) => {
        const { message, title = "" } = options;
        setTitle(title || "Confirmation");
        setMessage(message);
        setOpen(true);
        setIsDialogBox(true);

        return new Promise<boolean>((resolve) => {
            const interval = setInterval(() => {
                let value: boolean | undefined;

                setConfirmationProcessed((v) => {
                    value = v;
                    return v;
                });

                if (value !== undefined) {
                    clearInterval(interval);

                    setOpen(false);
                    setIsDialogBox(false);
                    setConfirmationProcessed(undefined);

                    resolve(value);
                }
            }, 100);
        });
    };
    const closeConfirmation = (isConfirmed: boolean) => {
        setConfirmationProcessed(isConfirmed);
    };

    const value = {
        open,
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
            {isDialogBox ? <ConfirmationBox {...value} /> : <NotificationBox {...value} />}
        </NotificationContext.Provider>
    );
}

export { NotificationProvider, useNotification };
