import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/core/Loading";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading, logout } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }
  if (isAuthenticated) {
    return children;
  }
  logout();
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
