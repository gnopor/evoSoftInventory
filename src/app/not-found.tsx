"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import PathHelpers from "../utilities/helpers/path.helpers";

export default function Error404Page() {
    const router = useRouter();

    const wasRunned = useRef(false);
    useEffect(() => {
        if (wasRunned.current) return;
        wasRunned.current = true;

        handleRedirection();
    }, []);

    const handleRedirection = () => {
        router.push(PathHelpers.homePagePath());
    };

    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
        </div>
    );
}
