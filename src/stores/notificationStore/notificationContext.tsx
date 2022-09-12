/* eslint-disable max-lines-per-function */
import React, { useState } from "react";

import ConfirmationWrapper from "../../components/ConfirmationWrapper";
import NotificationWrapper from "../../components/NotificationWrapper";

interface INotificationContext {
    open: boolean;
    title: string;
    message: string;
    type: string;
    showNotification: (options: {
        message: string;
        title?: string;
        type?: "error" | "succeed";
    }) => void;
    closeNotification: () => void;
    showConfirmation: (options: { message: string; title?: string }) => Promise<boolean>;
    closeConfirmation: (isConfirmed: boolean) => void;
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

    const value: INotificationContext = {
        open,
        title,
        message,
        type,
        showNotification: ({ message = "", title = "", type = "success" }) => {
            setTitle(title || "Notification");
            setMessage(message);
            setType(type);
            setOpen(true);
        },
        closeNotification: () => {
            setOpen(false);
        },
        // confirmation dialog box
        showConfirmation: ({ message, title = "" }) => {
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
        },
        closeConfirmation: (isConfirmed: boolean) => {
            setConfirmationProcessed(isConfirmed);
        }
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
            {isDialogBox ? <ConfirmationWrapper {...value} /> : <NotificationWrapper {...value} />}
        </NotificationContext.Provider>
    );
}

export { NotificationProvider, useNotification };
