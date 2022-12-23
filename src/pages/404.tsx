import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import PathHelpers from "../utilities/helpers/path.helpers";

export default function Error404Page() {
    const router = useRouter();

    const isRunned = useRef(false);

    useEffect(() => {
        if (isRunned.current) return;
        isRunned.current = true;

        handleRedirection();
    }, []);

    const handleRedirection = () => {
        router.push(PathHelpers.homePagePath());
    };

    return <></>;
}
