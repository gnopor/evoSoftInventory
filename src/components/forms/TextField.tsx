import React, { useEffect, useRef } from "react";

import Icon from "../Icon";
import VisibilitySwitch from "../VisibilitySwitch";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helper?: string;
    prepend?: React.ReactElement;
    append?: React.ReactElement;
    clear?: boolean;
    onClear?: () => void;
}

const TextField = React.forwardRef<HTMLInputElement, IProps>(
    ({ id, label, helper, required, type, prepend, append, clear, onClear, ...rest }, ref) => {
        const inputRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            initRefs();
        }, []);

        const initRefs = () => {
            if (!ref) return;
            if (typeof ref == "function") ref(inputRef.current);
            if (typeof ref == "object") ref.current = inputRef.current;
        };

        const toggleValueVisibility = (visible: boolean) => {
            if (!inputRef.current) return;
            inputRef.current.type = visible ? "text" : "password";
        };

        const handleClearValue = () => {
            if (!inputRef.current) return;
            inputRef.current.value = "";
            onClear?.();
        };

        return (
            <div className="form_control">
                {label && (
                    <label htmlFor={id} className={`form_label ${required ? "required" : ""}`}>
                        {label}
                    </label>
                )}

                <div style={{ display: "flex" }}>
                    {prepend}

                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            flex: 1
                        }}
                    >
                        <input
                            className="form_input"
                            ref={inputRef}
                            id={id}
                            required={required}
                            type={type}
                            {...rest}
                        />

                        <div
                            style={{
                                position: "absolute",
                                right: "var(--spacing)",
                                backgroundColor: "var(--white)",
                                cursor: "pointer"
                            }}
                        >
                            {type === "password" && (
                                <VisibilitySwitch toggle={toggleValueVisibility} />
                            )}
                            {(clear || onClear) && type != "password" && (
                                <span
                                    onClick={() => handleClearValue()}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        cursor: "pointer"
                                    }}
                                >
                                    <Icon name="ic:baseline-clear" />
                                </span>
                            )}
                        </div>
                    </div>

                    {append}
                </div>

                {helper && <span className="form_helper">{helper}</span>}
            </div>
        );
    }
);

TextField.displayName = "TextField";
export default TextField;
