import React from "react";
// import Footer from "../components/Footer";
// import Header from "../components/Header";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
        </>
    );
}
