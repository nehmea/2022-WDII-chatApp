// LIBRARIES
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
// PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminUsers from "./pages/AdminUsers";
import AdminChannels from "./pages/AdminChannels";
// HELPERS
import { AuthContext } from "./helpers/AuthContext";
import Navigation from "./helpers/Navigation";
import ProtectedRoute from "./helpers/ProtectedRoutes";

import TextBox from "./components/TextBox";



function App() {
  const [authState, setAuthSate] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/users/`, {
          headers: {
            accessToken: accessToken,
          },
        })
        .then((response) => {
          if (response.data.error) {
            localStorage.removeItem("accessToken");
            setAuthSate(null);
          } else {
            setAuthSate({
              username: response.data.username,
              id: response.data.id,
              roles: response.data.role,
            });
          }
        });
    }
  }, []);

  console.log(authState)
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthSate }}>
        <Router>
          <Navigation authState={authState} />
          <div className="mt-3">
            <Routes>
              {/* all-user routes */}
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route>
              {/* user routes */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute
                    isAllowed={!!authState && authState.roles === "user"}
                  >
                    <Home />
                    {/* this is the children of the protected route */}
                  </ProtectedRoute>
                }
              />
              {/* admin routes */}
              <Route
                element={
                  <ProtectedRoute
                    isAllowed={!!authState && authState.roles === "admin"}
                  />
                }
              >
                <Route path="/admin/users" element={<AdminUsers />}></Route>
                <Route
                  path="/admin/channels"
                  element={<AdminChannels />}
                ></Route>
              </Route>

              <Route path="/test" element={<TextBox />}></Route>

            </Routes>
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;