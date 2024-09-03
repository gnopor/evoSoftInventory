/* eslint-disable max-len */
import css from "styled-jsx/css";

interface IProps {
    color?: string;
    fontSize?: string;
}

export default function Logo({ color, fontSize }: IProps) {
    return (
        <>
            <figure className="logo" style={{ color: color || "inherit", fontSize: fontSize }}>
                <div>
                    <span className="icon">⏲</span>
                    <span>Evolutive Software</span>
                </div>
            </figure>

            <style jsx>{style}</style>
        </>
    );
}

const style = css`
    figure.logo {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
    }

    figure.logo > div {
        position: relative;
        display: flex;
        align-items: center;
        gap: 5px;
        font-style: italic;
    }
    figure.logo span.icon {
        font-size: 2em;
    }
`;
