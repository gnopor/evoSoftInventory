import React from "react";
import css from "styled-jsx/css";

// import Header from "../components/headers/Header";
// import Footer from "../components/footers/Footer";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div id="default_layout">
                {/* <Header /> */}
                {children}
                {/* <Footer /> */}
            </div>

            <style jsx global>
                {style}
            </style>
        </>
    );
}

const style = css.global`
    #default_layout {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
        max-width: 100vw;
        overflow-x: hidden;
        overflow-y: auto;
    }

    #default_layout main {
        flex: 1 0 auto;
        width: 100%;
    }
`;
