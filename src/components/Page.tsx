import React from "react";
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
}

const LAYOUTS_MAP = {
    DEFAULT_LAYOUT: DefaultLayout
};

export default function Page({ children, layout, title, private: isPrivate }: IProps) {
    const { isUserAuthenticated } = useAuth();

    const router = useRouter();

    const CurrentLayout = LAYOUTS_MAP[layout || "DEFAULT_LAYOUT"];

    if (isPrivate && typeof document === "undefined") return <></>;
    if (isPrivate && !isUserAuthenticated()) {
        router.push(PathHelpers.loginPagePath());
        return <></>;
    }

    return (
        <>
            {title?.trim() && (
                <Head>
                    <title>
                        {title.trim()} | {APP_NAME}
                    </title>
                </Head>
            )}

            <CurrentLayout>{children}</CurrentLayout>
        </>
    );
}
