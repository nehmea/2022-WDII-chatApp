import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

function Navigation({ authState }) {
  const { setAuthSate } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) {
      localStorage.removeItem("accessToken");
      setAuthSate(null);
      navigate("/login");
    }
  };

  return (
    <nav>
      {/* Nav links */}
      {!!authState ? (
        <>
          <Link to="/home" className="mx-3">
            <button className="btn btn-outline-primary">Home</button>
          </Link>
          <button className="btn btn-outline-primary mx-3" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/register" className="mx-3">
            <button className="btn btn-outline-primary">Register</button>
          </Link>
          <Link to="/login" className="mx-3">
            <button className="btn btn-outline-primary">Login</button>
          </Link>
        </>
      )}
      {!!authState && authState.roles === "admin" && (
        <>
          <Link to="/admin/users" className="mx-3">
            <button className="btn btn-outline-primary">Users</button>
          </Link>
          <Link to="/admin/channels" className="mx-3">
            <button className="btn btn-outline-primary">Channels</button>
          </Link>
        </>
      )}
      {/* routes */}
    </nav>
  );
}

export default Navigation;
