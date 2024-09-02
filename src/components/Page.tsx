import React, { useEffect, useState } from "react";

import Head from "next/head";
import { APP_NAME } from "../constants";
import DefaultLayout from "../layouts/DefaultLayout";

interface IProps {
    children: React.ReactNode;
    layout?: keyof typeof LAYOUTS_MAP;
    title?: string;
    private?: boolean;
    anonymOnly?: boolean;
}

const LAYOUTS_MAP = {
    DEFAULT_LAYOUT: DefaultLayout
};

export default function Page({ children, layout, title, private: isPrivate, anonymOnly }: IProps) {
    const [isBrowser, setIsBrowser] = useState(false);

    const CurrentLayout = LAYOUTS_MAP[layout || "DEFAULT_LAYOUT"];

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    if ((isPrivate || anonymOnly) && !isBrowser) return <></>;

    return (
        <>
            {title?.trim() && (
                <Head>
                    <title>{`${title.trim()} | ${APP_NAME}`}</title>
                </Head>
            )}

            <CurrentLayout>{children}</CurrentLayout>
        </>
    );
}
