// LIBRARIES
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
// PAGES
import Home from "./pages/Home";
import AllChannels from "./pages/AllChannels";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminUsers from "./pages/AdminUsers";
import AdminChannels from "./pages/AdminChannels";
import Test from "./pages/Test";
import EditProfile from "./pages/EditProfile";
import UpdatePassword from "./pages/UpdatePassword";
import LandingPage from "./pages/LandingPage";
import UserProfile from "./pages/UserProfile";
// HELPERS
import { AuthContext } from "./helpers/AuthContext";
import ProtectedRoute from "./helpers/ProtectedRoutes";
import TextBox from "./components/TextBox";
import HomeLayout from "./components/HomeLayout/HomeLayout";

function App() {
  const [authState, setAuthSate] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/users/getAuth`, {
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
      <AuthContext.Provider value={{ authState, setAuthSate }}>
        {console.log(authState)}
        <Router>
          <Routes>
            {/* unprotected routes */}
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>

            {/* protected - user routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute
                  isAllowed={!!authState && authState.roles === "user"}
                >
                  {/* this is the children of the protected route */}
                  <HomeLayout>
                    <Home />
                  </HomeLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/channels"
              element={
                <ProtectedRoute
                  isAllowed={!!authState && authState.roles === "user"}
                >
                  {/* this is the children of the protected route */}
                  <HomeLayout>
                    <AllChannels />
                  </HomeLayout>
                </ProtectedRoute>
              }
            />
            {/* protected - admin routes */}
            <Route
              element={
                <ProtectedRoute
                  isAllowed={!!authState && authState.roles === "admin"}
                />
              }
            >
              <Route path="/admin/users" element={<AdminUsers />}></Route>
              <Route path="/admin/channels" element={<AdminChannels />}></Route>
            </Route>
            <Route path="/profile/edit" element={<EditProfile />}></Route>
            <Route
              path="/profile/password/edit"
              element={<UpdatePassword />}
            ></Route>
            <Route path="/profile" element={<UserProfile />}></Route>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
