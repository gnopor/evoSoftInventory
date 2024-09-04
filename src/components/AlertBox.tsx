import { useEffect } from "react";

interface IProps {
    title?: string;
    message?: string;
    type?: "info" | "error";
    onClose?: () => void;
}

export default function AlertBox({ title, message, type = "info", onClose }: IProps) {
    useEffect(() => {
        handleAutoClose();
    }, []);

    const handleAutoClose = () => {
        setTimeout(() => {
            message && onClose?.();
        }, 10000);
    };

    return (
        <div className="alert" data-type={type}>
            <div className="alert_header">
                <span>{title || ""}</span>
                <button type="button" onClick={onClose}>
                    <span>×</span>
                </button>
            </div>

            <span className="alert_body">{message}</span>
        </div>
    );
}
