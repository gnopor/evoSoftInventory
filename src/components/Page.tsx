import React, { useEffect } from "react";
import { useRouter } from "next/router";

import DefaultLayout from "../layouts/DefaultLayout";
import PathHelpers from "../utilities/helpers/path.helpers";
import { useAuth } from "../stores/authenticationStore/authContext";
import { APP_NAME } from "../constants";

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

    useEffect(() => {
        title?.trim() && setPageTitle(title);
    }, [title]);

    const setPageTitle = (newTitle: string) => {
        document.title = `${newTitle.trim()} | ${APP_NAME}`;
    };

    if (typeof window === "undefined") return <></>;

    if (isPrivate && !isUserAuthenticated()) {
        router.push(PathHelpers.loginPagePath());
        return <></>;
    }

    return <CurrentLayout>{children}</CurrentLayout>;
}
