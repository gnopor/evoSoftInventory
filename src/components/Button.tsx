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
        const btnBlock = block ? " btn--block" : "";
        const btnSize = size ? ` btn--${size}` : "";
        const btnVariant = variant ? ` btn--${variant}` : "";
        const customClasses = className ? ` ${className}` : "";

        return `btn${btnVariant}${btnBlock}${btnSize}${customClasses}`;
    };

    return (
        <button
            className={getClasses()}
            disabled={disabled || loading}
            style={{ ...style, display: "flex", justifyContent: "center", alignItems: "center" }}
            {...rest}
        >
            {prepend && (
                <>
                    {prepend}
                    &nbsp;
                </>
            )}

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textWrap: "nowrap"
                }}
            >
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
                    {append}
                </>
            )}
        </button>
    );
}
