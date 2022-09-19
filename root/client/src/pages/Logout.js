import React, { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { setAuthSate } = useContext(AuthContext);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  if (accessToken) {
    localStorage.removeItem("accessToken");
    setAuthSate(null);
  }
  return <Navigate to={"/home"} replace />;
}

export default Logout;
