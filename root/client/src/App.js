import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";

function App() {
  const [authState, setAuthSate] = useState({
    username: "",
    id: 0,
    status: false,
  });

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthSate }}>
        <Router>
          <div className="mt-3">
            {/* Nav links */}
            <Link to="/" className="mx-3">
              <button className="btn btn-outline-primary">Home</button>
            </Link>
            <Link to="/login" className="mx-3">
              <button className="btn btn-outline-primary">Login</button>
            </Link>
            <Link to="/logout" className="mx-3">
              <button className="btn btn-outline-primary">Logout</button>
            </Link>
            {/* protected links */}
            {!authState.status ? (
              <>
                <Link to="/login" className="mx-3">
                  <button className="btn btn-outline-primary">Login</button>
                </Link>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-primary"
                  // onClick={logout}
                >
                  Logout
                </button>
              </>
            )}
            {/* routes */}
            <Routes>
              <Route path="/" exact element={<Home />}></Route>
            </Routes>
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
