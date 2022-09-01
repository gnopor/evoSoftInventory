import React, { useEffect } from "react";
import Head from "next/head";
import { AppProps } from "next/app";

import "../style/custom.scss";
import "../style/global.css";

import { AuthProvider } from "../stores/authenticationStore/authContext";
import { APP_NAME } from "../constants";

export default function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        typeof document !== undefined && require("bootstrap/dist/js/bootstrap");
    }, []);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta name="description" content="Gnopor React/Next js boilerplate." />

                {/* <!-- START VENDOR CSS --> */}
                {/* <!-- END VENDOR CSS --> */}

                {/* <!-- START VENDOR SCRIPT  --> */}
                {/* <!-- END VENDOR SCRIPT  --> */}

                <title>{APP_NAME}</title>
            </Head>

            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </>
    );
}
