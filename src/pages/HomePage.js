import React from "react";
import { Helmet } from "react-helmet-async";

import { useAuth } from "../stores/authenticationStore/authContext";

export default function HomePage() {
    const { register, login, activateAccount } = useAuth();

    return (
        <>
            <Helmet>
                <title>Accueil | Boillerplate</title>
            </Helmet>

            <section>Home Page</section>
        </>
    );
}
