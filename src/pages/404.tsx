import { useRouter } from "next/router";

import PathHelpers from "../utilities/helpers/path.helpers";

export default function Error404Page() {
    const router = useRouter();

    if (typeof window !== "undefined") {
        router.push(PathHelpers.homePagePath());
    }

    return "";
}
