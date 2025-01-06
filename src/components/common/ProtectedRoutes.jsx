import React, { useState, useEffect, useCallback } from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { cookieAccessKeys, routes } from "../../utils";

const ProtectedRoute = ({ Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuth = useCallback(() => {
    const authToken = Cookies.get(cookieAccessKeys?.tokens?.accessToken);
    return !!authToken;
  }, []);

  useEffect(() => {
    const authStatus = checkAuth();
    setIsAuthenticated(authStatus);
  }, [checkAuth]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={routes.login} />;
  }

  // Render the Component if authenticated
  return <Component {...rest} />;
};

export default ProtectedRoute;
