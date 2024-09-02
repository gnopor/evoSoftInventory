import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";

import "../styles/global.css";

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

                <title>{APP_NAME}</title>
            </Head>

            <Component {...pageProps} />
        </>
    );
}
