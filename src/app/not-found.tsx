"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import PathHelpers from "../utilities/helpers/path.helpers";

export default function Error404Page() {
    const router = useRouter();

    useEffect(() => {
        handleRedirection();
    }, []);

    const handleRedirection = () => {
        router.push(PathHelpers.homePagePath());
    };

    return <></>;
}
