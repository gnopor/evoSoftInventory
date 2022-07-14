import { useRouter } from "next/router";

export default function Error404Page() {
    const router = useRouter();

    if (typeof window !== "undefined") {
        router.push("/home/");
    }

    return "";
}
