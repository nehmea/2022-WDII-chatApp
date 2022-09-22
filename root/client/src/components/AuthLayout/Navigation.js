import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../assets/logo.svg"
import { AuthContext } from "../../helpers/AuthContext";

function Navigation() {
  const { authState, setAuthSate } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) {
      localStorage.removeItem("accessToken");
      setAuthSate(null);
      navigate("/");
    }
  };

  return (

    <Navbar variant="dark" expand="lg">
      <Container className=" d-flex">
        <Navbar.Brand className="pointer" onClick={() => { navigate('/') }}>
          <img
            alt=""
            src={logo}
            width="35"
            height="35"
            className="me-2 d-inline-block align-top"
          />
          <span className='logo'>Chatap</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="ms-auto">
            {/* Admin buttons - Still need to style this */}
            {!!authState && authState.roles === "admin" ?
              <>
                <Nav.Link as={Link} to="/admin/users" >Users</Nav.Link>
                <Nav.Link as={Link} to="/admin/channels" className="me-3">Channels</Nav.Link>
              </>
              :
              ""
            }
            {/* routes */}

            {/* Logout/Login button depending on authState */}
            {!!authState ?
              <Button variant="light" onClick={logout}>
                Logout
              </Button>
              :
              <Button variant="light" onClick={() => { navigate('/login') }}>
                Login
              </Button>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
