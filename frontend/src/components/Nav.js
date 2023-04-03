import React, { useRef, useState } from "react";
import axios from "../axios";
import { Navbar, Button, Nav, NavDropdown, Container, Row } from "react-bootstrap";
import "../CSS/Navigation.css";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

//Navigational Bar

function Navigation() {
  const history = useNavigate();
  const navigate = useNavigate(); 
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const routeChangeall = () =>{ 
    let path = `/Detailsall`; 
    navigate(path);
  }

  const routeChangeone = () =>{ 
    let path = `/Onedetail`; 
    navigate(path);
  }

  const routeCreate = () =>{ 
    let path = `/Adddetail`; 
    navigate(path);
  }

  function handleLogout() {
    history("/login");
    dispatch(logout());
  }

  const [showLinks, setShowLinks] = useState(false);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setShowLinks(!showLinks)}
        >

        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`ms-auto ${showLinks ? "show-nav" : ""}`}>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Nav.Link>SignUP</Nav.Link>
            </LinkContainer>
            <Button
              variant="danger"
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </Button>
        
                <Button onClick={routeChangeall}>Check all Devices & Locations</Button>
                <Button onClick={routeChangeone}>Check all Devices based on one Location</Button>
                <Button onClick={routeCreate}>Add a device</Button>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
