import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import DefaultLayout from "./layouts/DefaultLayout";
// import AuthLayout from "./layouts/AuthLayout";

import HomePage from "./pages/HomePage";

import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./stores/authenticationStore/authContext";

const routes = [
    {
        path: "/home",
        page: HomePage,
        layout: DefaultLayout,
        protected: false
    }
    // {
    //   path: "/auth/signup",
    //   page: AuthRegisterPage,
    //   layout: DefaultLayout,
    //   protected: false,
    // },
    // {
    //   path: "/auth/account-activation/:token",
    //   page: AuthAccountActivationPage,
    //   layout: DefaultLayout,
    //   protected: false,
    // },
    // {
    //   path: "/auth/login",
    //   page: AuthLoginPage,
    //   layout: DefaultLayout,
    //   protected: false,
    // },
    // {
    //   path: "/auth/reset-password/:token",
    //   page: AuthResetPasswordPage,
    //   layout: DefaultLayout,
    //   protected: false,
    // },
    // {
    //   path: "/auth/profile",
    //   page: AuthProfilePage,
    //   layout: DefaultLayout,
    //   protected: true,
    // },
];

export default function App() {
    return (
        <div>
            <AuthProvider>
                <BrowserRouter>
                    <HelmetProvider>
                        <Switch>
                            {routes.map((route) =>
                                route.protected ? (
                                    <PrivateRoute
                                        key={route.path}
                                        exact
                                        path={route.path}
                                        render={(props) => (
                                            <route.layout>
                                                <route.page {...props} />
                                            </route.layout>
                                        )}
                                    />
                                ) : (
                                    <Route
                                        key={route.path}
                                        exact
                                        path={route.path}
                                        render={(props) => (
                                            <route.layout>
                                                <route.page {...props} />
                                            </route.layout>
                                        )}
                                    />
                                )
                            )}

                            <Redirect to="/home" />
                        </Switch>
                    </HelmetProvider>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}
