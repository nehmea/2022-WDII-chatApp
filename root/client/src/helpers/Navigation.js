import React from "react";
import { Link } from "react-router-dom";

function Navigation({ authState }) {
  return (
    <nav>
      {/* Nav links */}
      {!!authState ? (
        <>
          <Link to="/home" className="mx-3">
            <button className="btn btn-outline-primary">Home</button>
          </Link>
          <Link to="/logout" className="mx-3">
            <button className="btn btn-outline-primary">Logout</button>
          </Link>
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
