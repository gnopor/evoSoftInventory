import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";

import "../styles/global.css";

import { APP_NAME, APP_PUBLIC_URI } from "../constants";

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

                <meta
                    name="keywords"
                    content="t-blaise, tayou, blaise, gnopor, freelance, developper, frontend, FullStack, backend, software, programmeur, siteweb"
                />
                <meta name="author" content="Blaise TAYOU" />

                {/* <!-- Open Graph meta tags  --> */}
                <meta property="og:title" content="Blaise TAYOU | FullStack Dev" />
                <meta property="og:url" content={APP_PUBLIC_URI} />
                <meta property="og:image" content={`${APP_PUBLIC_URI}/images/og_image.png`} />
                <meta property="og:type" content="website" />
                <meta
                    property="og:description"
                    content="I turn your requirements into websites on time and on budget."
                />

                {/* <!-- START VENDOR CSS --> */}
                {/* <!-- END VENDOR CSS --> */}

                {/* <!-- START VENDOR SCRIPT  --> */}
                {/* <!-- END VENDOR SCRIPT  --> */}

                <title>{APP_NAME}</title>
            </Head>

            <Component {...pageProps} />
        </>
    );
}
