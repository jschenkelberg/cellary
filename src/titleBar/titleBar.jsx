import React from "react";
import "./titleBar.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function TitleBar(_props) {
  return (
   
    
        <Navbar className="navbar navbar-dark bg-green">
          <Container>
            <Navbar.Brand><img src="/cellary logo.png" 
              width="30"
        height="30"
        className="d-inline-block align-top"
        alt="cellary logo"
            />
            cellary</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>pantry</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/DisplayRecipes">
                <Nav.Link>recipes</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/alerts">
                <Nav.Link>alerts</Nav.Link>
              </LinkContainer>
            </Nav>
          </Container>
        </Navbar>

    
  );
}

export default TitleBar;
