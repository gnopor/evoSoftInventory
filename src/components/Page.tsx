import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import DefaultLayout from "../layouts/DefaultLayout";
import PathHelpers from "../utilities/helpers/path.helpers";
import { useAuth } from "../stores/authenticationStore/authContext";
import { APP_NAME } from "../constants";
import Head from "next/head";

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
    const { isUserAuthenticated } = useAuth();

    const router = useRouter();

    const [isBrowser, setIsBrowser] = useState(false);

    const CurrentLayout = LAYOUTS_MAP[layout || "DEFAULT_LAYOUT"];

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    if ((isPrivate || anonymOnly) && !isBrowser) return <></>;

    if (isPrivate && !isUserAuthenticated()) {
        router.push(PathHelpers.loginPagePath());
        return <></>;
    }

    if (anonymOnly && isUserAuthenticated()) {
        router.push(PathHelpers.homePagePath());
        return <></>;
    }

    return (
        <>
            {title?.trim() && (
                <Head>
                    <title>
                        <title>{`${title.trim()} | ${APP_NAME}`}</title>
                    </title>
                </Head>
            )}

            <CurrentLayout>{children}</CurrentLayout>
        </>
    );
}
