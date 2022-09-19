import React from "react";
import Navigation from "./Navigation";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function ProtectedRoute({ isAllowed, redirectPath = "/login", children }) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

export default ProtectedRoute;
