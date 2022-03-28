/* eslint-disable react/display-name */
import React from "react";
import { useRouter } from "next/router";

import { useAuth } from "../stores/authenticationStore/authContext";

export default function withAuth(WrapperCompnent) {
    return (props) => {
        if (typeof window !== "undefined") {
            const router = useRouter();
            const { isUserAuthenticated } = useAuth();

            if (isUserAuthenticated()) {
                return <WrapperCompnent {...props} />;
            } else {
                router.push("/account/login");
                return "";
            }
        }

        return "";
    };
}
