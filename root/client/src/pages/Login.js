import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import Container from 'react-bootstrap/Container';

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
        .post(`${process.env.REACT_APP_SERVER_URL}/users/login`, data)
        .then((response) => {
          localStorage.setItem("accessToken", response.data.token);
          setAuthSate({
            username: response.data.username,
            id: response.data.id,
            roles: response.data.role,
          });
          if (response.data.role === "admin") navigate(`/admin/users`)
          if (response.data.role === "user") navigate(`/home`);
        })
        .catch((error) => {
          setErrorMsg(error.response.data.error);
        });
    }
  };
  return (
    <AuthLayout>
      <div className='d-flex align-items-center' style={{ height: '70%' }} >
        <Container className="auth-forms rounded p-4">
          <h2>Welcome back!</h2>
          <Form className="m-3">
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
            <div className="d-grid gap-2">
              <Button variant="outline-light" size="lg" onClick={login}>
                Login
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </AuthLayout>
  );
}

export default Login;



// background: #313131;
