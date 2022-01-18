import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import DefaultLayout from "./layouts/DefaultLayout";
// import AuthLayout from "./layouts/AuthLayout";

import HomePage from "./pages/HomePage";



import PrivateRoute from "./components/PrivateRoute";

const routes = [
  {
    path: "/home",
    page: HomePage,
    layout: DefaultLayout,
    protected: false,
  },
  {
    path: "/auth/signup",
    page: AuthenticationPage,
    layout: DefaultLayout,
    protected: false,
  },
  {
    path: "/auth/activate-account",
    page: AuthenticationPage,
    layout: DefaultLayout,
    protected: false,
  },
  {
    path: "/auth/activate-account",
    page: AuthenticationPage,
    layout: DefaultLayout,
    protected: false,
  },
];

export default function App() {
  return (
    <div>
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
    </div>
  );
}
