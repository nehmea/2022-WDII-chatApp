import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Button, Form, FloatingLabel } from "react-bootstrap";

const HOST = "http://localhost:3001/users";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { setAuthSate } = useContext(AuthContext);

  const navigate = useNavigate();

  const login = () => {
    setErrorMsg("");
    if (!username || !password) {
      setErrorMsg("Username and password should not be empty");
    } else {
      const data = {
        username: username,
        password: password,
      };
      axios
        .post(`${HOST}/login`, data)
        .then((response) => {
          localStorage.setItem("accessToken", response.data.token);
          setAuthSate({
            username: response.data.username,
            id: response.data.id,
            roles: response.data.role,
          });
          navigate(`/home`);
        })
        .catch((error) => {
          setErrorMsg(error.response.data.error);
        });
    }
  };
  return (
    <div className="container m-3">
      <p className="h3">Login</p>
      <div className="border border-3 border-primary rounded-4 p-3">
        <p className="text-danger">{errorMsg}</p>
        <FloatingLabel label="Username" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </FloatingLabel>
        <FloatingLabel label="Password" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </FloatingLabel>
        <button className="btn btn-primary btn-lg mt-3" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
