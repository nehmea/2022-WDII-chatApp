import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function ProtectedRoute({ isAllowed, redirectPath = "/", children }) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
