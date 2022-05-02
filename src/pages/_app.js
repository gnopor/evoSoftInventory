import React from "react";
import Head from "next/head";

import "../index.css";
import { AuthProvider } from "../stores/authenticationStore/authContext";

export default function MyApp({ Component, pageProps }) {
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

                <title>Boilerplate</title>
            </Head>

            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </>
    );
}
