import React from "react";
import css from "styled-jsx/css";

interface IProps {
    color: string;
    size: string;
    border: string;
}

export default function CircularProgress({ color, size, border }: IProps) {
    return (
        <>
            <div
                id="custom_loading"
                style={
                    {
                        "--CPcolor": color,
                        "--CPsize": size,
                        "--CPborder": border
                    } as React.CSSProperties
                }
            ></div>

            <style jsx>{style}</style>
        </>
    );
}

CircularProgress.defaultProps = {
    color: "#ccc",
    size: "1.5em",
    border: "2px",
    zIndex: "9999999999"
};

const style = css`
    #custom_loading {
        border: var(--CPborder) solid var(--CPcolor);
        border-left: var(--CPborder) solid transparent;
        border-radius: 50%;
        height: var(--CPsize);
        width: var(--CPsize);
        animation: custom_loading 0.7s linear infinite;
        z-index: var(--CPzIndex);
        margin: auto;
    }

    @keyframes custom_loading {
        0% {
            transform: rotateZ(0deg);
        }

        100% {
            transform: rotateZ(360deg);
        }
    }
`;
