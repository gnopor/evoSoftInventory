import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute(props) {
    // const [isAuthenticated, setIsAuthenticated] = useState(true);
    const isAuthenticated = true;

    return <>{isAuthenticated ? <Route {...props} /> : <Redirect to="/auth/login" />}</>;
}
