import React from "react";

import CircularProgress from "./CircularProgress";

interface IProps extends React.ComponentProps<"button"> {
    block?: boolean;
    variant?: "primary" | "secondary" | "dark" | "success" | "danger" | "warning" | "info";
    size?: "small" | "medium" | "large";
    prepend?: string | React.ReactNode;
    append?: string | React.ReactNode;
    loading?: boolean;
    loadingOptions?: { color?: string; size?: string; border?: string };
}

export default function Button({
    children,
    block,
    variant,
    size,
    prepend,
    append,
    loading,
    loadingOptions,
    disabled,
    style,
    className,
    ...rest
}: IProps) {
    const getClasses = () => {
        const btnBlock = block ? " btn-block" : "";
        const btnSize = size ? ` btn-${size}` : "";
        const btnVariant = variant ? ` btn-${variant}` : "";

        const classes = `${className} btn${btnVariant}${btnBlock}${btnSize}`;
        return classes;
    };

    return (
        <button
            className={getClasses()}
            disabled={disabled || loading}
            style={{ ...style, display: "flex" }}
            {...rest}
        >
            {prepend && (
                <>
                    <span>{prepend}</span>
                    &nbsp;
                </>
            )}

            <div style={{ display: "flex" }}>
                {loading && (
                    <>
                        <span>
                            <CircularProgress {...loadingOptions} />
                        </span>
                        &nbsp;
                    </>
                )}
                {children}
            </div>

            {append && (
                <>
                    &nbsp;
                    <span>{append}</span>
                </>
            )}
        </button>
    );
}
