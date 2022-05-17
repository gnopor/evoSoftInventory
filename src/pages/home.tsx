import React from "react";
import Head from "next/head";
import css from "styled-jsx/css";

import DefaultLayout from "../layouts/DefaultLayout";
import { APP_NAME } from "../utilities/contstants";

export default function HomePage() {
    return (
        <>
            <Head>
                <title>Home | {APP_NAME}</title>
            </Head>

            <DefaultLayout>
                <main id="home_page">
                    <section>
                        Home Page
                        <p>ddd</p>
                    </section>

                    <p>super paragrapth</p>
                </main>
            </DefaultLayout>

            <style jsx>{style}</style>
        </>
    );
}

const style = css`
    #home_page section {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
            sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 14px;
        font-weight: bold;
        color: hotpink;
        transition: all 1s ease;
    }

    #home_page section:hover {
        text-decoration: underline;
        font-size: 5em;
    }

    #home_page p {
        color: red;
    }
`;
