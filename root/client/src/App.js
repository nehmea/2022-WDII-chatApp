import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import AdminUsers from "./pages/AdminUsers";
import AdminChannels from "./pages/AdminChannels";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import Navigation from "./helpers/Navigation";
import ProtectedRoute from "./helpers/ProtectedRoutes";
import { io } from "socket.io-client";

//import MessageList from "./components/MessageList";

function App() {
  const [authState, setAuthSate] = useState(null);
  

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .get(`http://localhost:3001/users/`, {
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

  return (
    <div className="App">
      {console.log(authState)}
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
                element={
                  <ProtectedRoute
                    isAllowed={!!authState && authState.role === "user"}
                  />
                }
              >
                <Route path="/home" element={<Home />}></Route>
              </Route>
              {/* admin routes */}
              <Route
                element={
                  <ProtectedRoute
                    isAllowed={!!authState && authState.role === "admin"}
                  />
                }
              >
                <Route path="/admin/users" element={<AdminUsers />}></Route>
                <Route
                  path="/admin/channels"
                  element={<AdminChannels />}
                ></Route>
              </Route>
              <Route element={<ProtectedRoute isAllowed={!!authState} />}>
                <Route path="/logout" element={<Logout />}></Route>
              </Route>

              {/*<Route path="/test/:channelId" element={<MessageList />}></Route>*/}

            </Routes>
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
